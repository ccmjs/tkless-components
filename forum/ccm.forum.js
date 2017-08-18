/**
 * @overview ccm component for real time  Forum
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 */

( function () {

  var filename = "ccm.forum.js";

  var ccm_version = '9.2.0';
  var ccm_url     = 'https://akless.github.io/ccm/version/ccm-9.2.0.min.js';

  var component_name = 'forum';
  var component_obj  = {
    name: component_name,

    config: {
      templates: {
        "main": {
          "class": "container",
          "inner": [
            {
              "id": "questions-view",
              "inner":
                [
                  {
                    "id": "questions-list"
                  },
                  {
                    "tag": "hr"
                  },
                  {
                    "tag": "form",
                    "onsubmit": "%submit%",
                    "class": "form-horizontal",
                    "inner": [
                      {
                        "class": "form-group",
                        "id": "new-title",
                        "inner":
                          [
                            {
                              "tag": "label",
                              "class": "control-label col-sm-1",
                              "for": "%for%",
                              "inner": "%inner%"
                            },
                            {
                              "class": "col-sm-11",
                              "inner": {
                                "tag": "input",
                                "type": "%type%",
                                "class": "form-control",
                                "id":"%id%",
                                "placeholder": "%value%"
                              }
                            }
                          ]
                      },
                      {
                        "id": "editor",
                        "class": "form-group",
                        "inner": [
                          {
                            "tag":  "input",
                            "name": "new",
                            "type": "hidden"
                          },
                          {
                            "id": "editor-container"
                          }
                        ]
                      },
                      {
                        "id": "button",
                        "class": "form-group",
                        "inner": {
                          "class": "row",
                          "inner": {
                            "tag": "button",
                            "type": "submit",
                            "class": "btn btn-primary",
                            "inner": "Post new Question"
                          }
                        }
                      }
                    ]

                  }
                ]
            },
            {
              "id": "answers-view"
            }
          ]
        },

        "answers": {
          "inner": [
            {
              "tag": "ul",
              "class": "nav nav-tabs",
              "inner": [
                {
                  "tag": "li",
                  "class": "active",
                  "onclick": "%render_questions%",
                  "inner": { "tag": "a", "inner": "Questions" }
                }
              ]
            },
            {
              "id": "answers"
            }

          ]
        },

        "question": {
          "class": "question row",
          "inner": [
            {
              "class": "voting-overview col-md-2 text-center",
              "inner":
                [
                  {
                    "class": "row",
                    "inner": [
                      {
                        "class": "vote-sum col-md-6 col-xs-6",
                        "inner": "%votes%"
                      },
                      {
                        "class": "answer_sum col-md-6 col-xs-6",
                        "inner": "%answers%"
                      }
                    ]
                  },
                  {
                    "class": "row",
                    "inner": [
                      {
                        "class": "vote-label col-md-6 col-xs-6",
                        "inner": "votes"
                      },
                      {
                        "class": "vote-label col-md-6 col-xs-6",
                        "inner": "answers"
                      }
                    ]
                  }
                ]
            },
            {
              "class": "question-summery col-md-10",
              "onclick": "%render_answers%",
              "inner": {
                "tag": "blockquote",
                "inner":[
                  {
                    "tag": "p",
                    "class": "question_title",
                    "inner": "%title%"
                  },
                  {
                    "tag": "footer",
                    "class": "question_footer",
                    "inner": "%signatur%"
                  }
                ]
              }
            }
          ]
        }
      },

      data: {
        store: [ 'ccm.store', 'https://tkless.github.io/ccm-components/forum/forum_datastore.js' ],
        key: "demo"
      },
      user:  [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/ccm.user.min.js' ],
      style: [ 'ccm.load', 'https://tkless.github.io/ccm-components/forum/style.css' ],
      editor: [ 'ccm.component', 'https://tkless.github.io/ccm-components/editor/ccm.editor.js',
        { 'settings.modules.toolbar': [
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            ['bold', 'italic', 'underline'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'align': [] }]
        ] }
      ],
      question: [ 'ccm.component', 'https://tkless.github.io/ccm-components/question/ccm.question.js' ],
      new_question_conf: { data: { store: [ 'ccm.store' ] } },
      bootstrap: [ 'ccm.load', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css', { context: 'head', url: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css' } ]
    },

    Instance: function () {
      var self = this;
      var editor;
      var question;

      this.start = function (callback) {

        self.ccm.helper.dataset(self.data.store, self.data.key, function ( dataset ) {

          self.ccm.helper.setContent( self.element, self.ccm.helper.protect( self.ccm.helper.html( self.templates.main, {
            for:   "title",
            inner: "Title",
            id:    "title",
            type:  "text",
            value: "What is your Question ?",
            submit: function ( event ) { console.log( "huhu" ); event.preventDefault(); newQuestion(); }
          } ) ) );

          renderQuestions();
          renderEditor();

          function renderQuestions() {

            dataset.questions.map( renderQuestion );

            function renderQuestion( question_conf ) {

              // start question instance
              self.question.start( question_conf , function ( question_instance ) {

                // get question data of lunched question instance
                question_instance.data.store.get( question_instance.data.key, function ( question_data ) {

                  // get voting instance of question instance
                  question_instance.voting.instance( question_data.voting, function ( voting_instance ) {
                    question = question_data;
                    self.element.querySelector( '#questions-list' ).appendChild( self.ccm.helper.html( self.templates.question, {
                      title:    question_data.title,
                      signatur: question_data.date,
                      votes:    voting_instance.getVoting(),
                      answers:  question_data.answers.length,
                      render_answers: function () {
                        self.element.querySelector( '#questions-view' ).style.display = 'none';

                        self.ccm.helper.setContent( self.element.querySelector( '#answers-view' ), self.ccm.helper.html( self.templates.answers, {
                          render_questions: function () {
                            self.element.querySelector( '#answers-view' ).innerHTML = '';
                            self.element.querySelector( '#questions-view' ).style.display = 'block';
                          }
                        } ) );

                        self.element.querySelector( '#answers' ).appendChild( question_instance.root );
                      }
                    } ) );

                  } );

                } );
              } )
            }
          }

          function renderEditor() {
            self.editor.start( { root: self.element.querySelector( '#editor-container' ) }, function ( instance ) {
              editor = instance;
            } );
          }

          function newQuestion() {
            if ( !self.user ) return;

            self.user.login( function () {
              var user = self.user.data().user;

              var question_title = self.element.querySelector( 'input[ id = title ]' ).value;

              var new_question_data = {
                "date": getDateTime(),
                "user": user,
                "title": question_title,
                "content": editor.get().root.innerHTML,
                "voting": { },
                "answers": [ ]
              } ;

              var new_question_conf = self.ccm.helper.clone( self.new_question_conf );

              self.question.instance( new_question_conf, function ( new_question_inst ) {

                new_question_inst.data.store.set( new_question_data, function ( created_qustion_data ) {
                  new_question_conf.data.key = created_qustion_data.key;
                  dataset.questions.push( new_question_conf );
                  self.data.store.set( dataset, function () { self.start(); } );
                } );
              } );

            } );

          }

          function getDateTime() {

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

            return dd + ' ' + monat[ mm].substring(0, 3) + '. '  + yyyy + ' ' + hour + ':' + min;

          }

          if ( callback ) callback();

        } );
      };
    }
  };

  if ( window.ccm && window.ccm.files ) window.ccm.files[ filename ] = component_obj;
  var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
  if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
  function register() { ccm[ ccm_version ].component( component_obj ); }
}() );
