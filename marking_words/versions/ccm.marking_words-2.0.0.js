/**
 * @overview ccm component for marking thew words in Text
 * @author Tea Kless <tea.kless@web.de>, 2018
 * @license The MIT License (MIT)
 * @version 2.0.0
 * @changes
 * version 2.0.0 (12.09.2018)
 * - uses ccm v18.0.0
 */

( function () {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'marking_words',
    version: [ 2,0,0 ],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.0.0.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        "text": {
          "class": "container-fluid",
          "inner": [
            {
              "id": "text"
            },
            {
              "id": "conclusion"
            }
          ]
        },

        "button": {
          "tag": "button",
          "class": "%class%",
          "typ": "button",
          "onclick": "%click%",
          "inner": [
            {
              "tag": "span",
              "class": "%glyphicon%"
            },
            "%label%"
          ]
        },

        "feedback": {
          "inner": [
            {
              "id": "points",
              "inner": "%points%"
            },
            {
              "id": "feedback",
              "inner": {
                "id": "progress-bar"
              }
            }
          ]
        }
      },
      // submit: true,
      // submit_button_label: "Save",
      // retry: true,
      // show_solution: true,
      // check: true,
      // keywords: [ 'Manchmal', 'Typoblindtexte', 'Zahlen',  'Satzteile'],
      // onfinish: {
      //   log: true
      // },
      // "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.0.0.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.min.js", "greedy" ] ],
      // onchange
      css: [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
        'https://ccmjs.github.io/tkless-components/marking_words/resources/default.css'
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

      let solutions;

      this.init = async () => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // text is given as HTML Element Node? => use innerHTML
        if ( $.isElementNode( self.inner ) ) self.inner = self.inner.innerHTML;
      };

      this.ready = async () => {

        // privatize all possible instance members
        my = $.privatize( self );

        my.solutions = [];
        if ( self.logger ) self.logger.log( 'ready', $.clone( my ) );
      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = async () => {

        if ( self.logger ) self.logger.log( 'start' );

        if ( !my.inner ){
          $.setContent( self.element, 'Nothing to display!' );
          return;
        }

        const main_elem = $.html( my.html.text );
        prepareTextForMarking();

        if ( my.check ) {
          main_elem.appendChild( $.html( my.html.button, {
            class: 'btn btn-success btn-lg check-btn',
            label: 'Check',
            click: function ( event ) {
              event.preventDefault();
              if ( my.solutions.length === 0 ) return alert( 'No solution to check !!!');
              verify();
            }
          } ) );
        }

        if ( my.submit ) {
          main_elem.appendChild( $.html( my.html.button, {
            class: 'btn btn-info btn-lg save-btn',
            label: my.submit_button_label,
            glyphicon: 'glyphicon glyphicon-save',
            click: function ( event ) {
              event.preventDefault();
              $.onFinish( self );
              if( self.logger ) self.logger.log( 'onfinish', self );
            }
          } ) );
        }

        $.setContent( self.element, main_elem );

        function prepareTextForMarking() {
          const div = document.createElement( 'div' );
          div.innerHTML = my.inner;

          const text_nodes = collectTextNodes( div );

          text_nodes.map( ( node )  => {
            const value = node.textContent.replace( /\S+(?<![,\.:])/g, '<span marked>$&</span>' );
            node.parentNode.replaceChild( $.html( { tag: 'text', inner: value } ), node );
          });

          $.setContent( main_elem.querySelector( '#text' ), div );

          main_elem.querySelector( '#text' ).addEventListener( 'click', ( event ) => {
            const span = event.target;
            if ( !span.hasAttribute( 'marked' ) ) return;

            // add selected class to span tags
            span.classList.toggle( 'selected' );

            // add or remove selected words from solutions array
            if( my.solutions.includes( span.innerHTML ) && !span.classList.contains( 'selected' ) )
              my.solutions.splice( [ my.solutions.indexOf( span.innerHTML ) ], 1 );
            else
              my.solutions.push( span.innerHTML );

            // set onChange behavior
            self.onchange && self.onchange( span );

            if ( self.logger ) self.logger.log( 'change', { word: span.innerHTML, selected: span.classList.contains('selected')} );
          });
        }

        // pile up all text nodes from given div element
        function collectTextNodes( node ){
          let all = [];
          for ( node = node.firstChild; node; node = node.nextSibling ){
            if ( node.nodeType === 3 ) all.push(node);
            else all = all.concat( collectTextNodes( node ) );
          }
          return all;
        }

        function verify() {
          const keywords = $.clone( my.keywords );

          const correct = [];
          const incorrect = [];

          my.solutions.map( solution => {
            if ( keywords.includes( solution) ) {
              correct.push( solution );
              keywords.splice( [ keywords.indexOf( solution ) ], 1 );
            }
            else
              incorrect.push( solution );
          } );

          [ ...main_elem.querySelectorAll( 'span.selected' ) ].map( span => {

            if ( correct.includes( span.innerHTML ) ) {
              span.classList.add( 'correct' );
            }
            else span.classList.add( 'incorrect' );

          });

          const elem = $.html( my.html.feedback, {
            points: correct.length + '/' + my.keywords.length
          } );
          main_elem. querySelector( '#conclusion' ).appendChild( elem );

          renderProgressBar( correct.length );

          if ( my.show_solution ) {
            // render solution button
            main_elem.appendChild( $.html( my.html.button, {
              label: 'Solution',
              class: 'btn btn-warning btn-lg solution-btn',
              glyphicon: 'glyphicon glyphicon-eye-open',
              click: function () {
                const missed = [];
                [ ...main_elem.querySelectorAll( 'span' ) ].map( span => {
                  if ( keywords.includes( span.innerHTML ) ) {
                    missed.push( span.innerHTML );
                    span.classList.add( 'solution' );
                    keywords.splice( [ keywords.indexOf( span.innerHTML ) ], 1 );
                  }
                });

                if ( self.logger ) self.logger.log( 'solution', { missed: missed } );
              }
            } ) );
          }

          if ( self.logger ) self.logger.log( 'check', {
            marked: self.getValue(),
            correct: correct,
            incorrect: incorrect,
            points: correct.length,
            amount: my.keywords.length
          });
        }

        function renderProgressBar( correct ) {
          const goal = correct * self.element.querySelector( '#feedback' ).offsetWidth / my.keywords.length; //parseInt( self.element.querySelector( '#progress-bar' ).style.width, 10);
          let width = 1;
          let id = setInterval(frame, 10);

          function frame() {
            if ( width >= goal ) {
              clearInterval( id );
            } else {
              width++;
              self.element.querySelector( '#progress-bar' ).style.width = width + 'px';
            }
          }

          main_elem.querySelector( '.check-btn' ).remove();

          if ( my.retry ) {
            const retry_btn = main_elem.appendChild( $.html( my.html.button, {
              class: 'btn btn-primary btn-lg retry-btn',
              label: 'Retry',
              glyphicon: 'glyphicon glyphicon-repeat',
              click: function ( event ) {
                event.preventDefault();
                my.solutions = [];
                self.start();
              }
            } ) );
            main_elem.querySelector( 'button' ).parentNode.insertBefore( retry_btn, main_elem.querySelector( '.solution-btn' ) );
          }
        }
      };

      this.getValue = () => my.solutions;
    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();