ccm.files[ "configs.js" ] = {
  "local": {
    "submit_button": "Submit",
    "preview": true,
    "data": {
      "store": [ "ccm.store", { "store": "file_upload" } ],
      "key": "local"
    },
    "file_upload": [ "ccm.component", "../file_upload/ccm.file_upload.js", {
      "data_type": "pdf",
      "data": { "store": [ "ccm.store", { "store": "file_upload" } ] },
    } ],
    "onfinish": { "log": true }
  },

  "localhost": {
    "submit_button": "Submit",
    "preview": true,
    "data": {
      "store": [ "ccm.store", "resources/datasets.js" ],
      "key": "test"
    },
    "onfinish": { "log": true }
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
    "builder": [ "ccm.component", "https://ccmjs.github.io/tkless-components/pdf_viewer_builder/ccm.pdf_viewer_builder.js",
      {
        "preview": true,
        "file_upload": [ "ccm.component", "https://ccmjs.github.io/tkless-components/file_upload/versions/ccm.file_upload-2.0.0.js", {
          "data_type": "pdf",
          "data": { "store": [ "ccm.store", { "store": "file_upload", "url": "https://ccm2.inf.h-brs.de", "method": "POST" } ] },
        } ]
      }
    ],
    "store": [ "ccm.store", { "store": "pdf_viewer", "url": "https://ccm2.inf.h-brs.de", "method": "POST" } ],
    "url": "https://ccmjs.github.io/tkless-components/pdf_viewer/versions/ccm.pdf_viewer-3.0.0.js"
  }
};