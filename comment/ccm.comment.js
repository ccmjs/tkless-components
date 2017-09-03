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
            { "id": "comment-list" },
            {
              "id": "new-comment",
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
        },
        "simple_comment": {
          "inner": [
            {
              "tag": "comment-item",
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
            },
            {
              "tag": "hr"
            }
          ]
        },
        "expand_comment": {}
      },

      comment_template: 'simple', // or expand
      data: {
        store: [ 'ccm.store', '../comment/datastore.json' ],
        key: 'test'
      },
      user:  [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/ccm.user.min.js', { logged_in: true, 'guest.user': 'tmeskh2s' } ],
      editor: [ 'ccm.component', '../editor/ccm.editor.js' ],
      dateTime: [ 'ccm.load', 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js' ],
      css: [ 'ccm.load', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
        '../comment/style.css',
        { context: 'head', url: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css' } ]
    },

    Instance: function () {
      var self = this;

      this.start = function ( callback ) {

        self.ccm.helper.dataset( self.data.store, self.data.key, function ( dataset ) {
          if ( !dataset.comments ) dataset.comments = [];

          self.ccm.helper.setContent( self.element, self.ccm.helper.html( self.templates.main ) );

          renderComments();
          renderEditor();
          
          function renderComments() {
            self.element.querySelector( '#comment-list').innerHTML = '';

            dataset.comments.map( renderComment );
          }

          function renderComment( comment ) {

            var comment_elem;

            if( self.comment_template === 'simple' ) {
              // generate on-the-fly element
              comment_elem = self.ccm.helper.html( self.templates.simple_comment, {
                comment_content: comment.content,
                user: comment.owner,
                date: comment.date
              });
            }

            console.log(comment_elem);

            // append element to DOM
            self.element.querySelector('#comment-list').appendChild( comment_elem );

          }

          function renderEditor() {
            return;

            if (!self.user || !self.user.isLoggedIn()) return;

            var user = self.user.data().user;

            self.editor.start( { root: self.element.querySelector( '.editor' ) }, function (instance) {
              if (user !== dataset.user) {
                editor = instance;
              }
              else {
                editor = instance;
                editor.get().enable( false );
              }
            } );
          }

        } );
      };
    }
  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );