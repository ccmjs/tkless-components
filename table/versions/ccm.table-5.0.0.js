/**
 * @overview ccm component for table generating
 * @author Tea Kless <tea.kless@web.de>, 2018-2020
 * @license The MIT License (MIT)
 * @changes
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
      "templates": [ "ccm.load", "resources/templates.html" ],
      "html": {
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
                    "class": "table table-striped",
                    "inner":[
                      { "tag": "thead" },
                      { "tag": "tbody" }
                    ]
                  }
                },
                {
                  "id": "buttons",
                  "class":"d-flex justify-content-between"
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
          "class": "btn btn-outline-success",
          "typ": "button",
          "onclick": "%add%",
          "inner": [
            {
              "tag": "span",
              "class": "fa fa-plus"
            },
            " Row"
          ]
        },
        "submit": {
          "tag": "button",
          "class": "btn btn-primary pull-right",
          "typ": "submit",
          "inner": "Submit"
        }
      },
      //add_row: true,
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
      //cell_onrender: function ( event ) { console.log( this, event ); }
      //cell_onclick: function ( target, value, self  ){ console.log( target, value, self ); },
      //filter_values
      "css": [ "ccm.load", "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
        "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css",
        { "context": "head", "url": "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" },
        "resources/default.css"
      ],
      "helper": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/versions/helper-5.0.0.mjs" } ]
    },

    Instance: function () {
      /**
       * shortcut to help functions
       * @type {Object.<string,function>}
       */
      let $, data, table, row, col = 0;

      this.ready = async () => {
        // set shortcut to help functions
        $ = this.ccm.helper;

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );

        if ( this.logger ) this.logger.log( 'ready', $.clone ( this ) );
      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = async () => {

        data  = await $.dataset( this.data );
        // support different forms of data structure
        uniformData();

        if ( !generateTable() )
          $.setContent( this.element, "Nothing to display" );
        else {
          $.setContent( this.element, generateTable() );

          this.col_settings && $.fillForm( this.element, dataToFormdataInput(), this.ccm );

          renderAddRowButton(); // add new row via button
          renderSubmitButton(); // submit button
          filterValues();
        }

      };

      const renderSubmitButton = () => {
        this.submit && this.col_settings && table.querySelector( '#buttons' ).appendChild( $.html ( this.html.submit ) );
      };

      const renderAddRowButton = () => {
        if ( this.add_row && this.col_settings )
          $.setContent( table.querySelector( '#buttons' ), (
            $.html( this.html.add, {
                add: () => addTableRow( row++, col )
              }
            ) ) );
      };

      const generateTable = () => {

        if ( !this.col_settings && !data ) return;

        table = $.html ( this.html.table, {
          submit: event => {
            event && event.preventDefault();
            event.stopPropagation();
            $.onFinish( this );
            return false; // prevent page reload
          }
        } );
        this.table_head && $.setContent( table.querySelector( 'thead' ), addTableHead() );

        if ( !this.table_col && data.values.length > 0 && Array.isArray( data.values[ 0 ] ) )
          this.table_col = data.values[ 0 ].length;

        row = data.values.length;
        for ( let i = 0 ; i < row; i++ )
          addTableRow( i, col,data && data.values );


        return table;
      };

      const addTableHead = () => {
        const table_row = $.html(this.html.table_row);

        for ( let j = 0 ; j < this.table_col; j++ ) {
          const table_head = $.html( this.html.table_head );
          $.setContent( table_head, this.table_head[ j ] );
          table_row.appendChild( table_head );
        }

        return table_row;
      };

      const addTableRow = ( i, j, values ) => {
        const table_row = $.html ( this.html.table_row );

        if ( this.table_col ) {
          for ( let j = 0 ; j < this.table_col; j++ ) {
            col = j;
            const table_cell = $.html ( this.html.table_cell );

            if ( !this.col_settings && values )
              $.setContent( table_cell, i < values.length && values[ i ][ j ] !== undefined ? values[ i ][ j ] : '' );
            else {
              let input;
              if ( this.col_settings && this.col_settings[ j ] ) {
                switch ( this.col_settings[ j ].type ) {
                  case 'textarea':
                    input = $.clone( this.html[ 'textarea' ] );
                    break;
                  case 'select':
                    input = $.clone( this.html[ 'select' ] );
                    break;
                  default:
                    input = $.clone( this.html[ 'input' ] );
                    break;
                }
              }
              //const input = $.clone( my.html[ my.col_settings && my.col_settings[ j ] && my.col_settings[ j ].type === 'textarea' ? 'textarea' : 'input' ] );
              input.name = ( i + 1 ) + '-' + ( j + 1 );

              // consider column properties
              this.col_settings && considerColSettings( j, input );

              table_cell.appendChild( $.html( input, {
                // onchange event for input fields
                change: function () {
                  self.onchange && self.onchange( this, this.value, self );
                }
              } ) );

            }

            // set click event of table cells only if no coll_settings was set
            if ( this.cell_onclick && !this.col_settings ) {
              table_cell.onclick = () => this.cell_onclick( table_cell, table_cell.innerHTML, this );
              table_cell.style.cursor = 'pointer';
            }

            // set onrender event of table cells only if no coll_settings was set
            this.cell_onrender && !my.col_settings && this.cell_onrender.call( this, { data: data, i: i, j:j, cell: table_cell } );

            table_row.appendChild( table_cell );

          }
        }
        table.querySelector( 'tbody' ).appendChild( table_row );
      };

      const considerColSettings = ( col, input ) => {
        // set input tag property for each input => each input tag of one column has same properties
        for ( const key in this.col_settings[ col ] ) {
          switch ( key ) {
            case 'type':
              if ( this.col_settings[ col ][ key ] !== 'textarea' )
                input.type = this.col_settings[ col ][ key ];
              break;
            case 'placeholder':
              input.placeholder = this.col_settings[ col ][ key ];
              break;
            case 'options':
              const option = this.col_settings[ col ][ key ];
              for ( let i=0; i<option.length; i++ ){
                input.inner.push( { "tag": "option", "inner": option[ i ] } );
              }
              break;
            default:
              input[ key ] =  this.col_settings[ col ][ key ];
              break;
          }

        }
      }

      const filterValues = () => {
        if ( this.filter_values && !this.col_settings ) {
          const search_elem = $.html( this.templates.search, {
            search: () => {
              let input, filter, table, tr;
              input = this.element.querySelector( '#search-input' );
              filter = input.value.toUpperCase();
              table = this.element.querySelector( 'tbody' );
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
          } );
          $.prepend( this.element, search_elem );
        }

      };

      const dataToFormdataInput = () => {
        if ( !data || !Array.isArray( data.values ) || data.values.length === 0 ) return;

        const start_values = {};
        for ( let i = 0; i < data.values.length; i++ ){
          for ( let j = 0; j < data.values[ i ].length; j++ ) {
            let key = ( i + 1 )+"-"+ ( j + 1);
            start_values[ key ] = data.values[ i ][ j ];
          }
        }
        return start_values;
      };

      /** brings given data to uniform data structure - @author André Kless <andre.kless@web.de>, 2018 */
      const uniformData =  () => {
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
      };

      /** reads the table values and transform it to result data */
      const prepareFormData = () => {

        let form_data = $.formData( this.element.querySelector( 'table' ) );

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

      this.getValue = () => {
        return prepareFormData();
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();