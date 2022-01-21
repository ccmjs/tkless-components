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
  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/ccm.log.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  "routing": [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/ccm.routing.js" ],
  "sections": [
    {
      "title": "Section 1",
      "entries": [
        {
          "title": "Demo: PDF-Viewer",
          "ignore": [ "ccm.start", "https://ccmjs.github.io/tkless-components/pdf_viewer/versions/ccm.pdf_viewer-7.1.0.js", [ "ccm.load", "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/resources.mjs#demo" ] ]
        },
        {
          "title": "Entry 2",
          "ignore": [ "ccm.start", "https://ccmjs.github.io/akless-components/blank/ccm.blank.js" ]
        }
      ]
    },
    {
      "title": "Section 2",
      "entries": [
        {
          "title": "Entry 1",
          "ignore": [ "ccm.start", "https://ccmjs.github.io/akless-components/blank/ccm.blank.js" ]
        },
        {
          "title": "Entry 2",
          "ignore": [ "ccm.start", "https://ccmjs.github.io/akless-components/blank/ccm.blank.js" ]
        }
      ]
    }
  ],
  "title": "My Apps"
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "routing": [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-3.0.0.min.js" ]
};
