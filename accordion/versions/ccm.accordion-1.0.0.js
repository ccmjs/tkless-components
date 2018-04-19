/**
 * @overview ccm component for accordion
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
    version:[ 1,0,0 ],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: {
      url: 'https://ccmjs.github.io/ccm/versions/ccm-15.0.2.min.js',
      integrity: 'sha384-4X0IFdACgz2SAKu0knklA+SRQ6OVU4GipKhm7p6l7e7k/CIM8cjCFprWmM4qkbQz',
      crossorigin: 'anonymous'
    },
    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      title: 'success', //basic, default, primary, info, success,  warning, danger, link  (see https://www.w3schools.com/bootstrap/bootstrap_buttons.asp)
      /*data: {
        key: 'demo',
        entries: [
          {
            "title": "Learning Goals",
            "content": "..."
          },
          {
            "title": "Lecture",
            "content": "<source src=\"../table/ccm.table.js\"> <p>Hier steht <i>ccm</i>-Komponente</p> <ccm-table key='[\"ccm.get\",\"../table/resources/configs.js\",\"demo\"]'></ccm-table>"
          },
          {
            "title": "Additional Materials",
            "content": "..."
          },
          {
            "title": "Exercises",
            "content": "..."
          },
          {
            "title": "Bibliography",
            "content": "..."
          }
        ]
      },*/
      //content: [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/beta/ccm.content-4.0.0.js" ],
      libs: [ 'ccm.load',
        { context: 'head', url: 'https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css' },
        'https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css',
        'https://ccmjs.github.io/tkless-components/accordion/resources/default.css'
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

          acc.querySelectorAll('button').forEach(  function (button)  {
            button.addEventListener( 'click', function ( ) {
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

            /*
             * replace title tag with button tag
             */
            acc.querySelectorAll( 'title' ).forEach( title => {
              // insert icon span-tag before title
              title.classList.add( 'btn', 'btn-lg', 'btn-' + my.title);
              title.prepend( span_tag.cloneNode( true ));
              title.outerHTML = title.outerHTML.replace( 'title', 'button' );
            });

            /*
             * replace content tag with div
             * pass light-DOM to content-component if set in config
             */
            acc.querySelectorAll( 'content' ).forEach( content => {
              const fragment = document.createDocumentFragment();
              [ ...content.children ].map( child => fragment.appendChild( child ) );
              const div = document.createElement( 'div' );
              div.classList.add('content');
              content.parentNode.replaceChild( div, content );
              const p = document.createElement( 'p' );
              div.appendChild( p );

              if( my.content ) my.content.start( { inner: fragment, root: p } );
              else {
                p.appendChild( fragment );
              }

            } );
          }

          return acc;
        }

        /*
         * forms my.inner structure from given data (my.data)
         */
        function data() {
          const div = document.createElement( 'div' );
          const title = document.createElement( 'title' );
          const content = document.createElement( 'content' );
          const p = document.createElement( 'p' );

          my.data.entries.map( entry => {
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