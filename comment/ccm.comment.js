/**
 * @overview ccm component for commenting
 * @author Tea Kless <tea.kless@web.de>, 2020
 * @license The MIT License (MIT)
 * @version 6.0.0
 * @changes
 * version 6.0.0 (23.04.2020)
 * - chat is no longer supported
 * - sorting_by_voting no longer supported
 * - voting no longer requires user dependency
 * - uses ccm v25.4.0
 * version 5.2.0 (18.01.2020)
 * - render modal dialog when deleting the message
 * version 5.1.0 (16.12.2019)
 * - render modal dialog when deleting the message
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

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      "user_icon": "https://ccmjs.github.io/akless-components/user/resources/icon.svg",
      //"submit_button_label": "Sent" //default value ist "Senden",
      // "editable": true,
      // "data": { "store": [ "ccm.store" ] },
      // "voting": [ "ccm.component", "https://ccmjs.github.io/tkless-components/thumb_rating/versions/ccm.thumb_rating-2.0.0.js", {
      //   "buttons": true,
      //   "data": { "store": [ "ccm.store", "https://ccmjs.github.io/tkless-components/voting/resources/datastore.js" ] },
      // } ],
      "html": {
        "main": {
          "class": "container-fluid",
          "inner": [
            { "id": "login-section", "class": "d-flex justify-content-end" },
            { "id": "comment-list" },
            { "id": "new-comment" }
          ]
        },
        "comment": {
          "class": "panel mb-3 p-3",
          "id": "comment-%id%",
          "inner": [
            {
              "class": "comment-heading d-flex",
              "inner":[
                {
                  "tag": "img",
                  "src": "%user_icon%",
                  "class": "img-circle avatar",
                  "alt": "user profile image"
                },
                {
                  "class": "meta",
                  "inner": [
                    {
                      "class": "comment-author",
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
              "class": "comment-overview d-flex align-content-center",
              "inner": [
                {
                  "class": "comment-content",
                  "inner": "%comment_content%&nbsp;"
                },
                {
                  "class": "edit"
                }
              ]
            },
            {
              "class": "voting-area"
            }
          ]
        },
        "editor":{
          "inner": [
            {
              "class": "pb-2",
              "id": "editor"
            },
            {
              "id": "post-new",
              "tag": "input",
              "type": "submit",
              "class": "btn btn-success btn-xs",
              "onclick": "%new_comment%",
              "value":  "%submit_button_label%"
            }
          ]
        },
        "edit": {
          "type":"button",
          "class": "btn btn-light btn-sm text-muted",
          "onclick": "%edit%",
          "inner": [
            {
              "tag": "span",
              "class": "fa fa-edit",
            },
            "&#8196;Edit&#8196;",
          ]
        }
      },
      "editor": [ "ccm.component", "https://ccmjs.github.io/tkless-components/editor/versions/ccm.editor-3.1.0.js",
        { "settings.modules.toolbar": false,
          "settings.placeholder": "New Message ..."
        }
      ],
      "libs": [ "ccm.load", "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js",
        "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
        {  "context":"head", "url": "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" },
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
       "resources/comment.css",
      ],
      "modal": [ "ccm.component", "https://ccmjs.github.io/tkless-components/modal/versions/ccm.modal-2.0.0.js" ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-5.0.0.mjs" ]
    },

    Instance: function () {
      let $, editor, data, main_elem, comment_elem;

      this.init = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper );  // set shortcut to help functions

        // listen to login/logout events => restart
        if ( this.user ) this.user.onchange = this.start;       // listen to login/logout events => restart

        // listen to datastore changes => (re)render own content
        if ( $.isObject( this.data ) && $.isDatastore( this.data.store ) )
          this.data.store.onchange = async comment => {
            data = comment;
            await renderComments();
          };
      };

      this.ready = async () => {
        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );
      };

      this.start = async () => {
        $.setContent( this.element, $.loading() );
        main_elem = $.html( this.html.main );

        this.logger && this.logger.log( 'start', $.clone( store.local ) );  // log 'start' event
        if ( this.user ) { this.user.start(); $.append( main_elem.querySelector( '#login-section' ), this.user.root ); }

        data = await $.dataset( this.data );
        if ( !data.comments ) data.comments = [];

        await renderComments();
        this.user && await renderEditor();

        $.setContent( this.element, main_elem );
      };

      this.updateComment = async id => {
        await updateCommentData( id );
        await updateCommentElem( id );
      };

      const updateCommentData = async () => {
        // update dataset for rendering
        await this.data.store.set( data );
      };

      const updateCommentElem = async id => {
        const index = id.split('-')[1];
        const comment = data.comments[ Number( index ) ];
        await renderComment( comment, index );
      };

      const renderComments = async () =>  {
        $.setContent( main_elem.querySelector( '#comment-list' ), '' );

        // asynchronous problem

        for ( let i = 0; i < data.comments.length; i ++ )  await renderComment( data.comments[ i ], i );
        //for ( let entry in data.comments ) await renderComment( data.comments[ entry ],  data.comments.indexOf( entry) );

      };

      const renderComment = async ( comment, id )  => {
        comment_elem = $.html( this.html.comment, {
          id: id,
          comment_content: comment.content,
          user: comment.user_name || comment.user,
          user_icon: ( this.user && this.user.isLoggedIn() && this.user.getValue().picture ) ? this.user.getValue().picture : this.user_icon,
          date: moment( comment.date ).format( "MM Do, h:mm a" )
        } );

        this.editable && await editableComment( comment, id );

        // if voting is set then render voting-component
        this.voting && await renderVoting( comment );

        // append/replace comment
        const elem =  this.element.querySelector( '#comment-'+id );
        if ( elem ) {
          const comment_list =  this.element.querySelector( '#comment-list' );
          comment_list.replaceChild( comment_elem, comment_list.querySelector( '#comment-'+id ) );
        }
        else $.prepend( main_elem.querySelector( '#comment-list' ), comment_elem );

      };

      const editableComment = async ( comment, id ) => {

        // editable comments
        if ( this.user && this.user.isLoggedIn() && ( this.user.getValue().key === comment.user )) {
          let old_elem = '';

          let edit_elem = $.html( this.html.edit, {
            edit: async ( event ) => {
              old_elem = event.target.closest('.panel');

              const instance = await this.editor.start( { root: event.target.closest('.comment-overview') } );
              instance.get().root.innerHTML = comment.content;
              instance.get().focus();

              instance.element.querySelector( '.ql-editor' ).addEventListener( 'blur', async ()  => {
                const new_comment = instance.get().getText().trim();
                const old_comment = comment.content;
                if( new_comment === '' ) {
                  const modal = await this.modal.start( {
                    modal_title: " Delete Message",
                    modal_content: "Are you sure you want to delete this message?",
                    footer: [
                      { "caption": "Yes", "style": "success", "onclick": async () => {
                          data.comments.splice( data.comments.indexOf( comment ), 1 );
                          // update dataset for rendering
                          await this.data.store.set( data );
                          comment_elem.remove();
                          modal.close();
                        }},
                      { "caption": "No", "style": "danger", "onclick": async () => { modal.close(); await renderComment( comment, id ); } }
                    ],
                  } );
                }
                else {
                  data.comments[ data.comments.indexOf( comment ) ].content = new_comment;

                  this.updateComment( old_elem.id );

                  this.logger && this.logger.log( 'edit', { 'old': old_comment, 'new': new_comment });

                }

              } );
            }
          } );

          $.setContent( comment_elem.querySelector( '.edit' ), edit_elem );

        }
      };

      const renderVoting = async ( comment ) => {
        const voting = {
          root: comment_elem.querySelector( '.voting-area' ),
          'data.key': comment.voting,
          onvote: ( event ) => { return event.user !== comment.user; },
          user: [ 'ccm.instance', this.user.component.url, JSON.parse( this.user.config ) ]
        };

        if ( this.user && this.user.isLoggedIn() && ( comment.user === this.user.getValue().key ) ) voting.user = '';
        await this.voting.start( voting );
      };

      const renderEditor = async () => {

        const editor_elem = $.html( this.html.editor, {
          submit_button_label: this.submit_button_label ? this.submit_button_label: 'Senden',
          new_comment: async ( event ) => {
            event.preventDefault();
            this.user && await this.user.login( this.start );
            await newComment();
            editor.get().setContents([{ insert: '\n' }]);  //clear editor
          }
        } );

        editor  = await this.editor.start( { root: editor_elem.querySelector( '#editor' ) } );
        $.setContent( main_elem.querySelector( '#new-comment' ), editor_elem );

      };

      const newComment = async () => {
        const comment  = editor.get().root.innerHTML.trim();
        if ( comment === "" ) return;

        let new_data = {
          "content": comment,
          "user": this.user.getValue().key,
          "user_icon": this.user.getValue().picture ? this.user.getValue().picture: this.user_icon,
          "user_name": this.user.getUsername(),
          "date": moment().format()
        };

        if ( this.voting ) new_data.voting = this.data.key + '_' + $.generateKey();

        data.comments.push( new_data );

        // update dataset for rendering => (re)render accepted answer
        this.data.store.set( data );

        // rerender comments
        await renderComments( data );

        if ( this.logger ) {
          new_data = $.clone( new_data );
          delete data.user;
          this.logger.log( 'create', $.clone( new_data ) );
        }
      }
    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
