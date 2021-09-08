/**
 * @overview data-based resources of ccmjs-based web component for PDF viewer
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const local = {
  "css.1": "./../pdf_viewer/resources/styles.css",
  "html.1": "./../pdf_viewer/resources/templates.mjs",
  "libs": [ "ccm.load",
    "./../libs/pdfjs/pdf.min.js",
    "./../libs/pdfjs/pdf.worker.min.js"
  ],
  "pdf": "./../pdf_viewer/resources/slides.pdf"
};