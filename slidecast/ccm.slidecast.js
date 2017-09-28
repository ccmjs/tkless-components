/**
 * @overview ccm component for slidecast
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 */

( function () {

  var component = {

    name: 'slidecast',

    ccm: 'https://akless.github.io/ccm/ccm.js',

    config: {
      templates: {
        "main":      {
          "class": "main",
          "inner": [
            {
              "id": "slide",
              "inner": [
                {
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
                    }
                  ]
                }

              ]
            },
            {"id": "opt-content" }
          ]
        },
        "overlay": {
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
      img_width: 720,
      icons: [ 'ccm.load',
        { url: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css', context: document.head },
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
        '../slidecast/resources/default.css' ]
    },

    Instance: function () {

      var self = this;

      this.init = function ( callback ) {

        var counter = 1;
        self.slides.map( function ( slide ) {
          if ( slide.optional_content && self.ccm.helper.isDependency( slide.optional_content ) ) {
            counter++;
            self.ccm.helper.solveDependency( slide, 'optional_content', check );
          }
        } );
        check();

        function check() {
          counter--;
          if ( counter > 0 ) return;
          callback();
        }
      };

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
        self.element.appendChild( self.ccm.helper.protect( self.ccm.helper.html( self.templates.main, {
          all: function () {
            if ( self.slides[ currentSlide ].audio )
              self.element.querySelector( 'audio' ).pause();

            self.element.querySelector('.main').style.display = 'none';
            self.element.querySelector('#all-slides').style.display = 'block';
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

        self.element.appendChild( self.ccm.helper.html( self.templates.overlay ) );

        renderSlide( currentSlide );
        renderSlides();

        //set width of inner-Div equal to img-Div, to fit description-text to same width as its parent.
        var width = self.width || self.element.querySelector('img').offsetWidth;
        self.element.querySelector('.inner').style.width = width + 'px';


        function renderSlide( slide ) {
          var element = self.element.querySelector( '#slide-img' );
          element.innerHTML = '';

          self.element.querySelector( '#all-slides' ).style.display = 'none';
          self.element.querySelector( '.main' ).style.display = 'block';

          element.appendChild( self.ccm.helper.html( self.templates.slide_img, {
            size: 'wrapper big',
            src: self.slides[ slide ].image,
            click: ''
          } ) );

          self.element.querySelector('#description div').innerHTML = '';
          if ( self.slides[ currentSlide ].description)
            self.element.querySelector( '.descr' ).classList.remove( 'disabled' );
          else
            self.element.querySelector( '.descr' ).classList.add( 'disabled' );


          element.querySelector( '.slide-number' ).style.display = 'none';

          renderAudio( currentSlide );
          updateNavigation();

          self.element.querySelector( '#opt-content' ).innerHTML = '';
          if ( self.slides[slide].optional_content ) renderOptionalContent();

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

          function renderOptionalContent() {
            var instance = self.slides[slide].optional_content;
            instance.start( function () {
              self.element.querySelector( '#opt-content' ).appendChild( instance.root );
            } );
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

          var element = self.element.querySelector( '#all' );

          addSlide( currentSlide );
          element.firstElementChild.classList.add( 'container' );
          element.firstElementChild.appendChild(self.ccm.helper.html( self.templates.back , {
            back: function () {
              renderSlide( currentSlide );
            }
          } ) );
          element.firstElementChild.removeChild( element.querySelector( '.slide-number' ) );

          for (var i = 0; i < self.slides.length; i++) {
            addSlide( i );
          }

          function addSlide( i ) {
            var slide_elem = self.ccm.helper.html( self.templates.slide_img, {
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
          var element = self.element.querySelector('#description div');

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

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );