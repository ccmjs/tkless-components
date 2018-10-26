ccm.files[ "configs.js" ] = {
  "local": {
    "submit_button": "Submit",
    "preview": true,
    "defaults": {"data.store": "[ 'ccm.store',{ 'name':'pdf-viewer' ]", },
    "onfinish": { "log": true }
  },

  "localhost": {
    "submit_button": "Submit",
    "preview": true,
    "defaults": {
      "data.store": "[ 'ccm.store',{ 'name':'pdf-viewer','url':'http://localhost:8080' } ]",
    },
    "onfinish": {
      "log": true,
      "store": {
        "settings": { "store": "pdf_viewer", "url": "http://localhost:8080" }
      },
    }
  },

  "lea": {
    "submit_button": "Submit",
    "preview": true,
    "data": {
      "store": [ "ccm.store", { "name": "pdf_viewer", "url": "https://ccm-data.bib.h-brs.de" } ],
      "key": "test"
    },
    "onfinish": {
      "log": true,
      "alert": "Saved!"
    }
  },

  "crud_app": {
    "builder": [ "ccm.component", "https://ccmjs.github.io/tkless-components/pdf_viewer_builder/versions/ccm.pdf_viewer_builder-2.2.0.js",
      {
        "preview": true,
        "defaults": {
          "data.store": "[ 'ccm.store',{ 'store':'pdf-viewer','url':'http://localhost:8080' } ]",
        }
      }
    ],
    "store": [ "ccm.store", { "name": "pdf_viewer", "url": "http://localhost:8080", "method": "POST" } ],
    "url": "https://ccmjs.github.io/tkless-components/pdf_viewer/versions/ccm.pdf_viewer-3.0.0.js"
  }
};