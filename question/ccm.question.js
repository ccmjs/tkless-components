/**
 * @overview ccm component for real time  Forum
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 * TODO sorting questions befor rendering
 */

( function () {

  const component = {

    name: 'question',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {
      templates: {
        "main": {
          "class": "container-fluid",
          "inner": [
            {
              "id": "answers-view",
              "inner": [
                {
                  "class": "question row mb-5",
                  "inner": [
                    {
                      "class": "question-title",
                        "inner": {
                          "tag": "h2",
                          "inner": [
                             "%title% ",
                            {
                              "class": "badge badge-warning",
                              "inner": "%signature%"
                            }
                          ]
                        }
                    },
                    {
                      "class": "d-flex flex-flow align-items-center",
                      "inner": [
                        {
                          "class": "voting mr-2"
                        },
                        {
                          "class": "question",
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
                  "inner": [
                    {
                      "id": "section",
                      "class": "text-success text-monospace",
                      "inner":"ANSWERS",
                    },
                    {
                      "tag": "hr"
                    }
                  ]
                },
                {
                  "id": "answers",
                },
                {
                  "id": "new-answer",
                }
              ]
            }
          ]
        },

        "answer": {
          "class": "answer d-flex flex-flow align-items-top mb-3",
          "inner": [
            {
              "class": "voting-area mr-4  d-flex flex-column",
              "inner": [
                {
                  "class": "voting-overview"
                },
                {
                  "class": "answer-accepted",
                  "inner": {
                    "tag": "span",
                    "class": "glyphicon glyphicon-ok",
                    "onclick": "%accepted%"
                  }
                }
              ]
            },
            {
              "class": "answer-overview",
              "inner": [
                "%answer%",
                {
                  "tag": "blockquote",
                  "id": "signature",
                  "class": "blockquote text-monospace mt-1",
                  "inner": {
                    "tag": "footer",
                    "class": "blockquote-footer",
                    "inner": "%signature%"
                  }
                }
              ]
            }
          ]
        },

        "new_answer": {
          "inner": [
            {
              "id": "new-answer-heading",
              "class": "text-monospace text-success",
              "inner": "YOUR ANSWER"
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
      data: { store: [ "ccm.store", {} ] },
      editor: [ 'ccm.component', '../editor/ccm.editor.js',
        { 'settings.modules.toolbar': [
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            ['bold', 'italic', 'underline'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'align': [] }]
          ]
        }
      ],
      voting: [ 'ccm.component', '../voting/ccm.voting.js' ],
      libs: [ 'ccm.load',
        { context: 'head', url: '../../ccm-components/libs/bootstrap-4/css/bootstrap.css' },
        '../../ccm-components/libs/bootstrap-4/css/bootstrap.css',
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js',
        '../question/resources/default.css'
      ]
    },

    Instance: function () {
      let self = this;
      let editor;
      let dataset;
      let $;

      this.init = async () => {
        $ = self.ccm.helper;

        // listen to change event of ccm realtime datastore => (re)render own content
        self.data.store.onchange = question => {
          dataset = question;
          self.start();
        };

        // listen to login/logout event => (re)render own content
        if ( self.user ) self.user.onchange = self.start;
      };

      this.start = async () => {

        dataset = await $.dataset( self.data );
        if ( !dataset.title && !dataset.content )
          return $.setContent( self.element, "No Question to display.");



        if ( !dataset.answers ) dataset.answers = [];

        await self.user.login();

        $.setContent( self.element, $.html( self.templates.main, {
          title: dataset.title,
          signature: dataset.user + '&nbsp;'+ moment( dataset.date ).fromNow(),
          question: dataset.content
        }));

        await renderVoting( self.element.querySelector( '.voting' ), dataset.voting || 'question_' + dataset.key, false );

        await renderAnswers();

        function renderAnswers() {
          self.element.querySelector( '#answers').innerHTML = '';

          if ( dataset.answers ) dataset.answers.map ( renderAnswer );

          async function renderAnswer( answer ) {

            // generate on-the-fly element
            let answer_elem = $.html( self.templates.answer, {
              answer: answer.content,
              signature: answer.user + ' ' + moment( answer.date).fromNow(),
              accepted: () => {
                answerAccepted( answer );
              }
            });

            // prepend element to DOM
            $.prepend( self.element.querySelector( '#answers' ), answer_elem );

            // render accepted answer green
            if ( answer.accepted === true )
              self.element.querySelector( '.glyphicon-ok' ).classList.add( 'accepted' );


            await renderVoting( answer_elem.querySelector( '.voting-overview' ), answer.voting, answer );

            await renderEditor();
          }
        }

        async function renderEditor() {
          $.setContent(self.element.querySelector( '#new-answer' ), '' );

          let editor_elem = $.html( self.templates.new_answer, {
            new_answer: async () => { await newAnswer(); }
          } );


          if ( self.user.data().user === dataset.user ) return;

          editor = await self.editor.start();
          editor_elem.querySelector( '#editor' ).appendChild( editor.root );
          $.setContent(self.element.querySelector( '#new-answer' ), editor_elem );

        }

        async function renderVoting( element, voting, questionAnswer ) {
          if ( !self.user ) return;
          voting = { 'data.key': voting };

          if ( self.user && self.user.isLoggedIn() && ( ( questionAnswer ? questionAnswer : dataset ).user === self.user.data().user ) )
            voting.user = '';

          const voting_inst = await self.voting.start( voting );
          $.setContent( element, voting_inst.root );

        }

        async function newAnswer() {

          await self.user.login();
          const user = self.user.data().user;

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
            await self.data.store.set( dataset );
            renderAnswers();
          }
        }
      };
    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
