const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

async function scrapeCourseData(faculty, courseCode) {
  const url = `https://www.wgtn.ac.nz/courses/${faculty}/${courseCode}`;

  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);

  fs.writeFileSync(path.join(__dirname, "courseData.html"), html, "utf8");

  const scriptTags = $("script");
  let result = null;

  scriptTags.each((_, tag) => {
    const content = $(tag).html();
    if (content.includes("window.restResponse1 = `")) {
      // Regex that gets everything inside the backticks
      const match = content.match(/window\.restResponse1\s*=\s*`([^`]*)`;/);
      const courseJSON = match[1];

      const data = JSON.parse(courseJSON);
      const metadata = data.responseFbComplete?.[0]?.metaData;

      //Add checking for empty later
      const offerings = data.responseFbComplete?.map((offering) => {
        const meta = offering.metaData;

        return {
          year: meta.year || "2025",
          trimester: meta.subAcademicPeriodHF,
          courseCoordinator: meta.courseCoordinatorFullName,
          lecturers: meta.courseLecturerFullName?.split("|"),
          lectureDays: meta.courseLectureDays
            ? meta.courseLectureDays
                .split("|")
                .slice(0, meta.courseLectureDays.split("|").length / 2)
            : [],
          lectureTimes: meta.courseLectureStartTime
            ? meta.courseLectureStartTime
                .split("|")
                .slice(0, meta.courseLectureDays.split("|").length / 2)
            : [],
          campus: meta.courseLectureCampus || "Kelburn",
          startDate: meta.courseLectureStartDate,
          endDate: meta.courseLectureEndDate,
          examPeriodEnd: meta.courseOfferingEndDate,
        };
      });

      // Extract all unique trimesters
      const trimesters = [
        ...new Set(
          offerings.map((offering) => offering.trimester).filter(Boolean)
        ),
      ];

      result = {
        [metadata.courseCodeNoSpace]: {
          courseId: faculty + courseCode,
          courseCode: faculty,
          courseNum: courseCode,
          courseName: metadata.courseName,
          courseDescription: metadata.courseDescription,
          trimestersOffered: trimesters,
          subjectCode: metadata.subjectCode,
          courseLevel: metadata.courseLevel,
          schoolName: metadata.courseSchoolName,
          facultyName: metadata.courseFacultyName,
          disciplines: metadata.courseDisciplineNames?.split("|"),
          offerings,
        },
      };
    }
  });
  return result;
}

async function run() {
  const inputPath = path.join(__dirname, "courseList.txt");
  const outputPath = path.join(__dirname, "CourseDetailsWithOfferings.json");
  const courseList = fs.readFileSync(inputPath, "utf8").trim().split("\n");

  const courseDetails = {};

  for (const line of courseList) {
    const [faculty, courseCode] = line.trim().split(" ");

    console.log(`Scraping ${faculty} ${courseCode}...`);
    const courseMetadata = await scrapeCourseData(faculty, courseCode);
    if (courseMetadata) {
      Object.assign(courseDetails, courseMetadata);
    }
  }

  fs.writeFileSync(outputPath, JSON.stringify(courseDetails, null, 2), "utf8");
  console.log(`Done! Saved to ${outputPath}`);
}

run();
async function test() {
  const ans = await scrapeCourseData("COMP", "102");
  console.log(ans);
}
