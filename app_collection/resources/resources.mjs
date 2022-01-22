/**
 * @overview data-based resources of ccmjs-based web component for an app collection
 * @author André Kless <andre.kless@web.de> 2022
 * @license The MIT License (MIT)
 */

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "css": [ "ccm.load",
    "./../app_collection/resources/styles.css"
  ],
  "footer": [
    {
      "title": "Entry 1",
      "ignore": [ "ccm.start", "https://ccmjs.github.io/akless-components/blank/ccm.blank.js" ]
    },
    {
      "title": "Entry 2",
      "ignore": [ "ccm.start", "https://ccmjs.github.io/akless-components/blank/ccm.blank.js" ]
    },
    {
      "title": "Entry 3",
      "ignore": [ "ccm.start", "https://ccmjs.github.io/akless-components/blank/ccm.blank.js" ]
    }
  ],
  "helper.1": "./../libs/ccm/helper.mjs",
  "html.1": "./../app_collection/resources/templates.mjs",
  "icon": [ "ccm.load", "./../app_collection/resources/app.svg" ],
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/ccm.lang.js" ],
  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/ccm.log.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  "routing": [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/ccm.routing.js" ],
  "sections": [
    {
      "title": "Demos",
      "entries": [
        {
          "title": "PDF-Viewer",
          "icon": "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/icon.svg",
          "ignore": [ "ccm.start", "https://ccmjs.github.io/tkless-components/pdf_viewer/versions/ccm.pdf_viewer-7.1.0.min.js", [ "ccm.load", "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/resources.mjs#demo" ] ]
        },
        {
          "title": "Kommentierung",
          "icon": "https://ccmjs.github.io/tkless-components/comment/resources/comment.svg",
          "ignore": [ "ccm.start", "https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-7.1.0.min.js", [ "ccm.load", "https://ccmjs.github.io/tkless-components/comment/resources/resources.mjs#demo" ] ]
        }
      ]
    },
    {
      "title": "Mehr Demos",
      "entries": [
        {
          "title": "Slidecast",
          "icon": "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/icon.svg",
          "ignore": [ "ccm.start", "https://ccmjs.github.io/tkless-components/qa_slidecast/versions/ccm.qa_slidecast-2.0.0.min.js", [ "ccm.load", "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/resources.mjs#demo" ] ]
        }
      ]
    }
  ],
  "title": "Meine App-Sammlung",
  "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/ccm.user.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "guest" ] ]
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "routing": [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-3.0.0.min.js" ]
};
