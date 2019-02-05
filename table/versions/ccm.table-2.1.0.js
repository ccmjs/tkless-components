/**
 * @overview ccm component for table generating
 * @author Tea Kless <tea.kless@web.de>, 2018
 * @license The MIT License (MIT)
 * @changes
 * -(12.09.2018) uses ccm v18.0.0
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
    version: [2, 1, 0],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        "table": {
          "inner": {
            "tag": "form",
            "onsubmit": "%submit%",
            "inner": {
              "id": "container",
              "inner": {
                "class": "table-responsive",
                "inner": {
                  "tag": "table",
                  "class": "table table-striped table-responsive",
                  "inner":[
                    { "tag": "thead" },
                    { "tag": "tbody" }
                  ]
                }
              }
            }
          }
        },

        "table_row": { "tag": "tr" },

        "table_col": { "tag": "td" },

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

        let data  = await $.dataset( my.data );

        let start_data;

        // support different forms of data structure
        uniformData();

        //uniform data to fulfill form.js data structure
        //dataToFormdataInput();

        if ( !generateTable() )
          $.setContent( self.element, "Nothing to display" );
        else {
          $.setContent( self.element, generateTable() );

          $.fillForm( self.element, dataToFormdataInput() );

          if ( my.submit ) {
            const submit_button = $.html ( my.html.submit );
            self.element.querySelector( '#container' ).appendChild( submit_button );
          }

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
          }  );
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
          if ( my.add_row ) table.appendChild(  $.html( my.html.add, {
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
                const table_col = $.html ( my.html.table_col );

                if ( !my.col_settings ) {

                  if ( values ) $.setContent( table_col, i < values.length && values[ i ][ j ] !== undefined ? values[ i ][ j ] : '' );

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

                  table_col.appendChild( $.html( input, {
                    // onchange event for input fields
                    change: function () {
                      self.onchange && self.onchange( this, this.value, self );
                    }
                  } ) );

                }

                table_row.appendChild( table_col );

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