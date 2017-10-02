/**
 * @overview posts template for <i>ccm</i> component
 * @author Tea Kless <tea.kless@web.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

  var component  = {

    name: 'posts',
    version:[ 1,0,0 ],

    ccm: {
      url: 'https://akless.github.io/ccm/version/ccm-10.0.0.min.js',
      integrity: 'sha384-AND32Wbfnmb3f2vRMHkXSJpi81oFmy3eO1FbMHb5i2XOzwg0z+T1de180FUH1Tjt',
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
                  "onclick": "%click%",
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
      editable: true, //[true, false]
      data:  {
        store: [ 'ccm.store', 'https://tkless.github.io/ccm-components/news/posts_datastore.js' ],
        key: 'demo'
      },
      user:  [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/ccm.user.min.js' ],
      style: [ 'ccm.load', 'https://tkless.github.io/ccm-components/news/style.css' ],
      icons: [ 'ccm.load', { url: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css', context: document.head },
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css' ]
    },

    Instance: function () {

      var self = this;

      this.start = function ( callback ) {

        document.head.appendChild( self.ccm.helper.html( {
          tag:   'style',
          inner: "@font-face { font-family: 'FontAwesome'; src: url('../libs/font-awesome/fonts/fontawesome-webfont.eot?v=4.7.0'); src: url('../libs/font-awesome/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'), url('../libs/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'), url('../libs/font-awesome/fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'), url('../libs/font-awesome/fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype'), url('../libs/font-awesome/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg'); font-weight: normal; font-style: normal; }"
        } ) );

        // login user if not logged in
        if ( self.editable && !self.user.isLoggedIn() ) return self.user.login( function () { self.start( callback ); } );

        // get dataset for rendering
        self.ccm.helper.dataset( self.data.store, self.data.key, function ( dataset ) {

          if ( !dataset.posts ) dataset.posts = [];

          // render main html structure
          self.ccm.helper.setContent( self.element, self.ccm.helper.protect( self.ccm.helper.html( self.templates.main, {
            click: function () { updatePost(); }
          } ) ) );

          for ( var i = 0; i < dataset.posts.length; i++ ) {
              renderPost( dataset.posts[i], i) ;
          }
          if ( self.editable )
            renderPost( newPost(), dataset.posts.length );

          //placehoder for empty content
          var first = self.element.querySelector( '#posts' ).firstElementChild;
          first.classList.add( 'new_post' );
          var divs = first.querySelectorAll( 'div[contenteditable]' );

          if ( divs[0].getAttribute( 'contenteditable' ) === 'true' );
            divs[0].classList.add( 'empty' );
          if ( divs[1].getAttribute( 'contenteditable' ) === 'true' );
            divs[1].classList.add( 'empty' );

          // no close icon for emty post
          first.querySelector( '.fa-close' ).classList.remove( 'fa-close' );

          /**
           * when editable set to false no delete and post possible
           * so remove all colose icons and post-button
           */
          if ( !self.editable ) {
            self.element.querySelector( '.fa-close' ).classList.remove( '.fa_close' );
            self.element.querySelector( '#button' ).removeAttribute( 'id' );
          }

          // perform callback
          if ( callback ) callback();

          function renderPost( post, i )  {

            var posts = self.element.querySelector( '#posts' );
            var post_elem = self.ccm.helper.protect( self.ccm.helper.html( self.templates.post, {
              delete_post: function () {
                dataset.posts.splice(i, 1);
                updatePost();
              },

              title:   post.title || "",
              date:    post.date,
              name:    post.user,
              avatar:  post.avatar || 'fa fa-user fa-fw fa-lg',
              content: post.content || "",
              edit:    !!self.editable,

              input_title: function () {
                console.log(this);
                change( i, this, "title" );
              },
              input_content: function () {
                change( i, this, "content" );
              }
            } ) );

            if( posts.hasChildNodes() )
              posts.insertBefore( post_elem, posts.firstChild );
            else
              posts.appendChild( post_elem );
          }

          function getDateTime () {

            var today = new Date();
            var dd    = today.getDate();
            var mm    = today.getMonth();
            var yyyy  = today.getFullYear();
            var hour  = today.getHours();
            var min   = today.getMinutes();

            var monat = ["Januar", "Februar", "März", "April", "Mai", "Juni","Juli", "August", "September", "Oktober", "November", "Dezember"];

            if ( dd < 10 ) dd = '0' + dd;

            if ( hour < 10 ) hour = '0' + hour;
            if ( min  < 10 ) min  = '0' + min;

            return dd + ' ' + monat[ mm ].substring( 0, 3 ) + '. '  + yyyy + ' ' + hour + ':' + min;

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
              date: getDateTime(),
              user: self.user.data().key,
              avatar: self.user.data().avatar || ''
            }
          }

          function updatePost() {
            self.data.store.set(dataset, function () {
              self.start();
            } );
          }

        } );

      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );