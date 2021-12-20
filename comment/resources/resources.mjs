/**
 * @overview data-based resources of ccmjs-based web component for commentary
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

/**
 * example for app state data
 * @type {Object}
 */
export const example = {
  "demo,comment1": {
    "key": [ "demo", "comment1" ],
    "app": "demo",
    "comment": "comment1",
    "picture": "https://ccmjs.github.io/tkless-components/comment/resources/portraits/joki.png",
    "user": "joki",
    "text": "Was genau wird denn hier kommentiert?",
    "created_at": "2021-10-01T19:00:00",
    "updated_at": "2021-10-01T19:00:00",
    "_": { "creator": "joki", "realm": "guest" }
  },
  "demo,comment1,answer1": {
    "key": [ "demo", "comment1", "answer1" ],
    "app": "demo",
    "comment": "comment1",
    "answer": "answer1",
    "picture": "https://ccmjs.github.io/tkless-components/comment/resources/portraits/twonky.png",
    "user": "twonky",
    "text": "Das ist flexibel. Je nachdem wo die Kommentierung platziert wird.",
    "created_at": "2021-10-01T19:12:00",
    "updated_at": "2021-10-01T19:12:00",
    "_": { "creator": "twonky", "realm": "guest" },
  },
  "demo,comment1,answer2": {
    "key": [ "demo", "comment1", "answer2" ],
    "app": "demo",
    "comment": "comment1",
    "answer": "answer2",
    "picture": "https://ccmjs.github.io/tkless-components/comment/resources/portraits/joki.png",
    "user": "joki",
    "text": "@twonky: Danke für die schnelle Rückmeldung.",
    "created_at": "2021-10-01T19:22:00",
    "updated_at": "2021-10-01T19:22:00",
    "_": { "creator": "twonky", "realm": "guest" },
  },
  "demo,comment2": {
    "key": [ "demo", "comment2" ],
    "app": "demo",
    "comment": "comment2",
    "user": "john",
    "text": "Wieso haben nur joki und twonky ein Portrait bei ihren Kommentaren?",
    "created_at": "2021-10-01T20:10:00",
    "updated_at": "2021-10-01T20:10:00",
    "_": { "creator": "john", "realm": "guest" }
  },
  "demo,comment2,answer1": {
    "key": [ "demo", "comment2", "answer1" ],
    "app": "demo",
    "comment": "comment2",
    "answer": "answer1",
    "picture": "https://ccmjs.github.io/tkless-components/comment/resources/portraits/twonky.png",
    "user": "twonky",
    "text": "Bei dieser Demo sind nur für unsere Kommentare beispielhaft Portraits hinterlegt, alle anderen haben ein Standard-Portrait.",
    "created_at": "2021-10-01T20:14:00",
    "updated_at": "2021-10-01T20:14:00",
    "_": { "creator": "twonky", "realm": "guest" }
  },
  "demo,joki": {
    "key": [ "demo", "joki" ],
    "app": "demo",
    "user": "joki",
    "comments": {
      "demo,comment1,answer1": {
        "like": true
      }
    },
    "_": { "creator": "joki", "realm": "guest" }
  },
  "demo,twonky": {
    "key": [ "demo", "twonky" ],
    "app": "demo",
    "user": "twonky",
    "comments": {
      "demo,comment1": {
        "like": true
      },
      "demo,comment1,answer2": {
        "like": true
      }
    },
    "_": { "creator": "twonky", "realm": "guest" }
  }
};

/**
 * german texts and labels for PDF viewer
 * @type {Object}
 */
export const de = {
  "key": "de",
  "answer": "ANTWORTEN",
  "answers": "Zeige %d Antworten",
  "comments": "%d Kommentare",
  "delete": "Kommentar löschen",
  "deleted": "(gelöscht)",
  "dislike": "Ich mag diesen Kommentar nicht",
  "edit": "Kommentar editieren",
  "heart": "Ich liebe diesen Kommentar",
  "like": "Ich mag diesen Kommentar",
  "picture": "Profilbild des Benutzers",
  "recycle": "Löschen des Kommentars rückgängig machen",
  "report": "Diesen Kommentar als unangemessen markieren",
  "sort_by_date": "Sortierung nach Datum",
  "sort_by_rating": "Sortierung nach Bewertung",
  "submit": "Abschicken",
  "updated": "(bearbeitet)",
  "write_answer": "Schreibe eine Antwort...",
  "write_comment": "Schreibe einen Kommentar..."
};

/**
 * english texts and labels for PDF viewer
 * @type {Object}
 */
export const en = {
  "key": "en",
  "answer": "ANSWER",
  "answers": "Show %d Answers",
  "comments": "%d Comments",
  "delete": "Delete this comment",
  "deleted": "(deleted)",
  "dislike": "I don't like this comment",
  "edit": "Edit this comment",
  "heart": "I really love this comment",
  "like": "I like this comment",
  "picture": "User Picture",
  "recycle": "Undo the deletion of the comment",
  "report": "Report this comment as inappropriate",
  "sort_by_date": "Sort by Date",
  "sort_by_rating": "Sort by Rating",
  "submit": "Submit",
  "updated": "(updated)",
  "write_answer": "Write an answer...",
  "write_comment": "Write a comment..."
};

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "css": [ "ccm.load",
    [  // serial
      "./../libs/bootstrap-5/css/bootstrap.css",
      "./../comment/resources/styles.css"
    ],
    "./../libs/bootstrap-5/css/bootstrap-icons.css",
    { "url": "./../libs/bootstrap-5/css/bootstrap-fonts.css", "context": "head" },
  ],
  "data": {
    "store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "comment-data" } ],
    "key": "test"
  },
  "helper.1": "./../libs/ccm/helper.mjs",
  "html.1": "./../comment/resources/templates.mjs",
  "libs": [ "ccm.load",
    "./../libs/dayjs/dayjs.min.js",
    "./../libs/dayjs/relativeTime.min.js"
  ],
  "picture": "./../comment/resources/portraits/default.svg",
  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.min.js", "greedy" ] ],
  "text": [ "ccm.load", "./../comment/resources/resources.mjs#en" ],
  "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.min.js", "cloud" ] ]
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "data": {
    "store": [ "ccm.store", example ],
    "key": "demo"
  },
  "libs": [ "ccm.load", [
    [
      "https://ccmjs.github.io/tkless-components/libs/dayjs/dayjs.min.js",
      "https://ccmjs.github.io/tkless-components/libs/dayjs/relativeTime.min.js"
    ],
    "https://ccmjs.github.io/tkless-components/libs/dayjs/de.min.js"
  ] ],
  "text": de
};