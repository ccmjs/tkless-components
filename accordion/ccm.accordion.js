/**
 * @overview ccm component for acoordion
 * @see https://github.com/mozilla/pdf.js/
 * @author Tea Kless <tea.kless@web.de>, 2018
 * @license The MIT License (MIT)
 * TODO close open contents
 */

( function () {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'accordion',

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
      color: 'success', //basic, default, primary, info, success,  warning, danger, link  (see https://www.w3schools.com/bootstrap/bootstrap_buttons.asp)
      size: 'xs', //lg, md, sm, xs
      entries: [
        {
          "title": "Learning Goals",
          "content": "..."
        },
        {
          "title": "Lecture",
          "content": "<source src=\"../table/versions/ccm.table-2.0.0.js\"> <p>Hier steht <i>ccm</i>-Komponente</p> <ccm-table-2-0-0 key='[\"ccm.get\",\"../table/resources/configs.js\",\"demo\"]'></ccm-table-2-0-0>"
        },
        {
          "title": "Additional Materials",
          "content": ""
        },
        {
          "title": "Exercises",
          "content": "<textarea placeholder='text'></textarea>"
        },
        {
          "title": "Bibliography",
          "content": "..."
        }
      ],
      //  onclick: function ( target ){ console.log( target ); },
      content: [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.0.js" ],
      css: [ "ccm.load",
        { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
        "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
        '../accordion/resources/default.css'
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

      this.ready = async () => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        if ( self.logger ) self.logger.log( 'ready', $.clone ( my ) );

      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = async () => {

        if ( !my.inner && ( !my.entries ||  my.entries.length === 0 ) ) {
          $.setContent( self.element, $.html( 'Nothing to Display') );
          return;
        }

        // render accordion
        $.setContent( self.element, $.html( accordion( my.inner || data() ) ) );

        function accordion( element ) {
          const acc = element;

          prepare();

          acc.querySelectorAll('button').forEach( button =>  {
            button.addEventListener( 'click', function () {
              let content_div = this.nextElementSibling;

              if( content_div.getAttribute('data-collapsed') === 'true' ) {
                expand( content_div );

                content_div.setAttribute('data-collapsed', 'false');

                changeIcon( this.querySelector( 'span' ), 'glyphicon-triangle-bottom' );

                closeOpenContents();

                function closeOpenContents() {

                  content_div.classList.add( 'open' );
                  button.classList.add( 'open' );

                  if ( my.entries.length > 1) {
                    changeIcon(  acc.querySelector( 'button:not( .open )' ).querySelector( 'span' ), 'glyphicon-triangle-right' );

                    /*[ ...acc.querySelectorAll( '.content:not( .open )' ) ].map( ( div )=>{
                       div.style.height = 0 + "px";
                     });*/
                  }

                  content_div.classList.remove('open');
                  button.classList.remove( 'open' );

                }
              } else {
                collapse( content_div );
                changeIcon( this.querySelector( 'span' ), 'glyphicon-triangle-right' );
              }


              function changeIcon( span, icon ) {
                span.classList.remove( span.className.split(' ').pop() );
                span.classList.add( icon );
              }

              function collapse( element ) {
                // get the height of the element's inner content, regardless of its actual size
                let sectionHeight = element.scrollHeight;

                // temporarily disable all css transitions
                let elementTransition = element.style.transition;
                element.style.transition = '';

                // on the next frame (as soon as the previous style change has taken effect),
                // explicitly set the element's height to its current pixel height, so we
                // aren't transitioning out of 'auto'
                requestAnimationFrame( function() {
                  element.style.height = sectionHeight + 'px';
                  element.style.transition = elementTransition;
                  // on the next frame (as soon as the previous style change has taken effect),
                  // have the element transition to height: 0
                  requestAnimationFrame( function() {
                    element.style.height = 0 + 'px';
                  });
                });

                // mark the section as "currently collapsed"
                element.setAttribute('data-collapsed', 'true');
              }

              function expand(element) {
                // get the height of the element's inner content, regardless of its actual size
                let sectionHeight = element.scrollHeight;

                // have the element transition to the height of its inner content
                element.style.height = sectionHeight + 'px';

                // when the next css transition finishes (which should be the one we just triggered)
                element.addEventListener('transitionend', function(e) {
                  // remove this event listener so it only gets triggered once
                  element.removeEventListener('transitionend', arguments.callee);

                  // remove "height" from the element's inline styles, so it can return to its initial value
                  element.style.height = null;
                });

                // mark the section as "currently not collapsed"
                element.setAttribute('data-collapsed', 'false');
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
              title.classList.add( 'btn', 'btn-'+my.size, 'btn-' + my.color );
              title.prepend( span_tag.cloneNode( true ) );
              title.outerHTML = title.outerHTML.replace( 'title', 'button' );
            });

            /*
             * replace content tag with div
             * pass light-DOM to content-component if set in config
             */
            acc.querySelectorAll( 'content' ).forEach( async content => {
              const fragment = document.createDocumentFragment();
              [ ...content.children ].map( child => fragment.appendChild( child ) );
              const div = document.createElement( 'div' );
              div.classList.add('content', "collapsible" );
              div.setAttribute(  "data-collapsed", "true" );
              div.style.height = 0 + 'px';
              content.parentNode.replaceChild( div, content );
              const p = document.createElement( 'p' );
              div.appendChild( p );

              if( my.content ) await my.content.start( { inner: fragment, root: p } );
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

          my.entries.map(  async entry => {
            const title_clone = title.cloneNode( true );
            const content_clone = content.cloneNode( true );
            const p_clone = p.cloneNode( true );
            title_clone.innerHTML = entry.title;

            if ( $.isInstance( entry.content ) ) {
             await entry.content.start();
             $.setContent( p_clone, entry.content.root );
            }
            else $.setContent( p_clone, $.html( entry.content ) );

            content_clone.appendChild( p_clone );
            div.appendChild( title_clone );
            div.appendChild( content_clone );
          } );

          return div;
        }

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();