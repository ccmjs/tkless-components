/**
 * @overview ccm component for acoordion
 * @see https://github.com/mozilla/pdf.js/
 * @author Tea Kless <tea.kless@web.de>, 2018
 * @license The MIT License (MIT)
 */

{
  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'dialog_card',

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
      css: [ "ccm.load",
        { context: 'head', url: '../../ccm-components/libs/bootstrap/css/font-face.css' },
        '../../ccm-components/libs/bootstrap/css/bootstrap.css'
      ]

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

      this.ready = callback => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        if ( self.logger ) self.logger.log( 'ready', my );

        callback();

      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {

        // render accordion
        $.setContent( self.element, $.html( "hallo" ) );

        if( callback ) callback();

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}