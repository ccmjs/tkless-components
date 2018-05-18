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
    "data": {
      "store": [ "ccm.store", { "store": "cloze", "url": "https://ccm-data.bib.h-brs.de" } ],
      "key": "test"
    },
    "onfinish": {
      "log": true,
      "alert": "Saved!"
    }
  }
};