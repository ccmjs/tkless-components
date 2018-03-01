/**
 * @overview ccm component for table generating
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
    name: 'table',

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://akless.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        "table": {
          "class": "container",
          "inner": {
            "tag": "table",
            "class": "table table-striped",
            "inner":[
              { "tag": "thead" },
              { "tag": "tbody" }
            ]
          }
        },

        "table_row": { "tag": "tr" },

        "table_col": { "tag": "td" },

        "table_head": { "tag": "th" },

        "input": {
          "tag": "input",
          "name": "%input_name%"
        },

        "submit": {

        }
      },
      table_row: 5,
      table_col: 3,
      table_head: [ "header-1", "header-2", "header-3" ],
      cell_settings: [
        { "editable": true, "type": "number", "placeholder": "Tel: 049..." },
        { "inner": "max.musterman@mail.com" },
        { "editable": true, "type": "date", "foo": "bar" }
      ],
      submit: true,
      css: [ "ccm.load", "https://tkless.github.io/ccm-components/lib/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://tkless.github.io/ccm-components/lib/bootstrap/css/font-face.css" }
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

      this.init = callback => {

        callback();
      };

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

        if ( !generateTable() ) return $.setContent( self.element, "Nothig to display" );

        else {
          $.setContent( self.element, generateTable() );
          if ( callback ) callback();
        }
        
        function generateTable() {
          const table = $.html ( my.html.table );

          if ( my.table_row ) {
            for ( let i = 0 ; i < my.table_row; i++ ) {
              const table_row = $.html ( my.html.table_row );
              if ( my.table_col ) {
                for ( let j = 0 ; j < my.table_col; j++ ) {
                  const table_col = $.html ( my.html.table_col );

                  // if setting for each cell is set in config
                  if ( my.cell_settings ) {

                    const input = $.html ( my.html.input, {
                      input_name: ( j + 1 )+ "-" + ( i + 1 ),
                    } );

                    // set input tag property for each cell
                    for ( const key in my.cell_settings[ j ] ) {
                      switch ( key ) {
                        case 'type':
                          input.setAttribute ( 'type',  my.cell_settings[ j ][ key ] );
                          break;
                        case 'placeholder':
                          input.setAttribute( 'placeholder', my.cell_settings[ j][ key ] );
                          break;
                        case 'inner':
                          $.setContent( table_col, my.cell_settings[ j ][ key ]  );
                          break;
                        default:
                          input.setAttribute( key, my.cell_settings[ j ][ key ] );
                          break;
                      }
                      // if the cell is not to be editable, no input tag is inserted into the cell
                      if ( my.cell_settings[ j ][ 'editable' ] ) table_col.appendChild( input );
                    }

                    table_row.appendChild( table_col );
                  }
                  else
                    // no cell_settings? -> display empty table
                    table_row.appendChild( table_col );
                }
              }
              table.querySelector( 'tbody' ).appendChild( table_row );
            }

            if ( my.table_head ) {
              const table_row = $.html(my.html.table_row);
              for ( let j = 0 ; j < my.table_col; j++ ) {
                const table_head = $.html(my.html.table_head);
                $.setContent( table_head, my.table_head[ j ]);
                table_row.appendChild( table_head );
              }
              table.querySelector( 'thead' ).appendChild( table_row );
            }
          }
          return table;
        }

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}