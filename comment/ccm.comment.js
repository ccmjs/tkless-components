/**
 * @overview ccm component for commenting
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 */

{

  var component = {

    name: 'comment',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {
      // "chat": true,
      // "editable": true,
      // "sorting_by_voting": true,
      // "template": "expanded", // or "simple"
      // "data": { "store": [ "ccm.store" ] },
      // "voting": [ "ccm.component", "https://ccmjs.github.io/tkless-components/thumb_rating/versions/ccm.thumb_rating-2.0.0.js", {
      //   "buttons": true,
      //   "data": { "store": [ "ccm.store", "https://ccmjs.github.io/tkless-components/voting/resources/datastore.js" ] },
      //   "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.1.js",
      //     [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ]
      //   ]
      // } ],
      "html": {
        "main": {
          "class": "container-fluid",
          "inner": [
            {
              "id": "login-section"
            },
            {
              "id": "comment-list",
              "style": "padding-top: 0.5rem;"
            },
            {
              "id": "new-comment",
              "class": "row"
            }
          ]
        },
        "editor":{
          "class": "row",
          "inner": [
            {
              "class": "form-group",
              "inner":
                {
                  "class": "container-fluid",
                  "id": "editor"
                }
            },
            {
              "id": "add-comment",
              "inner": [
                {
                  "tag": "input",
                  "type": "submit",
                  "class": "btn btn-success btn-xs",
                  "onclick": "%new_comment%"
                }
              ]
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
                        "src": "../../ccm-components/comment/resources/user.jpg",
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
      "editor": [ "ccm.component", "https://ccmjs.github.io/tkless-components/editor/versions/ccm.editor-2.0.0.js",
        { "settings.modules.toolbar": false },
        { "settings.placeholder": "Write here ..." }
      ],
      "libs": [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
        "resources/default.css",
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

      this.init = callback => {

        if ( self.user ) self.user.onchange = () => self.start();

        // listen to change event of ccm realtime datastore => (re)render own content
        if ( self.data.store ) self.data.store.onchange = comment => {
          data = comment;
          renderComments();
        };

        callback();
      };

      this.ready = callback => {
        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        if ( self.logger ) self.logger.log( 'ready', my );

        callback();
      };

      this.start = callback => {

        $.dataset( my.data, function ( dataset ) {
          data = dataset;

          if ( self.logger ) self.logger.log( 'start', data );

          if ( !data.comments ) data.comments = [];

          main_elem = $.html( my.html.main );

          if ( self.user )
            self.user.start( () => {
              main_elem.querySelector( '#login-section' ).appendChild( self.user.root );
            } );

          renderComments( );

          callback && callback();
        } );
      };

      function renderComments() {
        let unsorted_comments = [];

        main_elem.querySelector( '#comment-list' ).innerHTML = '';

        let counter = 1;

        // asynchronous problem
        data.comments.map( renderComment );
        check();

        // waiting: all comments and their voting ist put in on-the-fly object
        function check()  {
          counter--;
          if( counter > 0 ) return;

          if ( my.voting && my.sorting_by_voting )
            unsorted_comments.sort( compare );

          unsorted_comments.map(  entry => {
            // prepend element to DOM
            //$.prepend( main_elem.querySelector( '#comment-list' ), entry.comment );

            my.chat ? $.append( main_elem.querySelector( '#comment-list' ), entry.comment ) : $.prepend( main_elem.querySelector( '#comment-list' ), entry.comment );
          });

          $.setContent( self.element, main_elem );

          if ( self.user ) renderEditor();

          function compare( a, b ) {
            if ( a.voting < b.voting )
              return -1;
            if ( a.voting > b.voting )
              return 1;
            return a.date.localeCompare( b.date );
          }

        }

        function renderComment( comment ) {
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
              edit: () => {
                let content = comment_elem.querySelector( '.comment-content' ).childNodes[0].textContent;
                my.editor.start( ( instance ) => {
                  $.setContent( comment_elem.querySelector( '.comment-overview' ), instance.root );
                  instance.get().setText( content );
                  instance.get().focus();
                  instance.element.querySelector( '.ql-editor' ).addEventListener( 'blur', function () {
                    comment.content = instance.get().getText().trim();
                    data.comments[ comment ] =
                      {
                        "user": comment.user,
                        "date": comment.date,
                        "content": comment.content,
                        "voting": comment.voting
                      };

                    // update dataset for rendering => (re)render accepted answer
                    my.data.store.set( data, function () {
                      // clear editor area
                      self.element.querySelector( '#new-comment' ).innerHTML = '';

                      renderComments( data.comments );

                      if( self.logger ) self.logger.log( 'edit', { 'old': old_comment, 'new': comment.content });
                    } );
                  } );
                } );
              }
            } );

            if ( self.user && self.user.isLoggedIn() && ( self.user.data().user === comment.user ) ) {
              comment_elem.querySelector( '.comment-content' ).appendChild( edit_elem );
            }
          }

          // if voting is set then render voting-component
          if ( my.voting )
            renderVoting( comment.voting );
          else {
            unsorted_comments.push( { "comment": comment_elem, "date": comment.date } );
            comment_elem.querySelector( '.voting-area' ).remove();
          }

          function renderVoting( voting ) {

            counter++;

            voting = {
              'data.key': voting,
              onvote: ( event ) => { return event.user !== comment.user; }
            };

            if ( self.user && self.user.isLoggedIn() && ( comment.user === self.user.data().user ) )
              voting.user = '';

            my.voting.start( voting, voting_inst => {
              // fill array for sorting
              unsorted_comments.push( { "voting": voting_inst.getValue(), "comment": comment_elem, "date": comment.date } );
              comment_elem.querySelector( '.voting-area' ).appendChild( voting_inst.root );
              check();
            } );
          }
        }
      }

      function renderEditor() {
        if ( !self.user ) return;

        const editor_elem = $.html( my.html.editor, {
          new_comment: ( event ) => {
            event.preventDefault();
            if ( self.user && !self.user.isLoggedIn() ) {
              self.user.login( proceed );
            }
            else proceed();

            function proceed() {
              newComment();
            }
          }
        });

        my.editor.start( instance => {
          editor_elem.querySelector( '#editor' ).appendChild( instance.root );
          editor = instance
        } );

        self.element.querySelector( '#new-comment' ).appendChild( editor_elem );
      }

      function newComment() {
        if ( editor.get().getText().trim()=== "" ) return;

        let new_data = {
          "user": self.user.data().user,
          "date": moment().format(),
          "content": editor.get().getText().trim()
        };

        if ( my.voting )
          new_data.voting = data.key + '_' + ( data.comments.length + 1 );

        data.comments.push( new_data );
        // update dataset for rendering => (re)render accepted answer
        my.data.store.set( data, () => {
          // clear editor area
          self.element.querySelector( '#new-comment' ).innerHTML = '';

          // rerender comments
          renderComments( data );

          if ( self.logger ) {
            new_data = $.clone( new_data );
            delete data.user;
            self.logger.log( 'create', new_data );
          }
        } );
      }
    }
  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}