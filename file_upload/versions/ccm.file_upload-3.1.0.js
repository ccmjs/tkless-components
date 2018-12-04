/**
 * @overview ccm component for saving given files as data in ccm datasore
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 * @version 2.0.0
 * - switch to ccm cloud v2
 * @version 3.0.0
 * - react to changes in drop field via onchange.
 * - optional update, clear-button.
 *  @version 3.1.0
 * - trigger onchange after clear event was fired
 */

{
  var component = {

    name: 'file_upload',
    version:[ 3,1,0 ],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: {
      url: 'https://ccmjs.github.io/ccm/versions/ccm-16.6.0.js',
      integrity: 'sha256-9U5Q2yiY5v1Tqp8ZJjCRnZrG8T1B14LdVf/PWOOUycE= sha384-LcGBJPmX/Aq5Jkre3q9yE+UCsd7vPWIgeBb9ayc4TIAl5H1nJpewlkKCDK8eCc7s sha512-YANGRGQdJYghxk/7O2bIMsT+XOJ1fzE6Lc6zGJxG+GsdMKznGTdZ8z3d+fnrvqOeEl6qmqxkIP6DueDq2dG0rw==',
      crossorigin: 'anonymous'
    },

    config: {
      "html": {
        "file_upload": {
          "class": "container-fluid",
          "inner": {
            "tag": "form",
            "id": "box",
            "onchange": "%onchange%",
            "onclick": "%trigger_dialog%",
            "inner": [
              {
                "id": "box-input",
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
              {
                "id": "box-preview"
              },
              {
                "id": "box-buttons",
                "class": "col-md-12",
                "inner": [
                  {
                    "id": "upload",
                    "tag": "button",
                    "class": "btn btn-info",
                    "onclick": "%upload%",
                    "inner": "Upload"
                  },
                  {
                    "id": "clear",
                    "tag": "button",
                    "class": "btn btn-primary",
                    "onclick": "%restart%",
                    "inner": "Clear"
                  }
                ]
              }
            ]
          }
        },

        "preview": {
          "class": "preview",
          "inner": [
            {
              "class": "box-image",
              "inner": {
                "tag": "canvas"
              }
            },
            {
              "class": "box-progress"
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
              "class": "box-success-mark",
              "inner": "<svg width='54px' height='54px' viewBox='0 0 54 54' version='1.1' xmlns='http://www.w3.org/2000/svg\' xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'>\n" +
              "<title>Check</title>\n<defs></defs>\n<g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n" +
              "<path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n </g>\n</svg>\n"
            }
          ]
        }

      },
      "pdfJS": [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/pdfjs/pdf.js" ],
      "pdfJS_workerSrc": [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/pdfjs/pdf.worker.js" ],
      "css": [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
        "https://ccmjs.github.io/tkless-components/file_upload/resources/default.css"
      ],
      // "data_type": "pdf", // or image
      // "mulitple": true, //only set if multiple upload is desired
      // "data": { store: [ "ccm.store'" ], key: "demo" },
      // "upload_button": true
      // "clear_button": true,
      // onfinisch: function( results ){ console.log( results ) },
      // onchange: function( results ){ console.log( results ) }
    },

    Instance: function () {
      const self = this;
      let $;
      let my;
      let files_data;

      this.ready = callback => {
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        callback();
      };

      this.start = callback  => {

        $.setContent( self.element, $.html( my.html.file_upload , {
          trigger_dialog: () => input.click(),
          upload: event => {
            event.preventDefault();
            event.stopPropagation();

            if ( self.user ) self.user.login( proceed ); else proceed();

            function proceed() {

              // update dataset
              my.data.store.set( files_data, () => {
                if ( self.logger ) {
                  files_data = $.clone( files_data );
                  self.logger.log( 'create', files_data );
                }

                // upload successfull
                input.setAttribute( 'disabled', true );
                self.element.querySelector( 'form' ).style.cursor = 'default';
                self.element.querySelector( '#upload' ).classList.add( 'disabled' );
                [... self.element.querySelectorAll( '.box-success-mark' )].map( item => item.classList.add( 'visible' ));
                [... self.element.querySelectorAll( '.box-progress' )].map( item => item.classList.add( 'visible' ));

                if ( self.onfinish ) $.onFinish( self, files_data );

              } );
            }
          },
          restart: () => {
            self.start( () => {
              files_data = null;
              onChange();
            });
          },
          onchange: onChange
        } ) );

        if ( !my.upload_button ) self.element.querySelector( '#upload' ).remove();
        if ( !my.clear_button ) self.element.querySelector( '#clear' ).remove();

        let input = createInputField();
        draggableForm();

        if ( callback ) callback();

        function draggableForm() {
          let form = self.element.querySelector( '#box' );

          [ 'drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop' ].forEach( ( event ) => {
            form.addEventListener( event, ( event ) => {
              event.preventDefault();
            });
          });

          [ 'dragover', 'dragenter' ].forEach( ( event ) => {
            form.addEventListener( event, function() {
              form.classList.add( 'is-dragover' );
            });
          });

          [ 'dragleave', 'dragend', 'drop' ].forEach( ( event ) => {
            form.addEventListener( event, function() {
              form.classList.remove( 'is-dragover' );
            });
          });

          form.addEventListener( 'drop', ( event ) => {
            previewFiles( event.dataTransfer.files );
            console.log(event.dataTransfer.files);
          });

        }

        function previewFiles( inputFiles ) {

          my.multiple ? [].forEach.call( inputFiles ? inputFiles : input.files, readAndPreview ): readAndPreview( inputFiles ? inputFiles[0]:self.element.querySelector('input[type=file]').files[0]);

          if ( !my.multiple ) {
            self.element.querySelector( 'form' ).style.cursor = 'default';
            input.setAttribute( 'disabled', true );
          }

          function readAndPreview( file ) {
            files_data = {
              slides: []
            };


            self.element.querySelector( '#box-buttons' ).classList.add( 'visible' );
            let preview_template = $.html( my.html.preview );

            // Make sure filename matches extensions criteria
            if ( my.data_type === "image " && /\.(jpe?g|png|gif)$/i.test( file.name ) ) {
              let reader = new FileReader();

              reader.addEventListener( 'load', function() {
                let image = new Image();
                image.title = file.name;
                image.src = this.result;
                image.height = 120;
                preview_template.querySelector( '.box-image' ).appendChild( image );
                preview_template.querySelector( '.name' ).innerHTML = file.name;
                self.element.querySelector( '.box-buttons' ).parentNode.insertBefore( preview_template, self.element.querySelector( '.box-buttons' )  );
                self.element.querySelector( '.box-input' ).style.display = 'none';
                files_data.slides.push( { name: file.name, data: this.result, MIME: file.type  } );
                onChange();
              }, false );
              reader.readAsDataURL( file );
            }

            if ( my.data_type === "pdf" && /\.(pdf)$/i.test(file.name)) {

              let reader = new FileReader();

              reader.addEventListener( 'load', function() {
                // specify PDF.js workerSrc property
                PDFJS.workerSrc = my.pdfJS_workerSrc;
                PDFJS.getDocument(this.result).then( function (pdf) {
                  files_data.slides.push( { name: file.name, data: reader.result, MIME: file.type  } );

                  // preview of the first page
                  pdf.getPage(1).then(function (page) {
                    let scale = 0.2;
                    let viewport = page.getViewport(scale);

                    // Prepare canvas using PDF page dimensions
                    let canvas = preview_template.querySelector('canvas');
                    let context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    // Render PDF page into canvas context
                    let task = page.render({
                      canvasContext: context,
                      viewport: viewport
                    });
                    task.promise.then( function() {
                      preview_template.querySelector( '.box-image' ).replaceChild(  preview_template.querySelector('canvas'), canvas );
                      preview_template.querySelector( '.name' ).innerHTML = file.name;
                      self.element.querySelector( '#box-preview' ).appendChild( preview_template );
                      self.element.querySelector( '#box-input' ).style.display = 'none';
                      onChange();
                    });
                  });
                });

              }, false );
              reader.readAsDataURL(file);

            }
          }
        }

        function createInputField() {
          let input = document.createElement( 'input' );
          input.setAttribute( 'type', 'file' );
          if ( my.multiple )
            input.setAttribute( 'multiple', 'true' );
          input.style.visibility = 'hidden';
          // set accepted file-type
          if ( my.data_type  === 'pdf' ) input.setAttribute( 'accept', 'application/pdf' );
          if ( my.data_type  === 'image' ) input.setAttribute( 'accept', 'image/*' );
          self.element.appendChild( input );
          input.addEventListener( 'change', () => { previewFiles(); } );
          return input;
        }

        function onChange() {
          self.onchange && self.onchange( self );
        }

      };

      this.getValue  = () => files_data;
    }
  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}