/**
 * @overview ccm component for real time  Forum
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 */

( function () {

  var component = {

    name: 'forum',

    ccm: 'https://akless.github.io/ccm/ccm.js',

    config: {
      templates: {
        "main": {
          "class": "container-fluid",
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
                        "class": "form-group col-sm-12",
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
                                "required": true,
                                "class": "form-control",
                                "id":"%id%",
                                "placeholder": "%value%"
                              }
                            }
                          ]
                      },
                      {
                        "id": "editor",
                        "class": "form-group col-sm-12",
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
                        "class": "form-group col-sm-12",
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

      data: { store: [ 'ccm.store' ] },
      editor: [ 'ccm.component', '../editor/ccm.editor.js',
        { 'settings.modules.toolbar': [
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          ['bold', 'italic', 'underline'],                  // toggled buttons
          ['blockquote', 'code-block'],

          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'align': [] }]
        ] }
      ],
      question: [ 'ccm.component', '../question/ccm.question.js' ],
      css: [ 'ccm.load',
        { context: 'head', url: '../../ccm-components/lib/bootstrap/css/font-face.css' },
        '../../ccm-components/lib/bootstrap/css/bootstrap.css',
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js',
        '../forum/resources/default.css'
      ]
    },

    Instance: function () {

      var self = this;

      this.start = function (callback) {

        self.ccm.helper.dataset(self.data.store, self.data.key, function ( dataset ) {

          var editor;

          if( !dataset.questions ) dataset.questions = [];

          self.ccm.helper.setContent( self.element, self.ccm.helper.html( self.templates.main, {
            for:   "title",
            inner: "Title",
            id:    "title",
            type:  "text",
            value: "What is your Question ?",
            submit: function ( event ) { event.preventDefault(); newQuestion(); }
          } ) );

          renderQuestions();
          renderEditor();

          function renderQuestions() {

            dataset.questions.map( renderQuestion );

            function renderQuestion( question_key ) {

              // start question instance
              self.question.start( { 'data.key': question_key }, function ( question_instance ) {

                // get question data of launched question instance
                question_instance.data.store.get( question_instance.data.key, function ( question_data ) {

                  // get voting instance of question instance
                  question_instance.voting.instance( question_data.voting, function ( voting_instance ) {

                    self.element.querySelector( '#questions-list' ).appendChild( self.ccm.helper.html( self.templates.question, {
                      title:    question_data.title,
                      signatur: question_data.user + ' &nbsp; ' + moment( question_data.date ).fromNow(),
                      votes:    voting_instance.getValue(),
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
            self.editor.start( function ( instance ) {
              self.element.querySelector( '#editor-container' ).appendChild( instance.root );
              editor = instance;
            } );
          }

          function newQuestion() {

            if ( !self.user ) return;

            self.user.login( function () {
              // is there the user input in editor?
              if ( editor.get().getLength() <= 1 )
                alert( 'Give Title and Text in the fields!!!' );
                return;

              var question_key = "forum_" + dataset.key + "_" + ( dataset.questions.length + 1 );
              
              var new_question_data = {
                "key": question_key,
                "date": moment().format(),
                "user": self.user.data().name,
                "title": self.element.querySelector( 'input[ id = title ]' ).value,
                "content": editor.get().root.innerHTML,
                "voting": "question_" + dataset.key + "_" + ( dataset.questions.length + 1 ),
                "answers": []
              };

              self.question.instance( function ( new_question_inst ) {
                new_question_inst.data.store.set( new_question_data, function () {
                  dataset.questions.push( question_key );
                  self.data.store.set( dataset, function () { self.start(); } );
                } );
              } );

            } );

          }

          if ( callback ) callback();

        } );
      };
    }
  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );