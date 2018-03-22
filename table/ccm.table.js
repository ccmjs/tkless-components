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
        },

        "table_row": { "tag": "tr" },

        "table_col": { "tag": "td" },

        "table_head": { "tag": "th" },

        "input": {
          "tag": "input",
          "type": "text"
        },

        "textarea": {
          "tag": "textarea"
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
          "typ": "button",
          "inner": "Submit",
          "onclick": "%submit%"
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
      css: [ "ccm.load", "https://tkless.github.io/ccm-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://tkless.github.io/ccm-components/libs/bootstrap/css/font-face.css" }
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

        $.dataset( my.data, data => {

          if ( !generateTable() ) return $.setContent( self.element, "Nothig to display" );

          else {
            $.setContent( self.element, generateTable() );

            if ( my.submit ) {
              const submit_button = $.html ( my.html.submit, {
                submit: function () { $.onFinish( self ); }
              } );
              self.element.querySelector( '#container' ).appendChild( submit_button );
            }

            if ( callback ) callback();
          }

          function generateTable() {
            const table = $.html ( my.html.table );
            let row;

            if ( my.table_row ) {
              row = my.data && ( my.data.values.length > my.table_row) ? my.data.values.length : my.table_row;

              for ( let i = 0 ; i < row; i++ ) {
                const table_row = $.html ( my.html.table_row );
                if ( my.table_col ) {
                  for ( let j = 0 ; j < my.table_col; j++ ) {
                    const table_col = $.html ( my.html.table_col );

                    if ( !my.col_settings ) {

                      if ( data ) $.setContent( table_col, i < data.length && data[ i ][ j ] ? data[ i ][ j ] : '' );

                    }
                    else {

                      const input = $.clone( my.html[ my.col_settings && my.col_settings[ j ] && my.col_settings[ j ].type === 'textarea' ? 'textarea' : 'input' ] );
                      input.name = ( i + 1 ) + '-' + ( j + 1 );

                      // consider column properties
                      if ( my.col_settings ) considerColSettings( j, input );

                      // set values of input fields
                      if ( data ) ( i < data.length ) && data[ i ][ j ] ? input.value = data[ i ][ j ] : input.value = '';

                      table_col.appendChild( $.html( input ) );

                    }

                    table_row.appendChild( table_col );

                  }
                }
                table.querySelector( 'tbody' ).appendChild( table_row );
              }

              if ( my.table_head ) {
                table.querySelector( 'thead' ).appendChild( getTableHead() );
              }
            }

            // add new row via button
            if ( my.add_row ) table.appendChild(  $.html( my.html.add, {
              add: function ( event ) {
                if ( event ) event.preventDefault();
                my.table_row = ++row;
                my.data = self.getValue();
                self.start();
              }
            } ) );
            return table;
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
                default:
                  input[ key ] =  my.col_settings[ col ][ key ];
                  break;
              }

            }
          }

        } );

      };

      this.getValue = () => {

        return prepareFormData();

        // reads the table values and transform it to result data
        function prepareFormData() {

          let form_data = $.formData( self.element.querySelector( 'table' ) );

          const result = [];

          for( const key in form_data ) {
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

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}