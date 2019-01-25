/**
 * @overview ccm component for creating apps
 * @author Tea Kless <tea.kless@web.de> 2018
 * @license The MIT License (MIT)
 * @version latest (1.1.0)
 * @based on ccm.app_builder by Andrè Kless
 */

( function () {

  const component = {

    name: 'app_creator',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {

      "html": {
        "main": {
          "inner": [
            {
              "id": "wrapper",
              "inner": [
                {
                  "id": "section-builder",
                  "inner":[
                    {
                      "id": "builder"
                    },
                    {
                      "id": "buttons",
                      "class": "text-center",
                      "inner": [
                        {
                          "tag": "button",
                          "id": "button-load",
                          "class": "btn",
                          "onclick": "%open_modal%",
                          "inner": [
                            {
                              "tag": "span",
                              "class": "fas fa-wrench"
                            },
                            {
                              "class": "footer-icon",
                              "inner": "LOAD APP"
                            }
                          ]
                        },
                        {
                          "tag": "button",
                          "id": "button-update",
                          "class": "btn",
                          "disabled": true,
                          "onclick": "%onUpdate%",
                          "inner":[
                            {
                              "tag": "span",
                              "class": "fas fa-cloud-upload-alt"
                            },
                            {
                              "class": "footer-icon",
                              "inner": "UPDATE APP"
                            }
                          ]
                        },
                        {
                          "tag": "button",
                          "id": "button-create",
                          "class": "btn",
                          "onclick": "%onCreate%",
                          "inner": [
                            {
                              "tag": "span",
                              "class": "far fa-plus-square"
                            },
                            {
                              "class": "footer-icon",
                              "inner": "NEW APP"
                            }
                          ]
                        },
                        {
                          "tag": "button",
                          "id": "button-delete",
                          "disabled": true,
                          "class": "btn",
                          "onclick": "%onDelete%",
                          "inner": [
                            {
                              "tag": "span",
                              "class": "far fa-trash-alt"
                            },
                            {
                              "class": "footer-icon",
                              "inner": "DELETE APP"
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
                      "id": "button",
                      "inner": {
                        "tag": "p",
                        "id": "previewCollapse",
                        "inner": {
                          "tag": "a",
                          "inner": "preview",
                          "style": "color: #fff;"
                        }
                      }
                    },
                    {
                      "id": "preview"
                    }
                  ]
                }
              ]
            },

          ]
        },

        "read": {
          "tag": "form",
          "id": "read",
          "inner": [
            {
              "tag": "legend",
              "class": "text-primary",
              "inner": "Load an existing App"
            },
            {
              "class": "form-group",
              "inner": [
                {
                  "tag": "label",
                  "for": "src",
                  "inner": "Where is your App?",
                },
                {
                  "tag": "select",
                  "class": "form-control",
                  "id": "src",
                  "inner": [
                    {
                      "tag": "option",
                      "inner": "Web Component Cloud (W2C)"
                    },
                    {
                      "tag": "option",
                      "class": "disabled",
                      "inner": "Own Server/Database"
                    }
                  ]
                }
              ]
            },
            {
              "class": "form-group",
              "inner": [
                {
                  "tag": "label",
                  "for": "src",
                  "inner": "Give here your App Identifier: ",
                },
                {
                  "tag": "input",
                  "id": "key",
                  "type": "text",
                  "class": "form-control",
                  "placeholder": "ID:"
                }
              ]
            }
          ]
        },

        "usage": {
          "id": "usage",
          "inner": [
            {
              "tag": "legend",
              "class": "text-primary",
              "inner": [
                "How can you use the App?",
                {
                  "tag": "span",
                  "class": "copy-embed-code btn btn-sm btn-warning float-right",
                  "inner": "Copy"
                }
              ]
            },
            {
              "tag": "p",
              "class": "text-info",
              "inner": [
                "Add the following ",
                {
                  "tag": "code",
                  "inner": "EMBED CODE"
                },
                " to your page:"
              ]
            },
            {
              "tag": "p",
              "inner": {
                "tag": "code",
                "id": "embed-code"
              }
            },
            {
              "tag": "legend",
              "class": "text-primary",
              "inner": [
                "If you want to change the created App...",
                {
                  "tag": "span",
                  "class": "copy-id btn btn-sm btn-warning float-right",
                  "inner": "Copy"
                }
              ]
            },
            {
              "tag": "p",
              "class": "alert alert-info",
              "role": "alert",
              "inner": [
                {
                  "tag": "span",
                  "class": "glyphicon glyphicon-exclamation-sign"
                },
                " Note this ID: ",
                {
                  "tag": "span",
                  "class": "text-danger",
                  "id": "id"
                }
              ]
            }
          ]
        }

      },
      "data": { "store": [ "ccm.store" ] },
      "warning": "Are you sure you want to delete this App?",
      "modal": [ "ccm.component",  "../modal/ccm.modal.js" ],
      "css": [ "ccm.load", "https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
        "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
        { "context": "head", "url": "https://use.fontawesome.com/releases/v5.6.3/css/all.css" },
        { "context": "head", "url": "https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" },
        "resources/default.css"
      ]

  //  "convert": { "app_to_builder": json => json, "builder_to_app": json => json },
  //  "builder",
  //  "app",
  //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onchange"

    },

    Instance: function () {

      let $;

      /**
       * current app-specific builder instance
       * @type {Object}
       */
      let builder;

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // set function for JSON conversion of app configuration
        if ( $.isObject( this.data ) && this.convert ) this.data.convert = this.convert.app_to_builder;

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        const self = this;

        /**
         * app configuration
         * @type {Object}
         */
        let dataset = await $.dataset( this.data );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        /**
         * current App-ID
         * @type {string}
         */
        let app_id = dataset.key; delete dataset.key;

        let is_new = !Object.keys( dataset ).length;

        // render main HTML structure
        $.setContent( self.element, $.html( self.html.main, {
          open_modal: async () => {
            const inst =  await self.modal.start( {
              modal_title: $.html ( { "tag": "span", "id": "failed", "class": "text-danger", "style": "display: none;", "inner": "App-ID not found" } ) ,
              modal_content: self.html.read,
              footer: [
                { "caption": "Load App", "style": "success disabled", "onclick": function () { loadApp( this ); } },
              ]
            } );
            self.element.appendChild( inst.root );

            inst.element.querySelector( "#key" ).oninput = function () {
              const key = inst.element.querySelector( "#key" ).value.trim();
              if ( key !== "" && $.isKey( key ) )
                inst.element.querySelector( 'footer > button' ).classList.remove( 'disabled' );
              else
                inst.element.querySelector( 'footer > button' ).classList.add( 'disabled' );
            };
            inst.open();
          },
          onCreate: createApp,
          onUpdate: updateApp,
          onDelete: deleteApp
        } ) );

        /**
         * website area for app building
         * @type {Element}
         */
        const builder_elem = this.element.querySelector( '#builder' );

        /**
         * website area for app preview
         * @type {Element}
         */
        const preview_elem = this.element.querySelector( '#preview' );

        this.element.querySelector( '#button' ).addEventListener( 'click', () => {
          preview_elem.classList.toggle( 'active' );
        } );

        /**
         * website area for CRUD buttons
         * @type {Element}
         */
        const buttons_elem = this.element.querySelector( '#buttons' );

        /**
         * app configuration is managed in a local JavaScript object
         * @type {boolean}
         */
        const isLocalStore = !this.data.store.source().name;

        // render initial app state
        await renderApp();

        /**
         * renders loaded app and updates preview
         * @returns {Promise}
         */
        async function renderApp() {

          // render new app-specific builder with loaded app configuration as start values
          builder = await self.builder.start( {
            root: builder_elem,
            data: {
              store: [ 'ccm.store', { app: dataset } ],
              key: 'app'
            },
            onchange: updatePreview
          } );

          // activate "Update" and "Delete" button
          !isLocalStore && !is_new && buttons_elem.querySelectorAll( '.disabled' ).forEach( button => button.removeAttribute( 'disabled' ) );

          // update preview of build app
          await updatePreview();

        }

        /** when "Create" button has been clicked */
        async function createApp() {

          // has user instance? => perform login
          self.user && await self.user.login();

          // get current app configuration from app-specific builder
          dataset = builder.getValue(); delete dataset.key;

          // add permission settings
          if ( self.user ) dataset._ = { access: { get: 'all', set: 'creator', del: 'creator' } };

          // save app configuration
          app_id = await self.data.store.set( dataset ); delete dataset.key;

          // logging of 'create' event
          self.logger && self.logger.log( 'create', $.clone( dataset ) );

          // give app to user
          await handoverApp();

          // has 'change' callback? => perform it
          self.onchange && self.onchange( self );

        }

        /** when "Load" button has been clicked */
        async function loadApp( modal ) {

          // has user instance? => perform login
          self.user && await self.user.login();

          /**
           * entered App-ID
           * @type {string}
           */
          const key = modal.element.querySelector( '#key' ).value.trim();

          // load app configuration
          dataset = await self.data.store.get( key );

          // no app configuration with entered App-ID exists? => show failed message
          if ( !dataset ) return failed();

          // activate "Update" and "Delete" button
          is_new = false;
          !isLocalStore && !is_new && buttons_elem.querySelectorAll( 'button[disabled]' ).forEach( button => button.removeAttribute( 'disabled' ) );

          // logging of 'load' event
          self.logger && self.logger.log( 'load', $.clone( dataset ) );

          // remember App-ID
          app_id = dataset.key; delete dataset.key;

          // render loaded app
          await renderApp();

          modal.close();

          // perform 'change' callback
          self.onchange && self.onchange( self );

          /** shows failed message */
          function failed() {
            const failed_elem = modal.element.querySelector( '#failed' );
            failed_elem.style.display = 'block';
            fadeOut( failed_elem );
          }
        }

        /** when "Update" button has been clicked */
        async function updateApp() {

          // invalid state? => abort
          if ( !app_id || is_new || isLocalStore ) return;

          // has user instance? => perform login
          self.user && await self.user.login();

          // get current app configuration from app-specific builder
          dataset = builder.getValue();

          // add App-ID to app configuration (to save app under same App-ID again)
          dataset.key = app_id;

          // logging of 'update' event
          self.logger && self.logger.log( 'update', $.clone( dataset ) );

          // save app configuration
          app_id = await self.data.store.set( dataset ); delete dataset.key;

          // give app to user
          await handoverApp();

          // has 'change' callback? => perform it
          self.onchange && self.onchange( self );

        }

        /** when "Delete" button has been clicked */
        async function deleteApp() {

          // invalid state or user is not sure about deletion? => abort
          if ( !app_id || is_new || isLocalStore || !confirm( self.warning ) ) return;

          // has user instance? => perform login
          self.user && await self.user.login();

          // logging of 'delete' event
          self.logger && self.logger.log( 'delete', $.clone( app_id ) );

          // delete app configuration
          await self.data.store.del( app_id );

          // forget App-ID
          app_id = undefined;

          // render success message (and slowly fade it out)
          const inst =  await self.modal.start( {
            modal_title: ' ',
            modal_content: self.html.deleted,
            footer: [ { "caption": "Ok", "style": "success", "onclick": function () { this.close(); } } ]
          } );

          self.element.appendChild( inst.root );
          inst.open();

          // disable "Update" and "Delete" button
          buttons_elem.querySelector( '#button-update' ).classList.add( 'disabled' );
          buttons_elem.querySelector( '#button-delete' ).classList.add( 'disabled' );

          // has 'change' callback? => perform it
          self.onchange && self.onchange( self );

        }

        /** gives app to user */
        async function handoverApp() {

          // activate "Update" and "Delete" button
          !isLocalStore && [ ...buttons_elem.querySelectorAll( '.disabled' ) ].map( button => button.classList.remove( 'disabled' ) );

          // render app usage informations
          const inst = await self.modal.start( {
            modal_title: '',
            modal_content: self.html.usage,
            footer: [ { "caption": "Close", "style": "danger", "onclick": function () { this.close(); } } ]
          } );

          inst.element.querySelector( '#embed-code' ).innerHTML = getEmbedCode();
          inst.element.querySelector( '#id'         ).innerHTML = app_id;

          self.element.appendChild( inst.root );

          inst.open();

          inst.element.querySelector( '.copy-embed-code' ).addEventListener( 'click', ()=> {
            copyToClipboard( inst.element.querySelector( '#embed-code' ) );
          } );

          inst.element.querySelector( '.copy-id' ).addEventListener( 'click', ()=> {
            copyToClipboard( inst.element.querySelector( '#id' ) );
          } );

          /**
           * returns embed code for saved app
           * @returns {string} embed code of saved app
           */
          function getEmbedCode() {

            const index = $.getIndex( self.app.url );
            let store_settings = self.data.store.source(); if ( isLocalStore ) { store_settings = {}; store_settings[ app_id ] = dataset; }
            return $.escapeHTML( '<script src="' + self.app.url + '"></script><ccm-' + index + ' key=\'["ccm.get",' + JSON.stringify( store_settings ) + ',"' + app_id + '"]\'></ccm-' + index + '>' );

          }

          function copyToClipboard( element ) {

            const range = document.createRange();
            range.selectNode( element );
            const selection = window.getSelection();
            selection.removeAllRanges();
            if( !selection.containsNode( element ) )
              selection.addRange(range);
            document.execCommand('copy');
          }

        }

        /**
         * fades out an element
         * @param {Element} elem
         */
        function fadeOut( elem ) {
          elem.style.opacity = 1;
          ( function fade() {
            if ( ( elem.style.opacity -= .005 ) >= 0 ) requestAnimationFrame( fade );
          } )();
        }

        /** updates website area for app preview */
        async function updatePreview() {

          let config = self.getValue();
          if ( self.convert && self.convert.builder_to_app ) config = self.convert.builder_to_app( config );
          preview_elem && $.setContent( preview_elem, ( await self.app.start( config ) ).root );
        }

      };

      /**
       * returns resulting instance configuration for target component
       * @returns {Object} instance configuration for target component
       */
      this.getValue = () => builder && builder.getValue && builder.getValue() || null;

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();