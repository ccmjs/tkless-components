/**
 * @overview ccm component for multilingualism
 * @author Tea Kless <tea.kless@web.de>, 2019
 * @license The MIT License (MIT)
 */

( function () {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'lang',
    version: [ 1, 0, 0 ],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-21.1.0.min.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      "html": {
        "main": {
          "id": "main"

        },
        "flag": {
          "tag": "a",
          "href": "#",
          "id": "%lang%",
          "onclick": "%change_lang%",
          "inner": {
            "tag": "img",
            "src": "%flag%"
          }
        },
      },
      "translations": {
        "de": {
          "flag": "https://ccmjs.github.io/tkless-components/lang/resources/de.svg"
        },
        "en": {
          "flag": "https://ccmjs.github.io/tkless-components/lang/resources/en.svg"
        }
      },
      "active": "de",
      //"onchange": event => console.log( event ),
      "css": [ "ccm.load", "https://ccmjs.github.io/tkless-components/lang/resources/default.css" ]
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

      this.ready = async () => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        // consideration of the highest instance for multilingualism
        const parent = self.ccm.context.highestByProperty( self, 'lang', true );
        if ( self.parent && parent ) {
          parent.lang.onchange.push( lang => { my.active = lang; self.translate(); } );
          my.active = parent.lang.getValue();
        }

        // prepare onchange event listeners
        self.onchange = self.onchange ? [ self.onchange ] : [];

        // logging of ready event
        if ( self.logger ) self.logger.log( 'ready', $.clone( my ) );

      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = async () => {

        const parent = self.ccm.context.find( self, 'lang', true );
        if ( self.parent && parent )
          return $.setContent( self.element, '' );

        const main =  $.html( my.html.main );

        for ( const lang in my.translations )
          renderFlag( lang );

        $.setContent( self.element, main );

        self.translate();

        function renderFlag( lang ) {
          const flag = $.html( my.html.flag, {
            lang: my.active,
            flag: my.translations[ lang ].flag,
            change_lang: () => {
              my.active = lang;
              self.translate();
              self.onchange.forEach( onchange => onchange( lang ) );
            }
          } );
          main.appendChild( flag );

        }
      };

      /** translates content of parent instance */
      this.translate = () => {
        self.parent && self.parent.element.querySelectorAll( '*[data-lang]' ).forEach(elem => {
          elem.dataset.lang.split(' ' ).forEach( index => {
            const split = index.split( '-' );
            if ( split.length < 1 ) return;
            if ( split[ 1 ] )
              elem.setAttribute( split[ 1 ], my.translations[ my.active ][ split[ 0 ] ] );
            else
              elem.innerHTML = my.translations[ my.active ][ split[ 0 ] ];
          } )
        } );
      }

      /**
       * returns current selected language
       * @returns {string} current selected language
       */
      this.getValue = () => my.active;

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();