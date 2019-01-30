/**
 * @overview ccm component for voting
 * @author Tea Kless <tea.kless@web.de>, 2019
 * @license The MIT License (MIT)
 * @version 2.0.0
 * @changes
 *  * version 2.0.0 (30.01.2019)
 * - uses ccm v20.0.0
 *
 * version 2.0.0 (05.11.2018)
 * - uses ccm v18.3.0
 */
( function () {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'voting',
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
        "https://ccmjs.github.io/tkless-components/voting/resources/default.css"
      ]
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

        const dataset = await $.dataset( my.data );

        // set default like and dislike property
        if ( !dataset.likes    ) dataset.likes    = {};
        if ( !dataset.dislikes ) dataset.dislikes = {};

        total = ( Object.keys( dataset.likes ).length ) - ( Object.keys( dataset.dislikes ).length );

        const main_elem = $.html( my.html.main, {
          likes: my.icon_likes,
          up_vote: async ( event ) => { event.preventDefault(); await doVoting('likes'); },
          dislikes: my.icon_dislikes,
          down_vote: async ( event ) => { event.preventDefault(); await doVoting('dislikes'); }
        } );

        setIconAvailability();

        $.setContent ( main_elem.querySelector( '#total' ),  self.getValue() );

        $.setContent( self.element, main_elem );

        function setIconAvailability() {

          if ( !self.user || !self.user.isLoggedIn() ) return;

          let user = self.user.data().user;

          if ( dataset.likes[ user ] ) main_elem.querySelector( '#likes' ).classList.add( 'disabled' );

          if ( dataset.dislikes[ user ] ) main_elem.querySelector( '#dislikes' ).classList.add( 'disabled' );

        }

        async function doVoting( vote ) {
          if ( !self.user ) return;

          await self.user.login( self.start );

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
          await my.data.store.set( dataset );
          await self.start();
        }

      };

      this.getValue = () => total;

    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();