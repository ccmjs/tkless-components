/**
 * @overview ccm component for commenting
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 */

( function () {

  var component = {

    name: 'comment',
    version: [ 1,0,0 ],

    ccm: {
      url: 'https://ccmjs.github.io/ccm/versions/ccm-16.3.1.0.min.js',
      integrity: 'sha384-0EhLGq8EAxc2nd3NuK+aLtqSj6wfK7lrFCLPbKmBKRRoKjvND/3zPza8zqgNFSur',
      crossorigin: 'anonymous'
    },

    config: {
      templates: {
        "main": {
          "class": "container-fluid",
          "inner": [
            {
              "tag": "h3",
              "class": "row text-muted",
              "inner": "Comments"
            },
            {
              "id": "comment-list"
            },
            {
              "tag": "form",
              "class": "row",
              "inner": [
                {
                  "id": "new-comment",
                  "inner": [
                    {
                      "tag": "button",
                      "type": "button",
                      "class": "btn btn-default btn-xs",
                      "onclick": "%render_editor%",
                      "inner": [
                        {
                          "tag": "span",
                          "class": "glyphicon glyphicon-plus-sign",
                          "aria-hidden": "true"
                        },
                        "&nbsp;add comment"
                      ]
                    }
                  ]
                }
              ]
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
                  "tag": "button",
                  "type": "button",
                  "class": "btn btn-default btn-xs",
                  "onclick": "%add_comment%",
                  "inner": "&nbsp;add comment"
                }
              ]
            }
          ]
        },
        "voting_overview": {
          "class": "voting_overview row",
          "inner": [
            {
              "class": "col-md-12",
              "inner": "%get_voting%"
            },
            {
              "class": "col-md-12",
              "inner": "votes"
            }
          ]
        },
        "simple_comment": {
          "inner": [
            {
              "class": "comment-item row",
              "inner": [
                {
                  "class": " comment-overview callout callout-primary",
                  "inner": [
                    {
                      "class": "sub-text",
                      "inner": [
                        {
                          "tag": "span",
                          "aria-label": "user: ",
                          "class": "glyphicon glyphicon-user",
                          "aria-hidden": "true"
                        },
                        "&nbsp;%user%&nbsp;",
                        {
                          "tag": "span",
                          "aria-label": "post: ",
                          "class": "glyphicon glyphicon-time",
                          "aria-hidden": "true"
                        },
                        "&nbsp;%date%&nbsp;"
                      ]
                    },
                    {
                      "class": "comment-content",
                      "inner": [
                        "%comment_content%"
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
        "expanded_comment": {
          "inner": {
            "class": "panel panel-white post panel-shadow",
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
                "class": "post-description",
                "inner": [
                  {
                    "tag": "p",
                    "class": "comment-overview",
                    "inner": "%comment_content%&nbsp;"
                  },
                  {
                    "class": "stats voting-area"
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
              "class": "glyphicon glyphicon-pencil"
            },
            "&nbsp;Edit&nbsp;",
          ]
        }
      },
      data: { store: [ "ccm.store", {} ], key: 'demo' },
      editor: [ 'ccm.component', 'https://ccmjs.github.io/tkless-components/editor/versions/ccm.editor-2.0.0.js',
        { 'settings.modules.toolbar': false },
        { 'settings.placeholder': 'Write your comment here ...' }
      ],
      libs: [ 'ccm.load',
        { context: 'head', url: 'https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css' },
        'https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css',
        'https://ccmjs.github.io/tkless-components/comment/resources/default.css',
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js'
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
      let dataset;

      this.init = callback => {

        // listen to change event of ccm realtime datastore => (re)render own content
        if ( self.data.store ) self.data.store.onChange = function ( comment ) {
          dataset = comment;
          self.start();
        };

        callback();
      };

      this.ready = callback => {
        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        if ( self.logger ) self.logger.log( 'ready', my );


        if ( self.user )
          self.user.addObserver( self.index, function ( event ) {
            if ( event) self.start();
          });

        if ( self.logger ) self.logger.log( 'ready', {
          key: my.data.key,
          store: my.data.store.source()
        } );

        callback();
      };

      this.start = callback => {

        $.dataset( my.data, function ( dataset ) {
          console.log(dataset);
          if ( self.logger ) self.logger.log( 'start', dataset );

          if ( !dataset.comments ) dataset.comments = [];

          let main_elem = self.ccm.helper.html( my.templates.main, {
            render_editor: function () {
              self.element.querySelector( '#new-comment' ).classList.add( 'fade-comment' );
              renderEditor();
            }
          } );

          renderComments();

          function renderComments() {
            let unsorted_comments = [];

            main_elem.querySelector( '#comment-list' ).innerHTML = '';

            let counter = 1;
            //asynchronous problem
            dataset.comments.map( renderComment );
            check();

            // waiting: all comments and their voting ist put in on-the-fly object
            function check() {
              counter--;
              if( counter > 0 ) return;

              if ( my.sorting_by_voting )
                unsorted_comments.sort( compare );

              unsorted_comments.map( function ( entry ) {
                // prepend element to DOM
                $.prepend( main_elem.querySelector( '#comment-list' ), entry.comment );
              });

              $.setContent( self.element, main_elem );
              if ( callback ) callback();

              function compare( a, b ) {
                if ( a.voting < b.voting )
                  return -1;
                if ( a.voting > b.voting )
                  return 1;
                return a.date.localeCompare( b.date );
              }

            }

            function renderComment( comment ) {
              let old_comment = comment.content;
              let comment_elem;

              if( my.comment_template === 'expanded' ) {
                // generate on-the-fly element
                comment_elem = $.html( my.templates.expanded_comment, {
                  comment_content: comment.content,
                  user: comment.user,
                  date: moment( comment.date ).fromNow()
                });
              }
              else
                comment_elem = $.html( my.templates.simple_comment, {
                  comment_content: comment.content,
                  user: comment.user,
                  date: moment( comment.date ).fromNow()
                });

              if ( my.editable ) {

                let edit_elem = self.ccm.helper.html( my.templates.edit, {
                  edit: function () {
                    let content = comment_elem.querySelector( '.comment-content' ).childNodes[0].textContent;
                    my.editor.start( ( instance ) => {
                      $.setContent( comment_elem.querySelector( '.comment-overview' ), instance.root );
                      instance.get().setText( content );
                      instance.get().focus();
                      instance.element.querySelector( '.ql-editor' ).addEventListener( 'blur', function () {
                        comment.content = instance.get().getText().trim();
                        dataset.comments[ comment ] =
                          {
                            "user": comment.user,
                            "date": comment.date,
                            "content": comment.content,
                            "voting": comment.voting
                          };

                        // update dataset for rendering => (re)render accepted answer
                        my.data.store.set( dataset, function () {
                          self.start();
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

              //if voting is set then render voting-component
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
                  onvote: function ( event ) { return event.user !== comment.user; }
                };

                if ( self.user && self.user.isLoggedIn() && ( comment.user === self.user.data().user ) )
                  voting.user = '';

                my.voting.start( voting, function ( voting_inst ) {
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

            self.element.querySelector( '#new-comment' ).innerHTML = '';

            const editor_elem = $.html( my.templates.editor, {
              add_comment: function () {
                self.user.login( function () { newComment(); } );
              }
            });

            my.editor.start( function ( instance ) {
              editor_elem.querySelector( '#editor' ).appendChild( instance.root );
              editor = instance
            } );

            self.element.querySelector( '#new-comment' ).appendChild( editor_elem );
          }

          function newComment() {
            let data = {
              "user": self.user.data().user,
              "date": moment().format(),
              "content": editor.get().getText().trim(),
              "voting": dataset.key + '_' + ( dataset.comments.length + 1 )
            };

            dataset.comments.push( data );
            // update dataset for rendering => (re)render accepted answer
            my.data.store.set( dataset, function () {
              self.start();
              if ( self.logger ) {
                data = $.clone( data );
                delete dataset.user;
                self.logger.log( 'create', data );
              }
            } );
          }

        } );
      };
    }
  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );