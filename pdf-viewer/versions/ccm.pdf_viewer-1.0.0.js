/**
 * @overview ccm component  pdf htm-viewer
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
    version:[ 1,0,0 ],

    ccm:{
      url: 'https://akless.github.io/ccm/version/ccm-11.5.0.min.js',
      integrity: "sha384-7lrORUPPd2raLsrPJYo0Arz8csPcGzgyNbKOr9Rx3k0ECU0T8BP+B1ejo8+wmUzh",
      crossorigin:"anonymous"
    },

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      "html": {
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
            "class": "navigation text-center",
            "inner": [
              {
                "class": "btn-group",
                "inner":[
                  {
                    "tag": "a",
                    "typ": "button",
                    "class": "active btn btn-prev btn-info info",
                    "onclick": "%prev%",
                    "inner": "Previous"
                  },
                  {
                    "tag": "a",
                    "typ": "button",
                    "id": "page-num",
                    "class": "active btn btn-success info",
                  },
                  {
                    "tag": "a",
                    "typ": "button",
                    "class": "btn btn-next btn-warning info",
                    "onclick": "%next%",
                    "inner": "Next"
                  }
                ]
              }
            ]
          }
        ]
      },
      path_to_pdf: "//cdn.mozilla.net/pdfjs/tracemonkey.pdf",
      scale: "1.5",
      //responsive: "https://tkless.github.io/ccm-components/pdf-viewer/resources/responsive.css",

      "pdfJS": [ "ccm.load", "//mozilla.github.io/pdf.js/build/pdf.js" ],
      "css": [ "ccm.load", "https://tkless.github.io/ccm-components/lib/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://tkless.github.io/ccm-components/lib/bootstrap/css/font-face.css" },
        "https://tkless.github.io/ccm-components/pdf-viewer/resources/default.css"
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
          scale = 0.8,
          ctx;


      this.init = callback => {
        if ( self.responsive ) ccm.load( { context: this.element.parentNode, url: self.responsive } );
        // pdf.js
        pdfDoc = null;
        pageNum = 1;
        pageRendering = false;
        pageNumPending = null;
        scale = 0.8;

        callback();
      };

      this.ready = callback => {
        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        // specify PDF.js workerSrc property
        PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

        /**
         * Asynchronously downloads PDF.
         */
        PDFJS.getDocument( my.path_to_pdf ).then( function( pdf ) {
          pdfDoc = pdf;
          callback();
        });

      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {

        // render input elements
        $.setContent( self.element, $.html( my.html, {
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
            onNextPage(); }
        } ) );

        // set canvas
        canvas = self.element.querySelector( 'canvas' );
        // disable to downloading the files
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
            });
          });

          // Update page counters
          self.element.querySelector('#page-num').innerHTML = num + " / "+ pdfDoc.numPages;

          //set page width to display page number in the middle of pdf-file
          //self.element.querySelector( '#page' ).style.width = self.element.querySelector( '#pdf-view' ).offsetWidth + "px";

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
          }
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