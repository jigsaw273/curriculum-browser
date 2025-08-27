export const courseData = {
  "courses": [
    {
      "id": "COMP102",
      "prerequisites": []
    },
    {
      "id": "COMP103",
      "prerequisites": [
        "COMP102",
        "COMP112"
      ]
    },
    {
      "id": "COMP132",
      "prerequisites": []
    },
    {
      "id": "COMP261",
      "prerequisites": [
        "COMP103",
        "ENGR123",
        "MATH161"
      ]
    },
    {
      "id": "CYBR171",
      "prerequisites": []
    },
    {
      "id": "CYBR271",
      "prerequisites": [
        "CYBR171",
        "NWEN241"
      ]
    },
    {
      "id": "CYBR371",
      "prerequisites": [
        "CYBR171",
        "NWEN243"
      ]
    },
    {
      "id": "CYBR372",
      "prerequisites": [
        "CYBR271",
        "NWEN243",
        "ENGR123",
        "MATH161",
        "STAT193"
      ]
    },
    {
      "id": "CYBR373",
      "prerequisites": [
        "CYBR271"
      ]
    },
    {
      "id": "CYBR471",
      "prerequisites": [
        "CYBR371"
      ]
    },
    {
      "id": "CYBR472",
      "prerequisites": []
    },
    {
      "id": "CYBR473",
      "prerequisites": []
    },
    {
      "id": "ENGR101",
      "prerequisites": []
    },
    {
      "id": "ENGR110",
      "prerequisites": [
        "COMP102",
        "COMP112",
        "ENGR101"
      ]
    },
    {
      "id": "ENGR201",
      "prerequisites": [
        "ENGR101",
        "ENGR110"
      ]
    },
    {
      "id": "ENGR301",
      "prerequisites": [
        "ENGR201"
      ]
    },
    {
      "id": "ENGR302",
      "prerequisites": [
        "ENGR301"
      ]
    },
    {
      "id": "ENGR121",
      "prerequisites": []
    },
    {
      "id": "ENGR122",
      "prerequisites": [
        "ENGR121",
        "MATH141"
      ]
    },
    {
      "id": "ENGR123",
      "prerequisites": [
        "ENGR121"
      ]
    },
    {
      "id": "CGRA151",
      "prerequisites": [
        "COMP102",
        "COMP112",
        "DSDN142"
      ]
    },
    {
      "id": "CGRA252",
      "prerequisites": [
        "COMP103",
        "CGRA151"
      ]
    },
    {
      "id": "CGRA350",
      "prerequisites": [
        "CGRA252",
        "NWEN241"
      ]
    },
    {
      "id": "CGRA352",
      "prerequisites": [
        "CGRA252",
        "NWEN241",
        "ENGR121",
        "MATH151"
      ]
    },
    {
      "id": "CGRA354",
      "prerequisites": [
        "CGRA252",
        "NWEN241",
        "ENGR121",
        "MATH151"
      ]
    },
    {
      "id": "CGRA359",
      "prerequisites": []
    },
    {
      "id": "NWEN241",
      "prerequisites": [
        "COMP103"
      ]
    },
    {
      "id": "NWEN243",
      "prerequisites": [
        "COMP103"
      ]
    },
    {
      "id": "SWEN221",
      "prerequisites": [
        "COMP103"
      ]
    },
    {
      "id": "SWEN225",
      "prerequisites": [
        "SWEN221"
      ]
    },
    {
      "id": "SWEN301",
      "prerequisites": [
        "SWEN225"
      ]
    },
    {
      "id": "SWEN303",
      "prerequisites": [
        "COMP261",
        "SWEN221"
      ]
    },
    {
      "id": "SWEN326",
      "prerequisites": [
        "NWEN241",
        "SWEN225"
      ]
    },
    {
      "id": "SWEN304",
      "prerequisites": [
        "COMP261",
        "SWEN221",
        "ENGR123",
        "MATH161"
      ]
    }
  ]
};
