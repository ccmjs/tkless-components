"use strict";

/**
 * @overview ccmjs-based web component for tables
 * @author Tea Kless <tea.kless@web.de>, 2018-2022
 * @license The MIT License (MIT)
 * @version latest (6.0.0)
 * @changes
 * version 6.0.0 (02.12.2022)
 * - ...
 * (for older version changes see ccm.table-5.2.0.js)
 */

( () => {

  /**
   * <i>ccmjs</i>-based web component for tables.
   * @namespace WebComponent
   * @type {object}
   * @property {string} name - Unique identifier of the component.
   * @property {number[]} [version] - Version of the component according to Semantic Versioning 2.0 (default: latest version).
   * @property {string} ccm - URL of the (interchangeable) ccmjs version used at the time of publication.
   * @property {app_config} config - Default app configuration.
   * @property {Class} Instance - Class from which app instances are created.
   */
  const component = {
    name: 'table',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.4.2.min.js',
    config: {
      //col_settings: [
      //  { "type": "number", "placeholder": "Tel: 049..." },
      //  { "disabled": "true", "inner": "max.musterman@mail.com" },
      //  { "type": "date", "foo": "bar" }
      //],
      "html": [ "ccm.load", "https://ccmjs.github.io/tkless-components/table/resources/templates.mjs" ],
      //table_head: [ "header-1", "header-2", "header-3" ],
      //onfinish: { "restart": true },

      //add_row: true,
      //table_col: 3,
      //data: [ "ccm.get", "resources/configs.js", "demo" ],

      //"onchange": event => console.log( event ),
      //"onfinish": event => console.log( event ),
      //"onready": event => console.log( event ),
      //"onstart": event => console.log( event ),
      //cell_onrender: function ( event ) { console.log( this, event ); }
      //cell_onclick: function ( target, value, self  ){ console.log( target, value, self ); },
      //filter_values
      //delete_row: true,
      css: [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap.css",
        "resources/default.css"
      ],
      helper: [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/versions/helper-8.4.2.min.mjs" } ]
    },
    /**
     * @class
     * @memberOf WebComponent
     */
    Instance: function () {

      /**
       * Shortcut to helper functions
       * @private
       * @type {Object.<string,function>}
       */
      let $;

      /**
       * App state data (table values)
       * @private
       * @type {app_state}
       */
      let data;

      /**
       * When the instance is created, when all dependencies have been resolved and before the dependent sub-instances are initialized and ready. Allows dynamic post-configuration of the instance.
       * @async
       * @readonly
       * @function
       */
      this.init = async () => {

        // Merge all helper functions and offer them via a single variable.
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

      };

      /**
       * When the instance is created and after all dependent sub-instances are initialized and ready.
       * Allows the first official actions of the instance that should only happen once.
       * @async
       * @readonly
       * @function
       */
      this.ready = async () => {

        // Trigger 'ready' event.
        this.onready && await this.onready( { instance: this } );

      };

      /**
       * Starts the app. The current app state is visualized in the webpage area.
       * @async
       * @readonly
       * @function
       */
      this.start = async () => {

        // Load app state data from source.
        data = await $.dataset( this.data );

        render();

        // Trigger 'start' event.
        this.onstart && await this.onstart( { instance: this } );

      };

      /**
       * Returns the current app state.
       * @readonly
       * @function
       * @returns {app_state} A deep copy of the app state data.
       */
      this.getValue = () => $.clone( data );

      /**
       * Contains all event handlers.
       * @namespace AppEvents
       * @readonly
       * @type {Object.<string,function>}
       */
      this.events = {

        /**
         * When a table value has changed.
         * @function
         * @memberOf AppEvents
         */
        onChange: event => {
          const [ row, col ] = event.target.name.split( '-' );
          data.values[ row-1 ][ col-1 ] = event.target.value;
          render();
        },
        onDeleteRow: i => {
          data.values.splice( i, 1 );
          render();
        },
        onSubmit: event => {
          event.preventDefault();
          $.onFinish( this );
        }
      };

      /**
       * Updates the webpage area with the current app state data.
       * @private
       * @function
       */
      const render = () => this.html.render( this.html.main( this ), this.element );

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();

/**
 * App configuration.
 * @typedef {object} app_config
 * @prop {array} css - CSS dependencies.
 * @prop {object} [data] - Source of app state data.
 * @prop {array} helper - Dependency on helper functions.
 * @prop {array} html - HTML template dependencies.
 * @prop {function} [onchange] - When a table value changes.
 * @prop {function|object} [onfinish] - When the finish button is clicked. Sets the finish actions.
 * @prop {function} [onready] - Is called once before the first start of the app.
 * @prop {function} [onstart] - When the app has finished starting.
 */

/**
 * App state data.
 * @typedef {object} app_state
 * @prop {number[][]} values - Table values
 * @example
 * {
 *   "values": [ [ "A", 1, false ], [ "B", 2, true ] ]
 * }
 */
