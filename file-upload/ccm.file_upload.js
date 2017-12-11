/**
 * @overview ccm component for saving given files as data in ccm datasore
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 */

( function () {

  var component = {

    name: 'file_upload',

    ccm: 'https://akless.github.io/ccm/ccm.js',

    config: {
      templates: {
        "file_upload": {
          "inner": {
            "class": "js",
            "inner": {
              "tag": "form",
              "class": "box has-advanced-upload",
              "inner": [
                {
                  "class": "box-input",
                  "inner": [
                    {
                      "tag": "input",
                      "id": "file",
                      "class": "box-file",
                      "name": "files[]",
                      "data-multiple-caption": "{count} files selected",
                      "multiple": true
                    },
                    {
                      "tag": "label",
                      "for": "file",
                      "inner":[
                        {
                          "tag": "strong",
                          "inner": "Choose a file",
                        },
                        {
                          "tag": "span",
                          "class":"box-dragndrop",
                          "inner": " or drag it here"
                        }
                      ]
                    },
                    {
                      "tag": "button",
                      "class": "box-button",
                      "type": "submit",
                      "inner": "Upload"
                    }
                  ]
                },
                {
                  "class": "box-uploading",
                  "inner": "Uploading&hellip;"
                },
                {
                  "class": "box-success",
                  "inner": "Done!"
                },
                {
                  "class": "box-error",
                  "inner": "Upload Failed!"
                }
              ]
            }
          }
        }

      },
      data: { store: [ 'ccm.store' ], key: 'demo' },
      libs: [ 'ccm.load',
        { context: 'head', url: '../../ccm-components/lib/bootstrap/css/font-face.css' },
        '../../ccm-components/lib/bootstrap/css/bootstrap.css',
        '../file-upload/resources/default.css'
      ]
    },

    Instance: function () {

      this.ready = callback => {
        $ = this.ccm.helper;
        callback();
      };


      this.start = callback  => {
        $.setContent( this.element, $.html( this.templates.file_upload ) );

        if ( callback ) callback;
      };
    }
  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );