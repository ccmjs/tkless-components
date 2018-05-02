/**
 * @overview ccm component for running of sequence of ccm components
 * @see https://github.com/mozilla/pdf.js/
 * @author Tea Kless <tea.kless@web.de>, 2018
 * @license The MIT License (MIT)
 */

{
  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'sequence',

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
      entries: [
        [ "ccm.instance", "https://ccmjs.github.io/tkless-components/table/ccm.table.js",
          {
            table_row: 2,
            table_col: 5,
            add_row: true,
            table_head: [ "Header 1", "Header 2", "Header 3", "Header 4", "Header 5" ],
            col_settings: [
              { "type": "text", "placeholder": "Tel: 049..." },
              { "foo": "bar", "placeholder": "Hier steht Email" },
              { "type": "date", "bar": "baz" },
              { "type": "textarea", "placeholder": "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da " +
                "sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um " +
                "Schriften zu testen. Manchmal Sätze, die alle Buchstaben des Alphabets enthalten - man nennt diese Sätze " +
                "»Pangrams«. Sehr bekannt ist dieser: The quick brown fox jumps over the lazy old dog. " },
              { "type": "textarea", "disabled": "true", "placeholder": "Hier kannst du nichts schreiben." }
            ],
            data: {
              values: [
                [ "0045/ 12344567", "max.mustermann@mail.com", "12.01.2018",  "textarea 1", "textarea 2"],
                [ "", "", ""],
                [ "", "erika.mustermann@mail.com", "", "", ""],
                [ "", "markus.möglich@mail.com", "", "", ""],
                [ "", "jane.doe@mail.com", "", "", ""]
              ]
            },
            "submit": "true",
            "onfinish": {
              log: true
            }
          }
        ],
        [ "ccm.instance", "https://ccmjs.github.io/tkless-components/accordion/ccm.accordion.js",
          {
            title: 'success',
            entries: [
              {
                "title": "Learning Goals",
                "content": "..."
              },
              {
                "title": "Lecture",
                "content": "<source src=\"../table/ccm.table.js\"> <p>Hier steht <i>ccm</i>-Komponente</p> <ccm-table key='[\"ccm.get\",\"../table/resources/configs.js\",\"demo\"]'></ccm-table>"
              },
              {
                "title": "Additional Materials",
                "content": "..."
              },
              {
                "title": "Exercises",
                "content": "..."
              },
              {
                "title": "Bibliography",
                "content": "..."
              }
            ]
          }
        ],
        [ "ccm.instance", "https://ccmjs.github.io/tkless-components/marking_words/ccm.marking_words.js" ]
      ],
      css: [ "ccm.load",
        { context: 'head', url: '../../ccm-components/libs/bootstrap/css/font-face.css' },
        '../../ccm-components/libs/bootstrap/css/bootstrap.css'
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

        if ( self.logger ) self.logger.log( 'ready', my );

        callback();

      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {

        $.setContent( self.element, '' );
        renderEntries();

        callback && callback();

        function renderEntries() {

          for( let component in my.entries ) {
            my.entries[ component ].start( ()=> {
              self.element.appendChild( my.entries[ component ].root );
            });
          }
        }

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}