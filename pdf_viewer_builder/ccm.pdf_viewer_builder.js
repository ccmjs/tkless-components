/**
 * @overview ccm component for building a slidecast component
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 * TODO: prevent line breack by clicking on info-icon
 */

{
  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'pdf_viewer_builder',

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://akless.github.io/ccm/ccm.js',

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
            "tag": "legend",
            "class": "text-primary",
            "inner": "Build your Slide-Viewer"
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
                        "class": "active btn btn-basic btn-info info",
                        "onclick": "%basic%",
                        "inner": "Basic"
                      },
                      {
                        "tag": "a",
                        "typ": "button",
                        "class": "btn btn-adv btn-warning info",
                        "onclick": "%advanced%",
                        "inner": "Advanced"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "basic",
                "class": "show",
                "inner": [
                  {
                    "class": "drop form-group",
                    "inner": [
                      {
                        "tag": "label",
                        "for": "drop",
                        "class": "control-label",
                        "inner": [
                          "Upload slides ",
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
                                "inner": "Drop or choose files to upload."
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
                "id": "advanced",
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
                            "value": "['ccm.load',['https://tkless.github.io/ccm-components/lib/bootstrap/css/bootstrap.css',{'context':'head','url':'https://tkless.github.io/ccm-components/lib/bootstrap/css/font-face.css'}]]"
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
                            "value": "['ccm.instance','https://akless.github.io/ccm-components/user/ccm.user.js',{'sign_on':'guest'}]"
                          },
                          {
                            "tag": "option",
                            "inner": "Demo Mode",
                            "value": "['ccm.instance','https://akless.github.io/ccm-components/user/versions/ccm.user-2.0.0.min.js',{'sign_on':'demo'}]"
                          },
                          {
                            "tag": "option",
                            "inner": "H-BRS FB02",
                            "value": "['ccm.instance','https://akless.github.io/ccm-components/user/versions/ccm.user-2.0.0.min.js',{'sign_on':'hbrsinfkaul'}]"
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
                "class": "submit submit-button form-group",
                "inner": [
                  {
                    "class": "col-md-12",
                    "inner": {
                      "tag": "input",
                      "type": "submit",
                      "id": "submit",
                      "class": "btn btn-primary pull-right"
                    }
                  }
                ]

              }
            ]
          }
        ]
      },
      "css": [ "ccm.load", "https://tkless.github.io/ccm-components/lib/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://tkless.github.io/ccm-components/lib/bootstrap/css/font-face.css" },
        "../pdf_viewer_builder/resources/default.css"
      ],
      "target": [ "ccm.component", "../pdf-viewer/ccm.pdf_viewer.js" ],
      "submit_button": true,
      "preview": true,
      "file_upload": [ "ccm.component", "../file_upload/ccm.file_upload.js", {
        data: { store: [ 'ccm.store', { 'store': 'file_upload', 'url': 'http://localhost:8080', 'method': 'POST' } ] },
      } ],

      "start_values": {
        "pdf": [ "ccm.get", { url: "http://localhost:8080", store: "file_upload" }, "1518776028787X4201785986475841" ],
        "css": "['ccm.load','ccm-components/pdf-viewer/resources/default.css']",
        "user": "['ccm.instance','https://akless.github.io/ccm-components/user/versions/ccm.user-2.0.0.min.js',{'sign_on':'demo'}]"
      }

  //  onchange
  //  onfinish

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

      let upload;

      /**
       * is called once after the initialization and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.ready = callback => {
        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        // prepare start values for input elements
        prepareStartValues();

        // is ready => perform callback
        callback();

        /** prepares the start values for the input elements  */
        function prepareStartValues() {

          // consideration of the default configuration of the target component for start values
          let config = $.clone( my.target.config );
          delete config.ccm; delete config.html; delete config.parent;
          config.css = $.encode( config.css );

          for ( const key in config )
            if ( my.start_values[ key ] === undefined )
              my.start_values[ key ] = config[ key ];

          // security check for start values
          my.start_values = $.protect( my.start_values );

        }

      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {

        // render input elements
        $.setContent( self.element, $.html( my.html, {
          change: function () { onChange(); console.log("!!!!"); },

          basic: function () {
            // set active button
            self.element.querySelector( '.btn-adv' ).classList.remove( 'active' );
            self.element.querySelector( '.btn-basic' ).classList.add( 'active' );

            self.element.querySelector( '#advanced' ).classList.remove( 'show' );
            self.element.querySelector( '#basic' ).classList.remove( 'hide' );
            self.element.querySelector( '#advanced' ).classList.add( 'hide' );
            self.element.querySelector( '#basic' ).classList.add( 'show' );
          },
          advanced: function () {
            self.element.querySelector( '.btn-basic' ).classList.remove( 'active' );
            self.element.querySelector( '.btn-adv' ).classList.add( 'active' );

            self.element.querySelector( '#advanced' ).classList.remove( 'hide' );
            self.element.querySelector( '#basic' ).classList.remove( 'show' );
            self.element.querySelector( '#advanced' ).classList.add( 'show' );
            self.element.querySelector( '#basic' ).classList.add( 'hide' );
          },
          help: function () {
            // hide and show help texts
            const this_a = this;
            $.makeIterable( self.element.querySelectorAll( 'a' ) ).map( other_a => other_a !== this_a && other_a.classList.remove( 'active' ) );
            this.classList.toggle( 'active' );

          }
        } ) );

        // fill input elements with start values
        for ( const key in my.start_values ) {
          let element = self.element.querySelector( '[name="' + key + '"]' );
          switch ( key ) {
            // select
            case 'css':
            case 'user':
              element = self.element.querySelector( 'select[name="' + key + '"] option[value="' + my.start_values[ key ] + '"]' );
              if ( element ) element.selected = true;
              break;
          }
        }

        // render file upload
        my.file_upload.start( { onfinish: () => updatePreview() }, instance => {
          upload = instance;
          self.element.querySelector( '#upload' ).appendChild( instance.root );

          // render preview
          if ( my.preview ) updatePreview( my.start_values && my.start_values.pdf );

          // no preview desired? => remove preview section
          else $.removeElement( self.element.querySelector( '.preview' ) );

          // no submit button wanted? => remove submit button
          if ( !my.submit_button ) $.removeElement( self.element.querySelector( '.submit' ) );

          if ( callback ) callback();

        } );

        /** callback if an input value has changed */
        function onChange() {

          // update preview considering the changed input value
          updatePreview();

          // perform change actions
          self.onchange && self.onchange( self );

        }

        /** (re)renders the preview based on the entered values */
        function updatePreview( pdf ) {

          // no preview desired? => abort
          if ( !my.preview ) return;

          const config = self.getValue();

          // render pdf from start_values
          if ( pdf ) config.pdf = pdf;

          // (re)render preview
          my.target.start( config, instance => $.setContent( self.element.querySelector( '#preview' ), instance.root ) );

        }

      };

      /** triggers the submit of the entered data */
      this.submit = event => {

        // prevent page reload
        if ( event ) event.preventDefault();

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
        const config =  $.formData( self.element.querySelector( 'form' ) );

        config.pdf = upload.getValue();

        // now values of input elements are transformed to resulting instance configuration
        return config;

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}