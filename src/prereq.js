export const courseData = {
  "courses": [
    {
      "id": "ENGR101",
      "name": "Engineering Technology",
      "prerequisites": []
    },
    {
      "id": "COMP102",
      "name": "Introduction to Computer Program Design",
      "prerequisites": []
    },
    {
      "id": "COMP103",
      "name": "Introduction to Data Structures and Algorithms",
      "prerequisites": ["COMP102"]
    },
    {
      "id": "ENGR110",
      "name": "Engineering Design",
      "prerequisites": ["ENGR101"]
    },
    {
      "id": "ENGR121",
      "name": "Engineering Mathematics Foundations",
      "prerequisites": []
    },
    {
      "id": "ENGR123",
      "name": "Engineering Mathematics with Logic and Statistics ",
      "prerequisites": ["ENGR121"]
    },
    {
      "id": "CYBR171",
      "name": "Cybersecurity Fundamentals",
      "prerequisites": []
    },
    {
      "id": "CGRA151",
      "name": "Introduction to Computer Graphics and Games",
      "prerequisites": ["COMP102"]
    },
    {
      "id": "COMP261",
      "name": "Algorithms and Data Structures",
      "prerequisites": ["COMP103", "ENGR123"]
    },
    {
      "id": "CYBR271",
      "name": "	Code Security",
      "prerequisites": ["CYBR171", "NWEN241"]
    },
    {
      "id": "NWEN241",
      "name": "Systems Programming",
      "prerequisites": ["COMP103"]
    },
    {
      "id": "NWEN243",
      "name": "Clouds and Networking",
      "prerequisites": ["COMP103"]
    },
    {
      "id": "SWEN221",
      "name": "Software Development",
      "prerequisites": ["COMP103"]
    },
    {
      "id": "SWEN225",
      "name": "Software Design",
      "prerequisites": ["SWEN221"]
    },
    {
      "id": "ENGR201",
      "name": "Engineering in Context",
      "prerequisites": ["ENGR101", "ENGR110"]
    },
    {
      "id": "ENGR301",
      "name": "Engineering Project Management 1",
      "prerequisites": ["ENGR201"]
    },
    {
      "id": "ENGR302",
      "name": "	Engineering Project Management 2",
      "prerequisites": ["ENGR301"]
    },
    {
      "id": "SWEN301",
      "name": "Scalable Software Development",
      "prerequisites": ["SWEN225"]
    },
    {
      "id": "SWEN303",
      "name": "User Experience Engineering",
      "prerequisites": ["COMP261", "SWEN221"]
    },
    {
      "id": "SWEN326",
      "name": "Safety-Critical System",
      "prerequisites": ["NWEN241", "SWEN225"]
    }, 
    {
      "id": "SWEN304",
      "name": "Database System Engineering",
      "prerequisites": ["COMP261", "SWEN221"]
    }
  ]};