/**
 * @overview ccm component for traning the failure data recognising
 * @author Tea Kless <tea.kless@web.de> 2017-2019
 * @license The MIT License (MIT)
 */

( function () {

  const component = {

    name: 'triple_nav',
    version: [ 1, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',

    config: {
      html: {
        "main": {
          "inner": [
            {
              "id": "first_level"
            },
            {
              "id": "second_level",
              "style": "padding-top: 1.2em;",
              "class": "col-md-2"
            },
            {
              "id": "content",
              "style": "padding-top: 1.2em;",
              "class": "col-md-10"
            }
          ]
        }
      },
      /*entries: [
        {
          "title": "Title 1",
          "entries": [
            {
              "title": "Comp 1",
              "content": [ "ccm.instance", "https://ccm.some_component.js", {
                "mapping": [ {
                  "type": "content",
                  "key": "comp_key",
                } ]
              } ]
            }
          ]
        }
      ],*/
      //onclick: event => console.log( event )
      dropdown: { title: 'Subject:', entries: [ "A", "B", "C", "D" ] },
      failure_data_trainer: [ "ccm.component", "https://ccmjs.github.io/tkless-components/failure_data_trainer/ccm.failure_data_trainer.js" ],
      menu: {
        comp: [ "ccm.component", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.4.0.js", {
          "css": [ "ccm.load",
            "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
            { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" }
          ],
        } ],
        configs: {
          "tabs": {
            "html": {
              "main": {
                "id": "main",
                "inner": [
                  {
                    "tag": "ul",
                    "class": "nav nav-tabs",
                    "id": "entries"
                  },
                  {
                    "id": "content"
                  }
                ]
              },
              "entry": {
                "tag": "li",
                "class": "entry",
                "onclick": "%click%",
                "style": "cursor: pointer",
                "inner": {
                  "tag": "a",
                  "class": "title"
                }
              }
            }
          },
          "list_group": {
            "html": {
              "main": {
                "id": "main",
                "inner": [
                  {
                    "inner": {
                      "class": "list-group",
                      "id": "entries"
                    }
                  },
                  {
                    "id": "content",
                    "class": "col-md-10"
                  }
                ]
              },
              "entry": {
                "tag": "a",
                "class": "entry list-group-item",
                "onclick": "%click%",
                "style": "cursor: pointer",
                "inner": {
                  "class": "title"
                }
              }
            }
          }
        }
      },
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

      let selected_dropdown_id,
          selected_first_level = 1,
          selected_second_level = 2,
          selected_title,
          selected_dropdown_value;

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
        if ( !my.entries )
          return $.setContent( self.element, 'Nothing to display!' );

        const main = $.html( my.html.main );

        await renderFirstLevel();

        $.setContent( self.element, main );

        async function renderFirstLevel() {

          // collect first level entries
          const entries = [];
          let first_level;


          for ( const level in my.entries ) {
            first_level = my.entries[ level ];

            const entry = {
              title: first_level.title
            };
            entries.push( entry );
          }

          selected_dropdown_id = my.selected_dropdown_id ?  my.selected_dropdown_id: 'dropdown_1';

          const instance = await my.menu.comp.start( {
            key: my.menu.configs.tabs,
            root: main.querySelector( '#first_level' ),
            selected: selected_first_level,
            data: {
              entries: entries
            },
            onclick: async event => {
              selected_first_level = event.nr;
              getEntryByTitle();
              await renderListGroup( event );
            }
          } );

          if ( my.dropdown ) await setUpDropdown( instance );
        }

        async function setUpDropdown( instance ) {
          selected_dropdown_value = my.dropdown.entries[ 0 ];

          // add dropdown menu
          $.prepend( instance.element.querySelector( 'ul' ), $.html(
            '<li class="dropdown">' +
            '  <a class="dropdown-toggle" role="button">'+ my.dropdown.title + ' <tt>' + my.dropdown.entries[ 0 ] +'</tt> <span class="caret"></span></a>' +
            '  <ul class="dropdown-menu"></ul>' +
            '</li>' ) );

          // add entries to dropdown menu
          const dropdown_entries = instance.element.querySelector( '.dropdown-menu' );
          for ( const value in my.dropdown.entries ) {
            const id = Number( value ) + 1;
            const li = {
              "tag": "li",
              "inner": {
                "tag": "a",
                "id": "dropdown_"+id,
                "href": "#",
                "inner": '<b>' + my.dropdown.entries[ value ]+ '</b>'
              }
            };

            $.append( dropdown_entries, $.html( li ) );
          }

          // toggle dropdown menu of subject numbers
          const dropdown = instance.element.querySelector( '.dropdown' );
          dropdown.addEventListener( 'click', ( event ) => {
            event.preventDefault();
            dropdown.classList.toggle( 'open' );
          } );

          // set click events for dropdown menu entries
          [ ...instance.element.querySelectorAll( '.dropdown li' ) ].map( ( li, i ) => {
            li.addEventListener( 'click', ( event )=> {
              event.preventDefault();
              // If selected menu entry not changed => abort
              if ( selected_dropdown_value === my.dropdown.entries[ i ] )
                return;
              selected_dropdown_value = my.dropdown.entries[ i ];
              selected_dropdown_id = li.querySelector( 'a' ).id;
              $.setContent( instance.element.querySelector( '.dropdown a' ), $.html(my.dropdown.title + ' <tt>' + li.textContent + '</tt><span class="caret"></span>') );
              renderContent();
            } )
          } );

          if( my.selected_dropdown_id !== undefined ){
            instance.element.querySelector( '#'+ my.selected_dropdown_id ).parentElement.click();
            instance.element.querySelector( '.dropdown' ).click();
          }

        }

        async function renderListGroup( event_data ) {
          let second_level;

          const entries = [];
          selected_first_level  = event_data.nr;

          for ( const nr in my.entries[ event_data.nr - 1 ].entries ) {

            second_level = my.entries[ event_data.nr - 1 ].entries[ nr ];

            const entry = {
              title: second_level.title,
              disabled: !second_level.data
            };
            entries.push( entry );
          }

         await my.menu.comp.start( {
            key: my.menu.configs.list_group,
            root: main.querySelector( '#second_level' ),
            selected: selected_second_level,
            data: {
              entries: entries
            },
            onclick: async event => {
              selected_title = event.title;
              selected_second_level = event.nr;
              await renderContent();
            }
          } );
        }

        async function renderContent() {
          const content_elem = main.querySelector( '#content' );

          getEntryByTitle();
          const entry_data = my.entries[ selected_first_level - 1 ].entries[ selected_second_level - 1 ];

          // content is given as ccm dependency? => solve dependency
          entry_data.content = await $.solveDependency( entry_data.content );

          // no menu entry content? => abort
          if ( entry_data.content ) {
            // content is ccm instance? => render instance as content
            if ( $.isInstance( entry_data.content ) ) {
              $.setContent( content_elem, entry_data.content.root );
              entry_data.content.parent = self;
              await entry_data.content.start();
            }

            // has content component? => render content via content component
            else if ( self.content ) await self.content.start( { root: content_elem, inner: entry_data.content } );

            // render given content
            else $.setContent( content_elem, $.html( entry_data.content ) );
          }

          if ( self.onclick ) self.onclick( self.getValue(), content_elem );

        }

        function getEntryByTitle() {
          selected_second_level = 1;

          my.entries[ selected_first_level - 1 ].entries.forEach( ( entry, i ) => {
            if ( selected_title && entry.title === selected_title )
              return selected_second_level = i + 1;
          } );

        }

      };

      this.getValue = () => {
        return [ selected_dropdown_id, selected_first_level, selected_second_level, selected_title, selected_dropdown_value ];
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();