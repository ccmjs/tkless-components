ccm.files[ "configs.js" ] = {
  "local": {
    "submit_button": "Submit",
    "preview": true,
    "data": {
      "store": [ "ccm.store", { "store": "file_upload" } ],
      "key": "local"
    },
    "onfinish": { "log": true }
  },

  "localhost": {
    "submit_button": "Submit",
    "preview": true,
    "onfinish": {
      "log": true,
      "store": {
        "settings": { "store": "pdf_viewer", "url": "http://localhost:8080" },
        "key": "demo"
      },
    }
  },

  "lea": {
    "submit_button": "Submit",
    "preview": true,
    "file_upload": [ "ccm.component", "https://ccmjs.github.io/tkless-components/file_upload/versions/ccm.file_upload-2.0.0.js", {
      "data_type": "pdf",
      "data": { "store": [ "ccm.store", { "store": "file_upload", "url": "https://ccm-data.bib.h-brs.de", "method": "POST" } ] },
    } ],
    "data": {
      "store": [ "ccm.store", { "store": "pdf_viewer", "url": "https://ccm-data.bib.h-brs.de" } ],
      "key": "test"
    },
    "onfinish": {
      "log": true,
      "alert": "Saved!"
    }
  },

  "crud_app": {
    "builder": [ "ccm.component", "https://ccmjs.github.io/tkless-components/pdf_viewer_builder/versions/ccm.pdf_viewer_builder-2.1.0.js",
      {
        "preview": true,
        "file_upload": [ "ccm.component", "https://ccmjs.github.io/tkless-components/file_upload/versions/ccm.file_upload-3.0.0.js", {
          "data_type": "pdf", "clear_button": true
        } ]
      }
    ],
    "store": [ "ccm.store", { "store": "pdf_viewer", "url": "http://localhost:8080", "method": "POST" } ],
    "url": "https://ccmjs.github.io/tkless-components/pdf_viewer/versions/ccm.pdf_viewer-3.0.0.js"
  }
};