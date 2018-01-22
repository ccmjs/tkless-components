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
    ccm: 'https://akless.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        "id": "pdf-viewer",
        "class": "container-fluid",
        "inner": [
          {
            "inner": {
              "tag": "a",
              "href": "%href%",
              "title": "Folien herunterladen",
              "download": true,
              "target": "_blank",
              "inner": [
                {
                  "tag": "span",
                  "class": "glyphicon glyphicon-download"
                },
                "&nbsp;Download&nbsp;"
              ]
            }
          },
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
            "class": "row",
            "inner": [
              {
                "class": "input-group col-md-2 col-md-offset-5",
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
                    "class": "form-control text-center",
                    "tag": "input",
                    "type": "text",
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
      },
      pdf: [ "ccm.get", { url: "http://localhost:8080", store: "file_upload" }, "1516286900123X3909963609190472" ],
        //"//cdn.mozilla.net/pdfjs/tracemonkey.pdf",
      scale: "1.5",
      //responsive: "..//pdf-viewer/resources/responsive.css",
      pdfJS: [ "ccm.load", "//mozilla.github.io/pdf.js/build/pdf.js" ],
      css: [ "ccm.load", "https://tkless.github.io/ccm-components/lib/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://tkless.github.io/ccm-components/lib/bootstrap/css/font-face.css" },
        "..//pdf-viewer/resources/default.css"
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

      /**
       * is called once after the initialization and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */

      let pdfDoc,
          pageNum ,
          pageRendering,
          pageNumPending,
          ctx;


      this.init = callback => {
        if ( self.responsive ) ccm.load( { context: this.element.parentNode, url:  "../pdf-viewer/resources/responsive.css" } );

        callback();
      };

      this.ready = callback => {
        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        if ( self.logger ) self.logger.log( 'ready', my );

        // specify PDF.js workerSrc property
        PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

        if(my.pdf.slides) my.pdf = my.pdf.slides[0].data;

        /**
         * Asynchronously downloads PDF.
         */
        PDFJS.getDocument( my.pdf ).then( function( pdf ) {
          pdfDoc = pdf;
          callback();
        });

      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {
        // pdf.js
        pdfDoc = null;
        pageNum = 1;
        pageRendering = false;
        pageNumPending = null;

        // render input elements
        $.setContent( self.element, $.html( my.html, {
          href: my.pdf,
          prev: function () {
            if ( self.logger ) self.logger.log( 'prev', pageNum-1 );

            // set active button
            self.element.querySelector( '.btn-next' ).classList.remove( 'active' );
            self.element.querySelector( '.btn-prev' ).classList.add( 'active' );
            onPrevPage();
            },
          next: function () {
            if ( self.logger ) self.logger.log( 'prev', pageNum+1 );

            // set active button
            self.element.querySelector( '.btn-prev' ).classList.remove( 'active' );
            self.element.querySelector( '.btn-next' ).classList.add( 'active' );
            onNextPage();
            },
          go_to: function ( ) {
            goTo( self.element.querySelector( '#page-num' ).value );
            self.element.querySelector( '#page-num' ).value = '';
            },
          all: pdfDoc.numPages
        } ) );

        // set canvas
        canvas = self.element.querySelector( 'canvas' );
        // disable to downloading the files from canvas element
        canvas.addEventListener('contextmenu', function(e) {
          e.preventDefault();
        });
        ctx = canvas.getContext('2d');

        // Initial/first page rendering
        renderPage( pageNum );

        /**
         * Get page info from document, resize canvas accordingly, and render page.
         * @param num Page number.
         */
        function renderPage( num ) {
          pageRendering = true;
          // Using promise to fetch the page
          pdfDoc.getPage( num ).then( function( page ) {
            let viewport = page.getViewport( my.scale );
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            let renderContext = {
              canvasContext: ctx,
              viewport: viewport
            };
            let renderTask = page.render( renderContext );

            // Wait for rendering to finish
            renderTask.promise.then(function() {
              pageRendering = false;
              if (pageNumPending !== null) {
                // New page rendering is pending
                renderPage(pageNumPending);
                pageNumPending = null;
              }

              //set width to display page number in the middle of pdf-file
              self.element.querySelector( '#nav' ).style.width = self.element.querySelector( '#canvas' ).offsetWidth + "px";
            });
          }, function (err) {
            console.log( err )
          });

          // Update page counters
          self.element.querySelector( '#page-num' ).placeholder = num + " / "+ pdfDoc.numPages;

        }

        /**
         * If another page rendering in progress, waits until the rendering is
         * finised. Otherwise, executes rendering immediately.
         */
        function queueRenderPage(num) {
          if (pageRendering) {
            pageNumPending = num;
          } else {
            renderPage(num);

            //set width to display page number in the middle of pdf-file
            self.element.querySelector( '#nav' ).style.width = self.element.querySelector( '#canvas' ).offsetWidth + "px";
          }
        }

        function goTo( page ) {
          pageNum = page;
          queueRenderPage( parseInt( pageNum ) );
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
        }


        if( callback ) callback();

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}