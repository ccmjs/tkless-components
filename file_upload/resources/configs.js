ccm.files[ "configs.js" ] = {
  "localhost": {
    "upload_button": true,
    "clear_button": true,
    "data_type": "pdf",
    "data": { "store": [ "ccm.store", { "store": "file_upload", "url": "http://localhost:8080", "method": "POST" } ] },
    "onfinish":  function( results ){ console.log(results) }
  },

  "local": {
    "upload_button": true,
    "clear_button": true,
    "data_type": "pdf",
    "data": { "store": [ "ccm.store", { "store": "file_upload" } ] },
    "onfinish":  function( results ){ console.log( results ) }
  },

  "lea": {
    "upload_button": true,
    "clear_button": true,
    "data_type": "pdf",
    "data": { "store": [ "ccm.store", { "store": "file_upload", "url": "https://ccm-data.bib.h-brs.de", "method": "POST" } ] },
    "user": [ "ccm.instance", "https://194.95.67.24/ccm-components/user/versions/beta/ccm.user-3.1.0.min.js", [ "ccm.get", "https://194.95.67.24/ccm-components/user/resources/configs.min.js", "lea" ] ],
    "onfinish":  function( results ){ console.log( results ) }
  }
};