import { create } from "zustand";

const useTimetableStore = create((set) => ({
  courses: [],
  addCourse: (newCourse) =>
    set((state) => ({ courses: [...state.courses, newCourse] })),
  removeAllCourses: () => set({ courses: [] }),
  updateCourses: (newCourses) => set({ courses: newCourses }),
}));

export default useTimetableStore;
