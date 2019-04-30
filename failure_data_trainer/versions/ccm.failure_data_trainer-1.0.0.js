/**
 * @overview ccm component for traning th failure data recognising
 * @author André Kless <andre.kless@web.de> 2017-2019
 * @license The MIT License (MIT)
 */

( function () {

  const component = {

    name: 'failure_data_trainer',
    version: [ 1, 0, 0 ],


    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',

    config: {
      templates: {
        "main": {
          "id": "main"
        },
        "textarea":  {
          "inner": {
            "class": "container-fluid",
            "inner": {
              "class": "form-group",
              "inner": [
                {
                  "tag": "label",
                  "for": "comment",
                  "inner": "<span class='text-success'>Comment:</span>"
                },
                {
                  "tag": "textarea",
                  "id": "comment",
                  "name": "comment",
                  "class": "note form-control",
                  "rows": 2
                }
              ]
            }
          }
        },
        "button": {
          "class": "row",
          "inner":{
          "tag": "button",
          "class": "btn btn-default pull-right",
          "typ": "submit",
          "inner": "Submit",
          "onclick": "%save%"
        }
        },
        "check_column": {
          "tag": "td",
          "class": "checkable",
          "inner": {
            "tag": "tr",
            "inner": [
              {
                "tag": "td",
                "inner": {
                  "tag": "label",
                  "class": "control control-radio correct",
                  "style": "margin-left:1em;",
                  "inner": [
                    {
                      "tag": "input",
                      "type": "radio",
                      "value": "correct",
                      "name": "%name%",
                      "onclick": "%save%"
                    },
                    {
                      "tag": "div",
                      "class": "control_indicator"
                    }
                  ]
                }
              },
              {
                "tag": "td",
                "inner": {
                  "tag": "label",
                  "class": "control control-radio incorrect",
                  "style": "margin-left:1em;",
                  "inner": [
                    {
                      "tag": "input",
                      "type": "radio",
                      "value": "incorrect",
                      "name": "%name%",
                      "onclick": "%save%"
                    },
                    {
                      "tag": "div",
                      "class": "control_indicator"
                    }
                  ]
                }
              }
            ]
          }
        },
        "check_content": {
          "tag": "span",
          "class": "pull-right",
          "inner": [
            {
              "tag": "label",
              "class":"control control-radio correct",
              "style": "margin-left:1em;",
              "inner": [
                {
                  "tag": "input",
                  "type": "radio",
                  "value": "correct",
                  "name": "%name%",
                  "onchange": "%save%"
                },
                {
                  "tag": "div",
                  "class": "control_indicator"
                }
              ]
            },
            {
              "tag": "label",
              "class": "control control-radio incorrect",
              "style": "margin-left:1em;",
              "inner": [
                {
                  "tag": "input",
                  "type": "radio",
                  "value": "incorrect",
                  "name": "%name%",
                  "onchange": "%save%"
                },
                {
                  "tag": "div",
                  "class": "control_indicator"
                }
              ]
            }
          ]
        },
        "saved_icon":  {
          'tag':'div',
          "class": "glyphicon glyphicon-save",
          'style': 'position:absolute; left: 24px; top: 5px; color:green'
        }
      },
      //mapping: [ {} ],
      //content_mapping: {},
      //source_data: [ "ccm.store", { "name": "source_data", url: "" } ],
      //corrupt_data: [ "ccm.store", { "name": "corrupt_data", url: "" } ],
      //founded_failures: [ "ccm.store", { "name": "failures", url: "" } ],
      /*table: {
        comp: [ "ccm.component", "https://ccmjs.github.io/tkless-components/table/versions/ccm.table-3.0.0.js" ],
        configs: [ "ccm.store", "some_configs.js" ],
      },
      content: {
        comp: [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.2.0.js", {
          "css": [ "ccm.load",
            { context: "head", url: "https://tkless.github.io/ccm-components/libs/bootstrap/css/font-face.css" },
            "https://tkless.github.io/ccm-components/libs/bootstrap/css/bootstrap.css"
          ]
        } ],
        configs: [ "ccm.store", "some_content_configs.js" ],
      },
      submit: {
        comp: [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.0.0.js", {
          "css": [ "ccm.load",
            { context: "head", url: "https://tkless.github.io/ccm-components/libs/bootstrap/css/font-face.css" },
            "https://tkless.github.io/ccm-components/libs/bootstrap/css/bootstrap.css"
          ]
        } ],
        configs: [ "ccm.store", "some_submit_configs.js" ],
      },*/
      //array_key: [],
      //accordion: [ "ccm.component", "https://ccmjs.github.io/tkless-components/accordion/versions/ccm.accordion-2.0.0.js" ],
      marking_failure: [ "ccm.component", "https://ccmjs.github.io/tkless-components/mark_words/versions/ccm.mark_words-3.3.0.js" ],
      css: [ "ccm.load",
        { context: "head", url: "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
        "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css"
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

      this.init = async () => {

        // listen to login/logout events => restart
        if ( self.user ) self.user.onchange = self.start;
      };

      this.ready = async () => {
        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        if ( self.logger ) self.logger.log( 'ready', $.clone( my ) );
      };

      this.start = async () => {

        if ( !my.mapping )
          return $.setContent( self.element, 'Nothing to display!' );

        const main = $.html( my.templates.main );

        if ( self.user ) await self.user.login();
          await render( my.mapping,  main );

        $.setContent( self.element, main );

        async function render( mapping, element ) {
          $.setContent( element, '' );

          let obj;

          for ( let i = 0; i < mapping.length; i++ ) {
            obj = mapping[ i ];
            if ( obj.title ) $.append( element, $.html( { tag: 'h3', inner: obj.title } ) );
            const div = document.createElement( 'div' );
            $.append( element, div );

            let config, dataset, dataset_with_failures, result, instance, corrupted_data = { failures: {} };

            switch ( obj.type ) {

              case 'accordion':
                config = { entries: [] };
                if ( obj.color ) config.color = obj.color;

                for ( let i = 0; i < obj.entries.length; i++ ) {
                  let obj2 = obj.entries[ i ];
                  const entry = {
                    title: obj2.title,
                    content: document.createElement( 'div' )
                  };
                  config.entries.push( entry );
                  render( obj2.content, entry.content );
                }

                config.root = div;
                my.accordion.start( config );
                break;

              case 'table':
                config = await my.table.configs.get( obj.key );

                dataset = await my.source_data.get( getKey() );

                if ( obj.filter_values !== undefined ) {
                  let filtered_data = { values: [] };
                  dataset.values.map( ( value, i ) => {
                    if ( my.filter_values && ( value[ obj.filter_values ] == my.filter_values ) )
                      filtered_data.values.push( dataset.values[ i ] );
                  } );

                  dataset = filtered_data;
                }

                if ( dataset ) {
                  dataset_with_failures = obj.failure ? await integrateCorruptData( getKey() ) : dataset;

                  if ( !obj.editable ) {
                    // For simulation view no input fields needed, so delete col_settings from table_config
                    delete config.col_settings;
                    config.add_row = false;
                    config.submit = false;
                  }

                  config = { key: config, data: dataset_with_failures };
                }

                config.onfinish = {
                  "log": true,
                  "alert": "Saved!",
                  "store": {
                    "settings": my.source_data.source(),
                    "key": getKey()
                  }
                };

                config.root = div;

                // start table instance with considered failures
                instance = await my.table.comp.start( config );

                // check table lines
                if ( obj.checkable ) {
                  addColumn( instance );

                  //get data by user if its allready exist and set radios
                  const dataset = await my.founded_failures.get( getKey(true ) );
                  $.fillForm(instance.element, dataset);
                }

                if ( obj.markable ) await markingWords( div, instance.element, obj );

                if ( obj[ 'save_failures' ] ) {

                  instance.element.querySelectorAll('button').forEach(button => {
                    button.remove();
                  });

                  instance.onchange = function ( element, value ) {
                    updateCorruptedData(instance, element, value);
                    highlightCorruptedData(instance);
                  };
                  saveCorruptedData();
                  highlightCorruptedData(instance);
                }

                if ( obj.show_results ) disableAllInputs(instance);


                break;

                // add column to table
                function addColumn( instance ) {
                  const  icon = { "tag": "th", "class": "checkable text-center text-success", "inner": "<span class='glyphicon glyphicon-pencil'></span> Checklist" };

                  if ( instance.element.querySelector( 'thead' ).hasChildNodes() ) {
                    instance.element.querySelector( 'thead > tr' ).appendChild( $.html( icon ) );
                  }

                  instance.element.querySelectorAll( 'tbody > tr' ).forEach( tr => {
                    tr.appendChild( $.html( my.templates.check_column, {
                      name: 'check_'+ tr.rowIndex,
                      save: async event => {
                        const target = event.target;

                        await saveFoundedFailures( tr );

                        target.parentNode.appendChild( $.html( my.templates.saved_icon ) );
                        fadeOut( target.parentNode.querySelector( '.glyphicon-save' ) );
                      }
                    } ) );
                  } );

                }

              case 'content':
                config = await my.content.configs.get( obj.key );

                // prepare inner for edd radio buttons
                config.inner = config.inner.replace( /%check_(.*)%/g, obj.checkable ? '<span class="check" id="$1"></span>' : '' );
                config.inner = config.inner.replace( /%list%/, obj.checkable ? '<div class="glyphicon glyphicon-pencil"></div> Checklist' : '' );

                if ( !obj.static_content )
                  dataset = await my.source_data.get( getKey() );

                let child; let placeholder = {};

                if ( dataset ) {
                  dataset_with_failures = obj.failure ? await integrateCorruptData( getKey() ) : dataset;
                  for ( const value in dataset.values ) {
                    child = document.createElement( 'div' );
                    //child.classList.add( 'well', 'well-sm' );
                    div.appendChild( child );

                    [ ...my.content_mapping[ obj.key ] ].map( ( name, i ) => {
                      if ( dataset_with_failures.values[ value ][ i ] === true )
                        placeholder[ name ] = 'checked';
                      else if ( dataset_with_failures.values[ value ][ i ] === false )
                        placeholder[ name ] = '';
                      else
                        placeholder[ name ] = dataset_with_failures.values[ value ][ i ];
                    } );

                    config.placeholder = placeholder;
                    config.root = child;
                  }

                  config = { key: config, data: dataset_with_failures };
                }

                else config.root = div;

                // start table instance with considered failures
                instance = await my.content.comp.start( config );

                if( obj.checkable ) {
                  addRadios( instance );

                  //get data by user if its allready exist and set radios
                  const dataset = await my.founded_failures.get( getKey( true ) );
                  $.fillForm( instance.element, dataset );
                }

                if( obj.markable ) await markingWords( child, instance.element, obj );

                if( obj.show_results ) disableAllInputs( instance );
                /*if ( obj.key === 'randomisation'){
                  instance.element.querySelector( 'button' ).innerHTML = "Randomisation Number: " + selected_dropdown;
                }*/

                break;

              case 'comment':
                instance = await my.content.comp.start( { root: div, inner: $.html( my.templates.textarea ) } );

                dataset = await my.founded_failures.get( my.array_key? getKey( true ): getKey(true ) );

                // fill the comment field if already commented
                if ( dataset && dataset.comment ) instance.element.querySelector( '#comment' ).value = dataset.comment;
                saveComment();

                if( obj.show_results ) disableAllInputs( instance );

                function saveComment(){
                  instance.element.querySelector( '#comment' ).addEventListener( 'change', async ( event ) => {
                    if ( !dataset ) dataset = { key: getKey( true ) };
                    dataset.comment = (event.target).value;
                    await my.founded_failures.set( dataset );
                    const span = $.html( {
                      'tag':'span',
                      'inner':'Saved!',
                      'style': 'margin-left:0.5em; color:green'
                    } );
                    instance.element.querySelector( 'label' ). appendChild( span );
                    fadeOut( span );
                  } );
                }
                break;

              case 'submit':
                config = await my.submit.configs.get( obj.key );

                config.inner = config.inner.replace(/%check_(.*)%/g, obj.checkable ? '<div  class="check" id="$1"></div>' : '' );
                config.inner = config.inner.replace( /%list%/, obj.checkable ? '<div class="glyphicon glyphicon-pencil"></div> Checklist' : '' );

                dataset = await my.source_data.get( getKey() );

                if ( dataset ) {
                  dataset_with_failures = obj.failure ? await integrateCorruptData( getKey() ) : dataset;
                  config = { key: config, data: dataset_with_failures };
                }

                config.onfinish = {
                  "log": true,
                  "alert": "Saved!",
                  "store": {
                    "settings": my.source_data.source(),
                    "key": getKey()
                  }
                };

                config.root = div;

                instance = await my.submit.comp.start( config );

                if ( obj[ 'save_failures' ] ) {
                  instance.element.querySelectorAll( 'input[type="submit"]' ).forEach( button => { button.remove(); } );

                  instance.onchange = function( event ){
                    updateCorruptedData( instance, event.name, event.value );
                    highlightCorruptedData( instance );
                  };

                  saveCorruptedData();
                  highlightCorruptedData( instance );
                }

                if( obj.checkable )  {
                  instance.element.querySelector( '.btn' ).remove();
                  addRadios( instance );

                  //get data by user if its already exist and set radios
                  const dataset = await my.founded_failures.get( getKey( true ) );
                  $.fillForm( instance.element, dataset );
                }

                if( obj.show_results ) disableAllInputs( instance );
                break;
            }

            function disableAllInputs( instance ) {
              instance.element.querySelectorAll( '[ name ]' ).forEach( input => { input.disabled = true; });
              if( instance.element.querySelector( 'button' ) )
                instance.element.querySelector( 'button' ).remove();
            }

            function addRadios( instance ) {
              instance.element.querySelectorAll( '.check' ).forEach( span => {
                const check = $.html( my.templates.check_content, {
                  name: 'check_'+ span.id,
                  save: async event => {
                    const target = event.target;

                    await saveFoundedFailures( check );

                    target.parentNode.appendChild( $.html( my.templates.saved_icon ) );
                    fadeOut( target.parentNode.querySelector( '.glyphicon-save' ) );
                  }
                });
                span.appendChild( check );
              } );

            }

            async function highlightCorruptedData( instance ) {
              instance.element.querySelectorAll( '[name]' ).forEach( input => {
                if ( input.type === "checkbox" ) {
                  input.style[ 'box-shadow' ]= '';
                  input.style[ 'border-radius' ] = '';
                }
                else {
                  input.style.color = '';
                  input.style[ 'background-color' ] = '';
                }
              } );

              corrupted_data.failures = $.toDotNotation( corrupted_data.failures );

              if( my.table.comp.name === instance.component.name ) {
                for ( const key in corrupted_data.failures ) {
                  const path = key.split( '.' ); path.shift();
                  path.map( Number );
                  path[ 0 ] = ++path[ 0 ]; path[ 1 ] = ++path[ 1 ];
                  const input = instance.element.querySelector( '[name="'+path[0]+'-'+path[1]+'"]' );
                  if ( input && input.type === "checkbox" ) {
                    input.style[ 'background-color' ] = 'red';
                    input.style[ 'box-shadow' ] = '0px 0px 0px 5px red';
                    input.style[ 'border-radius' ] = '3px';
                  }
                  else if( input ){
                    input.style.color = "brown";
                    input.style[ 'background-color' ] = "rgba(255, 0, 0, 0.27)";
                  }
                }
              }
              else {
                for ( const key in corrupted_data.failures ) {
                  const input = instance.element.querySelector( '[name="'+key+'"]' );
                  if ( input.type === "checkbox" ) {
                    input.style[ 'background-color' ] = 'red';
                    input.style[ 'box-shadow' ] = '0px 0px 0px 5px red';
                    input.style[ 'border-radius' ] = '3px';
                  }
                  else {
                    input.style.color = "brown";
                    input.style[ 'background-color' ] = "rgba(255, 0, 0, 0.27)";
                  }
                }
              }

            }

            function saveCorruptedData( ) {

              const save_btn = $.html ( my.templates.button, {
                save: async event => {
                  event.preventDefault();
                  const clone_corrupted_data = $.clone( corrupted_data );
                  $.solveDotNotation( clone_corrupted_data.failures );
                  await my.corrupt_data.set( clone_corrupted_data );
                  alert( 'saved' );
                  return false;
                }
              } );

              instance.element.appendChild( save_btn );
            }

            function updateCorruptedData( instance, element, value ) {
              if( my.table.comp.name === instance.component.name ) {
                // get input field that was changed
                const failure_cell = element.getAttribute( 'name' ).split( '-' ).map( Number );

                // if corrupt value of input field was deleted, delete it also from corrupt data
                if ( value === dataset.values[ failure_cell[ 0 ] - 1 ][ failure_cell[ 1 ] - 1 ] )
                  delete corrupted_data.failures[ 'values.'+( failure_cell[0]-1 )+'.'+( failure_cell[1]-1) ];
                else
                  corrupted_data.failures[ 'values.'+( failure_cell[0]-1 )+'.'+( failure_cell[1]-1) ] = value;

                corrupted_data.key = getKey();
              }
              // case submit
              else {
                // if corrupt value of input field was deleted, delete it also from corrupt data
                if ( ( value === dataset[ element ] ) && !dataset[ element ] || ( value === dataset[ element ] ) )
                  delete corrupted_data.failures[ element ];
                else
                  corrupted_data.failures[ element ] = value;

                corrupted_data.key = getKey();
              }
            }

            async function saveFoundedFailures( element ) {

              const founded_failures_data = $.formData( element );
              founded_failures_data.key = getKey( true );

              await my.founded_failures.set( founded_failures_data );
            }

            async function integrateCorruptData( key )   {
              const clone = $.clone( dataset );
              result = await my.corrupt_data.get( key );

              corrupted_data = $.clone( result ) || { failures: {} };
              corrupted_data.failures = $.toDotNotation( corrupted_data.failures );

              return $.integrate( corrupted_data.failures, clone );
            }

            async function markingWords( element, inner, obj ) {
              const user = obj.user || ( ( self.user && self.user.isLoggedIn() ) ? self.user.data().user : 'guest' );
              dataset = await my.founded_failures.get( [ obj.markable, user ] );

              instance = await my.marking_failure.start( {
                root: element,
                show_results: obj.show_results,
                text: {'inner': inner }, data: dataset? dataset[obj.key]: {} } );

              if ( !obj.show_results )
                instance.onchange = async result => {

                dataset = { key: [ obj.markable, user ] };
                dataset[ obj.key ] = instance.getValue();
                await my.founded_failures.set( dataset );

                result.parentNode.appendChild( $.html( {
                  "tag":"span",
                  "style": "margin-left:0.5em;",
                  "class": "glyphicon glyphicon-save"
                } ) );

                fadeOut( result.parentNode.querySelector( '.glyphicon-save' ) );

              };
            }

            function getKey( user ) {
              let key = undefined;

              if ( my.array_key && user ) {
                key = $.clone( my.array_key );
                key.push( obj.user || self.user.data().user );
              }
              else if ( my.array_key )
                key = my.array_key;
              else if( user ) {
                key = [];
                key.push( obj.key, obj.user || self.user.data().user );
              }
              else key = obj.key;

              return key;
            }

            /*fades out an element
              * @param {Element} elem
              */
            function fadeOut( elem ) {
              elem.style.opacity = 1;
              ( async function fade() {
                if ( ( elem.style.opacity -= .01 ) >= 0 ) await requestAnimationFrame( fade );
                else elem.remove();
              } )();
            }
          }
        }
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();