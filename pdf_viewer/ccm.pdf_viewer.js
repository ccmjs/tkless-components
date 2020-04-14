/**
 * @overview ccm component for pdf-viewer
 * @see https://github.com/mozilla/pdf.js/
 * @author Tea Kless <tea.kless@web.de>, 2020
 * @license The MIT License (MIT)
 * @version 6.0.0
 * @changes
 * version 6.0.0 (07.04.2020)
 * - new navigation layout
 * - support routing
 * - loading icon
 * version 5.0.0 (04.03.2019)
 * - switched to latest pdfJS-version v2.3.200
 * - uses ccm v25.0.0
 * version 3.0.0 (07.01.2019)
 * - uses ccm v20.0.0
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'pdf_viewer',

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
      "html": {
        "main": {
          "id": "pdf-view",
          "inner":[
            {
              "id": "canvas",
              "tag": "canvas"
            },
            {
              "id": "nav",
              "inner": [
                /*{
                  "title": "Overview",
                  "class": "all fa fa-th-list fa-lg",
                  "onclick": "%all%"
                },*/
                {
                  "title": "Previous Slide",
                  "class": "prev disabled fa fa-chevron-left fa-lg",
                  "onclick": "%prev%"
                },
                {
                  "title": "First Slide",
                  "class": "first disabled fa fa-step-backward fa-lg",
                  "onclick": "%first%"
                },
                {
                  "tag": "input",
                  "type": "number",
                  "id": "page-num",
                  "onchange": "%go_to%"
                },
                {
                  "title": "Last Slide",
                  "class": "last fa fa-step-forward fa-lg",
                  "onclick": "%last%"
                },
                {
                  "title": "Next Slide",
                  "class": "next fa fa-chevron-right fa-lg",
                  "onclick": "%next%"
                }
                /*{
                  "title": "Description",
                  "class": "descr fa fa-file-text-o fa-lg",
                  "onclick": "%description%"
                }*/
              ]
            },
            {
              "id": "optional_content"
            }
          ]
        }
      },
      //1582232423236X8503292914974735
      // pdf: //[ "ccm.get", { url: "https://ccm.inf.h-brs.de", name: "file_upload" }, "1517228670954X509252249813553" ],
      //   "//cdn.mozilla.net/pdfjs/tracemonkey.pdf",
      //"onchange": function ( self, page ) { console.log( self, page )  },
      "pdfJS": [ "ccm.load", "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.3.200/pdf.js" ],
      "pdfJS_workerSrc": [ "ccm.load", "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.3.200/pdf.worker.js" ],
      "routing": [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-2.0.4.js", { "app": "pdf_viewer" } ],
      "css": [ "ccm.load", {  "context":"head", "url": "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" },
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
        "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/player.css"
      ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-5.0.0.mjs" ]
    },

    Instance: function () {
      /**
       * own reference for inner functions
       * @type {Instance}
       */
      const self = this;

      /**
       * shortcut to help functions
       * @type {Object.<string,function>}
       */
      let $;

      let pdfDoc,
        pageNum,
        pageRendering,
        pageNumPending,
        ctx;

      let file, canvas, page_elem;

      this.init = async () => {

        file = self.pdf;
        // pdf.js
        pdfDoc = null;
        pageNum = 1;
        pageRendering = false;
        pageNumPending = null;
      };

      this.ready = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );

        if ( self.logger ) self.logger.log( 'ready', $.clone( self ) );

        let pdfjsLib = window['pdfjs-dist/build/pdf'];

        // specify PDF.js workerSrc property
        if ( !pdfjsLib.GlobalWorkerOptions.workerSrc ) pdfjsLib.GlobalWorkerOptions.workerSrc = self.pdfJS_workerSrc;

        if ( $.isObject( self.pdf ) && self.pdf.slides ) self.pdf = self.pdf.slides[ 0 ].data;

        if ( self.pdf )
          // Asynchronously downloads PDF.
          pdfDoc = await pdfjsLib.getDocument( self.pdf ).promise;

      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = async () => {
        if ( self.logger ) self.logger.log( 'start' );

        // if pdf not defined, no file will be displayed
        if ( !self.pdf ) return $.setContent( self.element, 'No File to Display' );

        // render input elements
        $.setContent( self.element, $.html( self.html.main, {
          prev: () => {
            onPrevPage();
          },
          next: () => {
            onNextPage();
          },
          go_to: () =>{
            goTo( self.element.querySelector( '#page-num' ).value );
            self.element.querySelector( '#page-num' ).value = '';
          },
          all: () => { pdfDoc.numPages; },
          last: () => {
            goTo( pdfDoc.numPages );
          },
          first: () => {
            goTo( '1' );
          }
        } ) );

        // set canvas
        canvas = self.element.querySelector( 'canvas' );
        // disable to downloading the files from canvas element
        canvas.addEventListener('contextmenu', event => {
          event.preventDefault();
        });
        ctx = canvas.getContext('2d');
        page_elem = self.element.querySelector( '#pdf-view' );

        // Initial/first page rendering
        if ( self.routing && self.routing.get() ) {
          pageNum = self.routing.get().split( '-' )[ 1 ];
          self.onchange && self.onchange( self, pageNum );
        }
        else
          renderPage( pageNum );

        touchEventHandling();

        // define and check routes
        self.routing && self.routing.define( { page: number => renderPage( number ) } );

      };

      /**
       * Get page info from document, resize canvas accordingly, and render page.
       * @param num Page number.
       */
      function renderPage( num ) {
        num = parseInt( num );

        pageRendering = true;
        // Using promise to fetch the page
        pdfDoc.getPage( num ).then( function( page ) {

          let viewport = page.getViewport({ scale: 1} );
          let scale = page_elem.clientWidth / viewport.width;
          viewport = page.getViewport( { scale: scale } );

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Render PDF page into canvas context
          let renderContext = {
            canvasContext: ctx,
            viewport: viewport
          };
          let renderTask = page.render( renderContext );

          // Wait for rendering to finish
          renderTask.promise.then( function() {
            pageRendering = false;
            if (pageNumPending !== null) {
              // New page rendering is pending
              renderPage(pageNumPending);
              pageNumPending = null;
            }

            if ( pdfDoc.numPages > 1 ) {
              //set width to display page number in the middle of pdf-file
              self.element.querySelector( '#nav' ).style.width = self.element.querySelector( '#canvas' ).offsetWidth + "px";
              // Update page counters
              self.element.querySelector( '#page-num' ).placeholder = num + " / "+ pdfDoc.numPages;
            }
            else
              self.element.querySelector( '#nav' ).remove();
          });
        }, function ( err ) {
          console.log( err )
        });

        checkButtons();

      }

      this.onbreakpoint = () => { renderPage( pageNum ); };

      function touchEventHandling() {
        let reachedEdge = false;
        let touchStart = null;
        let touchDown = false;

        page_elem.addEventListener( 'touchstart', function( ) {
          touchDown = true;
        });

        page_elem.addEventListener( 'touchmove', function( event ) {
          if ( page_elem.scrollLeft === 0 ||
            page_elem.scrollLeft === page_elem.scrollWidth - page_elem.clientWidth ) {
            reachedEdge = true;
          } else {
            reachedEdge = false;
            touchStart = null;
          }

          if ( reachedEdge && touchDown ) {
            if (touchStart === null) {
              touchStart = event.changedTouches[0].clientX;
            } else {
              let distance = event.changedTouches[0].clientX - touchStart;
              if (distance < -100) {
                touchStart = null;
                reachedEdge = false;
                touchDown = false;
                onNextPage();
              } else if ( distance > 100 ) {
                touchStart = null;
                reachedEdge = false;
                touchDown = false;
                onPrevPage();
              }
            }
          }
        });

        page_elem.addEventListener( 'touchend', function() {
          touchStart = null;
          touchDown = false;
        });
      }

      /**
       * If another page rendering in progress, waits until the rendering is
       * finised. Otherwise, executes rendering immediately.
       */
      function queueRenderPage( num ) {
        if (pageRendering) {
          pageNumPending = num;
        } else {
          renderPage(num);
          //set width to display page number in the middle of pdf-file
          self.element.querySelector( '#nav' ).style.width = self.element.querySelector( '#canvas' ).offsetWidth + "px";
          self.onchange && self.onchange( self, num );
          self.routing && self.routing.set( 'page-' + num );
        }
      }

      function goTo( page ) {
        if ( page > pdfDoc.numPages || page < 1 )
          return;
        pageNum = page;
        queueRenderPage( parseInt( pageNum ) );
        if ( self.logger ) self.logger.log( 'goto', parseInt( page ) );
      }

      /**
       * Displays previous page.
       */
      function onPrevPage() {
        if (pageNum <= 1) {
          return;
        }
        pageNum--;
        queueRenderPage(pageNum);
        if ( self.logger ) self.logger.log( 'prev', pageNum );
      }

      /**
       * Displays next page.
       */
      function onNextPage() {
        if (pageNum >= pdfDoc.numPages) {
          return;
        }
        pageNum++;
        queueRenderPage(pageNum);
        if ( self.logger ) self.logger.log( 'next', pageNum );
      }

      function checkButtons() {
        if ( pageNum == 1 ) {
          self.element.querySelector( '.prev' ).classList.add ('disabled' );
          self.element.querySelector( '.first' ).classList.add ('disabled' );
          self.element.querySelector( '.next' ).classList.remove( 'disabled' );
          self.element.querySelector( '.last' ).classList.remove( 'disabled' );
        }
        else if ( pageNum == pdfDoc.numPages ) {
          self.element.querySelector( '.next' ).classList.add( 'disabled' );
          self.element.querySelector( '.last' ).classList.add( 'disabled' );
          self.element.querySelector( '.prev' ).classList.remove ('disabled' );
          self.element.querySelector( '.first' ).classList.remove ('disabled' );
        }
        else {
          self.element.querySelector( '.next' ).classList.remove( 'disabled' );
          self.element.querySelector( '.last' ).classList.remove( 'disabled' );
          self.element.querySelector( '.prev' ).classList.remove ('disabled' );
          self.element.querySelector( '.first' ).classList.remove ('disabled' );
        }
      }

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
