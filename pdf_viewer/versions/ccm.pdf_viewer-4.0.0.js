/**
 * @overview ccm component for pdf-viewer
 * @see https://github.com/mozilla/pdf.js/
 * @author Tea Kless <tea.kless@web.de>, 2018
 * @license The MIT License (MIT)
 * @version 3.0.0
 * @changes
 * version 3.0.0 (26.10.2018)
 * - uses ccm v18.0.7
 */


( function () {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'pdf_viewer',
    version: [ 4,0,0 ],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.0.7.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        "main": {
          "id": "pdf-viewer",
          "class": "container-fluid",
          "inner": [
            {
              "id": "pdf-elem",
              "inner": {
                "id": "pdf-view",
                "inner": {
                  "id": "canvas",
                  "tag": "canvas"
                }
              }
            },
            {
              "id": "nav",
              "inner": [
                {
                  "class": "input-group",
                  "inner": [
                    {
                      "class": "input-group-btn",
                      "inner": {
                        "class": "btn btn-prev btn-info",
                        "onclick": "%prev%",
                        "inner": "Prev"
                      }
                    },
                    {
                      "id": "page-num",
                      "style": "padding: 0 0 !important",
                      "class": "form-control text-center",
                      "tag": "input",
                      "type": "number",
                      "min": "1",
                      "max": "%all%",
                      "onchange": "%go_to%"
                    },
                    {
                      "class": "input-group-btn",
                      "inner": {
                        "class": "btn btn-next btn-warning",
                        "onclick": "%next%",
                        "inner": "Next"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      // pdf: [ "ccm.get", { url: "", store: "" }, "key" ],
      pdfJS: [ "ccm.load", [ "https://ccmjs.github.io/tkless-components/libs/pdfjs/pdf.js" ] ],
      pdfJS_workerSrc: [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/pdfjs/pdf.worker.js" ],
      css: [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
        "https://ccmjs.github.io/tkless-components/pdf_viewer/resources/default.css"
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

      let pdfDoc,
          pageNum ,
          pageRendering,
          pageNumPending,
          ctx;

      let file;

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
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        if ( self.logger ) self.logger.log( 'ready', my );

        // specify PDF.js workerSrc property
        PDFJS.workerSrc = my.pdfJS_workerSrc;

        if ( $.isObject( my.pdf ) && my.pdf.slides ) my.pdf = my.pdf.slides[ 0 ].data;

        PDFJS.disableStream = true;

        if ( my.pdf )
          // Asynchronously downloads PDF.
          pdfDoc = await PDFJS.getDocument( my.pdf );

      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = async () => {
        if ( self.logger ) self.logger.log( 'start' );

        // if pdf not defined, no file will be displayed
        if ( !my.pdf ) {
          return $.setContent( self.element, 'No File to Display' );

        }

        // render input elements
        $.setContent( self.element, $.html( my.html.main, {
          prev: () => {
            // set active button
            self.element.querySelector( '.btn-next' ).classList.remove( 'active' );
            self.element.querySelector( '.btn-prev' ).classList.add( 'active' );
            onPrevPage();
            },
          next: () => {
            // set active button
            self.element.querySelector( '.btn-prev' ).classList.remove( 'active' );
            self.element.querySelector( '.btn-next' ).classList.add( 'active' );
            onNextPage();
            },
          go_to: () =>{
            goTo( self.element.querySelector( '#page-num' ).value );
            self.element.querySelector( '#page-num' ).value = '';
            },
          all: () => { pdfDoc.numPages; },
        } ) );

        // set canvas
        const canvas = self.element.querySelector( 'canvas' );
        // disable to downloading the files from canvas element
        canvas.addEventListener('contextmenu', event => {
          event.preventDefault();
        });
        ctx = canvas.getContext('2d');
        let page_elem = self.element.querySelector( '#pdf-view' );

        // Initial/first page rendering
        renderPage( pageNum );
        touchEventHandling();

        /**
         * Get page info from document, resize canvas accordingly, and render page.
         * @param num Page number.
         */
        function renderPage( num ) {
          pageRendering = true;
          // Using promise to fetch the page
          pdfDoc.getPage( num ).then( function( page ) {

            let viewport = page.getViewport(1);
            let scale = page_elem.clientWidth / viewport.width;
            viewport = page.getViewport( scale );

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

        }

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

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();