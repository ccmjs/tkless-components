ccm.files[ 'resources.js' ] = {
  "submit_config": {
    "html": {
      "entry": {
        "class": "form-group"
      },
      "label": {
        "tag": "label",
        "class": "item-label",
        "inner": "%label%"
      },
      "info": {
        "tag": "span",
        "class": "info",
        "inner": [
          {
            "tag": "input",
            "type": "checkbox",
            "id": "%id%"
          },
          {
            "tag": "label",
            "for": "%id%",
            "inner": {
              "tag": "span",
              "class": "info-icon glyphicon glyphicon-info-sign"
            }
          },
          {
            "tag": "span",
            "class": "alert alert-info",
            "inner": "%info%"
          }
        ]
      },
      "section": {
        "class": "section",
        "inner": [
          {
            "tag": "input",
            "type": "hidden",
            "name": "%name%",
            "value": "%value%"
          },
          {
            "class": "items"
          },
          {
            "class": "buttons btn-group",
            "inner": [
              {
                "tag": "a",
                "class": "add btn btn-default btn-sm",
                "role": "button",
                "inner": {
                  "tag": "span",
                  "class": "glyphicon glyphicon-plus"
                },
                "onclick": "%add%"
              },
              {
                "tag": "a",
                "class": "del btn btn-default btn-sm",
                "role": "button",
                "inner": {
                  "tag": "span",
                  "class": "glyphicon glyphicon-minus"
                },
                "onclick": "%del%"
              }
            ]
          }
        ]
      }
    },
    "css": [
      "ccm.load",
      {
        "context": "head",
        "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css"
      },
      "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css",
      "https://ccmjs.github.io/akless-components/submit/resources/default.css"
    ],
    "data": {
      "store": [
        "ccm.store"
      ]
    },
    "entries": [
      {
        "name": "css",
        "type": "hidden"
      },
      {
        "name": "data",
        "type": "hidden"
      },
      {
        "name": "data.key",
        "type": "key"
      },
      {
        "name": "onfinish",
        "type": "hidden"
      },
      {
        "name": "user",
        "type": "hidden"
      },
      "<div class=\"page-header\"><h2>Settings <small class=\"text-primary\">Quiz</small></h2></div>",
      {
        "label": "Question",
        "name": "text",
        "type": "text",
        "info": "Enter the text of the question here. Add or remove questions with the plus and minus buttons."
      },
      {
        "label": "Type",
        "name": "input",
        "type": "radio",
        "info": "Select single choice if only one answer or multiple choice if multiple answers can be selected.",
        "items": [
          {
            "label": "Single Choice",
            "value": "radio"
          },
          {
            "label": "Multiple Choice",
            "value": "checkbox"
          }
        ]
      },
      {
        "label": "Description",
        "name": "description",
        "type": "textarea",
        "info": "Enter the description of the question here."
      },
      "<br>",
      {
        "label": "Random Answers",
        "name": "random",
        "type": "checkbox",
        "info": "When enabled, the answers to the questions are presented in random order."
      },
      "<br>",
      {
        "name": "answers",
        "type": "several",
        "items": [
          {
            "label": "Answer",
            "name": "text",
            "type": "text",
            "info": "Enter the text of the answer here. Add or remove answers with the plus and minus buttons."
          },
          {
            "label": "Correct",
            "name": "correct",
            "type": "checkbox",
            "info": "Indicates if the answer is a correct answer."
          },
          {
            "label": "Comment",
            "name": "comment",
            "type": "text",
            "info": "A comment can give an indication of why a response is right or wrong. The comment is displayed during automatic feedback."
          }

        ]
      }
    ],
    "ignore": {
      "defaults": {
        "html": {
          "start": {
            "id": "start",
            "inner": {
              "tag": "button",
              "inner": "Start",
              "onclick": "%%"
            }
          },
          "question": {
            "id": "%id%",
            "class": "question",
            "inner": [
              {
                "class": "title",
                "inner": [
                  {
                    "inner": "Question"
                  },
                  {
                    "inner": "%nr%/%count%"
                  },
                  {
                    "inner": "%text%"
                  }
                ]
              },
              {
                "class": "description",
                "inner": "%description%"
              },
              {
                "class": "answers"
              }
            ]
          },
          "answer": {
            "id": "%id%",
            "class": "answer %class%",
            "inner": {
              "class": "entry",
              "inner": [
                {
                  "class": "text",
                  "inner": {
                    "tag": "label",
                    "inner": "%text%",
                    "for": "%id%-input"
                  }
                },
                {
                  "class": "comment"
                }
              ]
            }
          },
          "comment": {
            "class": "tooltip",
            "onclick": "%click%",
            "inner": [
              "i",
              {
                "tag": "div",
                "class": "tooltiptext",
                "inner": {
                  "inner": {
                    "inner": "%comment%"
                  }
                }
              }
            ]
          },
          "timer": {
            "tag": "span",
            "inner": "%%"
          }
        },
        "css": [
          "ccm.load",
          "https://ccmjs.github.io/akless-components/quiz/resources/weblysleek.css",
          {
            "context": "head",
            "url": "https://ccmjs.github.io/akless-components/libs/weblysleekui/font.css"
          }
        ],

        "feedback": true,
        "user": [
          "ccm.instance",
          "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.0.0.js",
          {
            "realm": "guest",
            "title": "Guest Mode: Please enter any username"
          }
        ],
        "data": {
          "login": true,
          "store": [
            "ccm.store",
            {
              "name": "ws_result_data",
              "url": "https://ccm2.inf.h-brs.de"
            }
          ],
          "user": true
        },
        "onfinish": {
          "alert": "Saved!",
          "login": true,
          "store": true
        }
      }
    }
  }
};