/**
 * @overview ccmjs-based web component for PDF viewer
 * @see https://github.com/mozilla/pdf.js/
 * @author Tea Kless <tea.kless@web.de> 2020
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version 7.1.0
 * @changes
 * version 7.1.0 (30.12.2021):
 * - uses ccmjs v27.1.2 as default
 * - set start page via config
 * - bugfix for optional routing
 * - added optional multilingualism
 * - added keyboard controls
 * version 7.0.0 (22.10.2021): reimplementation by akless
 * TODO: touch control
 */

( () => {
  const component = {
    name: 'pdf_viewer',
    version: [ 7, 1, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.1.2.min.js',
    config: {
      "css": [ "ccm.load",
        "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/styles.min.css",
        "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap-icons.min.css",
        { "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap-fonts.min.css", "context": "head" },
      ],
      "downloadable": true,
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.8.0.min.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/templates.mjs" ],
//    "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.0.0.min.js" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.min.js", "greedy" ] ],
//    "onchange": ( instance, page ) => { console.log( instance, page ) },
      "page": 1,
      "pdf": "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/demo/en/slides.pdf",
      "pdfjs": {
        "lib": [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/pdfjs-2/pdf.min.js" ],
        "worker": "https://ccmjs.github.io/tkless-components/libs/pdfjs-2/pdf.worker.min.js",
        "namespace": "pdfjs-dist/build/pdf"
      },
//    "routing": [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-3.0.0.min.js" ],
      "text": [ "ccm.load", "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/resources.mjs#en" ],
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
      let page_nr;

      /**
       * rendering of a PDF page is not finished
       * @type {boolean}
       */
      let rendering = false;

      /**
       * when the instance is created, when all dependencies have been resolved and before the dependent sub-instances are initialized and ready
       * @returns {Promise<void>}
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // setup PDF.js library
        const pdfjs = window[ this.pdfjs.namespace ];
        if ( !pdfjs.GlobalWorkerOptions.workerSrc ) pdfjs.GlobalWorkerOptions.workerSrc = this.pdfjs.worker;
        this.pdfjs = pdfjs;

      };

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {

        this.routing && this.routing.define( { page: number => { page_nr = number; renderPage(); } } );  // define routes
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );                            // logging of 'ready' event

        // add keyboard controls
        this.element.addEventListener( 'keydown', event => {
          switch ( event.key ) {
            case 'ArrowLeft': events.onPrev(); break;
            case 'ArrowRight': events.onNext(); break;
            case 'ArrowUp': events.onFirst(); break;
            case 'ArrowDown': events.onLast(); break;
          }
        } );

      }

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // load PDF
        try {
          file = await this.pdfjs.getDocument( this.pdf ).promise;
        }
        catch ( exception ) {
          if ( exception.name !== 'PasswordException' ) return $.setContent( this.element, '' );
          try { file = await this.pdfjs.getDocument( { url: this.pdf, password: prompt( this.text.protected ) } ).promise; } catch ( e ) {}
          if ( !file ) return $.setContent( this.element, this.text.denied );
        }

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        // render main HTML structure
        render();

        // render language selection
        this.lang && !this.lang.getContext() && $.append( this.element.querySelector( 'header' ), this.lang.root );

        // render language selection and user login/logout
        const header = this.element.querySelector( 'header' );
        if ( header ) {
          header && this.lang && !this.lang.getContext() && $.append( header, this.lang.root );
          header && this.user && $.append( header, this.user.root );
        }

        /**
         * canvas element
         * @type {Element}
         */
        const canvas = this.element.querySelector( 'canvas' );

        // disable to downloading the files from canvas element
        !this.downloadable && canvas && canvas.addEventListener( 'contextmenu', event => event.preventDefault() );

        // render page
        page_nr = this.page;
        if ( this.routing && this.routing.get() )
          await this.routing.refresh();
        else
          await renderPage();

        // setup touch control
        if ( this.touchable && canvas ) {
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

      };

      /**
       * opens a specific page
       * @param {number} page - page number
       * @returns {Promise<void>}
       */
      this.goTo = async page => {
        if ( page < 1 || page > file.numPages ) return;         // invalid page number? => abort
        page_nr = page;                                         // update current page number
        this.routing && this.routing.set( 'page-' + page_nr );  // update route
        await renderPage();                                     // render page
        this.logger && this.logger.log( 'goto', page_nr );      // logging of 'goto' event
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
      this.onbreakpoint = this.refresh = () => renderPage();

      /** updates main HTML template */
      const render = () => {
        this.html.render( this.html.main( this, events, page_nr, file.numPages ), this.element );
        this.lang && this.lang.translate();
      }

      /**
       * renders current page
       * @returns {Promise<void>}
       */
      const renderPage = async () => {

        // rendering of an other PDF page is not finished? => abort
        if ( rendering ) return;  rendering = true;

        /**
         * canvas element
         * @type {Element}
         */
        const canvas = this.element.querySelector( 'canvas' ); if ( !canvas ) { rendering = false; return; }

        // give canvas element a moment to resize
        await $.sleep( 30 );

        /**
         * current page
         * @type {Object}
         */
        const page = await file.getPage( page_nr );

        // scale page
        const viewport = page.getViewport( { scale: canvas.clientWidth / page.getViewport( { scale: 1 } ).width } );
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // update main HTML template
        await render();

        // render page
        await page.render( {
          canvasContext: canvas.getContext( '2d' ),
          viewport: viewport
        } ).promise;

        // rendering of PDF page is finished
        rendering = false;

      };

      /**
       * contains all event handlers
       * @type {Object.<string,Function>}
       */
      const events = {

        /**
         * when 'first page' button is clicked
         * @returns {Promise<void>}
         */
        onFirst: async () => {
          if ( this.onchange && await this.onchange( { name: 'first', page: page_nr, instance: this, before: true } ) ) return;
          if ( page_nr <= 1 ) return;
          await this.goTo( page_nr = 1 );
          this.onchange && this.onchange( { name: 'first', page: page_nr, instance: this } );
        },

        /**
         * when 'previous page' button is clicked
         * @returns {Promise<void>}
         */
        onPrev: async () => {
          if ( this.onchange && await this.onchange( { name: 'prev', page: page_nr, instance: this, before: true } ) ) return;
          if ( page_nr <= 1 ) return;
          await this.goTo( --page_nr );
          this.onchange && this.onchange( { name: 'prev', page: page_nr, instance: this } );
        },

        /**
         * when a page number has been entered
         * @param {Object} event - event data from 'onchange' event of input field, which is used to jump directly to a specific page
         * @returns {Promise<void>}
         */
        onJump: async event => {
          const page = parseInt( event.target.value );
          event.target.value = '';
          if ( this.onchange && await this.onchange( { name: 'jump', page: page, instance: this, before: true } ) ) return;
          if ( !page || page < 1 || page > file.numPages || page === page_nr ) return;
          await this.goTo( page );
          this.onchange && this.onchange( { name: 'jump', page: page, instance: this } );
        },

        /**
         * when 'next page' button is clicked
         * @returns {Promise<void>}
         */
        onNext: async () => {
          if ( this.onchange && await this.onchange( { name: 'next', page: page_nr, instance: this, before: true } ) ) return;
          if ( page_nr >= file.numPages ) return;
          await this.goTo( ++page_nr );
          this.onchange && this.onchange( { name: 'next', page: page_nr, instance: this } );
        },

        /**
         * when 'last page' button is clicked
         * @returns {Promise<void>}
         */
        onLast: async () => {
          if ( this.onchange && await this.onchange( { name: 'last', page: page_nr, instance: this, before: true } ) ) return;
          if ( page_nr >= file.numPages ) return;
          await this.goTo( page_nr = file.numPages );
          this.onchange && this.onchange( { name: 'last', page: page_nr, instance: this } );
        }

      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
