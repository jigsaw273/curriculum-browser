export const courseDependencies ={
  "COMP102": {
    "prerequisites": {
      "type": "AND",
      "clauses": []
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": [
        { "type": "COURSE", "course": "COMP112" }
      ]
    }
  },
  "COMP103": {
    "prerequisites": {
      "type": "OR",
      "clauses": [
        { "type": "COURSE", "course": "COMP102" },
        { "type": "COURSE", "course": "COMP112" }
      ]
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": []
    }
  },
  "COMP132": {
    "prerequisites": {
      "type": "AND",
      "clauses": []
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": []
    }
  },
  "COMP261": {
    "prerequisites": {
      "type": "AND",
      "clauses": [
        { "type": "COURSE", "course": "COMP103" },
        {
          "type": "OR",
          "clauses": [
            { "type": "COURSE", "course": "ENGR123" },
            { "type": "COURSE", "course": "MATH161" }
          ]
        }
      ]
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": [
        { "type": "COURSE", "course": "INFO205" }
      ]
    }
  },
  "CYBR171": {
    "prerequisites": {
      "type": "AND",
      "clauses": []
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": []
    }
  },
  "CYBR271": {
    "prerequisites": {
      "type": "AND",
      "clauses": [
        { "type": "COURSE", "course": "CYBR171" },
        { "type": "COURSE", "course": "NWEN241" }
      ]
    },
    "corequisites": "None",
    "restrictions": "None"
  },
  "CYBR371": {
    "prerequisites": {
      "type": "AND",
      "clauses": [
        { "type": "COURSE", "course": "CYBR171" },
        { "type": "COURSE", "course": "NWEN243" }
      ]
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": []
    }
  },
  "CYBR372": {
    "prerequisites": {
      "type": "AND",
      "clauses": [
        { "type": "COURSE", "course": "CYBR271" },
        { "type": "COURSE", "course": "NWEN243" },
        {
          "type": "OR",
          "clauses": [
            { "type": "COURSE", "course": "ENGR123" },
            {
              "type": "AND",
              "clauses": [
                { "type": "COURSE", "course": "MATH161" },
                { "type": "COURSE", "course": "STAT193" }
              ]
            }
          ]
        }
      ]
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": []
    }
  },
  "CYBR373": {
    "prerequisites": {
      "type": "AND",
      "clauses": [
        { "type": "COURSE", "course": "CYBR271" }
      ]
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": []
    }
  },
  "ENGR101": {
    "prerequisites": {
      "type": "AND",
      "clauses": []
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": []
    }
  },
  "ENGR110": {
    "prerequisites": {
      "type": "AND",
      "clauses": [
        {
          "type": "OR",
          "clauses": [
            { "type": "COURSE", "course": "COMP102" },
            { "type": "COURSE", "course": "COMP112" }
          ]
        },
        { "type": "COURSE", "course": "ENGR101" }
      ]
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": []
    }
  },
  "ENGR201": {
    "prerequisites": {
      "type": "AND",
      "clauses": [
        { "type": "COURSE", "course": "ENGR101" },
        { "type": "COURSE", "course": "ENGR110" }
      ]
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": []
    }
  },
  "ENGR301": {
    "prerequisites": {
      "type": "AND",
      "clauses": [
        { "type": "COURSE", "course": "ENGR201" }
      ]
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": []
    }
  },
  "ENGR302": {
    "prerequisites": {
      "type": "AND",
      "clauses": [
        { "type": "COURSE", "course": "ENGR301" }
      ]
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": []
    }
  },
  "ENGR121": {
    "prerequisites": {
      "type": "AND",
      "clauses": []
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": []
    }
  },
  "ENGR122": {
    "prerequisites": {
      "type": "OR",
      "clauses": [
        { "type": "COURSE", "course": "ENGR121" },
        { "type": "COURSE", "course": "MATH141" }
      ]
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": [
        { "type": "COURSE", "course": "MATH142" },
        { "type": "COURSE", "course": "MATH151" }
      ]
    }
  },
  "ENGR123": {
    "prerequisites": "ENGR 121;",
    "corequisites": "None",
    "restrictions": {
      "type": "AND",
      "clauses": [
        { "type": "COURSE", "course": "MATH161" },
        {
          "type": "OR",
          "clauses": [
            { "type": "COURSE", "course": "MATH177" },
            { "type": "COURSE", "course": "QUAN102" },
            { "type": "COURSE", "course": "STAT193" }
          ]
        }
      ]
    }
  },
  "CGRA151": {
    "prerequisites": {
      "type": "OR",
      "clauses": [
        { "type": "COURSE", "course": "COMP102" },
        { "type": "COURSE", "course": "COMP112" },
        { "type": "COURSE", "course": "DSDN142" }
      ]
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": []
    }
  },
  "NWEN241": {
    "prerequisites": {
      "type": "OR",
      "clauses": [
        { "type": "COURSE", "course": "COMP103" }
      ]
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": []
    }
  },
  "NWEN243": {
    "prerequisites": {
      "type": "AND",
      "clauses": [
        { "type": "COURSE", "course": "COMP103" }
      ]
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": []
    }
  },
  "SWEN221": {
    "prerequisites": {
      "type": "AND",
      "clauses": [
        { "type": "COURSE", "course": "COMP103" }
      ]
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": []
    }
  },
  "SWEN225": {
    "prerequisites": {
      "type": "AND",
      "clauses": [
        { "type": "COURSE", "course": "SWEN221" }
      ]
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": [
        { "type": "COURSE", "course": "SWEN222" }
      ]
    }
  },
  "SWEN301": {
    "prerequisites": {
      "type": "AND",
      "clauses": [
        { "type": "COURSE", "course": "SWEN225" }
      ]
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": []
    }
  },
  "SWEN303": {
    "prerequisites": {
      "type": "OR",
      "clauses": [
        { "type": "COURSE", "course": "COMP261" },
        { "type": "COURSE", "course": "SWEN221" }
      ]
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": [
        { "type": "COURSE", "course": "INFO307" }
      ]
    }
  },
  "SWEN326": {
    "prerequisites": {
      "type": "OR",
      "clauses": [
        { "type": "COURSE", "course": "NWEN241" },
        { "type": "COURSE", "course": "SWEN225" }
      ]
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "AND",
      "clauses": [
        { "type": "COURSE", "course": "INFO307" }
      ]
    }
  },
  "SWEN304": {
    "prerequisites": {
      "type": "AND",
      "clauses": [
        {
          "type": "OR",
          "clauses": [
            { "type": "COURSE", "course": "COMP261" },
            { "type": "COURSE", "course": "SWEN221" }
          ]
        },
        {
          "type": "OR",
          "clauses": [
            { "type": "COURSE", "course": "ENGR123" },
            { "type": "COURSE", "course": "MATH161" }
          ]
        }
      ]
    },
    "corequisites": {
      "type": "AND",
      "clauses": []
    },
    "restrictions": {
      "type": "OR",
      "clauses": [
        { "type": "COURSE", "course": "INFO310" },
        { "type": "COURSE", "course": "COMP302" }
      ]
    }
  }
}
