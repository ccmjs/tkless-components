/**
 * @overview ccm component for voting
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 */
( function () {

  var component  = {

    name: 'voting',
    version:[ 1,0,0 ],

    ccm: {
      url: 'https://akless.github.io/ccm/version/ccm-10.0.0.min.js',
      integrity: 'sha384-bCcBv9yCHVcXtsHxkfPcFeT+j77G112ZADZ1DkxcYdxjflPG4lTiiFiB3Jp+c2NG',
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
              "class": "fa fa-chevron-circle-up fa-lg",
              "onclick": "%up_vote%"
            },
            {
              "tag": "div",
              "id": "total"
            },
            {
              "tag": "div",
              "id": "dislikes",
              "class": "fa fa-chevron-circle-down fa-lg",
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
      icons: [ 'ccm.load', { url: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css', context: document.head },
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css' ]
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

          // set default like and dislike property
          if ( !dataset.likes    ) dataset.likes    = {};
          if ( !dataset.dislikes ) dataset.dislikes = {};

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

              var user = self.user.data().user;
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

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );