/**
 * @overview <i>ccm</i> component for news
 * @author Tea Kless <tea.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

( function () {

  var component  = {

    name: 'news',
    version:[ 1,0,0 ],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: {
      url: 'https://ccmjs.github.io/ccm/versions/ccm-15.0.2.min.js',
      integrity: 'sha384-4X0IFdACgz2SAKu0knklA+SRQ6OVU4GipKhm7p6l7e7k/CIM8cjCFprWmM4qkbQz',
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
              "id": "button",
              "inner":
                {
                  "tag": "button",
                  "onclick": "%new_post%",
                  "inner": "posten"
                }
            },
            {
              "tag": "div",
              "id": "posts"
            }
          ]
        },

        "post": {
          "tag": "div",
          "class": "post",
          "inner": [
            {
              "tag": "div",
              "class": "close fa fw fa-close",
              "onclick": "%delete_post%"
            },
            {
              "tag": "div",
              "class": "head",
              "inner": [
                {
                  "tag": "div",
                  "class": "title",
                  "inner": [
                    {
                      "tag": "div",
                      "class": "date",
                      "inner": "%date%"
                    },
                    {
                      "tag": "div",
                      "inner": "%title%",
                      "contenteditable": "%edit%",
                      "oninput": "%input_title%"
                    }
                  ]
                },
                {
                  "tag": "div",
                  "class": "user",
                  "inner": [
                    {
                      "tag": "div",
                      "class": "name",
                      "inner": "%name%"
                    },
                    {
                      "tag": "div",
                      "class": "%avatar%"
                    }
                  ]
                }
              ]
            },
            {
              "tag": "div",
              "class": "content",
              "inner": {
                "tag": "div",
                "inner": "%content%",
                "contenteditable": "%edit%",
                "oninput": "%input_content%"
              }
            }
          ]
        }

      },
      /* data:  {
         store: [ 'ccm.store', '../news/resources/datastore.js' ],
         key: 'demo'
       },*/
      user: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-4.0.0.min.js' ],
      icons: [ 'ccm.load',
        {  context:'head', url: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css' },
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js',
        'https://ccmjs.github.io/tkless-components/news/resources/default.css',
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

      this.ready = callback => {
        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        if ( self.logger ) self.logger.log( 'ready', my );

        callback();
      };

      this.start = callback => {

        // login user if not logged in
        if ( my.editable && !self.user.isLoggedIn() ) return self.user.login( function () { self.start( callback ); } );

        // get dataset for rendering
        $.dataset( my.data, function ( dataset ) {

          if ( !dataset.posts ) dataset.posts = [];

          // render main html structure
          $.setContent( self.element, $.html( my.templates.main, {
            new_post: function () { updatePost(); }
          } ) );

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
            self.element.querySelectorAll( '.fa-close' ).forEach( function ( close ) {
              close.classList.remove( 'fa-close', 'fa', 'fw' );
            });
            self.element.querySelector( '#button' ).remove();
          }

          // perform callback
          if ( callback ) callback();

          function renderPost( post, i )  {

            let posts = self.element.querySelector( '#posts' );
            let post_elem = $.html( my.templates.post, {
              delete_post: function () {
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

            dataset.posts[ post ][ prop ] = div.innerHTML.replace( new RegExp( '\r?\n', 'g' ), '' ).trim();

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

          function updatePost() {
            my.data.store.set(dataset, function () {
              self.start();
            } );
          }

        } );

      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );