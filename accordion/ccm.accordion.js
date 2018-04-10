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
    name: 'accordion',

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://akless.github.io/ccm/version/ccm-15.0.2.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      title: 'success', //basic, default, primary, info, success,  warning, danger, link  (see https://www.w3schools.com/bootstrap/bootstrap_buttons.asp)
      data: {
        key: 'demo',
        entries: [
          {
            "title": "Say Hallo",
            "content": "Hallo."
          },
          {
            "title": "Say Hallo 2",
            "content": "Hallo!"
          }
        ]
      },
      css: [ "ccm.load",
        { context: 'head', url: '../../ccm-components/libs/bootstrap/css/font-face.css' },
        '../../ccm-components/libs/bootstrap/css/bootstrap.css',
        'default.css'
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
        $.setContent( self.element, $.html( accordion( my.inner || data() ) ) );

        if( callback ) callback();

        function accordion( data ) {
          const acc = data;

          prepare();

          acc.querySelectorAll('button').forEach( button => {

            button.addEventListener( 'click', function () {
              let content_div = this.nextElementSibling;

              if (content_div.style.maxHeight) {
                content_div.style.maxHeight = null;
                changeIcon( button.querySelector( 'span' ), 'glyphicon-triangle-right' );
              }
              else {
                content_div.style.maxHeight = content_div.scrollHeight + "px";
                changeIcon( this.querySelector( 'span' ), 'glyphicon-triangle-bottom' );

                closeOpenContents();

                function closeOpenContents() {

                  button.classList.add( 'open' );
                  content_div.classList.add( 'open' );

                  acc.querySelectorAll( 'button:not(.open)' ).forEach( button => {
                    changeIcon( button.querySelector( 'span' ), 'glyphicon-triangle-right' );
                  });
                  acc.querySelectorAll( 'div:not(.open)' ).forEach( div  => {
                    div.style.maxHeight = null;
                  });

                  content_div.classList.remove('open');
                  button.classList.remove( 'open' );
                }
              }

              function changeIcon( span, icon ) {
                span.classList.remove( span.className.split(' ').pop() );
                span.classList.add( icon );
              }
            });
          } );

          function prepare() {

            // prepare span tag for icon
            let span_tag = document.createElement( 'span' );
            span_tag.classList.add( 'glyphicon', 'glyphicon-triangle-right' );
            //span_tag.style.fontSize = '55%';

            acc.querySelectorAll( 'title' ).forEach( title => {
              title.outerHTML = title.outerHTML.replace( 'title', 'button' );
            });

            // insert icon span-tag before title
            acc.querySelectorAll( 'button' ).forEach( button => {
              button.classList.add( 'btn', 'btn-lg', 'btn-' + my.title);
              button.prepend( span_tag.cloneNode( true ));
            });

            acc.querySelectorAll( 'content' ).forEach( content => {
              content.outerHTML = content.outerHTML.replace( 'content', 'div' );
            })
          }

          return acc;
        }

        function data() {
          const div = document.createElement( 'div' );
          const title = document.createElement( 'title' );
          const content = document.createElement( 'content' );
          const p = document.createElement( 'p' );

          my.data.entries.map(  entry => {
            const title_clone = title.cloneNode( true );
            const content_clone = content.cloneNode( true );
            const p_clone = p.cloneNode( true );
            title_clone.innerHTML = entry.title;
            $.setContent( p_clone, $.html( entry.content ) );
            content_clone.appendChild( p_clone );
            div.appendChild( title_clone );
            div.appendChild( content_clone );
          } );

          return div;
        }

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}