/**
 * @overview ccm component for pdf-viewer
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
      // pdf: //[ "ccm.get", { url: "https://ccm.inf.h-brs.de", store: "file_upload" }, "1517228670954X509252249813553" ],
      //   "//cdn.mozilla.net/pdfjs/tracemonkey.pdf",
      // download: true,
      pdfJS: [ "ccm.load", [ "../libs/pdfjs/pdf.min.js"/*, "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.385/pdf.worker.min.js"*/ ] ],
      pdfJS_workerSrc: [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/pdfjs/pdf.worker.min.js" ],
      css: [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
        "resources/default.css"
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


      this.init = callback => {

        file = self.pdf;
        // pdf.js
        pdfDoc = null;
        pageNum = 1;
        pageRendering = false;
        pageNumPending = null;

        callback();
      };

      this.ready = callback => {

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
          PDFJS.getDocument( my.pdf ).then( function( pdf ) {
            pdfDoc = pdf;
            callback();
          } );
        else callback();

      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {
        if ( self.logger ) self.logger.log( 'start' );

        // if pdf not defined, no file will be displayed
        if ( !my.pdf ) {
          $.setContent( self.element, 'No File to Display' );
          return callback && callback();
        }

        // render input elements
        $.setContent( self.element, $.html( my.html.main, {
          prev: function () {
            // set active button
            self.element.querySelector( '.btn-next' ).classList.remove( 'active' );
            self.element.querySelector( '.btn-prev' ).classList.add( 'active' );
            onPrevPage();
            },
          next: function () {
            // set active button
            self.element.querySelector( '.btn-prev' ).classList.remove( 'active' );
            self.element.querySelector( '.btn-next' ).classList.add( 'active' );
            onNextPage();
            },
          go_to: function () {
            goTo( self.element.querySelector( '#page-num' ).value );
            self.element.querySelector( '#page-num' ).value = '';
            },
          all: function () { pdfDoc.numPages; },
        } ) );

        /*// if file download is set in config, show download link
        if ( my.download ) {
          const download_elem = $.html( my.html.download, {
            get_file: function (){
              //let blob = new Blob( my.pdf, {type: 'application/pdf'});
              //window.location.href = window.URL.createObjectURL(blob);
              //window.open("data:application/pdf;base64," + Base64.encode(my.pdf));
              b64toBlob( my.pdf,  'application/pdf');
              window.location.href = window.URL.createObjectURL( b64toBlob( my.pdf,  'application/pdf') );
            },
            filename :  ( $.isObject( file ) && file.slides  ) ? file.slides[ 0 ].name : file.split( '/' ).pop()
          } );

          self.element.querySelector( '#pdf-elem' ).prepend( download_elem );
          //download_elem.querySelector( 'a' ).href = my.pdf;
        }

        function b64toBlob(b64Data, contentType, sliceSize) {
          contentType = contentType || '';
          sliceSize = sliceSize || 512;

          var byteCharacters = btoa(b64Data);
          var byteArrays = [];

          for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
          }

          var blob = new Blob(byteArrays, {type: contentType});
          return blob;
        }*/

        // set canvas
        const canvas = self.element.querySelector( 'canvas' );
        // disable to downloading the files from canvas element
        canvas.addEventListener('contextmenu', function(e) {
          e.preventDefault();
        });
        ctx = canvas.getContext('2d');
        let page_elem = self.element.querySelector( '#pdf-view' );

        // Initial/first page rendering
        renderPage( pageNum );
        touchEventHandling();

        if( callback ) callback();

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
          if ( self.logger ) self.logger.log( 'prev', pageNum-1 );
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
          if ( self.logger ) self.logger.log( 'next', pageNum+1 );
        }

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}