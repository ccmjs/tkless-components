/**
 * @overview ccm component for voting
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 */
( function () {
  var ccm_version = '9.0.0';
  var ccm_url     = 'https://akless.github.io/ccm/ccm.js';

    var component_name = 'voting';
    var component_obj  = {

      name: component_name,
      config: {
        templates: {
          "main": {
            "tag": "div",
            "id": "main",
            "inner": [
              {
                "tag": "div",
                "id": "likes",
                "class": "fa fa-chevron-circle-up fa-2x",
                "onclick": "%up_vote%"
              },
              {
                "tag": "div",
                "id": "total"
              },
              {
                "tag": "div",
                "id": "dislikes",
                "class": "fa fa-chevron-circle-down fa-2x",
                "onclick": "%down_vote%"
              }
            ]
          }
        },

        data:  {
            store: [ 'ccm.store', 'https://tkless.github.io/ccm-components/voting/voting_datastore.js' ],
            key:   'demo'
        },
        user:  [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/ccm.user.min.js'],
        style: [ 'ccm.load', 'https://tkless.github.io/ccm-components/voting/style.css' ],
        icons: [ 'ccm.load', { url: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css', context: document.head } ]

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
          if ( self.user ) self.user.addObserver( function () { self.start(); } );

          callback();
        };

        this.start = function ( callback ) {

          self.ccm.helper.dataset( self.data.store, self.data.key, function ( dataset ) {
            if ( !dataset ) {
              dataset.likes = {};
              dataset.dislikes = {};
            }

            total = (Object.keys(dataset.likes).length)- (Object.keys(dataset.dislikes).length);

            self.ccm.helper.setContent( self.element, self.ccm.helper.protect( self.ccm.helper.html( self.templates.main, {
              up_vote:   function () {
                  doVoting( 'likes' );
                  total++;
              },
              down_vote: function () {
                  doVoting( 'dislikes' );
                  total--;
              }
            } ) ) );

            self.element.querySelector( '#total' ).innerHTML = total;

            //no voting possible without user instance
            if ( !self.user || !self.user.isLoggedIn() ) {
                self.element.querySelector('#likes').classList.add('disabled');
                self.element.querySelector('#dislikes').classList.add('disabled');
            }

            if ( callback )callback();

            function doVoting( vote ) {
              if ( !self.user ) return;

              self.user.login( function () {

                var user = self.user.data().key;
                var not_vote;

                if ( vote === 'likes' ) not_vote = 'dislikes';
                else not_vote = 'likes';

                  // has already voted?
                  if ( dataset[ vote ][ user ] ) {
                      // revert vote
                      delete dataset[ vote ][ user ];
                  }
                  // not voted
                  else {

                      // proceed voting
                      dataset[ vote ][ user ] = true;

                      // revert voting of opposite category
                      delete dataset[ not_vote ][ user ];
                  }

                  // update dataset for rendering => (re)render own content
                  self.data.store.set( dataset, function () { self.start(); } );
              } );
            }


          } );

        };

        this.getVoting = function () {
         return total;
        }

      }
    };

    var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
    if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
    function register() { ccm[ ccm_version ].component( component_obj ); }
}() );