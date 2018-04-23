/**
 * @overview ccm component for marking thew words in Text
 * @author Tea Kless <tea.kless@web.de>, 2018
 * @license The MIT License (MIT)
 */

{
  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'marking_words',

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

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
          "onclick": "%check%",
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
      inner: "<h1>Mark words in the text below</h1><p>Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen.</p>" +
      "<p>Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen.</p>" +
      "<p>Manchmal Sätze, die alle Buchstaben des Alphabets enthalten - man nennt diese Sätze »Pangrams«.</p>" +
      "<p>Sehr bekannt ist dieser: The quick brown fox jumps over the lazy old dog.</p>" +
      "<p>Oft werden in Typoblindtexte auch fremdsprachige Satzteile eingebaut (AVAIL® and Wefox™ are testing aussi la Kerning), um die Wirkung in anderen Sprachen zu testen.</p>" +
      "<p>In Lateinisch sieht zum Beispiel fast jede Schrift gut aus. Quod erat demonstrandum. Seit 1975 fehlen in den meisten Testtexten die Zahlen, weswegen nach TypoGb.</p>" +
      "<p>204 § ab dem Jahr 2034 Zahlen in 86 der Texte zur Pflicht werden. Nichteinhaltung wird mit bis zu 245 € oder 368 $ bestraft.</p>",
      submit: true,
      keywords: [ 'Manchmal', 'Typoblindtexte', 'Zahlen',  'Satzteile'],
      show_solution: true,
      //onfinish
      css: [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
        'resources/default.css'
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

      let solution;

      this.init = callback => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // text is given as HTML Element Node? => use innerHTML
        if ( $.isElementNode( self.inner ) ) self.inner = self.inner.innerHTML;

        callback();
      };

      this.ready = callback => {

        // privatize all possible instance members
        my = $.privatize( self );

        my.solutions = [];

        callback();

      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {

        if ( !my.inner ){
          $.setContent( self.element, 'Nothing to display!' );
          return callback();
        }

        const main_elem = $.html( my.html.text );
        prepareTextForMarking();

        if ( my.submit ) {
          main_elem.appendChild( $.html( my.html.button, {
            class: 'btn btn-success btn-lg',
            label: 'Check',
            check: function ( event ) {
              event.preventDefault();
              verify();
            }
          } ) );
        }

        $.setContent( self.element, main_elem );

        callback && callback();

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
            if( my.solutions.includes( span.innerHTML ) )
              my.solutions.splice( [ my.solutions.indexOf( span.innerHTML ) ], 1 );
            else
              my.solutions.push( span.innerHTML );

            // set onChange behavior
            self.onchange && self.onchange( span );
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

          if ( my.show_solution ) {
            // render solution button
            main_elem.appendChild( $.html( my.html.button, {
              label: 'Solution',
              class: 'btn btn-warning btn-lg solution-btn',
              glyphicon: 'glyphicon glyphicon-eye-open',
              check: function () {
                [ ...main_elem.querySelectorAll( 'span' ) ].map( span => {

                  if ( keywords.includes( span.innerHTML ) ) {
                    span.classList.add( 'solution' );
                    keywords.splice( [ keywords.indexOf( span.innerHTML ) ], 1 );
                  }
                });
              }
            } ) );
          }

          const elem = $.html( my.html.feedback, {
            points: correct.length + '/' + my.keywords.length
          } );
          main_elem. querySelector( '#conclusion' ).appendChild( elem );

          renderProgressBar( correct.length );

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

          main_elem.querySelector( 'button' ).remove();

          const retry_btn = main_elem.appendChild( $.html( my.html.button, {
            class: 'btn btn-primary btn-lg',
            label: 'Retry',
            glyphicon: 'glyphicon glyphicon-repeat',
            check: function ( event ) {
              event.preventDefault();
              my.solutions = [];
              self.start();
            }
          } ) );
           main_elem.querySelector( '.solution-btn' ).parentNode.insertBefore( retry_btn, main_elem.querySelector( '.solution-btn' ) );

        }
      };

      this.getValue = () => my.solutions;
    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}