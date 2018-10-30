/**
 * @overview ccm component for building a exercise component
 * @author Tea Kless <tea.kless@web.de>, 2018
 * @license The MIT License (MIT)
 * @version 3.0.0
 * @changes
 * version 3.0.0 (26.09.2018)
 * - uses ccm v18.0.0
 */

( function () {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'exercise_builder',
    version: [ 3,0,0 ],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.1.0.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      html: {
        "id": "main",
        "class": "container-fluid",
        "inner": [
          {
            "tag": "legend",
            "class": "text-primary",
            "inner": "Build your Exercise"
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
                        "id": "button-basic",
                        "tag": "a",
                        "typ": "button",
                        "class": "active btn btn-info",
                        "onclick": "%basic%",
                        "inner": "Basic"
                      },
                      {
                        "id": "button-advanced",
                        "tag": "a",
                        "typ": "button",
                        "class": "btn btn-warning info",
                        "onclick": "%advanced%",
                        "inner": "Advanced"
                      }
                    ]
                  }
                ]
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
                          "Create Task ",
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
                                "inner": "Write / Create Task via Editor."
                              }
                          }
                        ]
                      },
                      {
                        "id": "editor"
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
                            "inner": "Choose between different layouts, in which the exercise is displayed."
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
                            "value": "['ccm.load',['https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css',{'context':'head','url':'https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css'}]]"
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
                            "value": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.0.js',['ccm.get','https://ccmjs.github.io/akless-components/user/resources/configs.js','guest']]"
                          },
                          {
                            "tag": "option",
                            "inner": "H-BRS FB02",
                            "value": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.0.js',['ccm.get','https://ccmjs.github.io/akless-components/user/resources/configs.js','hbrsinfkaul']]"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "id": "section-preview",
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
                    "style": "margin-top:10px",
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
      //data: { "store": [ "ccm.store", { "test": { ... } } ], "key": "test" },
      //onfinish
      //onchange
      target: [ "ccm.component", "https://ccmjs.github.io/tkless-components/exercise/versions/ccm.exercise-3.0.0.js", { "submit_button": "Save" } ],
      //submit_button: "Submit",
      //preview: true,
      editor: [ "ccm.component", "https://ccmjs.github.io/tkless-components/editor/versions/ccm.editor-3.0.0.js", {
        "settings.modules.toolbar": [
          [ { 'header': [ 1, 2, 3, 4, 5, 6, false ] } ],
          [ "bold", "italic", "underline" ],
          [ { "header": 1 }, { "header": 2 } ],
          [ { "script": "sub" }, { "script": "super" } ],
          [ { "color": [] }, { "background": [] } ],
          [ "image" ]
        ], "settings.placeholder": "Type here..."
      } ],
      css: [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
        "https://ccmjs.github.io/tkless-components/exercise_builder/resources/default.css"
      ]
    },

    /**
     * for creating instances out of this component
     * @constructor
     */
    Instance: function () {

      /**
       * own reference for inner functions
       * @type {Instance}
       */
      const self = this;

      /**
       * privatized instance members
       * @type {Object}
       */
      let my;

      /**
       * shortcut to help functions
       * @type {Object.<string,function>}
       */
      let $;

      /**
       * ccm instance of the text editor
       * @type {Object}
       */
      let editor;

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

        // given default values? => integrate them as defaults into initial values
        dataset = $.integrate( my.defaults, dataset, true );

        // render main HTML structure
        $.setContent( self.element, $.html( my.html, {
          basic:    () => switchSection( '#button-basic', '#button-advanced', '#section-basic', '#section-advanced' ),
          advanced: () => switchSection( '#button-advanced', '#button-basic', '#section-advanced', '#section-basic' ),
          submit: self.submit,
          change: onChange,
          help: function () {
            // hide and show help texts
            const this_a = this;
            [ ...self.element.querySelectorAll( 'a' ) ].map( other_a => other_a !== this_a && other_a.classList.remove( 'active' ) );
            this.classList.toggle( 'active' );

            // log 'help' event
            self.logger && self.logger.log( 'help', { name: this.id.split( '-' )[ 0 ], active: this.classList.contains( 'active' ) } );
          }
        } ) );

        // prepare text editor
        await prepareEditor();

        // fill form with initial values
        $.fillForm( self.element, dataset );

        // render preview
        if ( my.preview ) updatePreview();

        // no preview desired? => remove preview section
        else $.removeElement( self.element.querySelector( '#section-preview' ) );

        // no submit button wanted? => remove submit button
        !my.submit_button && $.removeElement( self.element.querySelector( '#btn-submit' ) );

        // individual caption for submit button? => set caption of submit button
        if ( typeof my.submit_button === 'string' ) self.element.querySelector( '#btn-submit' ).value = my.submit_button;

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

        /**
         * prepares text editor
         * @param {function} callback
         */
        async function prepareEditor() {

          /**
           * HTML element in which the text editor is rendered
           * @type {Element}
           */
          const text_elem = self.element.querySelector( '#editor' );

          // should not Quill be used as text editor? => abort (default is <textarea>)
          if ( !my.editor ) return;

          // render Quill
          editor = await my.editor.start( { root: text_elem } );

          // given initial text? => put it into Quill
          if ( dataset.task ) { $.setContent( editor.get().root, dataset.task ); delete dataset.task; }

          // set 'change' event
          $.wait( 0, () => editor.get().on( 'text-change', onChange ) );
        }

        /** callback if an input value has changed */
        async function onChange() {

          // update preview considering the changed input value
          await updatePreview();

          // perform change actions
          self.onchange && self.onchange.call( self );

          // log 'change' event
          self.logger && self.logger.log( 'change', { name: this.name || 'text', value: this.name ? ( this.type === 'checkbox' ? this.checked : this.value ) : editor.get().root.innerHTML } );

        }

        /** (re)renders the preview based on the entered values */
        async function updatePreview() {

          // no preview desired? => abort
          if ( !my.preview ) return;

          // (re)render preview
          const instance = await my.target.start( self.getValue() );
          $.setContent( self.element.querySelector( '#preview' ), instance.root );

        }

      };

      /** triggers submit for entered data */
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
       * @returns {Object} instance configuration for target component
       */
      this.getValue = () => {

        /**
         * values of the input elements
         * @type {Object}
         */
        let result = $.formData( self.element.querySelector( 'form' ) );

        // finalize 'text' property
        result.task = editor.get().root.innerHTML;

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