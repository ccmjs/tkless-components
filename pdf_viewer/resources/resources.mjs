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
  "css": [ "ccm.load",
    "./../pdf_viewer/resources/styles.css",
    "./../libs/bootstrap-5/css/bootstrap-icons.css",
    { "url": "./../libs/bootstrap-5/css/bootstrap-fonts.css", "context": "head" }
  ],
  "helper.1": "./../libs/ccm/helper.mjs",
  "html.1": "./../pdf_viewer/resources/templates.mjs",
  "pdf": "./../pdf_viewer/resources/demo/en/slides.pdf",
  "pdfjs.lib.1": "./../libs/pdfjs/pdf.min.js",
  "pdfjs.worker": "./../libs/pdfjs/pdf.worker.min.js"
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "pdf": "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/demo/de/slides.pdf",
  "text": {
    "denied": "Zugriff verweigert",
    "download": "PDF herunterladen",
    "first": "Erste Seite",
    "jump": "Zu einer bestimmten Seite springen",
    "last": "Letzte Seite",
    "next": "Nächste Seite",
    "prev": "Vorherige Seite",
    "protected": "Dieses Dokument ist passwortgeschützt. Geben Sie ein Passwort ein."
  }
};