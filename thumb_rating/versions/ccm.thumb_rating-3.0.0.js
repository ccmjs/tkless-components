/**
 * @overview  <i>ccm</i> component for rating
 * @author Tea Kless <tea.kless@web.de> 2019
 * @license The MIT License (MIT)
 *  @version 3.0.0
 * @changes
 * version 3.0.0 (07.01.2019)
 * - uses ccm v20.0.0
 */

( function () {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'thumb_rating',
    version: [ 3,0,0 ],

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
      // "data": { "store": [ "ccm.store", {} ] },
      // "template": "buttons" // or "simple"
      "html": {
        "main": {
          "inner": [
            {
              "id": "login-section"
            },
            {
              "id": "rating-section"
            }
          ]
        },

        "simple": {
          "inner": [
            {
              "id": "likes",
              "class": "fa fa-thumbs-up",
              "inner": [ "&#8198;", "%likes%" ]
            },
            {
              "id": "dislikes",
              "class": "fa fa-thumbs-down",
              "inner":  [ "&#8198;", "%dislikes%"]
            }
          ]
        },

        "buttons": {
          "id": "rating",
          "inner": [
            {
              "inner": {
                "tag": "a",
                "id": "likes",
                "class": "btn btn-default",
                "inner": [
                  {
                    "tag": "i",
                    "class": "fa fa-thumbs-up icon",
                  },
                  "%likes%"
                ]
              }
            },
            {
              "inner": {
                "tag": "a",
                "id": "dislikes",
                "class": "btn btn-default",
                "inner": [
                  {
                    "tag": "i",
                    "class": "fa fa-thumbs-down icon",
                  },
                  "%dislikes%"
                ]
              }
            }
          ]
        }
      },
      "libs": [ "ccm.load",
        { "context": "head", "url": "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" },
        "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css",
        { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css" },
        "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
        "https://ccmjs.github.io/tkless-components/thumb_rating/resources/default.css"
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

      let total = 0;

      this.init = async () => {
        // listen to change event of ccm realtime datastore => (re)render own content
        self.data.store.onchange = self.start;

        // listen to login/logout event => (re)render own content
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

        // get dataset for rendering
        const dataset = await $.dataset( my.data );

        if( self.logger ) self.logger.log( 'start', $.clone ( dataset ) );

        const main_elem = $.html( my.html.main );

        await renderThumbs();

        $.setContent( self.element, main_elem );

        async function renderThumbs() {

          if ( self.user )
            self.user.start( () => {
              main_elem.querySelector( '#login-section' ).appendChild( self.user.root );
            } );

          // set default like and dislike property
          if ( !dataset.likes    ) dataset.likes    = {};
          if ( !dataset.dislikes ) dataset.dislikes = {};

          total = ( Object.keys( dataset.likes ).length ) - ( Object.keys( dataset.dislikes ).length );

          const rating_elem = $.html( my.template === 'buttons' ? my.html.buttons : my.html.simple, {
            likes: Object.keys( dataset.likes ).length,
            dislikes: Object.keys( dataset.dislikes ).length
          } );

          main_elem.querySelector( '#rating-section').appendChild( rating_elem );

          // ccm instance for user authentication not exists? => abort
          if ( !self.user ) {
            if ( my.template === 'buttons') {
              [ ...main_elem.querySelectorAll( '.btn' ) ].map( btn => {
                btn.classList.add( 'disabled' );
              } );
            }
            return;
          }

          /**
           * website area for likes and dislikes
           * @type {{likes: ccm.types.element, dislikes: ccm.types.element}}
           */
          const div = {
            likes:    main_elem.querySelector( '#likes' ),
            dislikes: main_elem.querySelector( '#dislikes' )
          };

          // add class for user specific interactions
          main_elem.querySelector( '#rating-section' ).classList.add( 'user' );

          // user is logged in?
          if ( self.user.isLoggedIn() ) {

            let user = self.user.data().user;

            // highlight button if already voted
            if ( dataset.likes   [ user ] ) div[ 'likes'    ].classList.add( 'selected' );

            if ( dataset.dislikes[ user ] ) div[ 'dislikes' ].classList.add( 'selected' );

          }

          // set click events for like and dislike buttons
          await doVoting( 'likes', 'dislikes' );
          await doVoting( 'dislikes', 'likes' );

          /**
           * set click event for like or dislike button
           * @param {string} index - button index ('likes' or 'dislikes')
           * @param {string} other - opposite of index value
           */
          async function doVoting( index, other ) {

            // set click event
            div[ index ].addEventListener( 'click', async () => {

              // login user if not logged in
              await self.user.login( self.start );

              const user = self.user.data().user;

              if( self.onvote && !self.onvote( { user: user } ) ) return;

              // has already voted?
              if ( dataset[ index ][ user ] ) {

                // revert vote
                delete dataset[ index ][ user ];

              }
              // not voted
              else {

                // proceed voting
                dataset[ index ][ user ] = true;

                // revert voting of opposite category
                delete dataset[ other ][ user ];

              }

              // update dataset for rendering => (re)render own content
              await my.data.store.set( dataset );
              if ( self.logger ) self.logger.log( 'click', index );
              await self.start();

            } );
          }
        }

      };

      this.getValue = () => total;

    }

  };

let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();