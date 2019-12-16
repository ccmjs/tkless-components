/**
 * @overview ccm component for table generating
 * @author Tea Kless <tea.kless@web.de>, 2018-2019
 * @license The MIT License (MIT)
 * @changes
 * @version 4.1.0
 * -(16.12.2019)
 *    support of filtering of table cell values
 *  @version 4.0.0
 * -(21.05.2019)
 *    onrender event for table cells
 *    self.data(ccm v20.7.0) instead of my.data
 * @version 3.0.0
 * -(29.04.2019) onclick event for table cells
 *  @version 2.2.0
 * -(29.04.2019) contains changes from vimp
 * @version 2.1.0
 * - selectable input field
 * - uses ccm v20.0.0
 */

( function () {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'table',
    version: [4, 1, 0],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-24.1.1.min.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      templates: [ "ccm.load", "https://ccmjs.github.io/tkless-components/table/resources/templates.html" ],
      html: {
        "table": {
          "inner": {
            "tag": "form",
            "onsubmit": "%submit%",
            "inner": {
              "id": "container",
              "inner": [
                {
                  "class": "table-responsive",
                  "inner": {
                    "tag": "table",
                    "class": "table table-striped table-responsive",
                    "inner":[
                      { "tag": "thead" },
                      { "tag": "tbody" }
                    ]
                  }
                },
                {
                  "id": "buttons",
                  "class":"row"
                }
              ]
            }
          }
        },

        "table_row": { "tag": "tr" },

        "table_cell": { "tag": "td" },

        "table_head": { "tag": "th" },

        "input": {
          "tag": "input",
          "type": "text",
          "onchange": "%change%"
        },

        "textarea": {
          "tag": "textarea",
          "onchange": "%change%"
        },

        "select": {
          "tag": "select",
          "onchange": "%change%",
          "inner": []
        },

        "add": {
          "tag": "button",
          "class": "btn btn-default",
          "typ": "button",
          "onclick": "%add%",
          "inner": [
            {
              "tag": "span",
              "class": "glyphicon glyphicon-plus"
            },
            " Row"
          ]
        },

        "submit": {
          "tag": "button",
          "class": "btn btn-default pull-right",
          "typ": "submit",
          "inner": "Submit"
        }
      },
      //add_row: true,
      table_row: 0,
      //table_col: 3,
      //table_head: [ "header-1", "header-2", "header-3" ],
      //col_settings: [
      //  { "type": "number", "placeholder": "Tel: 049..." },
      //  { "disabled": "true", "inner": "max.musterman@mail.com" },
      //  { "type": "date", "foo": "bar" }
      //],
      //data: [ "ccm.get", "resources/configs.js", "demo" ],
      //submit: true,
      //onfinish
      //onchange
      //cell_onrender: function ( event ) { console.log( this, event ); },
      //cell_onclick: function ( target, value, self ){ console.log( target, value, self ); },
      //filter_values
      css: [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" }
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
      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = async () => {

        let data  = await $.dataset( self.data );

        // support different forms of data structure
        uniformData();

        if ( !generateTable() )
          $.setContent( self.element, "Nothing to display" );
        else {

          if ( my.filter_values && !my.col_settings ) {
            $.setContent( self.element, $.html( my.templates.search, {
              search: function () {
                let input, filter, table, tr;
                input = self.element.querySelector( '#search-input' );
                filter = input.value.toUpperCase();
                table = self.element.querySelector( 'tbody' );
                tr = table.querySelectorAll( 'tr' );
                for ( let i = 0; i < tr.length; i++ ) {
                  let filtered = false;
                  let tds = tr[i].querySelectorAll("td");
                  for( let t = 0; t < tds.length; t++ ) {
                    let td = tds[t];
                    if ( td ) {
                      if ( td.innerHTML.toUpperCase().indexOf(filter) > -1 ) {
                        filtered = true;
                      }
                    }
                  }
                  if( filtered === true ) {
                    tr[i].style.display = '';
                  }
                  else {
                    tr[i].style.display = 'none';
                  }
                }
              }
            } ) );
            self.element.appendChild( generateTable() );
          }

          else $.setContent( self.element, generateTable() );

          my.col_settings && $.fillForm( self.element, dataToFormdataInput() );

          my.submit && my.col_settings && self.element.querySelector( '#buttons' ).appendChild( $.html ( my.html.submit ) );

        }

        function generateTable() {

          if ( !my.col_settings && !data ) return;

          if ( !my.table_col && data.values.length > 0 && Array.isArray( data.values[ 0 ] ) ) my.table_col = data.values[ 0 ].length;
          const table = $.html ( my.html.table, {
            submit: event => {
              event.stopPropagation();
              if ( event ) event.preventDefault();
              $.onFinish( self );
              return false; // prevent page reload
            }
          } );
          let row;

          if ( my.table_row || data.values.length > 0 ) {
            row = data && data.values && data.values.length > my.table_row ? data.values.length : my.table_row;

            for ( let i = 0 ; i < row; i++ )
              addRow( i, data && data.values );

            if ( my.table_head ) {
              table.querySelector( 'thead' ).appendChild( getTableHead() );
            }
          }

          // add new row via button
          if ( my.add_row && my.col_settings ) table.querySelector( '#buttons' ).appendChild(  $.html( my.html.add, {
            add: function ( event ) {
              if ( event ) event.preventDefault();
              addRow( row++ );
            }
          } ) );
          return table;

          function addRow( i, values ) {

            const table_row = $.html ( my.html.table_row );
            if ( my.table_col ) {
              for ( let j = 0 ; j < my.table_col; j++ ) {
                const table_cell = $.html ( my.html.table_cell );

                if ( !my.col_settings ) {

                  if ( values ) $.setContent( table_cell, i < values.length && values[ i ][ j ] !== undefined ? values[ i ][ j ] : '' );

                }
                else {
                  let input;
                  if ( my.col_settings && my.col_settings[ j ] ) {
                    switch ( my.col_settings[ j ].type ) {
                      case 'textarea':
                        input = $.clone( my.html[ 'textarea' ] );
                        break;
                      case 'select':
                        input = $.clone( my.html[ 'select' ] );
                        break;
                      default:
                        input = $.clone( my.html[ 'input' ] );
                        break;
                    }
                  }
                  //const input = $.clone( my.html[ my.col_settings && my.col_settings[ j ] && my.col_settings[ j ].type === 'textarea' ? 'textarea' : 'input' ] );
                  input.name = ( i + 1 ) + '-' + ( j + 1 );

                  // consider column properties
                  if ( my.col_settings ) considerColSettings( j, input );

                  table_cell.appendChild( $.html( input, {
                    // onchange event for input fields
                    change: function () {
                      self.onchange && self.onchange( this, this.value, self );
                    }
                  } ) );

                }

                // set click event of table cells only if no coll_settings was set
                if ( self.cell_onclick && !my.col_settings ) {
                  table_cell.onclick = () => self.cell_onclick( table_cell, table_cell.innerHTML, self );
                  table_cell.style.cursor = 'pointer';
                }

                // set onrender event of table cells only if no coll_settings was set
                self.cell_onrender && !my.col_settings && self.cell_onrender.call( self, { data: data, i: i, j:j, cell: table_cell } );

                table_row.appendChild( table_cell );

              }
            }
            table.querySelector( 'tbody' ).appendChild( table_row );
          }
        }

        function getTableHead() {
          const table_row = $.html(my.html.table_row);

          for ( let j = 0 ; j < my.table_col; j++ ) {
            const table_head = $.html( my.html.table_head );
            $.setContent( table_head, my.table_head[ j ] );
            table_row.appendChild( table_head );
          }

          return table_row;
        }

        function considerColSettings( col, input ) {
          // set input tag property for each input => each input tag of one column has same properties
          for ( const key in my.col_settings[ col ] ) {
            switch ( key ) {
              case 'type':
                if ( my.col_settings[ col ][ key ] !== 'textarea' )
                  input.type = my.col_settings[ col ][ key ];
                break;
              case 'placeholder':
                input.placeholder = my.col_settings[ col ][ key ];
                break;
              case 'options':
                const option = my.col_settings[ col ][ key ];
                for ( let i=0; i<option.length; i++ ){
                  input.inner.push( { "tag": "option", "inner": option[ i ] } );
                }
                break;
              default:
                input[ key ] =  my.col_settings[ col ][ key ];
                break;
            }

          }
        }

        /** brings given data to uniform data structure - @author André Kless <andre.kless@web.de>, 2018 */
        function uniformData() {
          if ( !data ) return;
          if ( Array.isArray( data ) )
            data = { values: data };
          if ( Array.isArray( data.values ) && data.values.length > 0 && $.isObject( data.values[ 0 ] ) ) {
            const values = [];
            data.values.map( obj => {
              const row = [];
              for ( const key in obj )
                if ( typeof obj[ key ] !== 'object' )
                  row.push( obj[ key ] );
              values.push( row );
            } );
            data.values = values;
          }
        }

        function dataToFormdataInput() {
          if ( !data || !Array.isArray( data.values ) || data.values.length === 0 ) return;

          const start_values = {};
          for ( let i = 0; i < data.values.length; i++ ){
            for ( let j = 0; j < data.values[ i ].length; j++ ) {
              let key = ( i + 1 )+"-"+ ( j + 1);
              start_values[ key ] = data.values[ i ][ j ];
            }
          }
          return start_values;
        }

      };

      this.getValue = () => {

        return prepareFormData();

        // reads the table values and transform it to result data
        function prepareFormData() {

          let form_data = $.formData( self.element.querySelector( 'table' ) );

          const result = [];

          for ( const key in form_data ) {
            const coord = key.split( '-' );
            const row = coord[ 0 ] - 1;
            const col = coord[ 1 ] - 1;
            if ( !result[ row ] ) result[ row ] = [];
            result[ row ][ col ] = form_data[ key ];
          }

          return { values: result };
        }
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();