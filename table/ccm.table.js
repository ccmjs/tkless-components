/**
 * @overview ccm component for table generating
 * @author Tea Kless <tea.kless@web.de>, 2018-2022
 * @license The MIT License (MIT)
 * @changes
 *  @version 5.1.0
 * -(10.03.2022)
 *   possibility to set default values over col settings
 *   as cell inner text and not as a value of a disabled input field
 *   updated on newest ccm version ccm v27.3.1
 *  @version 5.0.0
 * -(14.02.2022)
 *   updated on newest ccm version ccm v27.2.0
 *  @version 4.0.0
 * -(21.05.2019)
 *   onrender event for table cells
 *   self.data(ccm v20.7.0) instead of my.data
 * @version 3.0.0
 *  (29.04.2019) onclick event for table cells
 *  @version 2.2.0
 *  (29.04.2019) contains changes from vimp
 * @version 2.1.0
 *  selectable input field
 *  uses ccm v20.0.0
 */

( function () {

  const self = {

    /**
     * unique self name
     * @type {string}
     */
    name: 'table',

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.4.2.min.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: [ "ccm.load", "./resources/templates.mjs" ],
      //table_head: [ "header-1", "header-2", "header-3" ],
      //onfinish: { "restart": true },

      //add_row: true,
      //table_col: 3,
      //col_settings: [
      //  { "type": "number", "placeholder": "Tel: 049..." },
      //  { "disabled": "true", "inner": "max.musterman@mail.com" },
      //  { "type": "date", "foo": "bar" }
      //],
      //data: [ "ccm.get", "resources/configs.js", "demo" ],
      //submit: true,

      //onchange
      //cell_onrender: function ( event ) { console.log( this, event ); }
      //cell_onclick: function ( target, value, self  ){ console.log( target, value, self ); },
      //filter_values
      //delete_row: true,
      css: [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap.css",
        "resources/default.css"
      ],
      helper: [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/versions/helper-8.4.2.min.mjs" } ]
    },

    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,function>}
       */
      let $;

      /**
       * table values
       * @type {number[][]}
       */
      let data;

      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

      };

      /**
       * starts the instance
       */
      this.start = async () => {
        data = await $.dataset( this.data );
        render();
      };

      /**
       * returns table values
       * @returns {{values:number[][]}}
       */
      this.getValue = () => $.clone( data );

      /**
       * Contains all event handlers.
       * @type {Object.<string,function>}
       */
      this.events = {
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

      const render = () => this.html.render( this.html.main( this ), this.element );

    }

  };

  let b="ccm."+self.name+(self.version?"-"+self.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=self;(b=window.ccm&&window.ccm.components[self.name])&&b.ccm&&(self.ccm=b.ccm);"string"===typeof self.ccm&&(self.ccm={url:self.ccm});let c=(self.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(self);else{var a=document.createElement("script");document.head.appendChild(a);self.ccm.integrity&&a.setAttribute("integrity",self.ccm.integrity);self.ccm.crossorigin&&a.setAttribute("crossorigin",self.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(self);document.head.removeChild(a)};a.src=self.ccm.url}
} )();
