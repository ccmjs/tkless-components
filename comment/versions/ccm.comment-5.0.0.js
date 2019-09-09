/**
 * @overview ccm component for commenting
 * @author Tea Kless <tea.kless@web.de>, 2019
 * @license The MIT License (MIT)
 * @version 5.0.0
 * @changes
 * version 5.0.0 (04.09.2019)
 * - changed self.data to my.data
 * - retain the formatting of the user
 * version 4.1.0 (06.01.2019)
 * - uses ccm v20.0.0
 * - some improvement in voting
 */

( function () {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'comment',
    version: [ 5,0,0 ],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-22.5.0.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      // "chat": true,
      // "editable": true,
      // "sorting_by_voting": true,
      // "template": "expanded", // or "simple"
      // "data": { "store": [ "ccm.store" ] },
      // "voting": [ "ccm.component", "https://ccmjs.github.io/tkless-components/thumb_rating/versions/ccm.thumb_rating-2.0.0.js", {
      //   "buttons": true,
      //   "data": { "store": [ "ccm.store", "https://ccmjs.github.io/tkless-components/voting/resources/datastore.js" ] },
      //   "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
      //     [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ]
      //   ]
      // } ],
      "html": {
        "main": {
          "class": "container-fluid",
          "inner": [
            {
              "id": "login-section",
              "class": "row"
            },
            {
              "id": "comment-list",
              "style": "padding-top: 0.5rem;"
            }
          ]
        },
        "editor":{
          "id": "editor",
          "class": "row",
          "inner": [
            {
              "id": "editor"
            },
            {
              "id": "post-new",
              "tag": "input",
              "type": "submit",
              "class": "btn btn-success btn-xs",
              "onclick": "%new_comment%"
            }
          ]
        },
        "simple": {
          "inner": [
            {
              "class": "comment-item row",
              "inner": [
                {
                  "class": " comment-overview callout callout-info",
                  "inner": [
                    {
                      "class": "comment-content",
                      "inner": [
                        "%comment_content%",
                        {
                          "tag": "span",
                          "class": "sub-text",
                          "inner": [
                            "&#8195;",
                            {
                              "tag": "span",
                              "aria-label": "user: ",
                              "class": "glyphicon glyphicon-user",
                              "aria-hidden": "true"
                            },
                            "&#8196;%user%&#8194;",
                            {
                              "tag": "span",
                              "aria-label": "post: ",
                              "class": "glyphicon glyphicon-time",
                              "aria-hidden": "true"
                            },
                            "&#8196;%date%&#8196;"
                          ]
                        }
                      ]
                    },
                    {
                      "class": "voting-area"
                    }
                  ]
                }
              ]
            }
          ]
        },
        "expanded": {
          "inner": {
            "class": "panel row",
            "inner": [
              {
                "class": "post-heading",
                "inner":[
                  {
                    "class": "pull-left image",
                    "inner": {
                      "tag": "img",
                      "src": "https://ccmjs.github.io/tkless-components/comment/resources/user.jpg",
                      "class": "img-circle avatar",
                      "alt": "user profile image"
                    }
                  },
                  {
                    "class": "pull-left meta",
                    "inner": [
                      {
                        "class": "title h5",
                        "inner": "<b>%user%</b>&nbsp;made a post."
                      },
                      {
                        "tag": "h6",
                        "class": "text-muted time",
                        "inner": "%date%"
                      }
                    ]
                  }
                ]
              },
              {
                "class": "post-description comment-overview",
                "inner": [
                  {
                    "tag": "p",
                    "class": "comment-content",
                    "inner": "%comment_content%&nbsp;"
                  },
                  {
                    "class": "voting-area"
                  }
                ]
              }
            ]
          }
        },
        "edit": {
          "tag": "span",
          "type": "btn",
          "class": "btn edit",
          "onclick": "%edit%",
          "inner": [
            {
              "class": "glyphicon glyphicon-edit"
            },
            "&#8196;Edit&#8196;",
          ]
        }
      },
      "editor": [ "ccm.component", "https://ccmjs.github.io/tkless-components/editor/versions/ccm.editor-3.1.0.js",
        { "settings.modules.toolbar": false },
        { "settings.placeholder": "Write here ..." }
      ],
      "libs": [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
        "https://ccmjs.github.io/tkless-components/comment/resources/default.css",
        "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"
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

      let editor;
      let data;
      let main_elem;

      this.init = async () => {
        // set shortcut to help functions
        $ = self.ccm.helper;

        // listen to login/logout events => restart
        if ( self.user ) self.user.onchange = self.start;

        // listen to datastore changes => (re)render own content
        if ( $.isObject( self.data ) && $.isDatastore( self.data.store ) )
          self.data.store.onchange = async comment => {
            data = comment;
            await renderComments();
          };
      };

      this.ready = async () => {

        // privatize all possible instance members
        my = $.privatize( self );

        if ( self.logger ) self.logger.log( 'ready',$.clone( my ) );
      };

      this.start = async () => {

        data = await $.dataset( self.data );

        if ( self.logger ) self.logger.log( 'start', $.clone( data ) );

        if ( !data.comments ) data.comments = [];

        main_elem = $.html( my.html.main );

        if ( self.user ) {
          await  self.user.start();
          main_elem.querySelector( '#login-section' ).appendChild( self.user.root );
        }

        await renderComments();
        if ( self.user ) await renderEditor();

      };

      async function renderComments() {
        let unsorted_comments = [];

        main_elem.querySelector( '#comment-list' ).innerHTML = '';

        // asynchronous problem
        for ( let i = 0; i < data.comments.length; i ++ )
          await renderComment( data.comments[ i ] );

        if ( my.voting && my.sorting_by_voting )
          unsorted_comments.sort( compare );

        unsorted_comments.map(  entry => {
          // prepend element to DOM
          //$.prepend( main_elem.querySelector( '#comment-list' ), entry.comment );

          my.chat ? $.append( main_elem.querySelector( '#comment-list' ), entry.comment ) : $.prepend( main_elem.querySelector( '#comment-list' ), entry.comment );
        });

        $.setContent( self.element, main_elem );

        function compare( a, b ) {
          if ( a.voting < b.voting )
            return -1;
          if ( a.voting > b.voting )
            return 1;
          return a.date.localeCompare( b.date );
        }

        async function renderComment( comment ) {
          const old_comment = comment.content;
          const comment_elem = $.html( ( my.template === 'expanded' ) ? my.html.expanded: my.html.simple,
            {
              comment_content: comment.content,
              user: comment.user,
              date: my.chat ? moment( comment.date ).format( "MM Do, h:mm a" ) : moment( comment.date ).fromNow()
            } );

          // editable comments
          if ( my.editable ) {

            let edit_elem = $.html( my.html.edit, {
              edit: async () => {
                const instance = await my.editor.start( { root: comment_elem.querySelector( '.comment-overview' ) } );

                instance.get().root.innerHTML = comment.content;
                instance.get().focus();

                instance.element.querySelector( '.ql-editor' ).addEventListener( 'blur', async function () {
                  comment.content = instance.get().root.innerHTML.trim();
                  data.comments[ comment ] =
                    {
                      "user": comment.user,
                      "date": comment.date,
                      "content": comment.content,
                      "voting": comment.voting
                    };

                  // update dataset for rendering => (re)render accepted answer
                  await self.data.store.set( data );

                  // (re)render comments
                  await renderComments( data.comments );

                  if( self.logger ) self.logger.log( 'edit', { 'old': old_comment, 'new': comment.content });
                } );
              }
            } );

            if ( self.user && self.user.isLoggedIn() && ( self.user.data().user === comment.user ) ) {
              comment_elem.querySelector( '.comment-content' ).appendChild( edit_elem );
            }
          }

          // if voting is set then render voting-component
          if ( my.voting )
            await renderVoting( comment.voting );
          else {
            unsorted_comments.push( { 'comment': comment_elem, 'date': comment.date } );
            comment_elem.querySelector( '.voting-area' ).remove();
          }

          async function renderVoting( voting ) {

            voting = {
              'data.key': voting,
              onvote: ( event ) => { return event.user !== comment.user; }
            };

            if ( self.user && self.user.isLoggedIn() && ( comment.user === self.user.data().user ) )
              voting.user = '';

            const voting_inst = await my.voting.start( voting );

            // fill array for sorting
            unsorted_comments.push( { "voting": voting_inst.getValue(), "comment": comment_elem, "date": comment.date } );
            comment_elem.querySelector( '.voting-area' ).appendChild( voting_inst.root );
          }
        }
      }

      async function renderEditor() {
        if ( !self.user ) return;

        const editor_elem = $.html( my.html.editor, {
          new_comment: async ( event ) => {
            event.preventDefault();
            self.user && await self.user.login( self.start );
            await newComment();
          }
        } );

        editor  = await my.editor.start();
        $.setContent ( editor_elem.querySelector( '#editor' ), editor.root );
        main_elem.appendChild( editor_elem );
      }

      async function newComment() {
        if ( editor.get().root.innerHTML.trim() === "" ) return;

        let new_data = {
          "user": self.user.data().user,
          "date": moment().format(),
          "content": await editor.get().root.innerHTML.trim()
        };

        if ( my.voting ) new_data.voting = data.key + '_' + ( data.comments.length + 1 );

        data.comments.push( new_data );

        // update dataset for rendering => (re)render accepted answer
        self.data.store.set( data );

        // rerender comments
        await renderComments( data );
        editor.get().setContents([{ insert: '\n' }]);

        if ( self.logger ) {
          new_data = $.clone( new_data );
          delete data.user;
          self.logger.log( 'create', $.clone( new_data ) );
        }
      }
    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();