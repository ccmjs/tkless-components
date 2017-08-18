/**
 * @overview  <i>ccm</i> component for rating
 * @author Tea Kless <tea.kless@web.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

  var filename = "ccm.thumb_rating.js";

  var ccm_version = '9.2.0';
  var ccm_url     = 'https://akless.github.io/ccm/version/ccm-9.2.0.min.js';

  var component_name = 'thumb_rating';
  var component_obj  = {

    index: component_name,

    config: {
      data: { store: [ 'ccm.store' ] },
      style: [ 'ccm.load', 'https://tkless.github.io/ccm-components/thumb_rating/style.css' ],
      icons: [ 'ccm.load', { url: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css', context: document.head },
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css' ]
    },

    Instance: function () {

      var self = this;
      var my;

      this.init = function ( callback ) {

        // listen to change event of ccm realtime datastore => (re)render own content
        self.data.store.onChange = function () { self.start(); };

        callback();
      };

      this.ready = function ( callback ) {

        // privatize security relevant config members
        my = self.ccm.helper.privatize( self );

        // listen to login/logout event => (re)render own content
        if ( self.user ) self.user.addObserver( function () { self.start(); } );

        callback();
      };

      this.start = function ( callback ) {

        // get dataset for rendering
        self.ccm.helper.dataset( my.data.store, my.data.key, function ( dataset ) {

          // render main html structure
          self.ccm.helper.setContent( self.element, self.ccm.helper.html( { class: 'rating' } ) );

          renderThumbs();

          // perform callback
          if ( callback ) callback();

          function renderThumbs() {

            // set default like and dislike property
            if ( !dataset.likes    ) dataset.likes    = {};
            if ( !dataset.dislikes ) dataset.dislikes = {};

            var rating = self.element.querySelector( '.rating' );

            rating.innerHTML =
              '<div class="likes fa fa-lg fa-thumbs-up">' +
              '<div>' + Object.keys( dataset.likes ).length + '</div>' +
              '</div>' +
              '<div class="dislikes fa fa-lg fa-thumbs-down">' +
              '<div>' + Object.keys( dataset.dislikes ).length + '</div>' +
              '</div>';

            // ccm instance for user authentication not exists? => abort
            if ( !self.user ) return;

            /**
             * website area for likes and dislikes
             * @type {{likes: ccm.types.element, dislikes: ccm.types.element}}
             */
            var div = {

              likes:    self.element.querySelector( '.likes' ),
              dislikes: self.element.querySelector( '.dislikes' )

            };

            // add class for user specific interactions
            rating.classList.add( 'user' );



            // user is logged in?
            if ( self.user.isLoggedIn() ) {

              var user = self.user.data().key;

              // highlight button if already voted
              if ( dataset.likes   [ user ] ) div[ 'likes'    ].classList.add( 'selected' );

              if ( dataset.dislikes[ user ] ) div[ 'dislikes' ].classList.add( 'selected' );

            }

            // set click events for like and dislike buttons
            click( 'likes', 'dislikes' );
            click( 'dislikes', 'likes' );

            /**
             * set click event for like or dislike button
             * @param {string} index - button index ('likes' or 'dislikes')
             * @param {string} other - opposite of index value
             */
            function click( index, other ) {

                // set click event
                div[ index ].addEventListener( 'click',  function () {

                  // login user if not logged in
                  self.user.login( function () {

                    var user = self.user.data().key;

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
                    my.data.store.set( dataset, function () { self.start(); } );

                  } );

                } );
            }
          }

        } );

      };

    }
  };

  if ( window.ccm && window.ccm.files ) window.ccm.files[ filename ] = component_obj;
  var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
  if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
  function register() { ccm[ ccm_version ].component( component_obj ); }
}() );