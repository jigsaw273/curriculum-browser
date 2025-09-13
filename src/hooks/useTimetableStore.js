import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useTimetableStore = create(
  persist(
    (set, get) => ({
      courses: [],
      addCourse: (newCourse) => {
        const courses = get().courses;
        const exists = courses.some(
          (c) =>
            c.courseName === newCourse.courseName &&
            c.trimester === newCourse.trimester
        );
        console.log(exists);
        if (exists) return; // skip adding duplicate

        set({ courses: [...courses, newCourse] });
      },
      removeCourse: (id) =>
        set((state) => ({
          courses: state.courses.filter((c) => c.id !== id),
        })),
      removeAllCourses: () => set({ courses: [] }),

      updateCourses: (newCourses) => set({ courses: newCourses }),
    }),
    {
      name: "timetable-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTimetableStore;
