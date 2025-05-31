export const courseData = {
  "courses": [
    {
      "id": "ENGR101",
      "name": "Introduction to Computer Science",
      "prerequisites": []
    },
    {
      "id": "COMP102",
      "name": "Data Structures",
      "prerequisites": []
    },
    {
      "id": "COMP103",
      "name": "Algorithms",
      "prerequisites": ["COMP102"]
    },
    {
      "id": "ENGR110",
      "name": "Discrete Mathematics",
      "prerequisites": ["ENGR101"]
    },
    {
      "id": "ENGR121",
      "name": "Database Systems",
      "prerequisites": []
    },
    {
      "id": "ENGR123",
      "name": "Operating Systems",
      "prerequisites": ["ENGR121"]
    },
    {
      "id": "CYBR171",
      "name": "Software Engineering",
      "prerequisites": []
    },
    {
      "id": "CGRA151",
      "name": "Computer Networks",
      "prerequisites": ["COMP102"]
    },
    {
      "id": "COMP261",
      "name": "Artificial Intelligence",
      "prerequisites": ["COMP103", "ENGR123"]
    },
    {
      "id": "CYBR271",
      "name": "Capstone Project",
      "prerequisites": ["CYBR171", "NWEN241"]
    },
    {
      "id": "NWEN241",
      "name": "Artificial Intelligence",
      "prerequisites": ["COMP103"]
    },
    {
      "id": "NWEN243",
      "name": "Capstone Project",
      "prerequisites": ["COMP103"]
    },
    {
      "id": "SWEN221",
      "name": "Artificial Intelligence",
      "prerequisites": ["COMP103"]
    },
    {
      "id": "SWEN225",
      "name": "Capstone Project",
      "prerequisites": ["SWEN221"]
    },
    {
      "id": "ENGR201",
      "name": "Artificial Intelligence",
      "prerequisites": ["ENGR101", "ENGR110"]
    }
  ]};