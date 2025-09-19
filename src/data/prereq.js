export const courseData = {
  courses: [
    {
      id: "AIML131",
      prerequisites: [],
    },
    {
      id: "AIML231",
      prerequisites: [
        "AIML131",
        "MATH177",
        "QUAN102",
        "STAT193",
        "COMP103",
        "COMP132",
      ],
    },
    {
      id: "AIML232",
      prerequisites: [
        "AIML131",
        "AIML231",
        "COMP103",
        "ENGR123",
        "MATH177",
        "STAT193",
        "QUAN102",
        "EEEN220",
      ],
    },
    {
      id: "AIML320",
      prerequisites: [
        "COMP261",
        "NWEN241",
        "SWEN221",
        "ENGR123",
        "MATH151",
        "MATH161",
        "MATH277",
        "QUAN203",
        "STAT292",
      ],
    },
    {
      id: "AIML331",
      prerequisites: [
        "AIML231",
        "AIML232",
        "AIML320",
        "COMP307",
        "COMP309",
        "COMP261",
        "NWEN241",
        "SWEN221",
        "ENGR121",
        "MATH177",
        "STAT292",
      ],
    },
    {
      id: "AIML332",
      prerequisites: [
        "AIML231",
        "AIML232",
        "AIML320",
        "COMP307",
        "COMP309",
        "COMP261",
        "NWEN241",
        "SWEN221",
      ],
    },
    {
      id: "AIML333",
      prerequisites: [
        "AIML231",
        "AIML232",
        "AIML320",
        "COMP307",
        "COMP309",
        "COMP261",
        "NWEN241",
        "SWEN221",
      ],
    },
    {
      id: "AIML339",
      prerequisites: [
        "AIML231",
        "AIML232",
        "AIML320",
        "COMP307",
        "COMP309",
        "AIML331",
        "AIML332",
        "AIML333",
      ],
    },
    {
      id: "AIML420",
      prerequisites: [],
    },
    {
      id: "AIML425",
      prerequisites: [
        "AIML320",
        "AIML331",
        "AIML332",
        "AIML333",
        "AIML420",
        "COMP307",
        "DATA305",
        "DATA475",
      ],
    },
    {
      id: "AIML426",
      prerequisites: [
        "AIML320",
        "AIML331",
        "AIML332",
        "AIML333",
        "AIML420",
        "COMP307",
        "DATA305",
        "DATA475",
      ],
    },
    {
      id: "AIML427",
      prerequisites: [
        "AIML231",
        "AIML232",
        "AIML320",
        "AIML331",
        "AIML332",
        "AIML333",
        "AIML420",
        "AIML421",
        "COMP307",
        "COMP309",
        "DATA301",
        "DATA303",
        "DATA305",
        "DATA471",
        "DATA473",
        "DATA475",
        "STAT393",
        "STAT394",
        "ENGR123",
        "MATH177",
        "QUAN102",
        "STAT193",
      ],
    },
    {
      id: "AIML428",
      prerequisites: [
        "AIML331",
        "AIML332",
        "AIML333",
        "COMP307",
        "DATA305",
        "DATA475",
      ],
    },
    {
      id: "AIML430",
      prerequisites: [],
    },
    {
      id: "AIML431",
      prerequisites: [
        "AIML320",
        "AIML331",
        "AIML332",
        "AIML333",
        "AIML420",
        "COMP307",
        "DATA305",
        "DATA475",
      ],
    },
    {
      id: "AIML501",
      prerequisites: [],
    },
    {
      id: "AIML589",
      prerequisites: [],
    },
    {
      id: "COMP102",
      prerequisites: [],
    },
    {
      id: "COMP103",
      prerequisites: ["COMP102", "COMP112"],
    },
    {
      id: "COMP132",
      prerequisites: [],
    },
    {
      id: "COMP261",
      prerequisites: ["COMP103", "ENGR123", "MATH161"],
    },
    {
      id: "COMP501",
      prerequisites: [],
    },
    {
      id: "COMP589",
      prerequisites: [],
    },
    {
      id: "CYBR171",
      prerequisites: [],
    },
    {
      id: "CYBR271",
      prerequisites: ["CYBR171", "NWEN241"],
    },
    {
      id: "CYBR371",
      prerequisites: ["CYBR171", "NWEN243"],
    },
    {
      id: "CYBR372",
      prerequisites: ["CYBR271", "NWEN243", "ENGR123", "MATH161", "STAT193"],
    },
    {
      id: "CYBR373",
      prerequisites: ["CYBR271"],
    },
    {
      id: "CYBR471",
      prerequisites: ["CYBR371"],
    },
    {
      id: "CYBR472",
      prerequisites: [],
    },
    {
      id: "CYBR473",
      prerequisites: [],
    },
    {
      id: "ENGR101",
      prerequisites: [],
    },
    {
      id: "ENGR110",
      prerequisites: ["ENGR101", "COMP102", "COMP112"],
    },
    {
      id: "ENGR201",
      prerequisites: ["ENGR101", "ENGR110"],
    },
    {
      id: "ENGR301",
      prerequisites: ["ENGR201"],
    },
    {
      id: "ENGR302",
      prerequisites: ["ENGR301"],
    },
    {
      id: "ENGR121",
      prerequisites: [],
    },
    {
      id: "ENGR122",
      prerequisites: ["ENGR121", "MATH141"],
    },
    {
      id: "ENGR123",
      prerequisites: ["ENGR121"],
    },
    {
      id: "ENGR141",
      prerequisites: ["MATH132"],
    },
    {
      id: "ENGR142",
      prerequisites: ["ENGR141", "ENGR121", "MATH141"],
    },
    {
      id: "ENGR222",
      prerequisites: ["ENGR121", "ENGR122", "MATH142", "MATH151"],
    },
    {
      id: "ENGR401",
      prerequisites: ["ENGR201", "ENGR301", "ENGR302"],
    },
    {
      id: "ENGR489",
      prerequisites: ["ENGR201", "ENGR301", "ENGR302"],
    },
    {
      id: "CGRA151",
      prerequisites: ["COMP102", "COMP112", "DSDN142"],
    },
    {
      id: "CGRA252",
      prerequisites: ["COMP103", "CGRA151"],
    },
    {
      id: "CGRA350",
      prerequisites: ["CGRA252", "NWEN241"],
    },
    {
      id: "CGRA352",
      prerequisites: ["CGRA252", "NWEN241", "ENGR121", "MATH151"],
    },
    {
      id: "CGRA354",
      prerequisites: ["CGRA252", "NWEN241", "ENGR121", "MATH151"],
    },
    {
      id: "CGRA359",
      prerequisites: [],
    },
    {
      id: "NWEN241",
      prerequisites: ["COMP103"],
    },
    {
      id: "NWEN243",
      prerequisites: ["COMP103"],
    },
    {
      id: "SWEN221",
      prerequisites: ["COMP103"],
    },
    {
      id: "SWEN225",
      prerequisites: ["SWEN221"],
    },
    {
      id: "SWEN301",
      prerequisites: ["SWEN225"],
    },
    {
      id: "SWEN303",
      prerequisites: ["COMP261", "SWEN221"],
    },
    {
      id: "SWEN326",
      prerequisites: ["NWEN241", "SWEN225"],
    },
    {
      id: "SWEN304",
      prerequisites: ["COMP261", "SWEN221", "ENGR123", "MATH161"],
    },
    {
      id: "EEEN201",
      prerequisites: [
        "COMP102",
        "COMP112",
        "ENGR101",
        "ENGR110",
        "ENGR121",
        "MATH141",
      ],
    },
    {
      id: "EEEN202",
      prerequisites: ["COMP102", "COMP112", "ENGR101", "ENGR121", "MATH161"],
    },
    {
      id: "EEEN203",
      prerequisites: ["ENGR122", "MATH142", "ENGR142", "PHYS142", "PHYS115"],
    },
    {
      id: "EEEN204",
      prerequisites: ["ENGR122", "MATH142", "ENGR142", "PHYS142", "PHYS115"],
    },
    {
      id: "EEEN220",
      prerequisites: ["ENGR121", "ENGR122", "MATH142", "MATH151"],
    },
    {
      id: "EEEN301",
      prerequisites: ["EEEN202", "ECEN202", "NWEN241"],
    },
    {
      id: "EEEN313",
      prerequisites: ["EEEN203", "ECEN203", "EEEN204", "ECEN204"],
    },
    {
      id: "EEEN315",
      prerequisites: ["EEEN203", "ECEN203"],
    },
    {
      id: "EEEN320",
      prerequisites: ["EEEN220", "ECEN220"],
    },
    {
      id: "EEEN325",
      prerequisites: ["EEEN201"],
    },
    {
      id: "EEEN401",
      prerequisites: ["EEEN313", "ENGR222", "MATH243"],
    },
    {
      id: "EEEN402",
      prerequisites: ["EEEN301", "ECEN301"],
    },
    {
      id: "EEEN415",
      prerequisites: ["EEEN315", "ECEN315"],
    },
    {
      id: "EEEN425",
      prerequisites: ["EEEN325", "ECEN301"],
    },
  ],
};
