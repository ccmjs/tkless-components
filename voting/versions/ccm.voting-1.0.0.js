/**
 * @overview ccm component for voting
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 */
( function () {

  var component = {

    name: 'voting',
    version:[ 1,0,0 ],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: {
      url: 'https://ccmjs.github.io/ccm/versions/ccm-14.3.0.min.js',
      integrity: 'sha384-4q30fhc2E3uY9omytSc6dKdoMNQ37dSozhTxgG/wH/9lv+N37TBhwd1jg/u03bRt',
      crossorigin: 'anonymous'
    },

    config: {
      templates: {
        "main": {
          "tag": "div",
          "id": "main",
          "inner": [
            {
              "tag": "div",
              "id": "likes",
              "class": "%likes%",
              "onclick": "%up_vote%"
            },
            {
              "tag": "div",
              "id": "total"
            },
            {
              "tag": "div",
              "id": "dislikes",
              "class": "%dislikes%",
              "onclick": "%down_vote%"
            }
          ]
        }
      },

      icon_dislikes: 'fa fa-lg fa-chevron-circle-down',
      icon_likes: 'fa fa-lg fa-chevron-circle-up',
      data: { store: [ 'ccm.store'], key: 'demo' },
      libs: [ 'ccm.load',
        { url: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css', context: 'head' },
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
        { context: 'head', url: 'https://tkless.github.io/ccm-components/libs/bootstrap/css/font-face.css' },
        'https://tkless.github.io/ccm-components/libs/bootstrap/css/bootstrap.css',
        'https://tkless.github.io/ccm-components/voting/resources/default.css'
      ],
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

        self.ccm.helper.dataset( self.data.store, self.data.key, function ( dataset ) {

          // set default like and dislike property
          if ( !dataset.likes    ) dataset.likes    = {};
          if ( !dataset.dislikes ) dataset.dislikes = {};

          total = (Object.keys(dataset.likes).length)- (Object.keys(dataset.dislikes).length);

          self.ccm.helper.setContent( self.element, self.ccm.helper.html( self.templates.main, {
            likes: self.icon_likes,
            up_vote:   function () {
                doVoting( 'likes' );
            },
            dislikes: self.icon_dislikes,
            down_vote: function () {
                doVoting( 'dislikes' );
            }
          } ) );

          setIconAvailability();

          self.element.querySelector( '#total' ).innerHTML = total;

          function setIconAvailability() {
            if ( !self.user || !self.user.isLoggedIn() ) return;
            var user = self.user.data().name;

            if ( dataset.likes[ user ] ) self.element.querySelector('#likes').classList.add('disabled');

            if ( dataset.dislikes[ user ] )self.element.querySelector('#dislikes').classList.add('disabled');

          }

          if ( !self.user ){
            var likes_elem = self.element.querySelector('#likes');
            likes_elem.parentNode.removeChild( likes_elem );

            var dislikes_elem = self.element.querySelector('#dislikes');
            dislikes_elem.parentNode.removeChild( dislikes_elem );
          }

          function doVoting( vote ) {
            if ( !self.user ) return;

            self.user.login( function () {
              var user = self.user.data().name;
              var not_vote;

              if( self.onvote && !self.onvote( { user: user } ) ) return;

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

          if ( callback ) callback();

        } );

      };

      this.getValue = function () {
       return total;
      }

    }
  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );