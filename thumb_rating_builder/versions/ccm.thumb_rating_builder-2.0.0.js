/**
 * @overview ccm component for building a thumb rating component
 * @author Tea Kless <tea.kless@web.de>, 2019
 * @license The MIT License (MIT)
 */

( function () {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'thumb_rating_builder',
    version: [ 2,0,0 ],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',

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
            "inner": "Build your Thumb Rating"
          },
          {
            "tag": "form",
            "class": "form",
            "onsubmit": "%submit%",
            "inner": [
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
                "class": "layout form-group",
                "inner": [
                  {
                    "tag": "label",
                    "for": "layout",
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
                        "inner": "Choose between different layouts, in which the thumb rating is displayed."
                      }
                    ]
                  },
                  {
                    "tag": "select",
                    "onchange": "%change%",
                    "class": "form-control",
                    "id": "layout",
                    "name": "layout",
                    "inner": [
                      {
                        "tag": "option",
                        "inner": "Default",
                        "value": ""
                      },
                      {
                        "tag": "option",
                        "inner": "Buttons",
                        "value": "buttons"
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
                        "value": "[ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js', " +
                        "[ 'ccm.get', 'https://ccmjs.github.io/akless-components/user/resources/configs.js', 'compact' ] ]"
                      },
                      {
                        "tag": "option",
                        "inner": "H-BRS FB02",
                        "value": "[ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js', " +
                        "{ 'key': [ 'ccm.get', 'https://ccmjs.github.io/akless-components/user/resources/configs.js', 'compact' ], 'realm':'hbrsinfkaul' } ]"
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
        "https://ccmjs.github.io/tkless-components/thumb_rating_builder/resources/default.css"
      ],
      "target": [ "ccm.component", "https://ccmjs.github.io/tkless-components/thumb_rating/versions/ccm.thumb_rating-3.0.0.js" ],
      // "defaults": {
      //    "data.store": "['ccm.store',{'store':'thumb_rating_data','url':'http://localhost:8080'}]",
      //    "user": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.1.js',['ccm.get','https://ccmjs.github.io/akless-components/user/resources/configs.js','guest']]"
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

        // prepare initial form values
        prepareValues();

        // render input elements
        $.setContent( self.element, $.html( my.html, {
          submit: self.submit,
          help: function () {
            // hide and show help texts
            const this_a = this;
            $.makeIterable(self.element.querySelectorAll('a')).map(other_a => other_a !== this_a && other_a.classList.remove('active'));
            this.classList.toggle('active');

          },
          change: onChange
        }));

        // fill form with initial values
        $.fillForm( self.element, dataset );

        // render preview
        if ( my.preview ) await updatePreview();

        // no preview desired? => remove preview section
        else $.removeElement( self.element.querySelector( '#section-preview' ) );

        // no submit button wanted? => remove submit button
        !my.submit_button && $.removeElement( self.element.querySelector( '#button-submit' ) );

        // individual caption for submit button? => set caption of submit button
        if ( typeof my.submit_button === 'string' ) self.element.querySelector( '#button-submit' ).value = my.submit_button;

        /** prepares the start values for the input elements  */
        function prepareValues() {

          // set default value for dataset key of app-specific teambuild data
          if ( !my.defaults[ 'data.key' ] ) my.defaults[ 'data.key' ] = $.generateKey();

          // given default values? => integrate them as defaults into initial values
          dataset = $.integrate( my.defaults, dataset, true );

          // encode dependencies
          $.encodeDependencies( dataset );

          // convert initial values to dot notation
          dataset = $.toDotNotation( dataset );

        }

        /** callback if an input value has changed */
        async function onChange() {

          // update preview considering the changed input value
          await updatePreview();

          // perform change actions
          self.onchange && self.onchange.call( self );

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

        if ( result.layout === 'buttons' ) result.template = 'buttons';
        else
          result.template = "default";

        // convert dot notation properties to deeper objects
        result = $.solveDotNotation( result );

        // use empty string if no value was specified
        if ( !result.user ) delete result.user;

        // now values of input elements are transformed to resulting instance configuration
        return $.clone( result );

      };


    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();