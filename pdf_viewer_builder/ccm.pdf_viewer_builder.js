/**
 * @overview ccm component for building a pdf-viewer component
 * @author Tea Kless <tea.kless@web.de>, 2019
 * @license The MIT License (MIT)
 * @version 3.0.0
 * @changes
 * version 3.0.0 (07.01.2019)
 * - uses ccm v18.1.0
 *  version 3.0.0 (31.10.2018)
 * - uses ccm v18.3.0
 * - uses ccm.file-upload.js v4.1.0
 */

( function () {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'pdf_viewer_builder',

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      "html": {
        "id": "main",
        "class": "container-fluid",
        "inner": [
          {
            "class": "page-header",
            "inner": {
              "tag": "h2",
              "inner": [
                "Settings ",
                {
                  "tag": "small",
                  "class": "text-primary",
                  "inner": "PDF Viewer"
                }
              ]
            }
          },
          {
            "tag": "form",
            "class": "form",
            "onsubmit": "%submit%",
            "inner": [
              {
                "class": "navigation text-center",
                "inner": [
                  {
                    "class": "btn-group",
                    "inner":[
                      {
                        "tag": "a",
                        "typ": "button",
                        "id": "button-basic",
                        "class": "active btn btn-info",
                        "onclick": "%basic%",
                        "inner": "Basic"
                      },
                      {
                        "tag": "a",
                        "typ": "button",
                        "id": "button-advanced",
                        "class": "btn btn-warning",
                        "onclick": "%advanced%",
                        "inner": "Advanced"
                      }
                    ]
                  }
                ]
              },
              {
                "tag": "input",
                "type": "hidden",
                "name": "data.store"
              },
              {
                "tag": "input",
                "type": "hidden",
                "name": "data.key"
              },
              {
                "id": "section-basic",
                "inner": [
                  {
                    "class": "drop form-group",
                    "inner": [
                      {
                        "tag": "label",
                        "for": "drop",
                        "class": "control-label",
                        "inner": [
                          "Upload File ",
                          {
                            "tag": "a",
                            "onclick": "%help%",
                            "inner": {
                              "class": "glyphicon glyphicon-info-sign"
                            }
                          },
                          {
                            "class": "alert alert-info",
                            "inner":
                              {
                                "tag": "p",
                                "inner": "Drop or choose a file to upload. <code>10 MB is the maximum file size you can upload.</code>"
                              }
                          }
                        ]
                      },
                      {
                        "id": "upload"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "section-advanced",
                "class": "hide",
                "inner": [
                  {
                    "class": "css form-group",
                    "inner": [
                      {
                        "tag": "label",
                        "for": "css",
                        "class": "control-label",
                        "inner": [
                          "Layout ",
                          {
                            "tag": "a",
                            "onclick": "%help%",
                            "inner": {
                              "class": "glyphicon glyphicon-info-sign"
                            }
                          },
                          {
                            "class": "alert alert-info",
                            "inner": "Choose between different layouts, in which the slidecast text is displayed."
                          }
                        ]
                      },
                      {
                        "tag": "select",
                        "onchange": "%change%",
                        "class": "form-control",
                        "id": "css",
                        "name": "css",
                        "inner": [
                          {
                            "tag": "option",
                            "inner": "Default",
                            "value": "['ccm.load','https://ccmjs.github.io/tkless-components/pdf_viewer/resources/default.css',['https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css',{'context':'head','url':'https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css'}]]"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "class": "user form-group",
                    "inner": [
                      {
                        "tag": "label",
                        "for": "user",
                        "class": "control-label",
                        "inner": [
                          "Sign-on ",
                          {
                            "tag": "a",
                            "onclick": "%help%",
                            "inner": {
                              "class": "glyphicon glyphicon-info-sign warning"
                            }
                          },
                          {
                            "class": "alert alert-info",
                            "inner": [
                              "If you select a sign-on mode here, authentication will be requested after the completion of the fill-in-the-blank text and the results will only be submitted if the authentication was successful. The various sign-on modes are described below.",
                              {
                                "tag": "h5",
                                "inner": "Guest Mode"
                              },
                              {
                                "tag": "p",
                                "inner": "Every user will automatically logged in as the user \"guest\". This mode is mostly used for test scenarios."
                              },
                              {
                                "tag": "h5",
                                "inner": "Demo Mode"
                              },
                              {
                                "tag": "p",
                                "inner": "The user can authenticate with any username and without password. This mode is mostly used for demo scenarios."
                              },
                              {
                                "tag": "h5",
                                "inner": "H-BRS FB02"
                              },
                              {
                                "tag": "p",
                                "inner": "In this mode the user has to authenticate access with a valid account from the Department of Computer Sciences at Hochschule Bonn-Rhein-Sieg University of Applied Sciences."
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "tag": "select",
                        "onchange": "%change%",
                        "class": "form-control",
                        "id": "user",
                        "name": "user",
                        "inner": [
                          {
                            "tag": "option",
                            "inner": "None",
                            "value": ""
                          },
                          {
                            "tag": "option",
                            "inner": "Guest Mode",
                            "value": "['ccm.instance','https://ccmjs.github.io/akless-components/user/ccm.user.js',{'sign_on':'guest'}]"
                          },
                          {
                            "tag": "option",
                            "inner": "Demo Mode",
                            "value": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-2.0.0.min.js',{'sign_on':'demo'}]"
                          },
                          {
                            "tag": "option",
                            "inner": "H-BRS FB02",
                            "value": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-2.0.0.min.js',{'sign_on':'hbrsinfkaul'}]"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "class": "preview",
                "inner": [
                  {
                    "tag": "legend",
                    "class": "legend text-primary",
                    "inner": "Here's a Preview of what you've Build"
                  },
                  {
                    "id": "preview"
                  }
                ]
              },
              {
                "class": "form-group",
                "inner": [
                  {
                    "id": "section-submit",
                    "class": "col-md-12",
                    "inner": {
                      "tag": "input",
                      "type": "submit",
                      "id": "btn-submit",
                      "class": "btn btn-primary pull-right"
                    }
                  }
                ]

              }
            ]
          }
        ]
      },
      "css": [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
        "resources/default.css"
      ],
      "target": [ "ccm.component", "../pdf_viewer/ccm.pdf_viewer.js" ],
      "file_upload": [ "ccm.component", "../file_upload/ccm.file_upload.js", {
        "data_type": "pdf", "clear_button": true
      } ],
      // "defaults": {
      //   "data.store": "['ccm.store',{'store':'pdf-viewer','url':'http://localhost:8080'}]",
      // }
      // "data": { "store": [ "ccm.store", "test": { ... } ], "key": "test" },
      // "submit_button": true,
      // "preview": true,
      // "onchange": instance => console.log( instance.getValue() ),
      // "onfinish": { "log": true }

    },

    Instance: function () {
      /**
       * own reference for inner functions
       * @type {Instance}
       */
      const self = this;

      /**
       * privatized instance members
       * @type {object}
       */
      let my;

      /**
       * shortcut to help functions
       * @type {Object.<string,function>}
       */
      let $;

      let upload, data;

      /**
       * is called once after the initialization and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.ready = async () => {
        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = async () => {

        // get initial form values
        let dataset = await $.dataset( my.data );
        data = dataset;

        // prepare initial form values
        prepareValues();

        // render input elements
        $.setContent( self.element, $.html( my.html, {
          submit: self.submit,
          change: onChange,
          basic:    () => switchSection( '#button-basic', '#button-advanced', '#section-basic', '#section-advanced' ),
          advanced: () => switchSection( '#button-advanced', '#button-basic', '#section-advanced', '#section-basic' ),
          help: function () {
            // hide and show help texts
            const this_a = this;
            $.makeIterable(self.element.querySelectorAll('a')).map(other_a => other_a !== this_a && other_a.classList.remove('active'));
            this.classList.toggle('active');

          }
        } ) );

        await prepareFileUpload();

        // fill form with initial values
        $.fillForm( self.element, dataset );

        // render preview
        if ( my.preview ) updatePreview( dataset.pdf );

        // no preview desired? => remove preview section
        else $.removeElement( self.element.querySelector( '.preview' ) );

        // no submit button wanted? => remove submit button
        !my.submit_button && $.removeElement( self.element.querySelector( '#btn-submit' ) );

        // individual caption for submit button? => set caption of submit button
        if ( typeof my.submit_button === 'string' ) self.element.querySelector( '#btn-submit' ).value = my.submit_button;

        /** prepares the start values for the input elements  */
        function prepareValues() {

          // set default value for dataset key
          if ( !my.defaults[ 'data.key' ] ) my.defaults[ 'data.key' ] = $.generateKey();

          // given default values? => integrate them as defaults into initial values
          dataset = $.integrate( my.defaults, dataset, true );

          // encode dependencies
          $.encodeDependencies( dataset );

          // convert initial values to dot notation
          dataset = $.toDotNotation( dataset );

        }

        /**
         * switches to basic or advanced section
         * @param {string} active - selector for active section button
         * @param {string} inactive - selector for inactive section button
         * @param {string} showed - selector for showed section element
         * @param {string} hidden - selector for hidden section element
         */
        function switchSection( active, inactive, showed, hidden ) {

          // activate section button
          self.element.querySelector( active   ).classList.add   ( 'active' );
          self.element.querySelector( inactive ).classList.remove( 'active' );

          // show section element
          self.element.querySelector( showed ).classList.remove( 'hide' );
          self.element.querySelector( hidden ).classList.add( 'hide' );

          // log 'section' event
          self.logger && self.logger.log( 'section', showed.substr( 1 ).split( '-' )[ 1 ] );

        }

        /** (re)renders the preview based on the entered values */
        async function updatePreview( pdf ) {

          // no preview desired? => abort
          if (!my.preview) return;

          const config = self.getValue();

          // render pdf from start_values
          if ( pdf ) config.pdf = pdf;

            // (re)render preview
          const instance =  await my.target.start( config );
          $.setContent( self.element.querySelector( '#preview' ), instance.root );

        }

        async function prepareFileUpload( ) {
          // render file upload
          upload = await my.file_upload.start( { onchange: data => onChange( data ) } );
          self.element.querySelector( '#upload' ).appendChild( upload.root );

          // render preview
          if ( dataset.pdf ) await updatePreview( dataset.pdf );
        }

        /** callback if an input value has changed */
        async function onChange() {

          // update preview considering the changed input value
          await updatePreview();

          // perform change actions
          self.onchange && self.onchange( self );

        }

      };

      /** triggers the submit of the entered data */
      this.submit = event => {

        // prevent page reload
        if ( event ) event.preventDefault();

        // log 'finish' event
        self.logger && self.logger.log( 'finish', self.getValue() );

        // perform finish actions
        $.onFinish( self );

      };

      /**
       * returns the resulting instance configuration for the target component
       * @returns {object} instance configuration for target component
       */
      this.getValue = () => {

        /**
         * values of the input elements
         * @type {object}
         */
        let result =  $.formData( self.element.querySelector( 'form' ) );

        result.pdf = upload.getValue() || ( data && data.pdf );

        if ( !upload.getValue() && ! ( data && data.pdf ) )
          delete result.pdf;

        // convert dot notation properties to deeper objects
        result = $.solveDotNotation( result );

        // use empty string if no value was specified
        if ( !result.user ) result.user = '';

        // now values of input elements are transformed to resulting instance configuration
        return $.clone( result );

      };
    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();