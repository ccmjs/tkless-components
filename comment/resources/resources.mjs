/**
 * @overview data-based resources of ccmjs-based web component for commentary
 * @author André Kless <andre.kless@web.de> 2021-2022
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
 * german texts and labels
 * @type {Object}
 */
export const de = {
  "answer": "ANTWORTEN",
  "answers": "Zeige %% Antworten",
  "comments": "%% Kommentare",
  "delete": "Kommentar löschen",
  "deleted": "(gelöscht)",
  "dislike": "Ich mag diesen Kommentar nicht",
  "edit": "Kommentar editieren",
  "heart": "Ich liebe diesen Kommentar",
  "like": "Ich mag diesen Kommentar",
  "locale": "de",
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
 * english texts and labels
 * @type {Object}
 */
export const en = {
  "answer": "ANSWER",
  "answers": "Show %% Answers",
  "comments": "%% Comments",
  "delete": "Delete this comment",
  "deleted": "(deleted)",
  "dislike": "I don't like this comment",
  "edit": "Edit this comment",
  "heart": "I really love this comment",
  "like": "I like this comment",
  "locale": "en",
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
      "./../libs/bootstrap-5/css/bootstrap-dark.css",
      "./../comment/resources/styles.css"
    ],
    "./../libs/bootstrap-5/css/bootstrap-icons.css",
    { "url": "./../libs/bootstrap-5/css/bootstrap-fonts.css", "context": "head" },
  ],
  "data": { "store": [ "ccm.store", example ] },
  "helper.1": "./../libs/ccm/helper.mjs",
  "html.1": "./../comment/resources/templates.mjs",
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/ccm.lang.js", {
    "translations": { "de": de, "en": en }
  } ],
  "libs": [ "ccm.load", [
    "./../libs/dayjs/dayjs.min.js",
    [
      "./../libs/dayjs/relativeTime.min.js",
      "./../libs/dayjs/de.min.js",
    ]
  ] ],
  "picture": "./../comment/resources/portraits/default.svg",
  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/ccm.log.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  "text": [ "ccm.load", "./../comment/resources/resources.mjs#de" ],
  "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/ccm.user.js" ]
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "data": { "store": [ "ccm.store", example ] },
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.min.js", {
    "translations": { "de": de, "en": en }
  } ],
  "libs": [ "ccm.load", [
    "https://ccmjs.github.io/tkless-components/libs/dayjs/dayjs.min.js",
    [
      "https://ccmjs.github.io/tkless-components/libs/dayjs/relativeTime.min.js",
      "https://ccmjs.github.io/tkless-components/libs/dayjs/de.min.js"
    ]
  ] ],
  "text": de,
  "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js" ]
};
