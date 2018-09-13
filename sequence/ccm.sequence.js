/**
 * @overview ccm component for running of sequence of ccm components
 * @author Tea Kless <tea.kless@web.de>, 2018
 * @license The MIT License (MIT)
 */

( function () {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'sequence',

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
      space_between: true,
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
        '<div class="container">' +
        '  <div class="jumbotron text-center">' +
        '    <h1>Welcome </h1>' +
        '      <br>' +
        '    <h1> Virtual Monitoring Program </h1>' +
        '    <br>' +
        '    <p> Choose the Button below...</p>' +
        '    <br><br>' +
        '    <p>' +
        '      <a class="btn btn-primary btn-lg" id="source-data-btn" role="button"><span class="glyphicon glyphicon-edit"></span> To Source Data</a>' +
        '      <a class="btn btn-success btn-lg" id="simulation-btn" role="button"><span class="glyphicon glyphicon-play"></span> To Simulation</a>' +
        '      <a class="btn btn-info btn-lg" id="corrupt-data-btn" role="button"><span class="glyphicon glyphicon-edit"></span> To Corrupt Data</a>' +
        '    </p>' +
        '  </div>' +
        '</div>'
      ],
      content: [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.0.js", {
        css: [ "ccm.load",
          "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
          { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
        ]
      } ],
      css: [ "ccm.load",
        "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
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

      this.ready = async () => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        if ( self.logger ) self.logger.log( 'ready', my );

      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = async () => {

        $.setContent( self.element, '' );
        await renderEntries();

        async function renderEntries() {

          for( let component in my.entries ) {
            const entry = document.createElement( 'div' );

            $.append( self.element, entry );

            if ( $.isInstance( my.entries[ component ] ) ) {
              await my.entries[ component ].start();
              $.replace( my.entries[ component ].root, entry );
            }
            else if ( my.content ) {
              const instance = await my.content.start( { "inner": my.entries[ component ] } );
              $.replace( instance.root, entry );
            }
            else
              $.replace( $.html( my.entries[ component ] ), entry );
          }

          if ( my.space_between )
            [ ...self.element.querySelectorAll( 'div' )].map( div => {
              div.style.padding = '1rem 0 1rem 0';
            });
        }

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();