/**
 * @overview ccm component for voting
 * @author Tea Kless <tea.kless@web.de>, 2018
 * @license The MIT License (MIT)
 */
 {

  var component = {

    name: 'voting',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {
      "html": {
        "main": {
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
      "icon_dislikes": "fa fa-lg fa-chevron-circle-down",
      "icon_likes": "fa fa-lg fa-chevron-circle-up",
      // "data": { "store": [ "ccm.store", {} ], "key": "demo" },
      "libs": [ "ccm.load",
        {  "context": "head", "url": "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" },
        "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css",
        "../voting/resources/default.css"
      ],
    },

    Instance: function () {
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

        // listen to change event of ccm realtime datastore => (re)render own content
        self.data.store.onChange = function () { self.start(); };

        callback();
      };

      this.ready = callback => {
        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        if ( self.logger ) self.logger.log( 'ready', my );

        // listen to login/logout event => (re)render own content
        if ( self.user ) self.user.addObserver( self.index, function () { self.start(); } );

        callback();
      };

      this.start = callback => {

        $.dataset( my.data, function ( dataset ) {

          // set default like and dislike property
          if ( !dataset.likes    ) dataset.likes    = {};
          if ( !dataset.dislikes ) dataset.dislikes = {};

          total = ( Object.keys( dataset.likes ).length ) - ( Object.keys( dataset.dislikes ).length );

          const main_elem = $.html( my.html.main, {
            likes: my.icon_likes,
            up_vote: () => doVoting('likes'),
            dislikes: my.icon_dislikes,
            down_vote: () => doVoting('dislikes')
          } );

          setIconAvailability();

          $.setContent ( main_elem.querySelector( '#total' ),  self.getValue() );

          $.setContent( self.element, main_elem );

          callback && callback();

          function setIconAvailability() {

            if ( !self.user ) {
              let likes_elem = main_elem.querySelector( '#likes' );
              likes_elem.parentNode.removeChild( likes_elem );

              let dislikes_elem = main_elem.querySelector( '#dislikes' );
              dislikes_elem.parentNode.removeChild( dislikes_elem );
            }

            if ( !self.user || !self.user.isLoggedIn() ) return;

            let user = self.user.data().user;

            if ( dataset.likes[ user ] ) main_elem.querySelector( '#likes' ).classList.add( 'disabled' );

            if ( dataset.dislikes[ user ] ) main_elem.querySelector( '#dislikes' ).classList.add( 'disabled' );

          }

          function doVoting( vote ) {
            if ( !self.user ) return;

            self.user.login( function () {
              let user = self.user.data().user;
              let not_vote;

              if( my.onvote && !my.onvote( { user: user } ) ) return;

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
              my.data.store.set( dataset, () => { self.start(); } );
            } );
          }

        } );

      };

      this.getValue = () => total;

    }
  };

   function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
 }