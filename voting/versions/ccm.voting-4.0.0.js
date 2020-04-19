/**
 * @overview ccm component for voting
 * @author Tea Kless <tea.kless@web.de>, 2020
 * @license The MIT License (MIT)
 * @version 4.0.0
 * @changes
 * version 4.0.0 (19.04.2020)
 * - refactoring
 * - switched to ccm v25
 */
( function () {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'voting', version: [ 4, 0, 0 ],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.4.0.js',

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
              "id": "top"
            },
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
//    "hide_login": true,
      "icon_dislikes": "fa fa-lg fa-chevron-circle-down",
      "icon_likes": "fa fa-lg fa-chevron-circle-up",
//    "data": { "store": [ "ccm.store", {} ], "key": "demo" },
//    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.4.0.js" ]
      "libs": [ "ccm.load",
        {  "context": "head", "url": "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" },
        "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css",
        "https://ccmjs.github.io/tkless-components/voting/resources/default.css"
      ],
      "helper": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/versions/helper-5.0.0.mjs" } ]
    },

    Instance: function () {
      /**
       * shortcut to help functions
       * @type {Object.<string,function>}
       */
      let $, total = 0, dataset, main_elem;

      this.init = async () => {
        if ( this.user ) this.user.onchange = this.start;       // listen to login/logout events => restart
        this.data.store.onchange = this.start;                  // listen to datastore changes => (re)render own content
      };

      this.ready = async () => {
        // set shortcut to help functions
        $ = this.ccm.helper;

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );

        if ( this.logger ) this.logger.log( 'ready', $.clone ( this ) );

      };

      this.start = async () => {
        await renderContent();
        $.setContent( this.element, main_elem );
      };

      const renderContent = async () => {
        dataset = await $.dataset( this.data );

        // set default like and dislike property
        if ( !dataset.likes    ) dataset.likes    = {};
        if ( !dataset.dislikes ) dataset.dislikes = {};

        main_elem = $.html( this.html.main, {
          likes: this.icon_likes,
          up_vote: async ( event ) => { event.preventDefault(); await doVoting('likes'); },
          dislikes: this.icon_dislikes,
          down_vote: async ( event ) => { event.preventDefault(); await doVoting('dislikes'); }
        } );

        // render login/logout area
        if ( this.user && !this.hide_login ) { $.append( main_elem.querySelector( '#top' ), this.user.root ); this.user.start(); }

        setIconAvailability();

        $.setContent ( main_elem.querySelector( '#total' ),  this.getValue() );

      };

      const setIconAvailability = () => {

        if ( !this.user || !this.user.isLoggedIn() ) return;

        let user = this.user.data().user;

        if ( dataset.likes[ user ] ) main_elem.querySelector( '#likes' ).classList.add( 'disabled' );

        if ( dataset.dislikes[ user ] ) main_elem.querySelector( '#dislikes' ).classList.add( 'disabled' );

      };

     const doVoting = async ( vote ) => {
        if ( !this.user ) return;

        await this.user.login( this.start );

        let user = this.user.data().user;
        let not_vote;

        if( this.onvote && !this.onvote( { user: user } ) ) return;

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

        dataset.total = this.getValue();
        // update dataset for rendering => (re)render own content
        await this.data.store.set( dataset );
        await this.start();
      };

      this.getValue = () =>  {
        return total = ( Object.keys( dataset.likes ).length ) - ( Object.keys( dataset.dislikes ).length );
      }

    }
  };

   let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
 } )();
