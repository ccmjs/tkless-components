/**
 * @overview  <i>ccm</i> component for rating
 * @author Tea Kless <tea.kless@web.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

  var component  = {

    name: 'thumb_rating',

    ccm: 'https://akless.github.io/ccm/ccm.js',

    config: {
      data: { store: [ 'ccm.store' ] },
      templates: {
        "simple": {
          "class": "rating container",
          "inner": {
            "class": "row",
            "inner": [
              {
                "class": "likes fa fa-lg fa-thumbs-up",
                "inner": "%likes%"
              },
              {
                "class": "dislikes fa fa-lg fa-thumbs-down",
                "inner": "%dislikes%"
              }
            ]
          }
        },

        "buttons": {
          "class": "rating container",
          "inner": {
            "class": "row",
            "inner": [
              {
                "tag": "a",
                "href": "#",
                "class": "likes btn btn-default",
                "inner": [
                  {
                    "tag": "i",
                    "class": "fa fa-thumbs-up icon",
                  },
                  "%likes%"
                ]
              },
              {
                "tag": "a",
                "href": "#",
                "class": "dislikes btn btn-default",
                "inner": [
                  {
                    "tag": "i",
                    "class": "fa fa-thumbs-down icon",
                  },
                  "%dislikes%"
                ]
              },
            ]
          }
        }
      },
      libs: [ 'ccm.load',
        { context: 'head', url: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'},
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
        { context: 'head', url: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css' },
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
        '../../../ccm-components/thumb_rating/resources/default.css'
      ]
    },

    Instance: function () {
      var self = this;
      var total = 0;

      this.init = function ( callback ) {

        // listen to change event of ccm realtime datastore => (re)render own content
        self.data.store.onChange = function () { self.start(); };

        callback();
      };

      this.ready = function ( callback ) {

        // listen to login/logout event => (re)render own content
        if ( self.user ) self.user.addObserver( self.index, function () { self.start(); } );

        callback();
      };

      this.start = function ( callback ) {

        // get dataset for rendering
        self.ccm.helper.dataset( self.data.store, self.data.key, function ( dataset ) {

          renderThumbs();

          function renderThumbs() {

            // set default like and dislike property
            if ( !dataset.likes    ) dataset.likes    = {};
            if ( !dataset.dislikes ) dataset.dislikes = {};

            total = ( Object.keys(dataset.likes).length) - (Object.keys(dataset.dislikes).length);

            if ( self.buttons )
              self.ccm.helper.setContent( self.element, self.ccm.helper.html( self.templates.buttons, {
                likes: Object.keys( dataset.likes ).length,
                dislikes: Object.keys( dataset.dislikes ).length
              }));
            else
            // render main html structure
              self.ccm.helper.setContent( self.element, self.ccm.helper.html( self.templates.simple, {
                likes: Object.keys( dataset.likes ).length,
                dislikes: Object.keys( dataset.dislikes ).length
              } ) );

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
            self.element.querySelector( '.rating' ).classList.add( 'user' );



            // user is logged in?
            if ( self.user.isLoggedIn() ) {

              var user = self.user.data().user;

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

                  var user = self.user.data().user;

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
                  self.data.store.set( dataset, function () { self.start(); } );

                } );

              } );
            }
          }

          // perform callback
          if ( callback ) callback();

        } );

      };

      this.getVoting = function () {
        return total;
      }

    }
  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );