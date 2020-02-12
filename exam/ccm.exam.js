/**
 * @overview ccm component for exam
 * @author Tea Kless <tea.kless@web.de> 2019
 * @license The MIT License (MIT)
 */

( function () {

  const component = {

    name: 'exam',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {
      "html": [ "ccm.load", "resources/templates.html" ],
      "libs": [ 'ccm.load', { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap-4/css/bootstrap.css" },
        "https://ccmjs.github.io/tkless-components/libs/bootstrap-4/css/bootstrap.css",
        {  "url": "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp", "type": "css" },
        {  "url": "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp", "type": "css", "context": "head" },
        "resources/default.css"
      ],
      "submit": [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.3.3.js" ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.0.1.mjs" ],
      "tasks": [
        {
          "type": "quiz",
          "title": "One of the answers is correct.",
          "content": {
            "text": "How many of these answers are correct?",
            "description": "Select the correct answer from the following answers.",
            "answers": [
              {
                "text": "one",
                "comment": "Because you can't choose more than one answer."
              },
              "two",
              "three"
            ],
            "input": "radio",
            "solution": 0
          }
        },
        {
          "type": "quiz",
          "title": "More than one answers are correct.",
          "content": {
            "text": "How many answers can be correct here?",
            "description": "Pay attention to the input field type.",
            "answers": [
              "absolutely none",
              {
                "text": "maximum of one",
                "comment": "Because you can choose more than one answer."
              },
              "more than one"
            ],
            "solution": [ true, false, true ]
          }
        },
        {
          "type": "quiz",
          "title": "Computational Task.",
          "content": {
              "text": "What is the solution to the following arithmetical tasks?",
              "description": "Please enter the solutions into the input fields.",
              "answers": [
                "=&nbsp; 1 + 1",
                "=&nbsp; 1 - 1",
                "=&nbsp;-1 - 1"
              ],
              "input": "number",
              "attributes": {
                "min": -2,
                "max": 2
              },
              "solution": [ 2, 0, -2 ]
            }
        },
        {
          "type": "quiz",
          "title": "HTML Task.",
          "content": {
              "text": "Which <code style='color:orange'>code</code> is written in the <b style='color:blue'>Java</b> programming language?",
              "description": "Quiz questions and answers may contain special characters.",
              "answers": [
                {
                  "text": "<span>Hello World</span>",
                  "escape": true,
                  "comment": "This code is written in HTML."
                },
                {
                  "text": "System.out.println(\"Hello World!\");",
                  "correct": true
                },
                {
                  "text": "console.log(\"Hello World!\");",
                  "comment": "This code is written in JavaScript."
                }
              ],
              "input": "radio",
              "random": true
            }
        }
      ],
      "modal": [ "ccm.component", "https://ccmjs.github.io/tkless-components/modal/versions/ccm.modal-2.0.0.js" ],
      "live_poll": {
        "url": "https://ccmjs.github.io/akless-components/live_poll/versions/ccm.live_poll-2.3.2.js",
        "store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "exam_live_poll" } ],
      },
      "handover_app": [ "ccm.component", "https://ccmjs.github.io/akless-components/handover_app/versions/ccm.handover_app-2.0.0.js" ],
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
        "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
        "logged_in": true
      } ]
    },

    Instance: function () {
      let $;
      let self = this;

      this.ready = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );

        if ( this.logger ) this.logger.log( 'ready', $.clone ( this ) );

      };

      this.start = async () => {

        let main_elem = $.html( self.html.main );
        renderTasks();
        main_elem.appendChild( $.html( self.html.new_item ) );
        $.setContent( self.element, main_elem );

        function renderTasks() {
          $.setContent( main_elem.querySelector( '.list-group' ), '' );
          for( let i = 0; i < self.tasks.length; i++ ) {
            const list_item = $.html( self.html.list_item, {
              title: self.tasks[ i ].title,
              id: "id_"+ i,
              delete_task: async () => {
                await self.modal.start( {
                  modal_title: self.tasks[ i ].title,
                  modal_content: "Are you sure you want to delete this Task?",
                  footer: [ {
                    "caption": "Delete",
                    "style": "danger btn-sm",
                    "onclick": function ( ) {
                      self.tasks.splice( i, 1 );
                      renderTasks();
                      this.close();
                    }
                  }],
                } );
              },
              select_item: function () {
                (this.checked === true) ? ( list_item.querySelector( '.hook' ).style.display = 'block'): ( list_item.querySelector( '.hook' ).style.display = 'none');
              },
              livepoll: async function () {
                await self.modal.start( {
                  modal_title: "Handover Live Poll",
                  modal_content: ( await self.handover_app.start( {
                    component_url: self.live_poll.url,
                    data: {
                      user: self.user,
                      data: {
                        store: self.live_poll.store,
                        key: {
                          key: $.generateKey(),
                          answers: ( self.tasks[ i ].content.answers || [] ).map( answer => typeof answer === 'string' ? answer : answer.text ),
                          question: self.tasks[ i ].content.text
                        }
                      }
                    },
                    qr_code: [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/qrcode-generator/qrcode.min.js" ],
                  } ) ).root,
                  footer: [ {
                    "caption": "Close",
                    "style": "danger",
                    "onclick": () => { this.close(); }
                  } ]
                } );
                /**await self.live_poll.start( {
                  user: self.user,
                  data: {
                    store: self.live_poll_store,
                    key: {
                      key: $.generateKey(),
                      answers: ( self.tasks[ i ].content.answers || [] ).map( answer => typeof answer === 'string' ? answer : answer.text ),
                      question: self.tasks[ i ].content.text
                    }
                  }
                } );*/
              }
            } );
            main_elem.querySelector( '.list-group' ).appendChild( list_item );
          }
        }
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();