/**
 * @overview <i>ccm</i> component for create a news
 * @author Tea Kless <tea.kless@web.de> 2019
 * @license The MIT License (MIT)
 * @version 2.1.0
 * @changes
 * version 2.1.0 (05.01.2019)
 * - uses ccm v20.0.0
 * version 2.0.0 (26.10.2018)
 * - uses ccm v18.1.0
 */

( function () {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'news',
    version: [ 2,1,0 ],

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
      templates: {
        "main": {
          "id": "main",
          "class": "container-fluid",
          "inner": [
            {
              "id": "login-section",
              "style": "margin-bottom: 1em"
            },
            {
              "id": "button",
              "inner":
                {
                  "tag": "button",
                  "class": "btn btn-info btn-xs",
                  "onclick": "%new_post%",
                  "inner": "Publish Message"
                }
            },
            {
              "id": "posts"
            }
          ]
        },

        "post": {
          "class": "post",
          "inner": [
            {
              "title": "Delete Message",
              "class": "close fa fw fa-close",
              "onclick": "%delete_post%"
            },
            {
              "class": "head",
              "inner": [
                {
                  "class": "title",
                  "inner": [
                    {
                      "class": "date",
                      "inner": "%date%"
                    },
                    {
                      "inner": "%title%",
                      "contenteditable": "%edit%",
                      "oninput": "%input_title%"
                    }
                  ]
                },
                {
                  "class": "user",
                  "inner": [
                    {
                      "class": "name",
                      "inner": "%name%"
                    },
                    {
                      "class": "%avatar%"
                    }
                  ]
                }
              ]
            },
            {
              "class": "content",
              "inner": {
                "inner": "%content%",
                "contenteditable": "%edit%",
                "oninput": "%input_content%"
              }
            }
          ]
        }

      },
      //editable: true,
      //data:  { store: [  ],  key: '' },
      //user: [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js",
      //  [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ],
      css: [ 'ccm.load', 'https://ccmjs.github.io/tkless-components/news/resources/default.css' ],
      libs: [ 'ccm.load',
        {  context:'head', url: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css' },
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
        'https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css',
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js',
      ]
    },

    Instance: function () {
      /**
       * own reference for inner functions
       * @type {Instance}
       */
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

      let dataset;

      this.ready = async () => {
        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        if ( self.logger ) self.logger.log( 'ready', $.clone( my ) );
      };

      this.start = async () => {
        if ( !self.user ) return $.setContent( self.element, "User is not configured!");

        // login user if not logged in
        if ( my.editable && !self.user.isLoggedIn() ) await self.user.login();

        // get dataset for rendering
        dataset = await $.dataset( my.data );
        if ( !dataset.posts ) dataset.posts = [];

        if ( !dataset.posts && !my.editable )
          return $.setContent( self.element, "No News to display.");

        // render main html structure
        $.setContent( self.element, $.html( my.templates.main, {
          new_post: async function () { await updatePost(); }
        } ) );

        if ( self.user ) {
          await  self.user.start();
          if( !self.parent )
            self.element.querySelector( '#login-section' ).appendChild( self.user.root );
        }

        for ( let i = 0; i < dataset.posts.length; i++ ) {
          renderPost( dataset.posts[i], i) ;
        }

        if ( my.editable ) {
          renderPost( newPost(), dataset.posts.length );

          //placehoder for empty content
          let first = self.element.querySelector( '#posts' ).firstElementChild;
          first.classList.add( 'new-post' );
          let divs = first.querySelectorAll( 'div[contenteditable]' );

          if ( divs[0].getAttribute( 'contenteditable' ) === 'true' ) divs[0].classList.add( 'empty' );
          if ( divs[1].getAttribute( 'contenteditable' ) === 'true' ) divs[1].classList.add( 'empty' );

          // no close icon for empty post
          first.querySelector( '.fa-close' ).classList.remove( 'fa-close' );
        }

        /**
         * when editable set to false no delete and post possible
         * so remove all colose icons and post-button
         */
        else {
          self.element.querySelectorAll( '.fa-close' ).forEach( close => {
            close.classList.remove( 'fa-close', 'fa', 'fw' );
          });
          self.element.querySelector( '#button' ).remove();
        }

        function renderPost( post, i )  {

          const posts = self.element.querySelector( '#posts' );
          const post_elem = $.html( my.templates.post, {
            delete_post: () => {
              dataset.posts.splice( i, 1 );
              updatePost();
            },

            title:   post.title || "",
            date:    moment( post.date ).format( "MMMM Do YYYY, h:mm a" ),
            name:    post.user,
            avatar:  post.avatar || 'fa fa-user fa-fw',
            content: post.content || "",
            edit:    !!my.editable,

            input_title: function () {
              change( i, this, "title" );
            },
            input_content: function () {
              change( i, this, "content" );
            }
          } );

          if( posts.hasChildNodes() )
            posts.insertBefore( post_elem, posts.firstChild );
          else
            posts.appendChild( post_elem );
        }

        function change ( post, div, prop ) {

          if ( post === dataset.posts.length ) dataset.posts.push( newPost() );

          dataset.posts[ post ][ prop ] = $.protect ( div.innerHTML.replace( new RegExp( '\r?\n', 'g' ), '' ).trim() );

          if ( !div.innerHTML )
            div.classList.add( 'empty' ).innerHTML = ' ';
          else
            div.classList.remove( 'empty' );
        }

        function newPost() {
          return {
            date: moment().format(),
            user: self.user.data().user,
            avatar: self.user.data().avatar || ''
          }
        }

        async function updatePost() {
          await my.data.store.set( dataset );
          self.start();
        }

      };

      /**
       * returns current result data
       * @returns {Object} current result data
       */
      this.getValue = () => $.clone( dataset );
    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();