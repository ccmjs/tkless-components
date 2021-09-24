/**
 * @overview ccmjs-based web component for PDF viewer
 * @see https://github.com/mozilla/pdf.js/
 * @author Tea Kless <tea.kless@web.de> 2020
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (7.0.0)
 * @changes
 * version 7.0.0 (08.09.2021): reimplementation by akless
 */

( () => {
  const component = {
    name: 'pdf_viewer',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.0.0.js',
    config: {
      "css": [ "ccm.load", "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/styles.css" ],
      "downloadable": true,
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.5.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/templates.mjs" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
//    "onchange": ( instance, page ) => { console.log( instance, page ) },
      "pdf": "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/slides.pdf",
      "libs": [
        [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/pdfjs/pdf.min.js" ],
        "https://ccmjs.github.io/tkless-components/libs/pdfjs/pdf.worker.min.js"
      ],
//    "routing": [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-2.0.7.js", { "app": "pdf_viewer" } ],
      "text": {
        "denied": "Access Denied",
        "download": "Download PDF",
        "first": "First Page",
        "jump": "Jump to specific Page",
        "last": "Last Page",
        "next": "Next Page",
        "prev": "Previous Page",
        "protected": "This document is password protected. Enter a password.",
      },
      "touchable": true
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * PDF file
       * @type {Object}
       */
      let file;

      /**
       * current page
       * @type {number}
       */
      let page_nr = 1;

      /**
       * when the instance is created, when all dependencies have been resolved and before the dependent sub-instances are initialized and ready
       * @returns {Promise<void>}
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // setup libraries
        this.libs[ 0 ] = window[ 'pdfjs-dist/build/pdf' ]; delete window[ 'pdfjs-dist/build/pdf' ];
        if ( !this.libs[ 0 ].GlobalWorkerOptions.workerSrc ) this.libs[ 0 ].GlobalWorkerOptions.workerSrc = this.libs[ 1 ];

      };

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // load PDF
        try {
          file = await this.libs[ 0 ].getDocument( this.pdf ).promise;
        }
        catch ( exception ) {
          if ( exception.name !== 'PasswordException' ) return;
          try { file = await this.libs[ 0 ].getDocument( { url: this.pdf, password: prompt( this.text.protected ) } ).promise; } catch ( e ) {}
          if ( !file ) return $.setContent( this.element, this.text.denied );
        }

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        // render main HTML structure
        render();

        /**
         * canvas element
         * @type {Element}
         */
        const canvas = this.element.querySelector( 'canvas' );

        // disable to downloading the files from canvas element
        !this.downloadable && canvas.addEventListener( 'contextmenu', event => event.preventDefault() );

        // render page
        if ( this.routing && this.routing.get() ) {
          page_nr = this.routing.get().split( '-' )[ 1 ];
          this.onchange && this.onchange( this, page_nr );
        }
        else
          await renderPage();

        // setup touch control
        if ( this.touchable ) {
          let reachedEdge = false;
          let touchStart = null;
          let touchDown = false;
          canvas.addEventListener( 'touchstart', () => touchDown = true );
          canvas.addEventListener( 'touchmove', event => {
            if ( canvas.scrollLeft === 0 || canvas.scrollLeft === canvas.scrollWidth - canvas.clientWidth )
              reachedEdge = true;
            else {
              reachedEdge = false;
              touchStart = null;
            }
            if ( reachedEdge && touchDown ) {
              if ( touchStart === null )
                touchStart = event.changedTouches[ 0 ].clientX;
              else {
                let distance = event.changedTouches[ 0 ].clientX - touchStart;
                if ( distance < -100 ) {
                  touchStart = null;
                  reachedEdge = false;
                  touchDown = false;
                  events.onNext();
                }
                else if ( distance > 100 ) {
                  touchStart = null;
                  reachedEdge = false;
                  touchDown = false;
                  events.onPrev();
                }
              }
            }
          } );
          canvas.addEventListener( 'touchend', () => {
            touchStart = null;
            touchDown = false;
          } );
        }

        // define and check routes
        this.routing && this.routing.define( { page: number => { page_nr = number; renderPage(); } } );

      };

      /**
       * opens a specific page
       * @param {number} page - page number
       * @returns {Promise<void>}
       */
      this.goTo = async page => {
        if ( page < 1 || page > file.numPages ) return;     // invalid page number? => abort
        page_nr = page;                                     // update current page number
        await renderPage();                                 // render page
        this.logger && this.logger.log( 'goto', page_nr );  // logging of 'goto' event
      };

      /**
       * returns current page number
       * @returns {number}
       */
      this.getPage = () => page_nr;

      /**
       * returns number of pages
       * @returns {number}
       */
      this.getPages = () => file.numPages;

      /** when an observed responsive breakpoint triggers */
      this.onbreakpoint = () => renderPage();

      /** updates main HTML template */
      const render = () => this.html.render( this.html.main( this, events, page_nr, file.numPages ), this.element );

      /**
       * renders current page
       * @returns {Promise<void>}
       */
      const renderPage = async () => {

        /**
         * canvas element
         * @type {Element}
         */
        const canvas = this.element.querySelector( 'canvas' );

        /**
         * current page
         * @type {Object}
         */
        const page = await file.getPage( page_nr );

        // scale page
        const viewport = page.getViewport( { scale: canvas.clientWidth / page.getViewport( { scale: 1 } ).width } );
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // update main  HTML template
        await render();

        // render page
        await page.render( {
          canvasContext: canvas.getContext( '2d' ),
          viewport: viewport
        } ).promise;

        // trigger 'onchange' callback and update route
        this.onchange && this.onchange( this, page_nr );
        this.routing && this.routing.set( 'page-' + page_nr );

      };

      /**
       * contains all event handlers
       * @type {Object.<string,Function>}
       */
      const events = {

        /** when 'first page' button is clicked */
        onFirst: () => this.goTo( page_nr = 1 ),

        /** when 'previous page' button is clicked */
        onPrev: () => page_nr > 1 && this.goTo( --page_nr ),

        /**
         * when a page number has been entered
         * @param {Object} event - object of the change event of the input field
         */
        onJump: event => {
          const page = parseInt( event.target.value );
          event.target.value = '';
          page && this.goTo( page );
        },

        /** when 'next page' button is clicked */
        onNext: () => page_nr < file.numPages && this.goTo( ++page_nr ),

        /** when 'last page' button is clicked */
        onLast: () => this.goTo( page_nr = file.numPages )

      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();