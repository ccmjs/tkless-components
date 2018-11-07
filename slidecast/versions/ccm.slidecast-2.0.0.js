/**
 * @overview ccm component for slidecast
 * @author Tea Kless <tea.kless@web.de>, 2018
 * @license The MIT License (MIT)
 * @version 2.0.0
 * @changes
 * version 2.0.0 (05.11.2018)
 * - uses ccm v18.3.0
 */

( function () {

  const component = {

    name: 'slidecast',
    version: [ 2,0,0 ],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.3.0.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        "main":      {
          "id": "main",
          "inner": [
            {
              "id": "slide",
              "inner": {
                  "class": "inner",
                  "inner": [
                    {
                      "id": "slide-img"
                    },
                    {
                      "id": "nav",
                      "inner": [
                        {
                          "title": "Overview",
                          "class": "all fa fa-th-list fa-lg",
                          "onclick": "%all%"
                        },
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
                          "class": "audio"
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
                        },
                        {
                          "title": "Description",
                          "class": "descr fa fa-file-text-o fa-lg",
                          "onclick": "%description%"
                        }
                      ]
                    },
                    { "id": "description",
                      "inner" : {
                        "inner": "%p%"
                      }
                    },
                    {"id": "opt-content" }
                  ]
                }
            }
          ]
        },
        "overlay":  {
          "id": "all-slides",
          "inner": { "id": "all" }
        },
        "slide_img": {
          "class": "%size%",
          "inner": [
            {
              "inner": [
                {
                  "tag": "img",
                  "src": "%src%",
                  "onclick": "%click%"
                }
              ]
            },
            {
              "class": "slide-number",
              "inner": "%slide_number%"
            }
          ]
        },
        "back":      {
          "class": " back-to-current fa fa-arrow-circle-o-left fa-5x",
          "onclick": "%back%"
        }
      },
      icons: [ 'ccm.load',
        {  context:'head', url: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css' },
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
        'https://ccmjs.github.io/tkless-components/slidecast/resources/default.css' ]
    },

    Instance: function () {

      const self = this;
      let $;

      this.ready = async () => {
        $ = self.ccm.helper;
        if ( !self.slides ) return $.setContent( self.element, $.html("Nothing to display!") );

        // collect all URL's of resources that have to be preloaded
        let urls = [];
        self.slides.map( slide => {
          if ( slide.image ) urls.push( slide.image );
          if ( slide.audio ) urls.push( slide.audio );
        } );
        urls.push();

        // preload all collected resources in parallel
        await self.ccm.load.apply( undefined, urls );
      };

      this.start = async () => {
        if ( !self.slides )
          return $.setContent( self.element, "Nothing to Display!");

        let currentSlide = 0;

        $.setContent( self.element, '');

        $.setContent( self.element, $.html( self.html.main, {
          all: ( event ) => {
            if ( self.slides[ currentSlide ].audio )
              self.element.querySelector( 'audio' ).pause();

            self.element.querySelector( '#main' ).style.display = 'none';
            self.element.querySelector( '#all-slides' ).style.display = 'block';
            self.element.querySelector( '.container img' ).setAttribute( 'src', self.slides[ currentSlide ].image );
          },

          prev: () => {
            if ( currentSlide === 0 ) return;
            currentSlide--;
            renderSlide( currentSlide );
            updateControls();
          },

          first: () => {
            if ( currentSlide === 0 ) return;
            currentSlide = 0;
            renderSlide( 0 );
            updateControls();
          },

          last: () => {
            if ( currentSlide === self.slides.length - 1 ) return;
            currentSlide = self.slides.length - 1;
            renderSlide( self.slides.length -1 );
            updateControls();
          },

          next: () => {
            if ( currentSlide === self.slides.length - 1 ) return;
            currentSlide++;
            renderSlide( currentSlide );
            updateControls();
          },

          description: () => {
            if ( self.slides[ currentSlide].description )
              renderDescription();
          }
        } ) );

        self.element.appendChild( $.html( self.html.overlay ) );

        await renderSlide( currentSlide );
        renderSlides();

        //set width of inner-Div equal to img-Div, to fit description-text to same width as its parent.
        let width = self.width || self.element.querySelector('img').offsetWidth;
        self.element.querySelector('.inner').style.width = width + 'px';


        async function renderSlide( slide ) {
          let element = self.element.querySelector( '#slide-img' );
          $.setContent( element, '');

          self.element.querySelector( '#all-slides' ).style.display = 'none';
          self.element.querySelector( '#main' ).style.display = 'block';

          element.appendChild( $.html( self.html.slide_img, {
            size: 'wrapper big',
            src: self.slides[ slide ].image,
            click: ''
          } ) );

          $.setContent ( self.element.querySelector('#description div'),  '');
          if ( self.slides[ currentSlide ].description)
            self.element.querySelector( '.descr' ).classList.remove( 'disabled' );
          else
            self.element.querySelector( '.descr' ).classList.add( 'disabled' );


          element.querySelector( '.slide-number' ).style.display = 'none';

          renderAudio( currentSlide );


          self.element.querySelector( '#opt-content' ).innerHTML = '';
          if ( self.slides[slide].optional_content ) await renderOptionalContent();

          async function renderOptionalContent() {
            let instance = self.slides[slide].optional_content;
            await instance.start();
            self.element.querySelector( '#opt-content' ).appendChild( instance.root );
          }
        }

        function updateControls() {

          if ( currentSlide === 0 ) {
            self.element.querySelector( '.first' ).classList.add( 'disabled' );
            self.element.querySelector( '.prev' ).classList.add( 'disabled' );
            self.element.querySelector( '.last' ).classList.remove( 'disabled' );
            self.element.querySelector( '.next' ).classList.remove( 'disabled' );
          }

          else if ( currentSlide === self.slides.length - 1 ) {
            self.element.querySelector( '.last' ).classList.add( 'disabled' );
            self.element.querySelector( '.next' ).classList.add( 'disabled' );
            self.element.querySelector( '.prev' ).classList.remove('disabled' );
            self.element.querySelector( '.first' ).classList.remove( 'disabled' );
          }

          else {
            self.element.querySelector( '.last' ).classList.remove( 'disabled' );
            self.element.querySelector( '.next' ).classList.remove( 'disabled' );
            self.element.querySelector( '.prev' ).classList.remove( 'disabled' );
            self.element.querySelector( '.first' ).classList.remove( 'disabled' );
          }
        }

        function renderAudio( index ) {
          let element = self.element.querySelector( '.audio' );

          if ( self.slides[ index ].audio )
            $.setContent( element, $.html( '<audio autoplay controls><source src="' + self.slides[ index ].audio + '"></audio>' ) );
          else
            $.setContent( element, '' );
        }

        function renderSlides() {

          let element = self.element.querySelector( '#all' );

          addSlide( currentSlide );
          element.firstElementChild.classList.add( 'container' );
          element.firstElementChild.appendChild( $.html( self.html.back , {
            //back: renderSlide( currentSlide )
          } ) );
          element.firstElementChild.removeChild( element.querySelector( '.slide-number' ) );

          for ( let i = 0; i < self.slides.length; i++ ) {
            addSlide( i );
          }

          function addSlide( i ) {
            let slide_elem = $.html( self.html.slide_img, {
              size: 'wrapper small',
              src: self.slides[ i ].image,
              slide_number: i + 1,
              click: async() => {
                currentSlide = i;
                await renderSlide( currentSlide );
              }
            } );
            element.appendChild( slide_elem );
          }

        }

        function renderDescription() {
          const element = self.element.querySelector('#description div');

          $.setContent( element, '' );

          $.setContent( element, self.slides[ currentSlide ].description );

          if (  element.style.maxHeight )
            element.style.maxHeight = null;
          else
            element.style.maxHeight = element.scrollHeight + "px";
        }
    };

    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();