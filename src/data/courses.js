export const courseDependencies = {
  AIML427: {
    prerequisites: {
      type: "AND",
      clauses: [
        {
          type: "OR",
          clauses: [
            { type: "COURSE", course: "AIML231" },
            { type: "COURSE", course: "AIML232" },
            { type: "COURSE", course: "AIML320" },
            { type: "COURSE", course: "AIML331-335" },
            { type: "COURSE", course: "AIML420" },
            { type: "COURSE", course: "AIML421" },
            { type: "COURSE", course: "COMP307" },
            { type: "COURSE", course: "COMP309" },
            { type: "COURSE", course: "DATA301" },
            { type: "COURSE", course: "DATA303" },
            { type: "COURSE", course: "DATA305" },
            { type: "COURSE", course: "DATA471" },
            { type: "COURSE", course: "DATA473" },
            { type: "COURSE", course: "DATA475" },
            { type: "COURSE", course: "STAT393" },
            { type: "COURSE", course: "STAT394" },
          ],
        },
        {
          type: "OR",
          clauses: [
            { type: "COURSE", course: "ENGR123" },
            { type: "COURSE", course: "MATH177" },
            { type: "COURSE", course: "QUAN102" },
            { type: "COURSE", course: "STAT193" },
          ],
        },
      ],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
  },
  COMP102: {
    prerequisites: {
      type: "AND",
      clauses: [],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [{ type: "COURSE", course: "COMP112" }],
    },
  },
  COMP103: {
    prerequisites: {
      type: "OR",
      clauses: [
        { type: "COURSE", course: "COMP102" },
        { type: "COURSE", course: "COMP112" },
      ],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  COMP132: {
    prerequisites: {
      type: "AND",
      clauses: [],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  COMP261: {
    prerequisites: {
      type: "AND",
      clauses: [
        { type: "COURSE", course: "COMP103" },
        {
          type: "OR",
          clauses: [
            { type: "COURSE", course: "ENGR123" },
            { type: "COURSE", course: "MATH161" },
          ],
        },
      ],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [{ type: "COURSE", course: "INFO205" }],
    },
  },
  CYBR171: {
    prerequisites: {
      type: "AND",
      clauses: [],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  CYBR271: {
    prerequisites: {
      type: "AND",
      clauses: [
        { type: "COURSE", course: "CYBR171" },
        { type: "COURSE", course: "NWEN241" },
      ],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  CYBR371: {
    prerequisites: {
      type: "AND",
      clauses: [
        { type: "COURSE", course: "CYBR171" },
        { type: "COURSE", course: "NWEN243" },
      ],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  CYBR372: {
    prerequisites: {
      type: "AND",
      clauses: [
        { type: "COURSE", course: "CYBR271" },
        { type: "COURSE", course: "NWEN243" },
        {
          type: "OR",
          clauses: [
            { type: "COURSE", course: "ENGR123" },
            {
              type: "AND",
              clauses: [
                { type: "COURSE", course: "MATH161" },
                { type: "COURSE", course: "STAT193" },
              ],
            },
          ],
        },
      ],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  CYBR373: {
    prerequisites: {
      type: "AND",
      clauses: [{ type: "COURSE", course: "CYBR271" }],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  CYBR471: {
    prerequisites: {
      type: "AND",
      clauses: [
        { type: "COURSE", course: "CYBR371" },
        {
          type: "POINTS",
          minPoints: 45,
          level: 300,
          subjects: ["AIML", "CGRA", "CYBR", "NWEN", "SWEN"],
        },
      ],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  CYBR472: {
    prerequisites: {
      type: "AND",
      clauses: [
        {
          type: "POINTS",
          minPoints: 60,
          level: 300,
          subjects: ["AIML", "CGRA", "COMP", "CYBR", "NWEN", "SWEN"],
        },
      ],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  CYBR473: {
    prerequisites: {
      type: "AND",
      clauses: [
        {
          type: "POINTS",
          minPoints: 60,
          level: 300,
          subjects: ["AIML", "CGRA", "COMP", "CYBR", "NWEN", "SWEN"],
        },
      ],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  ENGR101: {
    prerequisites: {
      type: "AND",
      clauses: [],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  ENGR110: {
    prerequisites: {
      type: "AND",
      clauses: [
        { type: "COURSE", course: "ENGR101" },
        {
          type: "OR",
          clauses: [
            { type: "COURSE", course: "COMP102" },
            { type: "COURSE", course: "COMP112" },
          ],
        },
      ],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  ENGR201: {
    prerequisites: {
      type: "AND",
      clauses: [
        { type: "COURSE", course: "ENGR101" },
        { type: "COURSE", course: "ENGR110" },
      ],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  ENGR301: {
    prerequisites: {
      type: "AND",
      clauses: [{ type: "COURSE", course: "ENGR201" }],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  ENGR302: {
    prerequisites: {
      type: "AND",
      clauses: [{ type: "COURSE", course: "ENGR301" }],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  ENGR121: {
    prerequisites: {
      type: "AND",
      clauses: [],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  ENGR122: {
    prerequisites: {
      type: "OR",
      clauses: [
        { type: "COURSE", course: "ENGR121" },
        { type: "COURSE", course: "MATH141" },
      ],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [
        { type: "COURSE", course: "MATH142" },
        { type: "COURSE", course: "MATH151" },
      ],
    },
  },
  ENGR123: {
    prerequisites: {
      type: "AND",
      clauses: [{ type: "COURSE", course: "ENGR121" }],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [
        { type: "COURSE", course: "MATH161" },
        {
          type: "OR",
          clauses: [
            { type: "COURSE", course: "MATH177" },
            { type: "COURSE", course: "QUAN102" },
            { type: "COURSE", course: "STAT193" },
          ],
        },
      ],
    },
  },
  CGRA151: {
    prerequisites: {
      type: "OR",
      clauses: [
        { type: "COURSE", course: "COMP102" },
        { type: "COURSE", course: "COMP112" },
        { type: "COURSE", course: "DSDN142" },
      ],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  CGRA252: {
    prerequisites: {
      type: "AND",
      clauses: [
        { type: "COURSE", course: "COMP103" },
        { type: "COURSE", course: "CGRA151" },
      ],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  CGRA350: {
    prerequisites: {
      type: "AND",
      clauses: [
        { type: "COURSE", course: "CGRA252" },
        { type: "COURSE", course: "NWEN241" },
      ],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  CGRA352: {
    prerequisites: {
      type: "AND",
      clauses: [
        {
          type: "AND",
          clauses: [
            { type: "COURSE", course: "CGRA252" },
            { type: "COURSE", course: "NWEN241" },
          ],
        },
        {
          type: "OR",
          clauses: [
            { type: "COURSE", course: "ENGR121" },
            { type: "COURSE", course: "MATH151" },
          ],
        },
      ],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  CGRA354: {
    prerequisites: {
      type: "AND",
      clauses: [
        {
          type: "AND",
          clauses: [
            { type: "COURSE", course: "CGRA252" },
            { type: "COURSE", course: "NWEN241" },
          ],
        },
        {
          type: "OR",
          clauses: [
            { type: "COURSE", course: "ENGR121" },
            { type: "COURSE", course: "MATH151" },
          ],
        },
      ],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  CGRA359: {
    prerequisites: {
      type: "AND",
      clauses: [],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  NWEN241: {
    prerequisites: {
      type: "OR",
      clauses: [{ type: "COURSE", course: "COMP103" }],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  NWEN243: {
    prerequisites: {
      type: "AND",
      clauses: [{ type: "COURSE", course: "COMP103" }],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  SWEN221: {
    prerequisites: {
      type: "AND",
      clauses: [{ type: "COURSE", course: "COMP103" }],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  SWEN225: {
    prerequisites: {
      type: "AND",
      clauses: [{ type: "COURSE", course: "SWEN221" }],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [{ type: "COURSE", course: "SWEN222" }],
    },
  },
  SWEN301: {
    prerequisites: {
      type: "AND",
      clauses: [{ type: "COURSE", course: "SWEN225" }],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [],
    },
  },
  SWEN303: {
    prerequisites: {
      type: "OR",
      clauses: [
        { type: "COURSE", course: "COMP261" },
        { type: "COURSE", course: "SWEN221" },
      ],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [{ type: "COURSE", course: "INFO307" }],
    },
  },
  SWEN326: {
    prerequisites: {
      type: "OR",
      clauses: [
        { type: "COURSE", course: "NWEN241" },
        { type: "COURSE", course: "SWEN225" },
      ],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "AND",
      clauses: [{ type: "COURSE", course: "INFO307" }],
    },
  },
  SWEN304: {
    prerequisites: {
      type: "AND",
      clauses: [
        {
          type: "OR",
          clauses: [
            { type: "COURSE", course: "COMP261" },
            { type: "COURSE", course: "SWEN221" },
          ],
        },
        {
          type: "OR",
          clauses: [
            { type: "COURSE", course: "ENGR123" },
            { type: "COURSE", course: "MATH161" },
          ],
        },
      ],
    },
    corequisites: {
      type: "AND",
      clauses: [],
    },
    restrictions: {
      type: "OR",
      clauses: [
        { type: "COURSE", course: "INFO310" },
        { type: "COURSE", course: "COMP302" },
      ],
    },
  },
};
