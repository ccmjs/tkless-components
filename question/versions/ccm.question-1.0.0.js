/**
 * @overview ccm component for real time  Forum
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 */

( function () {

  var component  = {

    name: 'question',
    version:[ 1,0,0 ],

    ccm: {
      url: 'https://akless.github.io/ccm/version/ccm-10.0.0.min.js',
      integrity: 'sha384-AND32Wbfnmb3f2vRMHkXSJpi81oFmy3eO1FbMHb5i2XOzwg0z+T1de180FUH1Tjt',
      crossorigin: 'anonymous'
    },

    config: {
      templates: {
        "main": {
          "class": "container-fluid",
          "inner": [
            {
              "id": "answers-view",
              "inner": [
                {
                  "class": "question row",
                  "inner": [
                    {
                      "class": "question-title col-md-12",
                        "inner": {
                          "tag": "h3",
                          "inner": [
                             "%title% ",
                            {
                              "tag": "small",
                              "inner": "%signatur%"
                            }
                          ]
                        }
                    },
                    {
                      "class": "col-md-12",
                      "inner": [
                        {
                          "class": "voting col-md-1"
                        },
                        {
                          "class": "question col-md-11",
                          "inner": {
                            "tag": "blockquote",
                            "inner": {
                              "tag": "p",
                              "inner": [
                                "%question%"
                              ]
                            }
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "answers"
                },
                {
                  "id": "new-answer",
                }
              ]
            }
          ]
        },

        "answer": {
          "inner": [
            {
              "class": "answer row",
              "inner": [
                {
                  "class": "voting-area col-md-1 col-sm-1",
                  "inner": [
                    {
                      "class": "voting-overview"
                    },
                    {
                      "class": "answer-accepted",
                      "inner": {
                        "tag": "span",
                        "class": "glyphicon glyphicon-ok",
                        "oncklick": "%accepted%"
                      }
                    }
                  ]
                },
                {
                  "class": "answer-overview col-md-11 col-sm-11",
                  "inner": [
                    "%answer%",
                    {
                      "tag": "blockquote",
                      "class": "blockquote-reverse",
                      "inner": {
                        "tag": "footer",
                        "inner": "%signatur%"
                      }
                    }
                  ]
                }
              ]
            },
            {
              "tag": "hr"
            }
          ]

        },

        "new_answer": {
          "inner": [
            {
              "tag": "h4",
              "inner": "Your Answer"
            },
            {
              "id": "editor"
            },
            {
              "id": "new",
              "class": "row",
              "inner": {
                "tag": "button",
                "class": "btn btn-primary",
                "type": "submit",
                "inner": "Post Answer",
                "onclick": "%new_answer%"
              }
            }
          ]
        }
      },
      data: { store: [ 'ccm.store' ] },
      editor: [ 'ccm.component', 'https://tkless.github.io/ccm-components/editor/versions/ccm.editor-1.0.0.js',
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
          ]
        }
      ],
      voting: [ 'ccm.component', 'https://tkless.github.io/ccm-components/voting/versions/ccm.voting-1.0.0.js' ],
      libs: [ 'ccm.load',
        { context: 'head', url: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css' },
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js',
        'https://tkless.github.io/ccm-components/question/resources/default.css'
      ]
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

      this.ready = function ( callback ) {
        if ( self.user )
          self.user.addObserver( self.index, function ( event ) {
            if ( event ) self.start();
          });
        callback();
      };

      this.start = function ( callback ) {

        self.ccm.helper.dataset( self.data.store, self.data.key, function ( question ) {

          dataset = question;
          if ( !dataset.answers ) dataset.answers = [];

          self.ccm.helper.setContent( self.element, self.ccm.helper.html( self.templates.main, {
            title: dataset.title,
            signatur: dataset.user + '&nbsp;'+ moment( dataset.date ).fromNow(),
            question: dataset.content
          }));

          renderVoting( self.element.querySelector( '.voting' ), dataset.voting || 'question_' + dataset.key, false );

          renderAnswers();

          renderEditor();

          function renderAnswers() {
            self.element.querySelector( '#answers').innerHTML = '';

            if ( dataset.answers ) dataset.answers.map ( renderAnswer );

            function renderAnswer( answer ) {

              // generate on-the-fly element
              var answer_elem = self.ccm.helper.html( self.templates.answer, {
                answer: answer.content,
                signatur: answer.user + ' ' + moment( answer.date).fromNow(),
                accepted: function () {
                  answerAccepted( answer );
                }
              });

              // prepend element to DOM
              self.ccm.helper.prepend( self.element.querySelector( '#answers' ), answer_elem );

              // render accepted answer green
              if (answer.accepted === true)
                self.element.querySelector( '.glyphicon-ok' ).classList.add( 'accepted' );

              renderVoting( answer_elem.querySelector( '.voting-overview' ), answer.voting, answer );
            }
          }

          function renderEditor() {

            if ( !self.user ) return;

            var editor_elem = self.ccm.helper.html( self.templates.new_answer, {
              new_answer: function () { newAnswer(); }
            } );

            self.user.login( function () {
              if ( self.user.data().name === dataset.user ) return;

              self.editor.start( function ( instance ) {

                console.log( '!!! editor');

                editor_elem.querySelector( '#editor' ).appendChild( instance.root );
                editor = instance;
                self.element.querySelector( '#new-answer' ).appendChild( editor_elem );
              } );
            } );

          }

          function renderVoting( element, voting, questionAnswer ) {
            if ( !self.user ) return;
            voting = { 'data.key': voting };

            if ( self.user && self.user.isLoggedIn() && ( ( questionAnswer ? questionAnswer : dataset ).user === self.user.data().name ) )
              voting.user = '';

            self.voting.start( voting, function ( inst ) {
              element.appendChild( inst.root );
            } );

          }

          function newAnswer() {

            self.user.login( function () {
              var user = self.user.data().name;

              // only not question author can be able to create new answer
              if ( user !== dataset.user ) {
                dataset.answers.push(
                  {
                    "date": moment().format(),
                    "user": user,
                    "content": editor.get().root.innerHTML.trim(),
                    "voting": dataset.voting + '_answer_' + ( dataset.answers.length + 1 )
                  }
                );

                // update dataset for rendering => (re)render accepted answer
                self.data.store.set( dataset, function () { renderAnswers(); } );
              }

            } );
          }

          if ( callback ) callback();

        } );
      };
    }
  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );
