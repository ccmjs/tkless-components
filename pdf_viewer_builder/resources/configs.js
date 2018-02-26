ccm.files[ "configs.js" ] = {
  "lea": {
    "target": [ "ccm.component", "https://194.95.67.24/ccm-components/pdf-viewer/ccm.pdf_viewer.js", {  "pdf": null  }],
    "file_upload": [ "ccm.component", "https://194.95.67.24/ccm-components/file_upload/ccm.file_upload.js", {
      data: { store: [ 'ccm.store', { 'store': 'file_upload', 'url': 'https://10.100.2.108', 'method': 'POST' } ] },
    } ],

    /*
    "start_values": {
      "pdf": [ "ccm.get", { url: "http://localhost:8080", store: "file_upload" }, "1518776028787X4201785986475841" ],
      "css": "['ccm.load','ccm-components/pdf-viewer/resources/default.css']",
      "user": "['ccm.instance','https://akless.github.io/ccm-components/user/versions/ccm.user-2.0.0.min.js',{'sign_on':'demo'}]"
    }*/
  }
};