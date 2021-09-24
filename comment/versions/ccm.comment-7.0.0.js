/**
 * @overview ccmjs-based web component for commentary
 * @author Tea Kless <tea.kless@web.de> 2020
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version 7.0.0
 * @changes
 * version 7.0.0 (22.09.2021): reimplementation by akless
 */

( () => {
  const component = {
    name: 'comment',
    version: [ 7, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.4.4.js',
    config: {
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap.css",
          "https://ccmjs.github.io/tkless-components/comment/resources/styles.css"
        ],
        "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap-icons.css",
        { "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap-fonts.css", "context": "head" },
      ],
      "data": { "store": [ "ccm.store" ], "key": {} },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.6.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/tkless-components/comment/resources/templates.mjs" ],
      "libs": [ "ccm.load",
        "https://ccmjs.github.io/tkless-components/libs/dayjs/dayjs.min.js",
        "https://ccmjs.github.io/tkless-components/libs/dayjs/relativeTime.min.js"
      ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "picture": "https://ccmjs.github.io/tkless-components/comment/resources/user.svg",
      "controls": {
        "answer": true,
        "delete": true,
        "dislike": true,
        "edit": true,
        "heart": true,
        "like": true,
        "recycle": true,
        "report": true,
        "sort": true
      },
      "sort": true,  // true: sort by date, false: sort by rating
      "text": {
        "answer": "ANSWER",
        "answers": "Show %d Answers",
        "comments": "%d Comments",
        "delete": "Delete this comment",
        "deleted": "(deleted)",
        "dislike": "I don't like this comment",
        "edit": "Edit this comment",
        "heart": "I really love this comment",
        "like": "I like this comment",
        "picture": "User Picture",
        "recycle": "Undo the deletion of the comment",
        "report": "Report this comment as inappropriate",
        "sort_by_date": "Sort by Date",
        "sort_by_rating": "Sort by Rating",
        "submit": "Submit",
        "updated": "(updated)",
        "write_answer": "Write an answer...",
        "write_comment": "Write a comment..."
      },
      "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js" ]
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * contains all relevant commentary data
       * @type {Object}
       */
      let data;

      /**
       * when the instance is created, when all dependencies have been resolved and before the dependent sub-instances are initialized and ready
       * @returns {Promise<void>}
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // listen to login/logout events => update content
        this.user && ( this.user.onchange = render );

        // listen to datastore changes => update content
        this.data.store.onchange = async comment => render( data[ comment.key ] = comment );

        // add plugin to dayjs library
        dayjs.extend( window.dayjs_plugin_relativeTime );

        // convert unique key for app state data to query
        if ( !$.isObject( this.data.key ) ) this.data.key = { app: this.data.key };

      };

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // load all relevant commentary data
        data = await $.dataset( this.data );

        // separate commentary data in comments, answers and ratings
        const result = { comments: {}, answers: {}, ratings: {} };
        data.forEach( dataset => {
          if ( !dataset.comments )  // is comment or answer data? => set initial ratings
            dataset.rating = { like: {}, dislike: {}, heart: {}, report: {} };
          result[ dataset.comments ? 'ratings' : ( dataset.answer ? 'answers' : 'comments' ) ][ dataset.key ] = dataset;
        } );
        data = result;

        // transfer rating data to comments and answers
        Object.values( data.ratings ).forEach( user => {
          Object.keys( user.comments ).forEach( key => {
            const comment = data[ key.split( ',' ).length === 2 ? 'comments' : 'answers' ][ key ];
            const rating = user.comments[ key ];
            if ( rating.like === true ) comment.rating.like[ user.user ] = true;
            if ( rating.like === false ) comment.rating.dislike[ user.user ] = true;
            if ( rating.heart ) comment.rating.heart[ user.user ] = rating.heart;
            if ( rating.report ) comment.rating.report[ user.user ] = rating.report;
          } );
        } );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', this.getValue() );

        // render content
        render();

        // render user login/logout button
        this.user && $.append( this.element.querySelector( 'header section:last-child' ), this.user.root );

      };

      /**
       * returns app state
       * @returns {Object} current state of all relevant commentary data (comments, answers and ratings)
       */
      this.getValue = () => $.clone( data );

      /**
       * renders/updates app content in webpage area
       * @type {Function}
       */
      const render = () => this.html.render( this.html.main( this, events ), this.element );

      /**
       * contains all event handlers
       * @type {Object.<string,Function>}
       */
      const events = {

        /** when the button to change the sorting is clicked */
        onSort: () => {
          this.sort = !this.sort;   // change sorting of comments (sort by date or sort by rating)
          render();                 // update app content
        },

        /** when the button to add a new comment is clicked */
        onAddComment: async event => {

          // no user instance? => abort
          if ( !this.user ) return;

          // get textarea value
          const element = event.target.closest( '[ data-key ]' );
          const key = element && element.dataset.key;
          const textarea = this.element.querySelector( ( key ? '[data-key="'+key+'"] ' : '' ) + 'textarea' );
          const value = textarea.value.trim();

          // no value? => abort
          if ( !value ) return;

          // login user if not logged in and get user data
          const user = await this.user.login();

          // define unique key of new comment
          const comment_key = key && key.split( ',' )[ 1 ] || $.generateKey();

          // define initial data of new comment
          const comment = {
            key: [ this.data.key.app, comment_key ],
            app: this.data.key.app,
            comment: comment_key,
            picture: user.picture,
            user: this.user.getUsername(),
            text: value,
            _: {
              creator: user.key,
              realm: this.user.getRealm(),
              access: { get: 'all', set: 'creator', del: 'creator' }
            }
          };

          // new comment is an answer to a comment? => add unique key of answer
          key && comment.key.push( comment.answer = $.generateKey() );

          try {

            // create new comment in datastore (on error: abort without updated frontend)
            await save( comment );

            // add initial rating data to new comment
            comment.rating = { like: {}, dislike: {}, heart: {}, report: {} };

            // add new comment in local data
            data[ key ? 'answers' : 'comments' ][ comment.key.join( ',' ) ] = comment;

            // clear and hide textarea
            textarea.value = '';
            const parent = data.comments[ key ] || data.answers[ key ];
            if ( parent ) parent.answer_input = parent.open_answer = '';

            // update app content
            render();

          } catch ( e ) {}

        },

        /** when the 'Edit' button of a comment is clicked */
        onEdit: async event => {

          // check condition for editable comment
          if ( !this.user || !this.controls.edit ) return;

          // login user if not logged in and get user data
          const user = await this.user.login();

          // get comment data
          const element = event.target.closest( '[ data-key ]' );
          const key = element.dataset.key;
          const comment = data.comments[ key ] || data.answers[ key ];

          // check condition for editable comment
          const is_creator = comment._ && user.key === comment._.creator;
          if ( !is_creator ) return;

          // remove 'Edit' button
          $.remove( event.target );

          // make comment text editable
          const textarea = $.html( {
            tag: 'textarea', class: 'form-control', rows: 2,
            onfocusout: async event => {
              const value = event.target.value.trim();
              if ( value === comment.text ) return render();
              comment.text = value;
              try { await save( comment ); render(); } catch ( e ) {}
            }
          } );
          textarea.value = comment.text;
          $.replace( element.querySelector( '.text' ), textarea );
          textarea.focus();

        },

        /** when the 'Delete' button of a comment is clicked */
        onDelete: async event => {

          // no user instance? => abort
          if ( !this.user ) return;

          // login user if not logged in and get unique user key
          const user = ( await this.user.login() ).key;

          // get comment data
          const key = event.target.closest( '[ data-key ]' ).dataset.key;
          const comment = data.comments[ key ] || data.answers[ key ];

          // check condition for deletable comment
          const is_creator = comment._ && user === comment._.creator;
          if ( comment.deleted || !is_creator ) return;

          // mark comment as deleted
          comment.deleted = true;

          // update comment in datastore (on error: abort without updated frontend)
          try { await save( comment ); render(); } catch ( e ) {}

        },

        /** when the 'Recycle' button of a comment is clicked */
        onRecycle: async event => {

          // no user instance? => abort
          if ( !this.user ) return;

          // login user if not logged in and get unique user key
          const user = ( await this.user.login() ).key;

          // get comment data
          const key = event.target.closest( '[ data-key ]' ).dataset.key;
          const comment = data.comments[ key ] || data.answers[ key ];

          // check condition for recyclable comment
          const is_creator = comment._ && user === comment._.creator;
          if ( !comment.deleted || !is_creator ) return;

          // do not mark the comment as deleted anymore
          comment.deleted = false;

          // update comment in datastore (on error: abort without updated frontend)
          try { await save( comment ); render(); } catch ( e ) {}

        },

        /** when the 'Like' button of a comment is clicked */
        onLike: event => doRating( event.target.closest( '[ data-key ]' ).dataset.key, 'like' ),

        /** when the 'Unlike' button of a comment is clicked */
        onDislike: event => doRating( event.target.closest( '[ data-key ]' ).dataset.key, 'dislike' ),

        /** when the 'Heart' button of a comment is clicked */
        onHeart: event => doRating( event.target.closest( '[ data-key ]' ).dataset.key, 'heart' ),

        /** when the 'Report' button of a comment is clicked */
        onReport: event => doRating( event.target.closest( '[ data-key ]' ).dataset.key, 'report' ),

        /** when the 'Answer' button is clicked */
        onAnswerButton: event => {

          // check condition for answerable comment
          if ( !this.controls.answer || !this.user ) return;

          // get comment data
          const key = event.target.closest( '[ data-key ]' ).dataset.key;
          const comment = data.comments[ key ] || data.answers[ key ];

          // show textarea for entering an answer to the comment
          comment.open_answer = !comment.open_answer;

          // update app content
          render();

        },

        /** when the input of an answer has changed */
        onAnswerInputChange: event => {

          // prevent the input value of the text area from being lost
          const element = event.target.closest( '[ data-key ]' );
          if ( !element ) return;
          const comment = data.comments[ element.dataset.key ] || data.answers[ element.dataset.key ];
          comment.answer_input = event.target.value;

        },

        /** when the answers to a comment should be shown/hidden */
        onThread: async event => {

          // get comment data
          const key = event.target.closest( '[ data-key ]' ).dataset.key;
          const comment = data.comments[ key ] || data.answers[ key ];

          // open/close thread with answers to the comment
          comment.open_thread = !comment.open_thread;

          // update app content
          render();

        }

      };

      /**
       * rates a comment
       * @param {string} key - dataset key of the comment
       * @param {string} type - 'like', 'dislike', 'heart' or 'report'
       * @returns {Promise<void>}
       */
      const doRating = async ( key, type ) => {

        // no user instance? => abort
        if ( !this.user ) return;

        // login user if not logged in and get unique user key
        const user = ( await this.user.login() ).key;

        // get comment data
        const comment = data.comments[ key ] || data.answers[ key ];

        // check condition for ratable comment
        const is_creator = comment._ && user === comment._.creator;
        if ( !this.controls[ type ] || is_creator ) return;

        // get rating data (or use initial rating data if not exists)
        const rating = data.ratings[ this.data.key.app + ',' + user ] || {
          key: [ this.data.key.app, user ],
          app: this.data.key.app,
          user: user,
          comments: {},
          _: {
            creator: user,
            realm: this.user.getRealm(),
            access: { get: 'all', set: 'creator', del: 'creator' }
          }
        };

        // update rating data
        if ( !rating.comments[ key ] ) rating.comments[ key ] = {};
        const ratings = rating.comments[ key ];
        switch ( type ) {
          case 'like': ratings.like = ratings.like ? null : true; break;
          case 'dislike': ratings.like = ratings.like === false ? null : false; break;
          case 'heart': ratings.heart = !ratings.heart; break;
          case 'report': ratings.report = !ratings.report; break;
        }

        try {

          // create/update rating data in datastore (on error: abort without updated frontend)
          await this.data.store.set( rating );

          // perform rating in local comment data
          if ( comment.rating[ type ][ user ] )
            delete comment.rating[ type ][ user ];
          else {
            comment.rating[ type ][ user ] = true;
            if ( type === 'like' || type === 'dislike' )
              delete comment.rating[ type === 'like' ? 'dislike' : 'like' ][ user ];
          }

          // update app content
          render();

        } catch ( e ) {}

      };

      /**
       * updates a comment in datastore
       * @param {Object} comment - comment dataset
       * @returns {Promise<*>}
       */
      const save = async comment => {

        // remove only local needed properties
        comment = $.clone( comment );
        delete comment.rating;
        delete comment.answer_input;
        delete comment.open_thread;

        // update comment in datastore
        return this.data.store.set( comment );

      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();