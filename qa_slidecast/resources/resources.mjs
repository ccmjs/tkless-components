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
 * example slides data
 * @type {Object}
 */
export const slides = [
  {
    "audio": "./../qa_slidecast/resources/demo/slide1.m4a",
    "content": 1,
    "description": "Welcome! The teacher can add an optional description to a slide."
  },
  {
    "audio": "./../qa_slidecast/resources/demo/slide2.m4a",
    "content": 2,
    "description": "The description of a slide can also be a separate app (see next slide)."
  },
  {
    "audio": "./../qa_slidecast/resources/demo/extra.m4a",
    "content": "./../qa_slidecast/resources/demo/extra.jpg",
    "description": [ "ccm.proxy", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.1.2.js", quiz ]
  },
  {
    "audio": "./../qa_slidecast/resources/demo/video.m4a",
    "content": "./../qa_slidecast/resources/demo/video.mp4",
    "description": "A little video can be placed instead of a slide."
  },
  {
    "audio": "./../qa_slidecast/resources/demo/app.m4a",
    "content": [ "ccm.proxy", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.1.2.js", quiz ],
    "description": "A separate app can also be placed instead of a slide."
  },
  {
    "audio": "./../qa_slidecast/resources/demo/slide3.m4a",
    "content": 3,
    "description": "Commenting is disabled for this slide.",
    "commentary": false
  }
];

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const local = {
  "comment": [ "ccm.component", "./../comment/ccm.comment.js", [ "ccm.load", "./../comment/resources/resources.mjs#local" ] ],
  "css": [ "ccm.load",
    "./../qa_slidecast/resources/styles.css",
    "./../libs/bootstrap-5/css/bootstrap-icons.css",
    { "url": "./../libs/bootstrap-5/css/bootstrap-fonts.css", "context": "head" },
  ],
  "helper.1": "./../libs/ccm/helper.mjs",
  "html.1": "./../qa_slidecast/resources/templates.mjs",
  "ignore": {
    "slides": slides
  },
  "open": "comments",
  "pdf_viewer": [ "ccm.start", "./../pdf_viewer/ccm.pdf_viewer.js", [ "ccm.load", "./../pdf_viewer/resources/resources.mjs#local" ] ]
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "ignore": {
    "slides": slides
  },
  "open": "comments"
};