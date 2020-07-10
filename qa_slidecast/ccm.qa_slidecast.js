/**
 * @overview ccm component of slidecast with comment
 * @author Tea Kless <tea.kless@web.de> 2020
 * @license The MIT License (MIT)
 * @version 1.0.0
 * @changes
 * version 1.0.0 (26.04.2020)
 */

( function () {

  const component = {

    name: 'qa_slidecast',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {
      "html": [ "ccm.load", "resources/templates.html" ],
      "audio": {
        "1": "https://ccmjs.github.io/tkless-components/slidecast/resources/slides/learningApps/work&study-jingle.mp3",
      },
      "slides": "https://ccmjs.github.io/work-and-study/learningapp-marketplace/resources/GameChanger.pdf",
      "comment": [ "ccm.component", "https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-6.0.0.js", {
        "editable": true,
        "data": {
          "store": [ "ccm.store", { "name": "qa_slidecast", "url": "https://ccm2.inf.h-brs.de" } ],
          "key": "demo"
        },
      } ],
      "pdf_viewer": [ "ccm.component", "../pdf_viewer/ccm.pdf_viewer.js" ],
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.5.0.js",
        [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ],
        "css": [ "ccm.load", "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
        "resources/default.css"
      ],
      "routing": [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-2.0.5.js" ],
      "helper": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/versions/helper-5.0.0.mjs" } ]
    },

    Instance: function () {
      let $, main_elem, inst;

      this.init = async () => {

        if ( Array.isArray( this.audio ) ) {
          const audio = {};
          this.audio.forEach( entry => audio[ entry.slide_nr ] = entry.audio_src );
          this.audio = audio;
        }

        if ( this.user ) this.user.onchange = login => {
          if ( login ) return;

          // clear content
          $.setContent( this.element, '' );

          // restart app
          this.start();
        }
      };

      this.ready = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );

        if ( this.logger ) this.logger.log( 'ready', $.clone ( this ) );

      };

      this.start = async () => {

        // login user, if not logged in
        this.user && await this.user.login();

        main_elem = $.html( this.html.main );
        $.setContent( this.element, main_elem );
        await renderSlides();
        this.user && await renderComment();
        renderAudio( inst.getPage() );
      };

      const renderSlides = async () => {

        inst = await this.pdf_viewer.start( {
          root: main_elem.querySelector( '#slides' ),
          breakpoints: false,
          pdf: this.slides,
          description: this.description && this.description,
          onchange: ( inst, page ) => {
            this.user && renderComment( page );
            renderAudio( page );
          }
        } );

      };

      const renderComment = async ( page = 1, element ) => {
        const inst = await this.comment.start( {
          root: main_elem.querySelector( '#comments' ),
          'data.key': this.comment.config.data.key + '-' + page,
          user: [ 'ccm.instance', this.user.component.url, $.parse( this.user.config ) ]
        } );
        $.prepend( inst.element.querySelector( '.container-fluid' ), $.html( '<h4 class="text-success ml-2"> Comments: </h4> ') );
        inst.element.querySelector( '.container-fluid' ).classList.remove( 'container-fluid' );
      };

      const renderAudio = ( page ) => {
        if ( !this.audio[ page ] ) return $.setContent( main_elem.querySelector( '#audio' ), '');

        const audio_elem = $.html( this.html.audio, {
          audio_src: this.audio[ Number( page ) ]
        } );

        $.setContent( main_elem.querySelector( '#audio' ), audio_elem );
      }

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
