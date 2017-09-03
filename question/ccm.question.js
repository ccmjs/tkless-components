/**
 * @overview ccm component for real time  Forum
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 */

( function () {

  var component  = {

    name: 'question',

    ccm: 'https://akless.github.io/ccm/ccm.js',

    config: {
      templates: {
        "main": {
          "class": "container-fluid",
          "inner": [
            {
              "id": "answers_view",
              "inner": [
                {
                  "class": "question",
                  "inner": [
                    {
                      "class": "row",
                      "inner": {
                        "class": "question-title col-md-10",
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
                      }
                    },
                    {
                      "class": "row",
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
                                "%question%",
                                {
                                  "tag": "footer",
                                  "inner": "footer"
                                }
                              ]
                            }
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "tag": "hr"
                },
                {
                  "id": "answers"
                },

                {
                  "id": "new-answer",
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
                  "class": "voting-area col-md-1 col-sx-12",
                  "inner": [
                    {
                      "class": "voting-overview col-sx-6 col-md-12"
                    },
                    {
                      "class": "answer-accepted col-sx-6 col-md-12",
                      "inner": {
                        "tag": "span",
                        "class": "glyphicon glyphicon-ok",
                        "oncklick": "%accepted%"
                      }
                    }
                  ]
                },
                {
                  "class": "answer-overview col-md-11 col-sx-12",
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
        }
      },

      data: {
        store: [ 'ccm.store', 'https://tkless.github.io/ccm-components/question/question_datastore.js' ],
        key: "1"
      },
      user:  [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/ccm.user.min.js', { logged_in: true, 'guest.user': 'tmeskh2s' } ],
      style: [ 'ccm.load', '../question/style.css' ],
      editor: [ 'ccm.component', '../editor/ccm.editor.js',
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
      voting: [ "ccm.component", "../voting/ccm.voting.js", {
        data: {
          store: [ 'ccm.store', '../voting/voting_datastore.js' ]
        }
      } ],
      dateTime: [ 'ccm.load', 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js' ],
      bootstrap: [ 'ccm.load', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
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

        self.ccm.helper.dataset( self.data.store, self.data.key, function ( question ) {
          dataset = question;
        } );


        renderQuestion();
        renderAnswers();
        renderEditor();

        function renderQuestion() {

          self.ccm.helper.setContent( self.element, self.ccm.helper.html( self.templates.main, {
            title: dataset.title,
            signatur: "posted " + dataset.date,
            question: dataset.content,
            new_answer: function () { newAnswer(); }
          }));

          if ( !self.user || !self.user.isLoggedIn() )
            return;

          var user = self.user.data().user;

          if ( user === dataset.user ) {
            self.voting.instance( dataset.voting, function (instance) {
              var voting_elem = self.ccm.helper.html( self.templates.voting_overview, {
                get_voting: instance.getVoting()
              } );

              self.element.querySelector( '.voting' ).appendChild( voting_elem );
            } );
          }
          else
            renderVoting( self.element.querySelector( '.voting' ), dataset.voting );

        }

        function renderAnswers() {
          self.element.querySelector( '#answers').innerHTML = '';

          dataset.answers.map ( renderAnswer );

          function answerAccepted( answer ) {

            if ( self.user.data().user === dataset.user ) return;

            // has user already accepted ?
            if ( answer.accepted === true )
              answer.accepted = '';
            // not accepted
            else {
              self.element.querySelector( '.glyphicon-ok' ).classList.add( 'accepted' );
              answer.accepted = true;
            }

            // update dataset for rendering => (re)render accepted answer
            self.data.store.set( dataset, function () { renderAnswers() } );
          }
        }

        function renderAnswer( answer ) {

          // generate on-the-fly element
          var answer_elem = self.ccm.helper.html( self.templates.answer, {
            answer: answer.content,
            signatur: answer.user + ' ' + answer.date,
            accepted: function () { answerAccepted( answer ); }
          } );

          // prepend element to DOM
          self.ccm.helper.prepend( self.element.querySelector( '#answers' ), answer_elem );

          // render accepted answer green
          if ( answer.accepted === true )
            self.element.querySelector( '.glyphicon-ok' ).classList.add( 'accepted' );

          renderVoting( answer_elem.querySelector( '.voting-overview' ), answer.voting );
        }

        function renderEditor() {
          if (!self.user || !self.user.isLoggedIn()) return;

          var user = self.user.data().user;

          self.editor.start( { root: self.element.querySelector( '#editor' ) }, function (instance) {
            if (user !== dataset.user) {
              editor = instance;
            }
            else {
              editor = instance;
              editor.get().enable( false );
            }
          } );
        }

        function renderVoting( element, voting ) {
          if ( !self.user ) return;
          self.voting.start( voting, function ( voting_inst ) {
            element.appendChild( voting_inst.root );
          } );

        }

        function newAnswer() {

          self.user.login( function () {
            var user = self.user.data().user;

            // only not question author can be able to create new answer
            if ( user !== dataset.user ) {
              dataset.answers.push(
                {
                  "date": getDateTime(),
                  "user": user,
                  "content": editor.get().root.innerHTML,
                  "voting": { }
                }

              );

              // update dataset for rendering => (re)render accepted answer
              self.data.store.set( dataset, function () { renderAnswers(); } );
            }

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
      };
    }
  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );
