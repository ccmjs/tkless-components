/**
 * @overview ccm component for slidecast
 * @author Tea Kless <tmeskh2s@smail.inf.h-brs.de>, 2015
 * @license The MIT License (MIT)
 */

ccm.component( {

  /*-------------------------------------------- public component members --------------------------------------------*/

  /**
   * component name
   * @type {string}
   * @ignore
   */
  name: 'sc',

  /**
   * @summary default instance configuration
   * @type {ccm.components.sc.config}
   * @readonly
   */
  config: {

    store:       [ ccm.store, '../slidecast/sc.json' ],
    opt_content: [ ccm.component, '../forum/ccm.forum.js' ],
    uijs:        [ ccm.load, 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js' ],
    uicss:       [ ccm.load, 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.css' ],
    caruselCss:  [ ccm.load, 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.3.15/slick.css' ],
    caruselJs:   [ ccm.load, 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.3.15/slick.min.js' ],
    style:       [ ccm.load, '../slidecast/sc.css' ],
    key:         'kolloquium'

  },

  /*-------------------------------------------- public component classes --------------------------------------------*/

  /**
   * @alias ccm.components.sc
   * @class
   */
  Instance: function () {

    /*------------------------------------------- private instance members -------------------------------------------*/

    /**
     * @summary own context
     * @private
     * @type {ccm.instance}
     * @this ccm.instance
     */
    var self = this;

    /**
     * @summary created instances for optinal content
     * @type {Object.<ccm.key,ccm.instance>}
     */
    var opt_content_instances = {};

    /*------------------------------------------- public instance methods --------------------------------------------*/

    /**
     * @summary render content in own website area
     * @param {function} [callback] - callback when ccm instance is rendered (first parameter is ccm instance)
     */
    this.render = function ( callback ) {

      /**
       * website area for own content
       * @type {ccm.element}
       */
      var element = ccm.helper.element( self );

      // get slidecast dataset
      self.store.get( self.key, function ( sc ) {

        // create inner website areas of website area for own content
        element.html(

          '<div class="sc_carousel"></div>' +
          '<div class="sc_slide"></div>' +
          '<div class="sc_slide_descr"></div>' +
          '<div class="sc_opt_content"></div>'

        );

        // render slide carusel
        renderCarouselAndSlide();

        // render slide description
        renderDescription( 0 );

        // render slide audio
        renderAudio( 0 );

        // render slide specific optional content
        //renderOptionalContent( 0 );

        // perform callback
        if ( callback ) callback();

        /**
         * render slide carusel
         */
        function renderCarouselAndSlide() {

          for ( var i = 0; i < sc.slides.length; i++ ) {

            ccm.helper.find( self, 'div.sc_carousel' ).append( '<div><img class="sc_slide_list" data-sc-id="' + i + '" src="' + ccm.helper.val( sc.slides[ i ].image, 'url' ) + '"></div>' );
            ccm.helper.find( self, 'div.sc_slide' ).append( '<div><img src="' + ccm.helper.val( sc.slides[ i ].image, 'url' ) + '"></div>' );

          }

          // render slide carusel
          ccm.helper.find( self, 'div.sc_carousel' ).slick( {
            accessibility: true,
            slidesToShow: sc.slides.length > 5 ? 5 : sc.slides.length - 1,
            slidesToScroll: 1,
            asNavFor: 'div.sc_slide',
            focusOnSelect: true,
            swipeToSlide: true,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  swipeToSlide: true
                }
              },
              {
                breakpoint: 570,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  swipeToSlide: true
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  swipeToSlide: true
                }
              }
            ],
            onAfterChange: function ( slider, index ) {
              renderDescription( index );
              renderAudio( index );
              renderOptionalContent( index );
            }

          } );

          ccm.helper.find( self, 'div.sc_slide' ).slick ( {

            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: 'div.sc_carousel'

          } );

          ccm.helper.find( self, 'div.sc_slide').append( '<div class="sc_audio"></div>' );

        }

        /**
         * render slide description
         * @param {number} index - slide index
         */
        function renderDescription( index ) {

          var slide_descr = ccm.helper.find( self, 'div.sc_slide_descr' );

          slide_descr.html( '' ).css( 'display', 'block' );
          slide_descr.append( '<h5>Anmerkungen</h5><div>' + ccm.helper.noScript( sc.slides[index].description ) + '</div>' );


          slide_descr.accordion( {

            header: 'h5',
            collapsible: true,
            active: false,
            heightStyle: 'content',
            activate: function () {
              jQuery( 'html, body' ).animate( { scrollTop: element.find( 'div.sc_slide_descr' ).offset().top }, 'slow' );
            }

          } );

          slide_descr.accordion( 'refresh' );

          slide_descr.accordion( sc.slides[ index ].description ? 'enable' : 'disable' );

        }

        /**
         * render slide audio
         * @param {number} index - slide index
         */
        function renderAudio( index ) {

          if ( sc.slides[ index ].audio ) {

            ccm.helper.find( self, 'div.sc_audio' ).html( '<audio autoplay controls><source src="' + ccm.helper.val( sc.slides[index].audio, 'url' ) + '"></audio>' );

            ccm.helper.find( self, 'audio' )[ 0 ].onended = function () {
              ccm.helper.find( self, 'div.sc_carousel' ).slickNext();
            };
          }
          else jQuery( 'div.sc_audio' ).html( '' );
        }

        /**
         * render slide specific optional content
         * @param {number} index - slide index
         */
        function renderOptionalContent ( index ) {

          // slidecast without optional content? => abort
          if ( !self.opt_content ) return;

          // slide specific instance for optional content exists? => render slide specific optional content
          if ( opt_content_instances[ self.key + '-' + index ] )
            opt_content_instances[ self.key + '-' + index ].render();

          // instance not exists
          else {

            /**
             * instance configuration for optional content
             * @type {object}
             */
            var config = self.opt_config ? self.opt_config : {};

            // set optional content website area and dataset key
            config.element = ccm.helper.find( self, 'div.sc_opt_content' );
            config.key     = self.key + '-' + index;
            config.parent = self;

            // render optional content
            self.opt_content.instance( config, function ( instance ) {

              opt_content_instances[ config.key ] = instance;
              instance.render();

            } );

          }

        }

      } );

    };

  }

  /*------------------------------------------------ type definitions ------------------------------------------------*/

  /**
   * @summary ccm instance configuration
   * @typedef {ccm.config} ccm.components.sc.config
   * @property {ccm.element} element - website area of ccm instance
   * @property {string} classes - CSS classes for website area
   * @property {ccm.style} style - CSS for website area
   * @property {ccm.store} store - ccm datastore for slidecasts
   * @property {ccm.key} key - slidecast dataset key
   * @property {string} uijs - path to jQuery UI javascript file
   * @property {string} uicss - path to jQuery UI css file
   * @property {string} caruselJs - path to javascript file of jQuery UI plugIn for slide carusel
   * @property {string} caruselCss - path to css file of jQuery UI plugIn for slide carusel
   * @property {ccm.component} opt_content - ccm component for slide specific optional content
   */

  /**
   * @summary slidecast dataset
   * @typedef {ccm.dataset} ccm.components.sc.dataset
   * @property {ccm.key} key - dataset key
   * @property {ccm.components.sc.slide[]} slides - slide datasets
   */

  /**
   * @summary slide dataset
   * @typedef {ccm.dataset} ccm.components.sc.slide
   * @property {string} image - path to slide image file
   * @property {string} audio - path to slide audio file
   * @property {string} description - slide description
   */

} );