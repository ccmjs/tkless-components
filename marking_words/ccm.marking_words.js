/**
 * @overview ccm component for marking thew words in Text
 * @author Tea Kless <tea.kless@web.de>, 2018
 * @license The MIT License (MIT)
 */

{
  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'marking_words',

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
      html: {
        "text": {
          "id": "container",
          "inner": [
            {
              "id": "text"
            },
            {
              "id": "conclusion"
            }
          ]
        },

        "submit": {
          "tag": "button",
          "class": "btn btn-default pull-right",
          "typ": "button",
          "inner": "Submit",
          "onclick": "%submit%"
        }
      },
      data: {
        "key": "demo",
        "value": "<h1>Click the various types of berries mentioned in the text below!</h1>" +
        "<p>Bilberries, also known as blueberries are edible, nearly black berries found in nutrient-poor soils.</p>" +
        "<p>Cloudberries are edible orange berries similar to raspberries or blackberries found in alpine and arctic tundra.</p>" +
        "<p>Redcurrants are red translucent berries with a diameter of 8–10 mm, and are closely related to blackcurrants.</p>"
      },
      //submit: true,
      //onfinish
      css: [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" }
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

        callback();

      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {

        $.dataset( my.data, data => {

          const main_elem = $.html( my.html.text );

          $.setContent( main_elem.querySelector( '#text' ), my.data.value );

          main_elem.querySelector( '#text' ).addEventListener( 'click', function (event) {
            console.log( event.target.value );
          });

          $.setContent( self.element, main_elem );

          callback && callback();

        } );

      };

      this.getValue = () => {

        return 0;
      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}