/**
 * @overview ccm component for modal dialog
 * @author Tea Kless <tea.kless@web.de>, 2018
 * @license The MIT License (MIT)
 * @version 2.0.0
 * start open dialog automatically, no open needed
 */

( function () {

  const component = {

    name: 'modal',
    version: [2,0,0],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',

    config: {
      html: {
        main: {
          "id": "modal",
          "inner": [
            {
              "id": "modal-backdrop",
              "onclick": "%modal_close%",
            },
            {
              "id": "modal-body",
              "inner": {
                "id": "modal-content",
                "inner": [
                  {
                    "tag": "header",
                    "inner": [
                      {
                        "tag": "h4",
                        "id": "modal-title",
                        "inner": "%modal_title%"
                      },
                      {
                        "tag": "button",
                        "type": "button",
                        "class": "close",
                        "onclick": "%modal_close%",
                        "inner": "×"
                      }
                    ]
                  },
                  {
                    "tag": "article"
                  },
                  {
                    "tag": "footer"
                  }
                ]
              }
            }
          ]
        },
        button: {
          "tag": "button",
          "type": "button"
        },
      },
      modal_title: "", //"My Modal",
      modal_content: "",//[ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-3.0.1.js", [ "ccm.get","https://ccmjs.github.io/akless-components/quiz/resources/configs.js","demo" ] ],
      footer: "", //[
        //{ "caption": "Save", "style": "success", "onclick": function ( event ){ console.log( 'Save', event, this ); } },
        //{ "caption": "Close", "style": "danger", "onclick": () => { console.log( 'Close' ); } }
      //],
      libs: [ "ccm.load", "https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
        "https://ccmjs.github.io/tkless-components/modal/resources/default.css"
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

      this.init = async () => {
        // set shortcut to help functions
        $ = self.ccm.helper;
      };

      this.ready = async () => {

        // privatize all possible instance members
        my = $.privatize( self );

        if ( self.logger ) self.logger.log( 'ready',$.clone( my ) );
      };

      this.start = async () => {

        const main = $.html( my.html.main, {
          modal_title: $.html( my.modal_title ),
          modal_close: () => {
            $.removeElement( self.root );
          }
        } );

        if( my.footer ){
          renderFooter();
        }

        if( self.modal_content || my.modal_content ){
          await renderContent();
        }

        $.setContent( self.element, main );
        self.root.setAttribute( "style", "position: absolute; width: 100%; height: 100%; top: 1rem; left: 0;" );

        $.append( self.parent.element.parentNode, self.root );

        async function renderContent() {
          if( $.isInstance( self.modal_content ) ) {
            await self.modal_content.start();
            $.setContent( main.querySelector( 'article' ), self.modal_content.root );
          }
          else
            main.querySelector( 'article' ).appendChild( $.html( my.modal_content ) );
        }

        function renderFooter() {
          for ( let i = 0; i < my.footer.length; i++ ){
            let button = my.html.button;
            for( let prop in my.footer[ i ] ){
              switch ( prop ) {
                case 'caption':
                  button.inner = my.footer[ i ][ prop ];
                  break;
                case 'style':
                  button.class = "btn btn-"+ my.footer[ i ][ prop ];
                  break;
                case 'onclick':
                  button.onclick = event => my.footer[ i ].onclick.call( self, event );
                  break;
                default:
                  button[ prop ] = my.footer[ i ][ prop ];
                  break;
              }
            }
            main.querySelector( "footer" ).appendChild( $.html( button ) );
          }
        }

      };

      this.close = () => {
        $.removeElement( self.root );
      };
    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();