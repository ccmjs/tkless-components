/**
 * @overview posts template for <i>ccm</i> component
 * @author Tea Kless <tea.kless@web.de> 2015-2016
 * @license The MIT License (MIT)
 */

ccm.component( {

  /*-------------------------------------------- public component members --------------------------------------------*/

  /**
   * @summary component name
   * @memberOf ccm.components.posts
   * @type {ccm.name}
   */
  name: 'posts',

  /**
   * @summary default instance configuration
   * @memberOf ccm.components.posts
   * @type {ccm.components.posts.config}
   */
  config: {

    html:  [ ccm.load, './json/posts_html.json' ],
    key:   'demo',
    store: [ ccm.store, { local: './json/posts.json' } ],
    style: [ ccm.load, './css/posts.css' ],
    icons: [ ccm.load, 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'  ],
    user:  [ ccm.instance, './components/user.js' ],
    editable: false//[true, false, "user"]
  },

  /*-------------------------------------------- public component classes --------------------------------------------*/

  /**
   * @summary constructor for creating <i>ccm</i> instances out of this component
   * @alias ccm.components.posts.Posts
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
     * @summary render content in own website area
     * @param {function} [callback] - callback when content is rendered
     */
    this.render = function ( callback ) {

      // login user if not logged in
      if ( self.editable && !self.user.isLoggedIn() ) return self.user.login( function () { self.render( callback ); } );

      /**
       * website area for own content
       * @type {ccm.element}
       */
      var element = ccm.helper.element( self );

      // get dataset for rendering
      ccm.helper.dataset( self, function ( dataset ) {

        if (!dataset.posts) dataset.posts = [];

        // render main html structure
        element.html(ccm.helper.html(self.html.main, {
          click: function () {
            updatePost();
          }
        }));

        for (var i = 0; i < dataset.posts.length; i++) {
          renderPost(dataset.posts[i], i);
        }
        if ( self.editable )
          renderPost(newPost(), dataset.posts.length);

        var first = ccm.helper.find(self, '.post:first');

        first.addClass("new_post");
        //placehoder for empty content
        ccm.helper.find(self, first, 'div[contenteditable="true"]').addClass('empty');
        // no close icon for emty post
        ccm.helper.find(self, first, '.fa-close').remove();

        /**
         * when editable set to false no delete and post possible
         * so remove all colose icons and post-button
         */
        if ( !self.editable ) {
          ccm.helper.find(self, '.fa-close').remove();
          ccm.helper.find(self, '.button').remove();
        }

        // perform callback
        if ( callback ) callback();

        function renderPost( post, i )  {

           ccm.helper.find( self, '.posts' ).prepend( ccm.helper.html( self.html.post, {
             delete_post: function () {
               dataset.posts.splice(i, 1);
               updatePost();
             },

            title: ccm.helper.val( post.title || "" ),
            date: ccm.helper.val( post.date ),
            name: ccm.helper.val( post.user ),
            avatar: ccm.helper.val( post.avatar || 'fa fa-user fa-fw fa-lg' ),
            content: ccm.helper.val ( post.content || "" ),
            edit: !!self.editable,
            input_title: function () {
             change( i, jQuery(this), "title" );
            },
            input_content: function () {
              change( i, jQuery( this ), "content" );
            }

          } ) );

        }

        function getDateTime () {
          var today = new Date();
          var dd    = today.getDate();
          var mm    = today.getMonth();
          var yyyy  = today.getFullYear();
          var hour  = today.getHours();
          var min   = today.getMinutes();

          var monat = ["Januar", "Februar", "März", "April", "Mai", "Juni","Juli", "August", "September", "Oktober", "November", "Dezember"];

          if ( dd < 10 ) dd = '0' + dd;

          if ( hour < 10 ) hour = '0' + hour;
          if ( min  < 10 ) min  = '0' + min;

          return dd + ' ' + monat[ mm].substring(0, 3) + '. '  + yyyy + ' ' + hour + ':' + min;

        }

        function change (post, div, prop) {

          if ( post === dataset.posts.length) dataset.posts.push( newPost() );

          dataset.posts[post][prop] = ccm.helper.val( jQuery.trim( div.html().replace(new RegExp('\r?\n','g'), '') ) );

          if (div.text().length == 0 )
            div.addClass("empty").html('');
          else
            div.removeClass("empty");


        }

        function newPost() {

          return {

            date: getDateTime(),
            user: self.user.data().key,
            avatar: self.user.data().avatar || ''

          }

        }

        function updatePost() {
          self.store.set(dataset, function () {
            self.render();
          });
        }




      } );


    };

  }

  /*------------------------------------------------ type definitions ------------------------------------------------*/

  /**
   * @namespace ccm.components.posts
   */

  /**
   * @summary <i>ccm</i> instance configuration
   * @typedef {ccm.config} ccm.components.posts.config
   * @property {string} classes - css classes for own website area
   * @property {ccm.element} element - own website area
   * @property {Object.<ccm.key, ccm.html>} html - <i>ccm</i> html data templates for own content
   * @property {ccm.key} key - key of [posts dataset]{@link ccm.components.posts.dataset} for rendering
   * @property {ccm.instance} lang - <i>ccm</i> instance for multilingualism
   * @property {ccm.store} store - <i>ccm</i> datastore that contains the [posts dataset]{@link ccm.components.posts.dataset} for rendering
   * @property {ccm.style} style - css for own content
   * @property {ccm.instance} user - <i>ccm</i> instance for user authentication
   * ...
   */

  /**
   * @summary posts dataset for rendering
   * @typedef {ccm.dataset} ccm.components.posts.dataset
   * @property {ccm.key} key - dataset key
   * ...
   */

} );