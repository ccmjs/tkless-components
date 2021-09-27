/**
 * @overview data-based resources of ccmjs-based web component for building a PDF viewer
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const local = {
  "css": [ "ccm.load",
    [  // serial
      "./../libs/bootstrap-5/css/bootstrap.css",
      "./../pdf_viewer_builder/resources/styles.css"
    ]
  ],
  "helper.1": "./../libs/ccm/helper.mjs",
  "html.1": "./../pdf_viewer_builder/resources/templates.mjs",
  "tool.1": "./../pdf_viewer/ccm.pdf_viewer.js"
};