/**
 * @overview  <i>ccm</i> component for rating
 * @author Tea Kless <tea.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

{

  var component  = {

    name: 'thumb_rating',
    version: [ 2,0,0 ],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: {
      url: 'https://ccmjs.github.io/ccm/versions/ccm-16.6.0.js',
      integrity: 'sha256-9U5Q2yiY5v1Tqp8ZJjCRnZrG8T1B14LdVf/PWOOUycE= sha384-LcGBJPmX/Aq5Jkre3q9yE+UCsd7vPWIgeBb9ayc4TIAl5H1nJpewlkKCDK8eCc7s sha512-YANGRGQdJYghxk/7O2bIMsT+XOJ1fzE6Lc6zGJxG+GsdMKznGTdZ8z3d+fnrvqOeEl6qmqxkIP6DueDq2dG0rw==',
      crossorigin: 'anonymous'
    },

    config: {
      // "data": { "store": [ "ccm.store", {} ] },
      // "template": "buttons" // or "simple",
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

      this.init = callback => {

        if ( self.user ) self.user.onchange = () => self.start;

        // listen to change event of ccm realtime datastore => (re)render own content
        self.data.store.onchange =  () => { self.start(); };

        callback();
      };

      this.ready = callback => {

        /* // listen to login/logout event => (re)render own content
         if ( self.user ) self.user.addObserver( self.index, function ( event ) {
           if ( event ) self.start();
         });*/

        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        if ( self.logger ) self.logger.log( 'ready', my );

        callback();
      };

      this.start = callback => {
        // get dataset for rendering
        $.dataset( my.data, dataset => {
          if( self.logger ) self.logger.log( 'start', dataset );

          const main_elem = $.html( my.html.main );

          renderThumbs();

          $.setContent( self.element, main_elem );
          // perform callback
          callback && callback();

          function renderThumbs() {

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
              if ( my.template === 'buttons')
                [ ...main_elem.querySelectorAll( '.btn' ) ].map( btn => {
                  btn.classList.add( 'disabled' );
                } );
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
            doVoting( 'likes', 'dislikes' );
            doVoting( 'dislikes', 'likes' );

            /**
             * set click event for like or dislike button
             * @param {string} index - button index ('likes' or 'dislikes')
             * @param {string} other - opposite of index value
             */
            function doVoting( index, other ) {

              // set click event
              div[ index ].addEventListener( 'click', () => {

                // login user if not logged in
                self.user.login( function () {

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
                  my.data.store.set( dataset, () => {
                    if ( self.logger ) self.logger.log( 'click', index );
                    self.start();
                  } );

                } );

              } );
            }
          }

        } );

      };

      this.getValue = () => total;

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}