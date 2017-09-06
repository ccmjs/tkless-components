/**
 * @overview ccm component for commenting
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 */

( function () {

  var component = {

    name: 'comment',

    ccm: 'https://akless.github.io/ccm/ccm.js',

    config: {
      templates: {
        "main": {
          "class": "container",
          "inner": [
            {
              "id": "comment-list",
              "class": "row"
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
          "inner": [
            {
              "class": "row form-group",
              "inner":
                {
                  "class": "container-fluid",
                  "id": "editor"
                }
            },
            {
              "class": "row",
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
              "class": "row comment-item",
              "inner": [
                {
                  "class": "col-md-1 col-xs-1 voting-area"
                },
                {
                  "class": "col-md-11 col-xs-11 comment-overview",
                  "inner": [
                    "%comment_content% - ",
                    {
                      "tag": "span",
                      "class": "sub-text",
                      "inner": [
                        {
                          "tag": "span",
                          "class": "glyphicon glyphicon-user",
                          "aria-hidden": "true"
                        },
                        "&nbsp;%user%&nbsp;",
                        {
                          "tag": "span",
                          "class": "glyphicon glyphicon-time",
                          "aria-hidden": "true"
                        },
                        "&nbsp;%date%&nbsp;"
                      ]
                    }
                  ]
                }

              ]
            },
            {
              "tag": "hr",
              "class": "row"
            }
          ]
        },
        "expand_comment": {}
      },

      sorting_by_voting: true,
      comment_template: 'simple', // or expand
      data: {
        store: [ 'ccm.store', '../comment/datastore.json' ],
        key: 'demo'
      },
      user:  [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/ccm.user.min.js' ], //{ logged_in: true, 'guest.user': 'tmeskh2s' } ],
      editor: [ 'ccm.component', '../editor/ccm.editor.js',
        { 'settings.modules.toolbar': false },
        { 'settings.placeholder': 'Write your comment here ...' }

      ],
      voting: [ "ccm.component", "../voting/ccm.voting.js", {
        icon_likes: 'fa fa-lg fa-chevron-up',
        icon_dislikes: 'fa fa-lg fa-chevron-down',
        data: {
          store: [ 'ccm.store', '../voting/voting_datastore.js' ]
        }
      } ],

      libs: [ 'ccm.load', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
        '../comment/style.css',
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js',
        { context: 'head', url: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css' } ]
    },

    Instance: function () {
      var self = this;
      var editor;
      var dataset;

      this.init = function ( callback ) {

        // listen to change event of ccm realtime datastore => (re)render own content
        self.data.store.onChange = function ( question ) {
          dataset = question;
          self.start();
        };

        callback();
      };

      this.start = function ( callback ) {

        self.ccm.helper.dataset( self.data.store, self.data.key, function ( dataset ) {
          if ( !dataset.comments ) dataset.comments = [];

          self.ccm.helper.setContent( self.element, self.ccm.helper.html( self.templates.main, {
            render_editor: function () {
              self.element.querySelector( '#new-comment' ).classList.add( 'fade-comment' );
              renderEditor();
            }
          } ) );

          renderComments();

          function renderComments() {
            var unsorted_comments = [];

            self.element.querySelector( '#comment-list').innerHTML = '';

            var counter = 1;
            //asynchronous problem
            dataset.comments.map( renderComment );
            check();

            // waiting: all comments and their voting ist put in on-the-fly object
            function check() {
              counter--;
              if( counter > 0 ) return;

              if ( self.sorting_by_voting )
                unsorted_comments.sort( compare );

              unsorted_comments.map( function ( entry ) {
                // prepend element to DOM
                self.ccm.helper.prepend( self.element.querySelector( '#comment-list' ), entry.comment );
              });

              function compare( a, b ) {
                if ( a.voting < b.voting )
                  return -1;
                if ( a.voting > b.voting )
                  return 1;
                return 0;
              }

            }

            function renderComment( comment ) {
              var comment_elem;

              if( self.comment_template === 'simple' ) {
                // generate on-the-fly element
                comment_elem = self.ccm.helper.html( self.templates.simple_comment, {
                  comment_content: comment.content,
                  user: comment.user,
                  date: moment( comment.date ).fromNow()
                });
              }

              //if voting is set then render voting-component
              if ( self.voting )
                renderVoting( comment.voting );

              function renderVoting( voting ) {

                counter++;

                if ( self.user.isLoggedIn() && (comment.user === self.user.data().user) )
                  voting.user = '';

                self.voting.start( voting, function ( voting_inst ) {
                  // fill array for sorting
                  unsorted_comments.push( { "voting": voting_inst.getVoting(), "comment": comment_elem } );
                  comment_elem.querySelector( '.voting-area' ).appendChild( voting_inst.root );
                  check();
                } );
              }

            }
          }

          function renderEditor() {
            if ( !self.user ) return;

            self.element.querySelector( '#new-comment' ).innerHTML = '';

            var editor_elem = self.ccm.helper.html( self.templates.editor, {
              add_comment: function () { newComment() }
            } );

            self.user.login( function () {
              self.editor.start( function (instance) {
                editor_elem.querySelector( '#editor' ).appendChild( instance.root );
                editor = instance
              } );
            });

            self.element.querySelector( '#new-comment' ).appendChild( editor_elem );
          }
          
          function newComment() {

            dataset.comments.push(
              {
                "user": self.user.data().user,
                "date": moment().format(),
                "content": editor.get().getText(),
                "voting": { 'data.key': dataset.key + '-' + dataset.comments.length + 1 }
              } );

            // update dataset for rendering => (re)render accepted answer
            self.data.store.set( dataset, function () { renderComments() } );
          }

        } );

        if ( callback ) callback();
      };
    }
  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );