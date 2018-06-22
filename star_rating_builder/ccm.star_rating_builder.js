/**
 * @overview ccm component for building a voting component
 * @author Tea Kless <tea.kless@web.de>, 2018
 * @license The MIT License (MIT)
 */

{
  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'star_rating_builder',

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
            "tag": "legend",
            "class": "text-primary",
            "inner": "Build your Star Rating Component"
          },
          {
            "tag": "form",
            "class": "form",
            "onsubmit": "%submit%",
            "inner": [
              {
                "id": "advanced",
                "inner": [
                  {
                    "class": "data-storage form-group",
                    "inner": [
                      {
                        "tag": "label",
                        "for": "user",
                        "class": "control-label",
                        "inner": [
                          "Data Storage ",
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
                              "Database URL"
                            ]
                          }
                        ]
                      },
                      {
                        "tag": "select",
                        "onchange": "%change%",
                        "class": "form-control",
                        "id": "data-storage",
                        "name": "data_storage",
                        "inner": [
                          {
                            "tag": "option",
                            "inner": "w2c",
                            "value": "{ 'store': [ 'ccm.store', { 'store': 'w2c_voting', 'url': 'https://ccm2.inf.h-brs.de' } ] }"
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
                  },
                  {
                    "class": "star-title form-group",
                    "inner": [
                      {
                        "tag": "label",
                        "for": "star_title",
                        "class": "control-label",
                        "inner": [
                          "Star Title ",
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
                              "Here you can specify the title of the star that will be displayed when you move the cursor over each start."
                            ]
                          }
                        ]
                      },
                      {
                        "tag": "select",
                        "multiple": true,
                        "onchange": "%change%",
                        "id": "star-title",
                        "name": "star_title"
                      }
                    ]
                  },
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
                "class": "form-group",
                "inner": [
                  {
                    "id": "section-submit",
                    "class": "col-md-12",
                    "inner": {
                      "tag": "input",
                      "type": "submit",
                      "id": "button-submit",
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
        "resources/default.css", "../libs/selectize/selectize.default.min.css"
      ],

      "js": [ "ccm.load", [ "../libs/jquery/jquery.min.js", "../libs/bootstrap/js/bootstrap.min.js", "../libs/selectize/selectize.min.js"] ],
      "target": [ "ccm.component", "../star_rating/ccm.star_rating.js" ]
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

      let data;
      /**
       * is called once after the initialization and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.ready = callback => {
        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        // is ready => perform callback
        callback();

      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {

        // get initial form values
        $.dataset( my.data, dataset => {
          data = dataset;

          // prepare initial form values
          prepareValues();

          // render input elements
          $.setContent(self.element, $.html(my.html, {
            submit: self.submit,
            help: function () {
              // hide and show help texts
              const this_a = this;
              $.makeIterable(self.element.querySelectorAll('a')).map(other_a => other_a !== this_a && other_a.classList.remove('active'));
              this.classList.toggle('active');

            },
            change: onChange
          }));

          prepare();

          callback && callback();

          function prepare() {

            // initialize selectize for star range titles
            jQuery( self.element.querySelector('#star-title') ).selectize( {
              delimiter: ',',
              persist: true,
              create: true,
              plugins: ['remove_button'],
              maxItems: 5,
              placeholder: 'Type Title Here...',
              valueField: 'value',
              labelField: 'value',
              searchField: 'value',
              options: [
                { value: "Gefällt mir gar nicht" }, { value: "Gefällt mir nicht" },
                { value: "Ist Ok" }, { value: "Gefällt mir" }, { value: "Gefällt mir sehr" }
              ]
            } ).on( 'change' , () =>  onChange() );

            // fill form with initial values
            $.fillForm( self.element, dataset );

            // render preview
            if ( my.preview ) updatePreview();

            // no preview desired? => remove preview section
            else $.removeElement( self.element.querySelector( '#section-preview' ) );

            // no submit button wanted? => remove submit button
            !my.submit_button && $.removeElement( self.element.querySelector( '#button-submit' ) );

            // individual caption for submit button? => set caption of submit button
            if ( typeof my.submit_button === 'string' ) self.element.querySelector( '#button-submit' ).value = my.submit_button;
          }

          /** prepares the start values for the input elements  */
          function prepareValues() {

            // given default values? => integrate them as defaults into initial values
            dataset = $.integrate( my.defaults, dataset, true );

            // encode dependencies
            $.encodeDependencies( dataset );

            // convert initial values to dot notation
            dataset = $.toDotNotation( dataset );

          }

          /** callback if an input value has changed */
          function onChange() {

            // update preview considering the changed input value
            updatePreview();

            // perform change actions
            self.onchange && self.onchange( self );

          }


          /** (re)renders the preview based on the entered values */
          function updatePreview() {

            // no preview desired? => abort
            if ( !my.preview ) return;

            // (re)render preview
            my.target.start( self.getValue(), instance => {
              $.setContent( self.element.querySelector( '#preview' ), instance.root );
            } );

          }
        } );

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

        if ( result.data_storage ) {
          result.data = result.data_storage;
          // encode dependencies
          $.encodeDependencies( result.data );

          delete result.data_storage;
        }

        // delete star_title property if no values was specified
        if ( result.star_title.length === 0 ) delete result.star_title;

        // delete user property if no value was specified
        if ( !result.user ) delete result.user;

        // now values of input elements are transformed to resulting instance configuration
        return $.clone( result );

      };


    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}