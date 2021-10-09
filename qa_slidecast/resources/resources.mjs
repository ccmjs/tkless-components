/**
 * @overview data-based resources of ccmjs-based web component for slidecast with commentary
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

/**
 * quiz config (used in example slides data)
 * @type {Object}
 */
export const quiz = {
  "questions": [
    {
      "text": "What is HTML?",
      "input": "radio",
      "answers": [
        "Programming Language",
        { "text": "Hypertext Markup Language", "correct": true },
        "Something to eat"
      ]
    }
  ],
  "feedback": true,
  "progress_bar": false,
  "placeholder.submit": "Finish"
};

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "comment": [ "ccm.component", "./../comment/ccm.comment.js", [ "ccm.load", "./../comment/resources/resources.mjs#local" ] ],
  "css": [ "ccm.load",
    "./../qa_slidecast/resources/styles.css",
    "./../libs/bootstrap-5/css/bootstrap-icons.css",
    { "url": "./../libs/bootstrap-5/css/bootstrap-fonts.css", "context": "head" },
  ],
  "helper.1": "./../libs/ccm/helper.mjs",
  "html.1": "./../qa_slidecast/resources/templates.mjs",
  "ignore": {
    "slides": [
      {
        "audio": "./../qa_slidecast/resources/demo/en/slide1.m4a",
        "content": 1,
        "description": "Welcome! The teacher can add an optional description to a slide."
      },
      {
        "audio": "./../qa_slidecast/resources/demo/en/slide2.m4a",
        "content": 2,
        "description": "The description of a slide can also be a separate app (see next slide)."
      },
      {
        "audio": "./../qa_slidecast/resources/demo/en/extra.m4a",
        "content": "./../qa_slidecast/resources/demo/en/extra.jpg",
        "description": [ "ccm.proxy", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.1.2.js", quiz ]
      },
      {
        "audio": "./../qa_slidecast/resources/demo/en/video.m4a",
        "content": "./../qa_slidecast/resources/demo/video.mp4",
        "description": "A little video can be placed instead of a slide."
      },
      {
        "audio": "./../qa_slidecast/resources/demo/en/app.m4a",
        "content": [ "ccm.proxy", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.1.2.js", quiz ],
        "description": "A separate app can also be placed instead of a slide."
      },
      {
        "audio": "./../qa_slidecast/resources/demo/en/slide3.m4a",
        "content": 3,
        "description": "Commenting is disabled for this slide.",
        "commentary": false
      }
    ]
  },
  "open": "comments",
  "pdf_viewer": [ "ccm.start", "./../pdf_viewer/ccm.pdf_viewer.js", [ "ccm.load", "./../pdf_viewer/resources/resources.mjs#local" ] ]
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "comment": [ "ccm.component", "https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-7.0.0.min.js", {
    "data": { "store": [ "ccm.store" ] },
    "src": [ "ccm.load", "https://ccmjs.github.io/tkless-components/comment/resources/resources.mjs#demo" ]
  } ],
  "ignore": {
    "slides": [
      {
        "audio": "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/demo/de/slide1.m4a",
        "content": 1,
        "description": "Willkommen! Der Lehrende kann für eine Folie eine optionale Beschreibung hinterlegen."
      },
      {
        "audio": "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/demo/de/slide2.m4a",
        "content": 2,
        "description": "Die Beschreibung zu einer Folie kann auch eine separate App sein (siehe nächste Folie)."
      },
      {
        "audio": "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/demo/de/extra.m4a",
        "content": "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/demo/de/extra.jpg",
        "description": [ "ccm.proxy", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.1.2.js", quiz ]
      },
      {
        "audio": "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/demo/de/video.m4a",
        "content": "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/demo/video.mp4",
        "description": "Zwischen zwei Folien kann auch ein kleines Video platziert werden."
      },
      {
        "audio": "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/demo/de/app.m4a",
        "content": [ "ccm.proxy", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.1.2.js", quiz ],
        "description": "Auch eine separate App kann zwischen Folien platziert werden."
      },
      {
        "audio": "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/demo/de/slide3.m4a",
        "content": 3,
        "description": "Für diese Folie ist die Kommentierung ausgeschaltet.",
        "commentary": false
      }
    ]
  },
  "open": "comments",
  "pdf_viewer": [ "ccm.start", "https://ccmjs.github.io/tkless-components/pdf_viewer/versions/ccm.pdf_viewer-7.0.0.min.js", [ "ccm.load", "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/resources.mjs#demo" ] ],
  "text": {
    "comments": "Zeigt die Kommentare zu dieser Folie an.",
    "description": "Zeigt die Beschreibung zu dieser Folie an."
  }
};