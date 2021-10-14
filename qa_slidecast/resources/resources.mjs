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
 * german texts and labels for Q&A Slidecast
 * @type {Object}
 */
export const text_de = {
  "comments": "Ein-/Ausblenden der Folienkommentare",
  "description": "Ein-/Ausblenden der Foliebeschreibung"
};

/**
 * english texts and labels for Q&A Slidecast
 * @type {Object}
 */
export const text_en = {
  "comments": "Shows/Hides Slide Comments",
  "description": "Shows/Hides Slide Description"
};

/**
 * german demo slides for Q&A Slidecast
 * @type {Object}
 */
export const slides_de = [
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
    "content": "https://youtu.be/aqz-KE-bpKQ",
    "description": "Auch  ein YouTube-Video kann zwischen Folien platziert werden."
  },
  {
    "audio": "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/demo/de/slide3.m4a",
    "content": 3,
    "description": "Für diese Folie ist die Kommentierung ausgeschaltet.",
    "commentary": false
  }
];

/**
 * english demo slides for Q&A Slidecast
 * @type {Object}
 */
export const slides_en = [
  {
    "audio": "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/demo/en/slide1.m4a",
    "content": 1,
    "description": "Welcome! The teacher can add an optional description to a slide."
  },
  {
    "audio": "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/demo/en/slide2.m4a",
    "content": 2,
    "description": "The description of a slide can also be a separate app (see next slide)."
  },
  {
    "audio": "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/demo/en/extra.m4a",
    "content": "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/demo/en/extra.jpg",
    "description": [ "ccm.proxy", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.1.2.js", quiz ]
  },
  {
    "audio": "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/demo/en/video.m4a",
    "content": "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/demo/video.mp4",
    "description": "A little video can be placed instead of a slide."
  },
  {
    "audio": "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/demo/en/app.m4a",
    "content": [ "ccm.proxy", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.1.2.js", quiz ],
    "description": "A separate app can also be placed instead of a slide."
  },
  {
    "content": "https://youtu.be/aqz-KE-bpKQ",
    "description": "A YouTube video can also be placed between slides."
  },
  {
    "audio": "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/demo/en/slide3.m4a",
    "content": 3,
    "description": "Commenting is disabled for this slide.",
    "commentary": false
  },
  { "content": "https://www.youtube.com/watch?v=aqz-KE-bpKQ" },
  { "content": "<script src='https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-8.0.1.js'></script><ccm-cloze-8-0-1 key='[\"ccm.get\",{\"name\":\"dms-configs\",\"url\":\"https://ccm2.inf.h-brs.de\"},\"1581497368813X17209956326291276\"]'></ccm-cloze-8-0-1>" }
];

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "comment": [ "ccm.component", "./../comment/ccm.comment.js", {
    "src": [ "ccm.load", "./../comment/resources/resources.mjs#local" ],
    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js" ]
  } ],
  "css": [ "ccm.load",
    "./../qa_slidecast/resources/styles.css",
    "./../libs/bootstrap-5/css/bootstrap-icons.css",
    { "url": "./../libs/bootstrap-5/css/bootstrap-fonts.css", "context": "head" },
  ],
  "helper.1": "./../libs/ccm/helper.mjs",
  "html.1": "./../qa_slidecast/resources/templates.mjs",
  "ignore": {
    "slides": slides_en
  },
  "onchange": ( { name, instance, before } ) => { console.log( name, instance.slide_nr, !!before ) },
  "onstart": instance => { console.log( 'start', instance.slide_nr ) },
  "pdf_viewer": [ "ccm.start", "./../pdf_viewer/ccm.pdf_viewer.js", [ "ccm.load", "./../pdf_viewer/resources/resources.mjs#local" ] ],
  "text": text_en
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "comment": [ "ccm.component", "https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-7.0.0.min.js", {
    "data": { "store": [ "ccm.store" ] },
    "src": [ "ccm.load", "https://ccmjs.github.io/tkless-components/comment/resources/resources.mjs#demo" ],
    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js" ]
  } ],
  "ignore": {
    "slides": slides_de
  },
  "pdf_viewer": [ "ccm.start", "https://ccmjs.github.io/tkless-components/pdf_viewer/versions/ccm.pdf_viewer-7.0.0.min.js", [ "ccm.load", "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/resources.mjs#demo" ] ],
  "text": text_de
};