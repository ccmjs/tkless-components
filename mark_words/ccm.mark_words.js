/**
 * @overview ccm component for marking thew words in Text
 * @author Tea Kless <tea.kless@web.de>, 2019-2022
 * @license The MIT License (MIT)
 * @changes
 *
 * version 5.0.0 (15.02.2022)
 * - support of instance inner for marking
 * - ccm v27.3.0
 *
 * version 4.0.0 (30.04.2019)
 * - used self.data instead of my.data
 * - support properties for analytics
 *
 * version 3.3.0 (03.04.2019)
 * - supports show_results convention
 *
 *  version 3.1.0 (30.01.2018)
 * - uses ccm v20.0.0
 *
 * version 3.1.0 (12.11.2018)
 * - uses $.html before text processing
 * - uses ccm v18.3.0
 *
 * version 3.0.0 (20.09.2018)
 * - initial data for preselect words
 *
 *  version 2.0.0 (12.09.2018)
 * - uses ccm v18.0.0
 */

( function () {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'mark_words',

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.3.0.js',

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
            },
            {
              "id": "buttons",
              "inner": [
                {
                  "id": "check"
                },
                {
                  "id": "save"
                },
                {
                  "id": "retry"
                },
                {
                  "id": "solution"
                }
              ]
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
      // text: "some html text for marking",
      // submit: true,
      // submit_button_label: "Save",
      // retry: true,
      // show_solution: true,
      // check: true,
      // keywords: [ 'Manchmal', 'Typoblindtexte', 'Zahlen',  'Satzteile'],
      // data: { solutions: [], marked [] },
      // onfinish: { log: true },
      // "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.0.0.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.min.js", "greedy" ] ],
      // onchange,
      // marked: [],
      // show_results: true,
      helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.0.0.min.mjs" ],
      css: [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
        'https://ccmjs.github.io/tkless-components/mark_words/resources/default.css'
      ]
    },

    Instance: function () {
      /**
       * own reference for inner functions
       * @type {Instance}
       */
      const self = this;

      /**
       * shortcut to help functions
       * @type {Object.<string,function>}
       */
      let $;

      let dataset;

      this.init = async () => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // text is given as HTML Element Node? => use innerHTML
        if ( $.isElement( self.inner ) ) self.inner = self.inner.innerHTML;
      };

      this.ready = async () => {
        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );

        if ( self.logger ) self.logger.log( 'ready', $.clone( self ) );


      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = async () => {

        if ( self.logger ) self.logger.log( 'start' );

        if ( !self.inner ) {
          $.setContent( self.element, 'Nothing to display!' );
          return;
        }

        dataset = await $.dataset( self.data );

        const keywords = $.clone( self.keywords );

        const correct = [];
        const incorrect = [];

        if( !dataset.solutions ) dataset.solutions = [];
        if( !dataset.marked ) dataset.marked = [];
        if( !dataset.sections ) dataset.sections = [];

        const main_elem = $.html( self.html.text );
        if ( $.isInstance( self.inner ) ){
          root = self.inner.root;
          self.inner = self.inner.element;
        }

        prepareTextForMarking();

        $.setContent( self.element, main_elem );

        function prepareTextForMarking() {
          const div = $.html( self.inner );

          const text_nodes = collectTextNodes( div );

          text_nodes.map( ( node )  => {
            const value = node.textContent.replace( /\w+/g, '<span class="mark-word" marked>$&</span>' );
            node.parentNode.replaceChild( $.html( { tag: 'text', inner: value } ), node );
          });


          div.querySelectorAll( '.mark-word' ).forEach( ( elem, i ) => {
            elem.id = "mark-word-" + (i+1);
          } );

          if ( dataset.marked.length > 0 ) {
            div.querySelectorAll( 'span' ).forEach( span => {
              if (dataset.marked.includes( span.id ) ) {
                span.classList.add( 'selected' );
              }
            } );
          }


          if( !self.show_results ) {
            div.querySelectorAll( '.mark-word' ).forEach( span => {
              span.addEventListener( 'click', event => {
                if ( !span.hasAttribute( 'marked' ) ) return;

                // add selected class to span tags
                span.classList.toggle( 'selected' );

                // add or remove selected words from solutions array
                if( !span.classList.contains( 'selected' ) ){
                  dataset.solutions.splice( [ dataset.solutions.indexOf( span.innerHTML ) ], 1 );
                  dataset.marked.splice( [ dataset.marked.indexOf( span.id ) ], 1  );
                }
                else{
                  dataset.marked.push( span.id );
                  dataset.solutions.push( span.innerHTML );
                }
            } );

              // set onChange behavior
              self.onchange && self.onchange( { instance: self, element: span } );

              if ( self.logger ) self.logger.log( 'change', { word: span.innerHTML, selected: span.classList.contains('selected')} );
            });
            renderButtons();
          }
          else {
            verify();
            self.show_solution && showSolution();
          }



            $.setContent( main_elem.querySelector( '#text' ), div );

          function renderButtons() {
            if ( self.check ) {
              $.setContent( main_elem.querySelector( '#check' ), $.html( self.html.button, {
                class: 'btn btn-success btn-lg check-btn',
                label: 'Check',
                click: () => {
                  if ( dataset.solutions.length === 0 ) return alert( 'No solution to check !!!');
                  verify();
                  renderProgressBar( correct.length );
                  if ( self.show_solution ) {
                    // render solution button
                    $.setContent( main_elem. querySelector( '#solution' ), $.html( self.html.button, {
                      label: 'Solution',
                      class: 'btn btn-warning btn-lg solution-btn',
                      glyphicon: 'glyphicon glyphicon-eye-open',
                      click: showSolution
                    } ) );
                  }
                }
              } ) );
            }

            if ( self.submit ) {
              $.setContent( main_elem.querySelector( '#save' ), $.html( self.html.button, {
                class: 'btn btn-info btn-lg save-btn',
                label: self.submit_button_label,
                glyphicon: 'glyphicon glyphicon-save',
                click: () => {
                  verify();
                  $.onFinish( self );
                  if( self.logger ) self.logger.log( 'onfinish', self );
                }
              } ) );
            }
          }

          function showSolution() {
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

          dataset.solutions.map( solution => {
            const entry = {};
            if ( keywords.includes( solution) ) {
              entry.correct = true;
              correct.push( solution );
              keywords.splice( [ keywords.indexOf( solution ) ], 1 );
            }
            else {
              entry.correct = false;
              incorrect.push( solution );
            }

            dataset.sections.push( entry );
          } );

          [ ...main_elem.querySelectorAll( 'span.selected' ) ].map( span => {

            if ( correct.includes( span.innerHTML ) ) {
              span.classList.add( 'correct' );
            }
            else span.classList.add( 'incorrect' );

          });

          dataset.correct = correct.length;
          dataset.total = self.keywords.length;

          if ( self.logger ) self.logger.log( 'check', {
            marked: self.getValue(),
            correct: correct,
            incorrect: incorrect,
            points: correct.length,
            amount: self.keywords.length
          });
        }

        function renderProgressBar() {
          const elem = $.html( self.html.feedback, {
            points: correct.length + '/' + self.keywords.length
          } );
          $.setContent( main_elem. querySelector( '#conclusion' ), elem );


          const goal = correct.length * self.element.querySelector( '#feedback' ).offsetWidth / self.keywords.length; //parseInt( self.element.querySelector( '#progress-bar' ).style.width, 10);
          let width = 1;
          let id = setInterval(frame, 8);

          function frame() {
            if ( width >= goal ) {
              clearInterval( id );
            } else {
              width++;
              self.element.querySelector( '#progress-bar' ).style.width = width + 'px';
            }
          }

          main_elem.querySelector( '.check-btn' ).remove();

          if ( self.retry ) {
            $.setContent( main_elem. querySelector( '#retry' ), $.html( self.html.button, {
              class: 'btn btn-primary btn-lg retry-btn',
              label: 'Retry',
              glyphicon: 'glyphicon glyphicon-repeat',
              click: self.start()
            } ) );
          }
        }
      };

      this.getValue = () => {
        return dataset;
      };
    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
