/**
 * @overview ccm component of app collection
 * @author Tea Kless <tea.kless@web.de> 2020
 * @license The MIT License (MIT)
 */

( function () {

  const component = {

    name: 'app_collection',
    version: [ 1, 0,0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.4.0.js',

    config: {
      "html": [ "ccm.load", "https://ccmjs.github.io/tkless-components/app_collection/resources/templates.html" ],
      "title": "My Apps",
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.4.1.js", {
        "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js" ],
        "logged_in": true,
        "style": [ "ccm.load", "https://ccmjs.github.io/tkless-components/app_collection/resources/user.css" ]
      } ],
      "content": [
        {
          "section": "Phase 1",
          "entries": [
            {
              "title": "Title 1",
              "ignore": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/exercise/versions/ccm.exercise-5.0.1.js", {
                "data": {
                  "store": [ "ccm.store", { "name": "exercise_results" } ],
                  "user": true,
                  "key": "title_1"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "logged_in": true
                } ]
              } ]
            },
            {
              "title": "Title 2",
              "ignore": [ "ccm.instance", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-6.0.0.js", {
                "data": {
                  "store": [ "ccm.store", { "name": "cloze_results" } ],
                  "user": true,
                  "key": "title_2"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "logged_in": true
                } ]
              } ]
            }
          ]
        },
        {
          "section": "Phase 2",
          "entries": [
            {
              "title": "Title 1",
              "ignore": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/exercise/versions/ccm.exercise-5.0.1.js", {
                "data": {
                  "store": [ "ccm.store", { "name": "exercise_results" } ],
                  "user": true,
                  "key": "title_1"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "logged_in": true
                } ]
              } ]
            },
            {
              "title": "Title 2",
              "ignore": [ "ccm.instance", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-6.0.0.js", {
                "data": {
                  "store": [ "ccm.store", { "name": "cloze_results" } ],
                  "user": true,
                  "key": "title_2"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "logged_in": true
                } ]
              } ]
            }
          ]
        }
      ],
      "footer": [
        {
          "title": "Chat",
          "icon": "chat",
          "ignore": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-5.0.0.js", {
            "submit_button_label": "Senden",
            "editable": true,
            "chat": true,
            "data": {
              "store": [ "ccm.store", { "name": "chat_result" } ],
              "key": "test_chat"
            },
            "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
              "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
              "logged_in": true
            } ],
          } ]
        },
        {
          "title": "News",
          "icon": "rss_feed",
          "ignore": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/news/versions/ccm.news-2.1.0.js", {
            "data": {
              "store": [ "ccm.store", { "name": "news" } ],
              "key": "test_news"
            },
            "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
              "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
              "logged_in": true
            } ],
          } ]
        },
        {
          "title": "Dashboard",
          "icon": "dashboard",
          "user": "admin",
          "ignore": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/news/versions/ccm.news-2.1.0.js", {
            "editable": "true",
            "data": {
              "store": [ "ccm.store", { "name": "news" } ],
              "key": "test_news"
            },
            "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
              "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
              "logged_in": true
            } ],
          } ]
        }
      ],
      "feedback": [ "ccm.component", "https://ccmjs.github.io/tkless-components/feedback/versions/ccm.feedback-4.0.0.js", {
        "from_above": 20,
        "css": [ "ccm.load", "https://ccmjs.github.io/tkless-components/feedback/resources/right.css" ],
        "data": { "store": [ "ccm.store", { "name": "feedback" } ] }
      } ],
      "menu": [ "ccm.component", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.8.1.js", {
        "css": [ "ccm.load", "https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
          "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
          "https://ccmjs.github.io/tkless-components/app_collection/resources/menu.css" ]
        } ],
      "css": [ "ccm.load", "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css",
        { "context": "head", "url": "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" },
        {  "url": "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp", "type": "css" },
        {  "url": "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp", "type": "css", "context": "head" },
        "https://ccmjs.github.io/tkless-components/app_collection/resources/default.css"
      ],
      "js": [ "ccm.load", "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js" ],
      "routing": [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-2.0.4.js", { "app": "app_collection" } ],
      "helper": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/versions/helper-1.0.0.mjs" } ]
    },

    Instance: function () {
      let $;
      let self = this;

      this.init = async () => {

        if ( self.user ) self.user.onchange = login => {
          if ( login ) return;

          // clear content
          $.setContent( self.element, '' );

          // restart app
          self.start();
        }
      };

      this.ready = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );

        if ( this.logger ) this.logger.log( 'ready', $.clone ( this ) );

      };

      this.start = async () => {

        // login user, if not logged in
        self.user && await self.user.login();

        let main_elem = $.html( self.html.main, {
          title: self.title,
          renderHome: () => {
            $.setContent( main_elem.querySelector( '#title' ), self.title );
            renderContent();
            self.routing && self.routing.set( 'home' );
          }
        } );

        if ( self.user ) {
          await  self.user.start();
          main_elem.querySelector( '#user' ).appendChild( self.user.root );
        }

        await renderContent();

        if( !self.footer )
          main_elem.querySelector( '.footer' ).remove();
        else
          renderFooter();

        // define and check routes
        self.routing && await self.routing.define( {
          home: async () =>  {
            $.setContent( main_elem.querySelector( '.article' ), '' );
            await renderContent();
            updateBreadcrumb( self.title, 'home' )
          },
          app: ( loc, i, app ) => {
            switch ( loc ) {
              case 'footer':
                renderApp( self.footer[ i ] );
                updateBreadcrumb( self.title, app );
                break;
              case 'content':
                $.setContent( main_elem.querySelector( '.article' ), '' );
                renderApp ( self.content[ i ].entries[ app ] );
                updateBreadcrumb( self.content[ i ].section, self.content[ i ].entries[ app ].title );
                break;
            }


          }
        } );

        async function renderContent() {
          $.setContent( main_elem.querySelector( '.article' ), '' );

          for ( const i in self.content ) {
            const entry = self.content[ i ];
            let content = $.html( self.html.content );

            $.append( main_elem.querySelector( '.article' ), content );
            $.setContent( content.querySelector( "#section" ), entry.section );

            await self.menu.start( {
              root: content.querySelector( "#menu-list" ),
              data: entry,
              onclick: async event => {
                self.element.querySelector( '#more' ) && self.element.querySelector( '#more' ).remove();

                await renderApp( event );
                updateBreadcrumb( entry.section, event.title );

                self.routing && self.routing.set( 'app-content-'+ i + '-' + ( event.nr - 1 ) );
              }
            } );
          }

          if ( self.feedback ) {
            await self.feedback.start( { root:  main_elem.querySelector( '#feedback' ) } );
          }

          $.setContent( self.element, main_elem );
          checkOverflow( self.element.querySelector( '.article' ) );
        }

        async function renderFooter() {
          for( const i in self.footer ) {
            const entry = self.footer[ i ];

            if( entry.user && self.user.data().user !== entry.user ) return;  // content only for admin user

            const footer_entry = $.html( self.html.footer_entry, {
              id: entry.title.toLocaleLowerCase(),
              icon: entry.icon,
              icon_title: entry.title
            } );

            footer_entry.addEventListener( 'click', async ()=> {
              await renderApp( entry );
              // update route
              self.routing && self.routing.set( 'app-footer-'+ i + '-'+ entry.title.toLocaleLowerCase() );
              // update breadcrumb
              updateBreadcrumb( self.title, entry.title );
            } );

            main_elem.querySelector( '.footer' ).appendChild( footer_entry );
            $.setContent( self.element, main_elem );
          }
        }

        function updateBreadcrumb( title, subtitle ) {
          if ( subtitle === 'home')
            $.setContent( main_elem.querySelector( '#title' ), title );
          else {
            let div = document.createElement( 'small' );
            div.setAttribute( 'id', 'subtitle' );

            $.setContent( main_elem.querySelector( '#title' ), title );
            main_elem.querySelector( '#title' ).appendChild( div );
            main_elem.querySelector( '#subtitle' ).innerHTML = subtitle;
            //$.setContent( main_elem.querySelector( '#subtitle' ), subtitle );
          }

        }

        async function renderApp( config ) {
          const div = document.createElement( 'div' );
          div.setAttribute( 'id', 'padding' );
          $.setContent(  main_elem.querySelector( '.article ' ), div );
          const instance_config = await $.solveDependency( config.ignore[ 2 ] );
          instance_config.root = main_elem.querySelector( '.article > div' );
          instance_config.parent = self;
          config.ignore[ 2 ] = instance_config;
          const instance = await $.solveDependency( config.ignore );
          await instance.start();
        }

        function checkOverflow( element ) {
          let checkOverflow = element.clientHeight < element.scrollHeight;

          if ( checkOverflow ) {
            const more = $.html( self.html.more, {
              id: 'more',
              scroll_down: () => {
                console.log( 'click' );
                self.element.querySelector( '.article' ).lastChild.scrollIntoView( { block: 'end',  behavior: 'smooth' } );
              }
            } );
            $.setContent( self.element.querySelector( '#scroll-down' ), more );
          }
        }

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
