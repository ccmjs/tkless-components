/**
 * @overview  <i>ccm</i> component for thumb rating
 * @author Tea Kless <tea.kless@web.de> 2020
 * @license The MIT License (MIT)
 * @version 4.0.0
 * @changes
 * version 4.0.0 (28.04.2020)
 * - refactoring
 * - switched to ccm v25
 * version 3.0.0 (14.09.2018)
 * - uses ccm v18.0.0
 */

( function () {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'thumb_rating', version: [ 4, 0, 0 ],

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
      // "data": { "store": [ "ccm.store", {} ] },
      // "template": "buttons" // or "simple"
      "html": {
        "main": {
          "inner": [
            { "id": "login-section" },
            { "id": "rating-section" }
          ]
        },
        "simple": {
          "inner": [
            {
              "id": "likes",
              "class": "fa fa-thumbs-up",
              "inner": "&#8198;%likes%"
            },
            {
              "id": "dislikes",
              "class": "fa fa-thumbs-down",
              "inner":  "&#8198;%dislikes%"
            }
          ]
        },
        "buttons": {
          "inner": [
            {
              "id": "likes",
              "tag": "button",
              "class": "btn btn-outline-secondary",
              "type": "btn",
              "inner": [
                {
                  "tag": "i",
                  "class": "fa fa-thumbs-up icon",
                },
                {
                  "tag": "span",
                  "inner": "&nbsp;%likes%"
                }
              ]
            },
            {
              "id": "dislikes",
              "tag": "button",
              "class": "btn btn-outline-secondary",
              "type": "btn",
              "inner": [
                {
                  "tag": "i",
                  "class": "fa fa-thumbs-down icon",
                },
                {
                  "tag": "span",
                  "inner": "&nbsp;%dislikes%"
                }
              ]
            }
          ]
        }
      },
      "libs": [ "ccm.load", "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css",
        { "context": "head", "url": "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" },
        "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
        "https://ccmjs.github.io/tkless-components/thumb_rating/resources/thumb.css"
      ],
      "helper": [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/versions/helper-5.0.0.mjs" } ]
    },

    Instance: function () {
      let $, dataset, main_elem, total = 0;

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
        dataset = await $.dataset( this.data );

        // set default like and dislike property
        if ( !dataset.likes    ) dataset.likes    = {};
        if ( !dataset.dislikes ) dataset.dislikes = {};

        main_elem = $.html( this.html.main );
        // add class for user specific interactions
        main_elem.querySelector( '#rating-section' ).classList.add( 'user' );

        if( this.logger ) this.logger.log( 'start', $.clone ( dataset ) );
        // render login/logout area
        if ( this.user ) { $.append( main_elem.querySelector( '#login-section' ), this.user.root ); this.user.start(); }

        await renderThumbs();

        $.setContent( this.element, main_elem );

      };

      const renderThumbs = async () => {
        const template = this.template === 'buttons' ? this.html.buttons : this.html.simple;

        const rating_elem = $.html( template, {
          likes: Object.keys( dataset.likes ).length,
          dislikes: Object.keys( dataset.dislikes ).length
        } );

        await setIconAvailability( rating_elem );
        $.setContent( main_elem.querySelector( '#rating-section'), rating_elem );
      };

      const setIconAvailability = async elem => {
        /**
         * website area for likes and dislikes
         * @type {{likes: ccm.types.element, dislikes: ccm.types.element}}
         */
        const div = {
          likes:    elem.querySelector( '#likes' ),
          dislikes: elem.querySelector( '#dislikes' )
        };

        // user is logged in?
        if ( this.user && this.user.isLoggedIn() ) {
          let user = this.user.getValue().key;

          // highlight button if already voted
          if ( dataset.likes   [ user ] ) div[ 'likes'    ].classList.add( 'selected' );
          if ( dataset.dislikes[ user ] ) div[ 'dislikes' ].classList.add( 'selected' );

        }
        // if not user -> disable buttons
        else {
          if ( this.template === 'buttons') {
            div[ 'likes'    ].classList.add( 'disabled' );
            div[ 'dislikes' ].classList.add( 'disabled' );
          }
        }

        // set click events for like and dislike buttons
        if ( this.user ) {
          await doVoting( 'likes', 'dislikes', div );
          await doVoting( 'dislikes', 'likes', div );
        }
      };

      /**
       * set click event for like or dislike button
       * @param {string} index - button index ('likes' or 'dislikes')
       * @param {string} other - opposite of index value
       */
      const doVoting = async ( index, other, div ) => {
        // set click event
        div[ index ].addEventListener( 'click', async () => {
          // login user if not logged in
          await this.user.login( true );

          const user = this.user.getValue().key;

          if( this.onvote && !this.onvote( { user: user } ) ) return;

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

          dataset.total = this.getValue();

          // update dataset for rendering => (re)render own content
          await this.data.store.set( dataset );
          this.logger && this.logger.log( 'click', index );
          await this.start();
        } );
      };

      this.getValue = () =>  {
        return total = ( Object.keys( dataset.likes ).length ) - ( Object.keys( dataset.dislikes ).length );
      };

    }

  };

let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
