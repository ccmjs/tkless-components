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

        "submit": {
          "tag": "button",
          "class": "btn btn-default pull-right",
          "typ": "button",
          "inner": "Submit",
          "onclick": "%submit%"
        }
      },
      inner: "<h1>Mark words in the text below</h1><p>Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen.</p>" +
      "<p>Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen.</p>" +
      "<p>Manchmal Sätze, die alle Buchstaben des Alphabets enthalten - man nennt diese Sätze »Pangrams«.</p>" +
      "<p>Sehr bekannt ist dieser: The quick brown fox jumps over the lazy old dog.</p>" +
      "<p>Oft werden in Typoblindtexte auch fremdsprachige Satzteile eingebaut (AVAIL® and Wefox™ are testing aussi la Kerning), um die Wirkung in anderen Sprachen zu testen.</p>" +
      "<p>In Lateinisch sieht zum Beispiel fast jede Schrift gut aus. Quod erat demonstrandum. Seit 1975 fehlen in den meisten Testtexten die Zahlen, weswegen nach TypoGb.</p>" +
      "<p>204 § ab dem Jahr 2034 Zahlen in 86 der Texte zur Pflicht werden. Nichteinhaltung wird mit bis zu 245 € oder 368 $ bestraft.</p>",
      //submit: true,
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

      this.ready = callback => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        callback();

      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {

        const main_elem = $.html( my.html.text );

        const div = document.createElement( 'div' );
        div.innerHTML = my.inner;

        const text_nodes = collectTextNodes( div );

        text_nodes.map( ( node )  => {
          const value = node.textContent.replace( /\S+(?<![,\.])/g, '<span marked>$&</span>' );
          node.parentNode.replaceChild( $.html( { tag: 'text', inner: value } ), node );
        });

        $.setContent( main_elem.querySelector( '#text' ), div );

        main_elem.querySelector( '#text' ).addEventListener( 'click', ( event ) => {
          const span = event.target;
          if ( !span.hasAttribute( 'marked' ) ) return;

          span.classList.toggle( 'selected' );

          self.onchange && self.onchange( span );
        });

        $.setContent( self.element, main_elem );

        callback && callback();

        function collectTextNodes( node ){
          let all = [];
          for ( node = node.firstChild; node; node = node.nextSibling ){
            if ( node.nodeType === 3 ) all.push(node);
            else all = all.concat( collectTextNodes( node ) );
          }
          return all;
        }
      };

      this.getValue = () => {

        return 0;
      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}