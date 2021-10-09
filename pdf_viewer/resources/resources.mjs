/**
 * @overview data-based resources of ccmjs-based web component for PDF viewer
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

/**
 * german texts and labels for PDF viewer
 * @type {Object}
 */
export const de = {
  "denied": "Zugriff verweigert",
  "download": "PDF herunterladen",
  "first": "Erste Seite",
  "jump": "Zu einer bestimmten Seite springen",
  "last": "Letzte Seite",
  "next": "Nächste Seite",
  "prev": "Vorherige Seite",
  "protected": "Dieses Dokument ist passwortgeschützt. Geben Sie ein Passwort ein."
};

/**
 * english texts and labels for PDF viewer
 * @type {Object}
 */
export const en = {
  "denied": "Access Denied",
  "download": "Download PDF",
  "first": "First Page",
  "jump": "Jump to specific Page",
  "last": "Last Page",
  "next": "Next Page",
  "prev": "Previous Page",
  "protected": "This document is password protected. Enter a password.",
};

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "css": [ "ccm.load",
    "./../pdf_viewer/resources/styles.css",
    "./../libs/bootstrap-5/css/bootstrap-icons.css",
    { "url": "./../libs/bootstrap-5/css/bootstrap-fonts.css", "context": "head" }
  ],
  "helper.1": "./../libs/ccm/helper.mjs",
  "html.1": "./../pdf_viewer/resources/templates.mjs",
  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.min.js", "greedy" ] ],
  "pdf": "./../pdf_viewer/resources/demo/en/slides.pdf",
  "pdfjs.lib.1": "./../libs/pdfjs-2/pdf.min.js",
  "pdfjs.worker": "./../libs/pdfjs-2/pdf.worker.min.js",
  "text": [ "ccm.load", "./../pdf_viewer/resources/resources.mjs#en" ]
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "pdf": "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/demo/de/slides.pdf",
  "text": de
};