/**
 * @overview ccm component for real time  Forum
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 */

( function () {

  const component = {

    name: 'forum',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

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

      data: { store: [ "ccm.store", {} ] },
      editor: [ 'ccm.component', '../editor/ccm.editor.js',
        { 'settings.modules': {
            syntax: true,
            toolbar: [
              [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
              ['bold', 'italic', 'underline'],                  // toggled buttons
              ['blockquote', 'code-block'],

              [{ 'header': 1 }, { 'header': 2 }],               // custom button values
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
              [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

              [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
              [{ 'align': [] }]
            ]
          }
        }
      ],
      question: [ 'ccm.component', '../question/ccm.question.js' ],
      css: [ 'ccm.load',
        { context: 'head', url: '../../ccm-components/libs/bootstrap/css/font-face.css' },
        '../../ccm-components/libs/bootstrap/css/bootstrap.css',
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js',
        '../forum/resources/default.css'
      ]
    },

    Instance: function () {

      let self = this;
      let $;

      this.start = async () => {
        $ = self.ccm.helper;

        let dataset = await $.dataset( self.data );
        let editor;

        if( !dataset.questions ) dataset.questions = [];

        $.setContent( self.element, $.html( self.templates.main, {
          for:   "title",
          inner: "Title",
          id:    "title",
          type:  "text",
          value: "What is your Question ?",
          submit: event => { event.preventDefault(); newQuestion(); }
        } ) );

        renderQuestions();
        renderEditor();

        function renderQuestions() {

          dataset.questions.map( renderQuestion );

          async function renderQuestion( question_key ) {

            // start question instance
            let question_instance = await self.question.start( { 'data.key': question_key } );

            // get question data of launched question instance
            let question_data = await question_instance.data.store.get( question_instance.data.key );

            // get voting instance of question instance
            let voting_value = ( await question_instance.voting.instance( question_data.voting ) ).getValue();

            self.element.querySelector( '#questions-list' ).appendChild( $.html( self.templates.question, {
              title:    question_data.title,
              signatur: question_data.user + ' &nbsp; ' + moment( question_data.date ).fromNow(),
              votes:    voting_value,
              answers:  question_data.answers.length,
              render_answers: function () {

                self.element.querySelector( '#questions-view' ).style.display = 'none';

                $.setContent( self.element.querySelector( '#answers-view' ), self.ccm.helper.html( self.templates.answers, {
                  render_questions: () => {
                    self.element.querySelector( '#answers-view' ).innerHTML = '';
                    self.element.querySelector( '#questions-view' ).style.display = 'block';
                  }
                } ) );

                self.element.querySelector( '#answers' ).appendChild( question_instance.root );
              }
            } ) );

          }
        }

        async function renderEditor() {
         editor = await self.editor.start();
         self.element.querySelector( '#editor-container' ).appendChild( editor.root );
      }

        async function newQuestion() {

          if ( !self.user ) return;

          await self.user.login();

          // is there the user input in editor?
          if ( editor.get().getLength() <= 1 )
            return alert( 'Give Title and Text in the fields!!!' );


          let question_key = "forum_" + dataset.key + "_" + ( dataset.questions.length + 1 );

          let new_question_data = {
            "key": question_key,
            "date": moment().format(),
            "user": self.user.data().name,
            "title": self.element.querySelector( 'input[ id = title ]' ).value,
            "content": editor.get().root.innerHTML,
            "voting": "question_" + dataset.key + "_" + ( dataset.questions.length + 1 ),
            "answers": []
          };

          const new_question_inst = await self.question.instance();

          await new_question_inst.data.store.set( new_question_data );
          dataset.questions.push( question_key );
          await self.data.store.set( dataset );
          await self.start();
        }
      };
    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();