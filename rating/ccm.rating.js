/**
 * @overview  <i>ccm</i> component for rating
 * @author Tea Kless <tea.kless@web.de> 2016
 * @license The MIT License (MIT)
 */

ccm.component( /** @lends ccm.components.rating */ {

  /*-------------------------------------------- public component members --------------------------------------------*/

  /**
   * @summary component index
   * @type {ccm.types.index}
   */
  index: 'rating',

  /**
   * @summary default instance configuration
   * @type {ccm.components.rating.types.config}
   */
  config: {
    style: [ ccm.load, '../rating/rating.css' ],
    data:  { key: 'demo', store: [ ccm.store, '../rating/rating.json' ] },
    icons: [ ccm.load, 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css' ],
    mode:  'thumbs' //stars or thumbs
  },

  /*-------------------------------------------- public component classes --------------------------------------------*/

  /**
   * @summary constructor for creating <i>ccm</i> instances out of this component
   * @class
   */
  Instance: function () {

    /*------------------------------------- private and public instance members --------------------------------------*/

    /**
     * @summary own context
     * @private
     */
    var self = this;

    /**
     * @summary contains privatized config members
     * @type {ccm.components.rating.types.config}
     * @private
     */
    var my;

    /*------------------------------------------- public instance methods --------------------------------------------*/

    /**
     * @summary initialize <i>ccm</i> instance
     * @description
     * Called one-time when this <i>ccm</i> instance is created, all dependencies are solved and before dependent <i>ccm</i> components, instances and datastores are initialized.
     * This method will be removed by <i>ccm</i> after the one-time call.
     * @param {function} callback - callback when this instance is initialized
     */
    this.init = function ( callback ) {

      // listen to change event of ccm realtime datastore => (re)render own content
      self.data.store.onChange = function () { self.render(); };

      // perform callback
      callback();

    };

    /**
     * @summary when <i>ccm</i> instance is ready
     * @description
     * Called one-time when this <i>ccm</i> instance and dependent <i>ccm</i> components, instances and datastores are initialized and ready.
     * This method will be removed by <i>ccm</i> after the one-time call.
     * @param {function} callback - callback when this instance is ready
     * @ignore
     */
    this.ready = function ( callback ) {

      // privatize security relevant config members
      my = ccm.helper.privatize( self, 'data', 'user', 'bigdata' );

      // listen to login/logout event => (re)render own content
      if ( self.user ) self.user.addObserver( function () { self.render(); } );

      // perform callback
      callback();

    };

    /**
     * @summary render content in own website area
     * @param {function} [callback] - callback when content is rendered
     */
    this.render = function ( callback ) {

      /**
       * website area for own content
       * @type {ccm.types.element}
       */
      var $element = ccm.helper.element( self );

      // get dataset for rendering
      ccm.helper.dataset( my.data, function ( dataset ) {

        // render main html structure
        $element.html( ccm.helper.html( { class: 'rating' } ) );

        if ( self.mode === 'thumbs' ) renderThumbs();

        if ( self.mode === 'stars') renderStars();

        // log render event
        if ( my.bigdata ) my.bigdata.log( 'render', ccm.helper.dataSource( my.data ) );

        // perform callback
        if ( callback ) callback();

        function renderThumbs() {

          // set default like and dislike property
          if ( !dataset.likes    ) dataset.likes    = {};
          if ( !dataset.dislikes ) dataset.dislikes = {};

          var $rating = ccm.helper.find( self, '.rating' );

          $rating.html(
            '<div class="likes fa fa-lg fa-thumbs-up">' +
              '<div>' + Object.keys( dataset.likes ).length + '</div>' +
            '</div>' +
            '<div class="dislikes fa fa-lg fa-thumbs-down">' +
              '<div>' + Object.keys( dataset.dislikes ).length + '</div>' +
            '</div>'
          );

          // ccm instance for user authentication not exists? => abort
          if ( !my.user ) return;

          /**
           * website area for likes and dislikes
           * @type {{likes: ccm.types.element, dislikes: ccm.types.element}}
           */
          var div = {

            likes:    ccm.helper.find( self, $rating, '.likes'    ),
            dislikes: ccm.helper.find( self, $rating, '.dislikes' )

          };

          // add class for user specific interactions
          $rating.addClass( 'user' );

          // user is logged in?
          if ( my.user.isLoggedIn() ) {

            /**
             * username
             * @type {string}
             */
            var user = my.user.data().key;

            // highlight button if already voted
            if ( dataset.likes   [ user ] ) div[ 'likes'    ].addClass( 'selected' );
            if ( dataset.dislikes[ user ] ) div[ 'dislikes' ].addClass( 'selected' );

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
            div[ index ].click( function() {

              // login user if not logged in
              my.user.login( function () {

                /**
                 * username
                 * @type {string}
                 */
                var user = my.user.data().key;

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

                // log render event
                if ( my.bigdata ) my.bigdata.log( 'click', ccm.helper.dataSource( my.data ) );

                // update dataset for rendering => (re)render own content
                my.data.store.set( dataset, function () { self.render(); } );

              } );

            } );

          }
        }

        //toDo
        function renderStars() {

          // set default like and dislike property
          if ( !dataset.stars     ) dataset.stars     = {};
          if ( !dataset.star_vote ) dataset.star_vote = '0';

          var rating_div = ccm.helper.find( self, '.rating' );
          var star;
          var rating = 0; //dataset.star_vote;

          // user is logged in?
          if ( self.user && self.user.isLoggedIn() ) {
            if ( dataset.stars[ self.user.data().key ] ) {
              rating = dataset.stars[ self.user.data().key ];
            }
          }

          for ( var i = 1; i <= 5; i++ ){

            if ( rating >= i )
              star = jQuery( '<div>&#9733;</div>' );
            else
              star = jQuery( '<div>&#9734;</div>' );

            star.on( 'click', click() );
            rating_div.append( star );
          }

          rating_div.append( '&nbsp;('+ dataset.star_vote +')' );

          function click() {

            return function () {

              var star_selected = jQuery( this ).index();

              if ( self.user ) {

                self.user.login( function () {

                  var user = self.user.data().key;

                  jQuery( this ).addClass( 'selected' );

                  dataset.stars[ user ] = star_selected + 1;

                  //build avarage from stars
                  var votes = 0;
                  for ( var key in dataset.stars )
                    votes += dataset.stars[ key ];
                  dataset.star_vote = Math.round( ( votes / Object.keys( dataset.stars ).length ) * 10 ) / 10;

                  self.store.set( dataset, function () { self.render(); } );

                } );
              }
            }

          }
        }

      } );

    };

  }

  /*------------------------------------------------ type definitions ------------------------------------------------*/

  /**
   * @namespace ccm.components.rating
   */

  /**
   * @namespace ccm.components.rating.types
   */

  /**
   * @summary <i>ccm</i> instance configuration
   * @typedef {ccm.types.config} ccm.components.rating.types.config
   * @property {string} classes - css classes for own website area
   * @property {ccm.types.element} element - own website area
   * @property {Object.<ccm.types.key, ccm.types.html>} html - <i>ccm</i> html data templates for own content
   * @property {ccm.types.key} key - key of [rating dataset]{@link ccm.components.rating.types.dataset} for rendering
   * @property {ccm.types.instance} lang - <i>ccm</i> instance for multilingualism
   * @property {ccm.types.store} store - <i>ccm</i> datastore that contains the [rating dataset]{@link ccm.components.rating.types.dataset} for rendering
   * @property {ccm.types.dependency} style - css for own content
   * @property {ccm.types.instance} user - <i>ccm</i> instance for user authentication
   */

  /**
   * @summary rating dataset for rendering
   * @typedef {ccm.types.dataset} ccm.components.rating.dataset
   * @property {ccm.types.key} key - dataset key
   * ...
   */

  /**
   * @external ccm.types
   * @see {@link http://akless.github.io/ccm-developer/api/ccm/ccm.types.html}
   */

} );