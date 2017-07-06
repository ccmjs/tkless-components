/**
 * @overview ccm component for slidecast
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 */

( function () {

  var ccm_version = '9.0.0';
  var ccm_url     = 'https://akless.github.io/ccm/ccm.js';

  var component_name = 'slidecast';
  var component_obj  = {
    name: component_name,

    config: {
      templates: {
        "main":    {
          "class": "main",
          "inner": [
            { "class": "slide",
              "inner": [
                {
                  "class": "inner",
                  "inner": [
                    {
                      "class": "slide_img"
                    },
                    {
                      "class": "nav",
                      "inner": [
                        {
                          "class": "all fa fa-th-list fa-lg",
                          "onclick": "%all%"
                        },
                        {
                          "class": "prev disabled fa fa-chevron-left fa-lg",
                          "onclick": "%prev%"
                        },
                        {
                          "class": "first disabled fa fa-step-backward fa-lg",
                          "onclick": "%first%"
                        },
                        {
                          "class": "audio"
                        },
                        {
                          "class": "last fa fa-step-forward fa-lg",
                          "onclick": "%last%"
                        },
                        {
                          "class": "next fa fa-chevron-right fa-lg",
                          "onclick": "%next%"
                        },
                        {
                          "class": "descr fa fa-file-text-o fa-lg",
                          "onclick": "%description%"
                        }
                      ]
                    },
                    { "class": "description",
                      "inner" : {
                        "inner": "%p%"
                      }
                    }
                  ]
                }

              ]
            },
            {"class": "opt_content" }
          ]
        },
        "overlay": {
          "class": "overlay",
          "inner": [
            {
              "class": "all_slides"
            }
          ]
        },
        "slide":   {
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
              "class": "slide_number",
              "inner": "%slide_number%"
            }
          ]

        },
        "back":    {
          "class": " back_to_current fa fa-arrow-circle-o-left fa-5x",
          "onclick": "%back%"
        }
      },
      img_width:    720,
      slides:       [ 'ccm.get',   'https://tkless.github.io/ccm-components/slidecast/slidecast_datastore.js', 'demo_offline.slides'],
      style_global: [ 'ccm.load',  'https://tkless.github.io/ccm-components/slidecast/style.css' ],
      icons: [ 'ccm.load', { url: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css', context: document.head },
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css' ]
    },

    Instance: function () {

      var self = this;

      this.ready = function ( callback ) {
        if ( !self.slides ) return;

        // collect all URL's of resources that have to be preloaded
        var urls = [];
        self.slides.map( function ( slide ) {
          if ( slide.image ) urls.push( slide.image );
          //if ( slide.audio ) urls.push( slide.audio );
        } );
        urls.push( callback );

        // preload all collected resources in parallel
        self.ccm.load.apply( undefined, urls );
      };

      this.start = function ( callback ) {
        var currentSlide = 0;


        self.element.innerHTML = '';
        self.element.appendChild( self.ccm.helper.protect( self.ccm.helper.html( self.templates.get( 'main' ), {
          all: function () {
            if ( self.slides[ currentSlide ].audio )
              self.element.querySelector( 'audio' ).pause();

            self.element.querySelector('.main').style.display = 'none';
            self.element.querySelector('.overlay').style.display = 'block';
            self.element.querySelector( '.container img').setAttribute( 'src', self.slides[ currentSlide ].image );
          },

          prev: function () {
            if ( currentSlide === 0 ) return;
            currentSlide--;
            renderSlide( currentSlide );
          },

          first: function () {
            if ( currentSlide === 0 ) return;
            currentSlide = 0;
            renderSlide( 0 );
          },

          last: function () {
            if ( currentSlide === self.slides.length - 1 ) return;
            currentSlide = self.slides.length - 1;
            renderSlide( self.slides.length -1 );
          },

          next: function () {
            if ( currentSlide === self.slides.length - 1 ) return;
            currentSlide++;
            renderSlide( currentSlide );
          },

          description: function () {
            if ( self.slides[ currentSlide].description )
              renderDescription();
          }
        } ) ) );

        self.element.appendChild( self.ccm.helper.html( self.templates.get( 'overlay' ) ) );

        renderSlide( currentSlide );
        renderSlides();

        //set width of inner-Div equal to img-Div, to fit description-text to same width as its parent.
        var width = self.width || self.element.querySelector('img').offsetWidth;
        self.element.querySelector('.inner').style.width = width + 'px';


        function renderSlide( slide ) {
          var element = self.element.querySelector( '.slide_img' );
          element.innerHTML = '';

          self.element.querySelector( '.overlay' ).style.display = 'none';
          self.element.querySelector( '.main' ).style.display = 'block';

          element.appendChild( self.ccm.helper.html( self.templates.get( 'slide' ), {
            size: 'wrapper big',
            src: self.slides[ slide ].image,
            click: ''
          } ) );

          self.element.querySelector('.description div').innerHTML = '';
          if ( self.slides[ currentSlide ].description)
            self.element.querySelector( '.descr' ).classList.remove( 'disabled' );
          else
            self.element.querySelector( '.descr' ).classList.add( 'disabled' );


          element.querySelector( '.slide_number' ).style.display = 'none';

          renderAudio( currentSlide );
          updateNavigation();

          function updateNavigation() {

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
        }

        function renderAudio( index ) {
          var element = self.element.querySelector( '.audio' );

          if ( self.slides[ index ].audio )
            element.innerHTML = '<audio autoplay controls><source src="' + self.slides[ index ].audio + '"></audio>';
          else
            element.innerHTML = ' ';
        }

        function renderSlides() {

          var element = self.element.querySelector( '.all_slides' );

          addSlide( currentSlide );
          element.firstElementChild.classList.add( 'container' );
          element.firstElementChild.appendChild(self.ccm.helper.html( self.templates.get( 'back' ) , {
            back: function () {
              renderSlide( currentSlide );
            }
          } ) );
          element.firstElementChild.removeChild( element.querySelector( '.slide_number' ) );

          for (var i = 0; i < self.slides.length; i++) {
            addSlide( i );
          }

          function addSlide( i ) {
            var slide_elem = self.ccm.helper.html( self.templates.get( 'slide' ), {
              size: 'wrapper small',
              src: self.slides[ i ].image,
              slide_number: i + 1,
              click: function () {
                currentSlide = i;
                renderSlide( currentSlide );
              }
            } );
            element.appendChild( slide_elem );
          }

        }

        function renderDescription() {
          var element = self.element.querySelector('.description div');

          element.innerHTML = '';

          element.innerHTML = self.slides[ currentSlide ].description;

          if (  element.style.maxHeight )
            element.style.maxHeight = null;
          else
            element.style.maxHeight = element.scrollHeight + "px";
        }

        if ( callback ) callback( self );
      };

    }
  };

  var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
  if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
  function register() { ccm[ ccm_version ].component( component_obj ); }
}() );