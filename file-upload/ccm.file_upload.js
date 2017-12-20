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
          "class": "container",
          "inner": {
            "tag": "form",
            "class": "box",
            "onclick": "%trigger_dialog%",
            "inner": [
              {
                "class": "box-input",
                "inner":
                  {
                    "tag" : "span",
                    "inner": [
                      {
                        "tag": "span",
                        "class": "glyphicon glyphicon-cloud-upload"
                      },
                      {
                        "tag": "strong",
                        "inner": "Choose a file",
                      },
                      {
                        "tag": "span",
                        "class":"box-dragndrop",
                        "inner": " or drag it here."
                      },
                    ]
                  }
              },
              { "id": "space" },
              {
                "id": "button",
                "inner": {
                  "tag": "button",
                  "class": "btn btn-info btn-lg box-button",
                  "type": "submit",
                  "inner": "Upload"
                }
              }
            ]
          }
        },

        "preview": {
          "class": "preview",
          "inner": [
            {
              "class": "box-image"
            },
            {
              "class": "box-details",
              "inner":
                {
                  "class": "box-filename",
                  "inner": {
                    "tag": "span",
                    "class": "name"
                  }
                }
            },
            {
              "class": "box-progress"
            }
          ]
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
      let self = this;

      this.ready = callback => {
        $ = this.ccm.helper;
        callback();
      };


      this.start = callback  => {
        let input = createInputField();

        $.setContent( this.element, $.html( this.templates.file_upload , {
          trigger_dialog: function () {
            input.click();
          }
        } ) );

        draggableForm();


        function draggableForm() {
          let form = self.element.querySelector( '.box' );

          [ 'drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop' ].forEach( function( event ) {
            form.addEventListener( event, function( e ) {
              // preventing the unwanted behaviours
              e.preventDefault();
            });
          });

          [ 'dragover', 'dragenter' ].forEach( function( event ) {
            form.addEventListener( event, function() {
              form.classList.add( 'is-dragover' );
            });
          });

          [ 'dragleave', 'dragend', 'drop' ].forEach( function( event ) {
            form.addEventListener( event, function()
            {
              form.classList.remove( 'is-dragover' );
            });
          });

          form.addEventListener( 'drop', function( e ) {
            previewFiles( e.dataTransfer.files );
          });


        }

        function previewFiles( inputFiles ) {

          [].forEach.call( inputFiles ? inputFiles : input.files, readAndPreview );

          function readAndPreview( file ) {
            let preview_template = $.html( self.templates.preview );

            // Make sure `file.name` matches extensions criteria
            if ( /\.(jpe?g|png|gif)$/i.test( file.name ) ) {
              let reader = new FileReader();

              reader.addEventListener( 'load', function () {
                let image = new Image();
                image.title = file.name;
                image.src = this.result;
                image.height = 120;
                preview_template.querySelector( '.box-image' ).appendChild( image );
                preview_template.querySelector( '.name' ).innerHTML = file.name;
                self.element.querySelector( '#space' ).parentNode.insertBefore( preview_template, self.element.querySelector( '#space' )  );
                self.element.querySelector( '.box-input' ).style.display = 'none';
              }, false );
              reader.readAsDataURL( file );
            }

          }

        }

        function createInputField() {
          let input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('multiple', 'true');
          input.id = this.index;
          input.style.visibility = 'hidden';
          document.body.appendChild( input );
          input.addEventListener( 'change', function () { previewFiles(); } );
          return input;
        }

        if ( callback ) callback;
      };
    }
  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );