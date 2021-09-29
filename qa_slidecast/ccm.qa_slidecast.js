/**
 * @overview ccmjs-based web component for slidecast with commentary
 * @author Tea Kless <tea.kless@web.de> 2020
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (2.0.0)
 * @changes
 * version 2.0.0 (25.09.2021): reimplementation by akless
 */

( () => {
  const component = {
    name: 'qa_slidecast',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.1.1.min.js',
    config: {
      "comment": [ "ccm.component", "https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-7.0.0.min.js" ],
      "css": [ "ccm.load",
        "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/styles.min.css",
        "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap-icons.min.css",
        { "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap-fonts.min.css", "context": "head" },
      ],
      "description": true,
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.6.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/tkless-components/qa_slidecast/resources/templates.mjs" ],
//    "open": "comments",
      "pdf_viewer": [ "ccm.start", "https://ccmjs.github.io/tkless-components/pdf_viewer/versions/ccm.pdf_viewer-7.0.0.min.js" ],
      "routing": [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-2.0.7.min.js" ],
      "ignore": {
        "slides": []
      },
      "text": {
        "comments": "Shows the Comments of this Slide",
        "description": "Shows the Description of this Slide"
      },
      "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js" ]
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * current slide number
       * @type {number}
       */
      let slide_nr = 1;

      /**
       * when the instance is created, when all dependencies have been resolved and before the dependent sub-instances are initialized and ready
       * @returns {Promise<void>}
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // each slide needs an unique key
        this.ignore.slides.forEach( slide => !slide.key && ( slide.key = $.generateKey() ) );

        if ( !this.comment ) return;

        // set unique key for app state data of commentary
        if ( !this.comment.config.data.key ) this.comment.config.data.key = $.generateKey();

        // set same user dependency for commentary
        this.comment.config.user = JSON.parse( this.config ).user;

      };

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log( 'start', this.getValue() );

        // render first slide
        await this.render();

      };

      /**
       * renders/updates content
       * @param {boolean} [skip] - skip rendering of inner apps
       * @returns {Promise<void>}
       */
      this.render = async skip => {

        /**
         * slide data
         * @type {Object}
         */
        const slide_data = this.ignore.slides[ slide_nr - 1 ];

        // render main HTML template
        this.html.render( this.html.main( this, slide_nr, events ), this.element );

        // rendering of inner apps can be skipped
        if ( !skip ) {

          // render slide
          const slide_element = this.element.querySelector( '#slide' );
          switch ( typeof slide_data.content ) {
            case 'number':
              $.setContent( slide_element, this.pdf_viewer.root );
              this.pdf_viewer.goTo( slide_nr );
              break;
            case 'string':
              const ends_with = slide_data.content.split( '.' ).pop();
              switch ( ends_with ) {
                case 'apng':
                case 'gif':
                case 'jpg':
                case 'jpeg':
                case 'jfif':
                case 'pjpeg':
                case 'pjp':
                case 'png':
                case 'svg':
                  this.html.render( this.html.image( slide_data.image ), slide_element );
                  break;
                case 'mp4':
                case 'ogg':
                case 'webm':
                  this.html.render( this.html.audio( slide_data.video ), slide_element );
                  break;
              }
              break;
            case 'object':
              if ( !$.isInstance( slide_data.content ) )
                slide_data.content = await $.solveDependency( slide_data.content );
              $.setContent( slide_element, slide_data.content.root );
              break;
            default:
              $.setContent( slide_element, '' );
          }

          // render advanced description (description is another app)
          if ( slide_data.description && typeof slide_data.description !== 'string' ) {
            slide_data.description = await $.solveDependency( slide_data.description );
            await slide_data.description.start();
            $.setContent( this.element.querySelector( '#description' ), slide_data.description.root );
          }

          // render comments
          if ( this.comment && slide_data.commentary !== false ) {
            if ( !slide_data.comments )
              slide_data.comments = await this.comment.start( { 'data.key': this.comment.config.data.key + '-' + slide_data.key } );
            $.setContent( this.element.querySelector( '#comments' ), slide_data.comments.root );
          }

        }

      };

      /**
       * returns app state data
       * @returns {{slide_nr: number, slides: Object[]}}
       */
      this.getValue = () => { return { slide_nr: slide_nr, slides: $.clone( this.ignore.slides ) } };

      /**
       * contains all event handlers
       * @type {Object.<string,Function>}
       */
      const events = {

        /** when the button to display the description of a slide is clicked */
        onDescription: () => {
          const slide_data = this.ignore.slides[ slide_nr - 1 ];
          if ( !slide_data.description ) return;
          this.open = this.open === 'description' ? '' : 'description';
          this.render( true );
        },

        /** when the button to display the comments of a slide is clicked */
        onComments: () => {
          const slide_data = this.ignore.slides[ slide_nr - 1 ];
          if ( !this.comment || slide_data.commentary === false ) return;
          this.open = this.open === 'comments' ? '' : 'comments';
          this.render( true );
        }

      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();