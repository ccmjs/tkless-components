/**
 * @overview example ccm component that just renders "Hello, World!"
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @license The MIT License (MIT)
 */

( function () {

  const component = {

    name: 'app_collection',
    version: [ 1, 0,0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-24.0.4.js',

    config: {
      "html": [ "ccm.load", "https://ccmjs.github.io/tkless-components/app_collection/resources/templates.html" ],
      "title": "My Apps",
      "color_scheme": "#ee6e73",
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
        "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
        "logged_in": true,
        "realm": "guest",
        "title": "Please enter any Username.",
        "style": [ "ccm.load", "https://ccmjs.github.io/tkless-components/app_collection/resources/user.css" ]
      } ],
      "content": [
        {
          "section": "Phase 1",
          "entries": [
          {
            "title": "What do you do? Part 1",
            "ignore": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/exercise/versions/ccm.exercise-5.0.1.js", {
              "key": [ "ccm.get", { "name": "ws_exercise", "url": "https://ccm2.inf.h-brs.de" }, "1562227411089X5472852610388494" ],
              "data": {
                "store": [ "ccm.store", { "name": "exercise_results" } ],
                "user": true,
                "key": "what_do_you_do_part_1"
              },
              "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                "logged_in": true,
                "realm": "guest",
                "title": "Please enter eny Username"
              } ]
            } ]
          },
          {
            "title": "Present Simple vs Present Progressive",
            "ignore": [ "ccm.instance", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-6.0.0.js", {
              "key": [ "ccm.get", { "name": "ws_cloze", "url": "https://ccm2.inf.h-brs.de" }, "1558988788863X5301679270557094" ],
              "data": {
                "store": [ "ccm.store", { "name": "cloze_results" } ],
                "user": true,
                "key": "simple_vs_progressive_02"
              },
              "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                "realm": "quest",
                "title": "Please enter any Username"
              } ]
            } ]
          }
        ]
        },
        {
          "section": "Phase 2",
          "entries": [
            {
              "title": "What do you do?",
              "ignore":[ "ccm.instance", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.0.js",  {
                "key": [ "ccm.get", { "name": "ws_quiz", "url": "https://ccm2.inf.h-brs.de" }, "1558986834264X3190854012585904" ],
                "data": {
                  "store": [ "ccm.store", { "name": "quiz_results"  } ],
                  "user": true,
                  "key": "what_do_you_do"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "realm": "guest",
                  "title": "Please enter eny Username"
                } ]
              } ]
            }
          ]
        },
        {
          "section": "Phase 3",
          "entries": [
            {
              "title": "What do you do? Part 1",
              "ignore": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/exercise/versions/ccm.exercise-5.0.1.js", {
                "key": [ "ccm.get", { "name": "ws_exercise", "url": "https://ccm2.inf.h-brs.de" }, "1562227411089X5472852610388494" ],
                "data": {
                  "store": [ "ccm.store", { "name": "exercise_results"} ],
                  "user": true,
                  "key": "what_do_you_do_part_1"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "realm": "guest",
                  "title": "Please enter eny Username"
                } ]
              } ]
            },
            {
              "title": "Present Simple vs Present Progressive",
              "ignore": [ "ccm.instance", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-6.0.0.js", {
                "key": [ "ccm.get", { "name": "ws_cloze", "url": "https://ccm2.inf.h-brs.de" }, "1558988788863X5301679270557094" ],
                "data": {
                  "store": [ "ccm.store", { "name": "cloze_results" } ],
                  "user": true,
                  "key": "simple_vs_progressive_02"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "realm": "guest",
                  "title": "Please enter eny Username"
                } ]
              } ]
            }
          ]
        },
        {
          "section": "Phase 4",
          "entries": [
            {
              "title": "What do you do? Part 1",
              "ignore": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/exercise/versions/ccm.exercise-5.0.1.js", {
                "key": [ "ccm.get", { "name": "ws_exercise", "url": "https://ccm2.inf.h-brs.de" }, "1562227411089X5472852610388494" ],
                "data": {
                  "store": [ "ccm.store", { "name": "exercise_results" } ],
                  "user": true,
                  "key": "what_do_you_do_part_1"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "logged_in": true,
                  "realm": "guest",
                  "title": "Please enter eny Username"
                } ]
              } ]
            },
            {
              "title": "Present Simple vs Present Progressive",
              "ignore": [ "ccm.instance", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-6.0.0.js", {
                "key": [ "ccm.get", { "name": "ws_cloze", "url": "https://ccm2.inf.h-brs.de" }, "1558988788863X5301679270557094" ],
                "data": {
                  "store": [ "ccm.store", { "name": "cloze_results" } ],
                  "user": true,
                  "key": "simple_vs_progressive_02"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "realm": "guest",
                  "title": "Please enter eny Username"
                } ]
              } ]
            }
          ]
        },
        {
          "section": "Phase 5",
          "entries": [
            {
              "title": "What do you do? Part 1",
              "ignore": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/exercise/versions/ccm.exercise-5.0.1.js", {
                "key": [ "ccm.get", { "name": "ws_exercise", "url": "https://ccm2.inf.h-brs.de" }, "1562227411089X5472852610388494" ],
                "data": {
                  "store": [ "ccm.store", { "name": "exercise_results" } ],
                  "user": true,
                  "key": "what_do_you_do_part_1"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "realm": "guest",
                  "title": "Please enter eny Username"
                } ]
              } ]
            },
            {
              "title": "Present Simple vs Present Progressive",
              "ignore": [ "ccm.instance", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-6.0.0.js", {
                "key": [ "ccm.get", { "name": "ws_cloze", "url": "https://ccm2.inf.h-brs.de" }, "1558988788863X5301679270557094" ],
                "data": {
                  "store": [ "ccm.store", { "name": "cloze_results" } ],
                  "user": true,
                  "key": "simple_vs_progressive_02"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "realm": "guest",
                  "title": "Please enter eny Username"
                } ]
              } ]
            }
          ]
        },
        {
          "section": "Phase 5",
          "entries": [
            {
              "title": "What do you do? Part 1",
              "ignore": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/exercise/versions/ccm.exercise-5.0.1.js", {
                "key": [ "ccm.get", { "name": "ws_exercise", "url": "https://ccm2.inf.h-brs.de" }, "1562227411089X5472852610388494" ],
                "data": {
                  "store": [ "ccm.store", { "name": "exercise_results" } ],
                  "user": true,
                  "key": "what_do_you_do_part_1"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "realm": "guest",
                  "title": "Please enter eny Username"
                } ]
              } ]
            },
            {
              "title": "Present Simple vs Present Progressive",
              "ignore": [ "ccm.instance", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-6.0.0.js", {
                "key": [ "ccm.get", { "name": "ws_cloze", "url": "https://ccm2.inf.h-brs.de" }, "1558988788863X5301679270557094" ],
                "data": {
                  "store": [ "ccm.store", { "name": "cloze_results" } ],
                  "user": true,
                  "key": "simple_vs_progressive_02"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "realm": "guest",
                  "title": "Please enter eny Username"
                } ]
              } ]
            }
          ]
        },
        {
          "section": "Phase 5",
          "entries": [
            {
              "title": "What do you do? Part 1",
              "ignore": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/exercise/versions/ccm.exercise-5.0.1.js", {
                "key": [ "ccm.get", { "name": "ws_exercise", "url": "https://ccm2.inf.h-brs.de" }, "1562227411089X5472852610388494" ],
                "data": {
                  "store": [ "ccm.store", { "name": "exercise_results" } ],
                  "user": true,
                  "key": "what_do_you_do_part_1"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "realm": "guest",
                  "title": "Please enter eny Username"
                } ]
              } ]
            },
            {
              "title": "Present Simple vs Present Progressive",
              "ignore": [ "ccm.instance", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-6.0.0.js", {
                "key": [ "ccm.get", { "name": "ws_cloze", "url": "https://ccm2.inf.h-brs.de" }, "1558988788863X5301679270557094" ],
                "data": {
                  "store": [ "ccm.store", { "name": "cloze_results" } ],
                  "user": true,
                  "key": "simple_vs_progressive_02"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "realm": "guest",
                  "title": "Please enter eny Username"
                } ]
              } ]
            }
          ]
        },
        {
          "section": "Phase 5",
          "entries": [
            {
              "title": "What do you do? Part 1",
              "ignore": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/exercise/versions/ccm.exercise-5.0.1.js", {
                "key": [ "ccm.get", { "name": "ws_exercise", "url": "https://ccm2.inf.h-brs.de" }, "1562227411089X5472852610388494" ],
                "data": {
                  "store": [ "ccm.store", { "name": "exercise_results" } ],
                  "user": true,
                  "key": "what_do_you_do_part_1"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "realm": "guest",
                  "title": "Please enter eny Username"
                } ]
              } ]
            },
            {
              "title": "Present Simple vs Present Progressive",
              "ignore": [ "ccm.instance", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-6.0.0.js", {
                "key": [ "ccm.get", { "name": "ws_cloze", "url": "https://ccm2.inf.h-brs.de" }, "1558988788863X5301679270557094" ],
                "data": {
                  "store": [ "ccm.store", { "name": "cloze_results" } ],
                  "user": true,
                  "key": "simple_vs_progressive_02"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "realm": "guest",
                  "title": "Please enter eny Username"
                } ]
              } ]
            }
          ]
        },
        {
          "section": "Phase 5",
          "entries": [
            {
              "title": "What do you do? Part 1",
              "ignore": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/exercise/versions/ccm.exercise-5.0.1.js", {
                "key": [ "ccm.get", { "name": "ws_exercise", "url": "https://ccm2.inf.h-brs.de" }, "1562227411089X5472852610388494" ],
                "data": {
                  "store": [ "ccm.store", { "name": "exercise_results" } ],
                  "user": true,
                  "key": "what_do_you_do_part_1"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "realm": "guest",
                  "title": "Please enter eny Username"
                } ]
              } ]
            },
            {
              "title": "Present Simple vs Present Progressive",
              "ignore": [ "ccm.instance", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-6.0.0.js", {
                "key": [ "ccm.get", { "name": "ws_cloze", "url": "https://ccm2.inf.h-brs.de" }, "1558988788863X5301679270557094" ],
                "data": {
                  "store": [ "ccm.store", { "name": "cloze_results" } ],
                  "user": true,
                  "key": "simple_vs_progressive_02"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "realm": "guest",
                  "title": "Please enter eny Username"
                } ]
              } ]
            }
          ]
        },
        {
          "section": "Phase 5",
          "entries": [
            {
              "title": "What do you do? Part 1",
              "ignore": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/exercise/versions/ccm.exercise-5.0.1.js", {
                "key": [ "ccm.get", { "name": "ws_exercise", "url": "https://ccm2.inf.h-brs.de" }, "1562227411089X5472852610388494" ],
                "data": {
                  "store": [ "ccm.store", { "name": "exercise_results" } ],
                  "user": true,
                  "key": "what_do_you_do_part_1"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "realm": "guest",
                  "title": "Please enter eny Username"
                } ]
              } ]
            },
            {
              "title": "Present Simple vs Present Progressive",
              "ignore": [ "ccm.instance", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-6.0.0.js", {
                "key": [ "ccm.get", { "name": "ws_cloze", "url": "https://ccm2.inf.h-brs.de" }, "1558988788863X5301679270557094" ],
                "data": {
                  "store": [ "ccm.store", { "name": "cloze_results" } ],
                  "user": true,
                  "key": "simple_vs_progressive_02"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "realm": "guest",
                  "title": "Please enter eny Username"
                } ]
              } ]
            }
          ]
        },
        {
          "section": "Phase 5",
          "entries": [
            {
              "title": "What do you do? Part 1",
              "ignore": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/exercise/versions/ccm.exercise-5.0.1.js", {
                "key": [ "ccm.get", { "name": "ws_exercise", "url": "https://ccm2.inf.h-brs.de" }, "1562227411089X5472852610388494" ],
                "data": {
                  "store": [ "ccm.store", { "name": "exercise_results" } ],
                  "user": true,
                  "key": "what_do_you_do_part_1"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "realm": "guest",
                  "title": "Please enter eny Username"
                } ]
              } ]
            },
            {
              "title": "Present Simple vs Present Progressive",
              "ignore": [ "ccm.instance", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-6.0.0.js", {
                "key": [ "ccm.get", { "name": "ws_cloze", "url": "https://ccm2.inf.h-brs.de" }, "1558988788863X5301679270557094" ],
                "data": {
                  "store": [ "ccm.store", { "name": "cloze_results" } ],
                  "user": true,
                  "key": "simple_vs_progressive_02"
                },
                "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
                  "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
                  "realm": "guest",
                  "title": "Please enter eny Username"
                } ]
              } ]
            }
          ]
        }
      ],
      "footer": [
        {
          "title": "Chat",
          "icon": "chat",
          "ignore": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-5.0.0.js", {
            "submit_button_label": "Senden",
            "editable": true,
            "chat": true,
            "data": {
              "store": [ "ccm.store", { "name": "chat_result" } ],
              "key": "test_chat"
            },
            "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
              "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
              "realm": "guest",
              "title": "Please enter any Username"
            } ],
          } ]
        },
        {
          "title": "News",
          "icon": "rss_feed",
          "ignore": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/news/versions/ccm.news-2.1.0.js", {
            "data": {
              "store": [ "ccm.store", { "name": "news" } ],
              "key": "test_news"
            },
            "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
              "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
              "realm": "guest",
              "title": "Please enter any Username"
            } ],
          } ]
        },
        {
          "title": "Dashboard",
          "icon": "dashboard",
          "user": "admin",
          "ignore": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/news/versions/ccm.news-2.1.0.js", {
            "editable": "true",
            "data": {
              "store": [ "ccm.store", { "name": "news" } ],
              "key": "test_news"
            },
            "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
              "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ],
              "realm": "guest",
              "title": "Please enter any Username"
            } ],
          } ]
        }
      ],
      "feedback": [ "ccm.component", "https://ccmjs.github.io/tkless-components/feedback/versions/ccm.feedback-4.0.0.js", {
        "from_above": 20,
        "css": [ "ccm.load", "https://ccmjs.github.io/tkless-components/feedback/resources/right.css" ],
        "data": { "store": [ "ccm.store", { "name": "feedback" } ], "key": "feedback" }
      } ],
      "menu": [ "ccm.component", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.8.1.js", {
        "css": [ "ccm.load", "https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
          "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
          "https://ccmjs.github.io/tkless-components/app_collection/resources/menu.css" ]
        } ],
      "css": [ "ccm.load", "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css",
        { "context": "head", "url": "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" },
        {  "url": "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp", "type": "css" },
        {  "url": "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp", "type": "css", "context": "head" },
        "https://ccmjs.github.io/tkless-components/app_collection/resources/default.css"
      ],
      "js": [ "ccm.load", "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js" ]
    },

    Instance: function () {
      let $;
      let self = this;

      this.init = async () => {

        if ( self.user ) self.user.onchange = login => {
          if ( login ) return;

          // clear content
          $.setContent( self.element, '' );

          // restart app
          self.start();
        }
      };

      this.ready = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        if ( this.logger ) this.logger.log( 'ready', $.clone ( this ) );

      };

      this.start = async () => {

        // login user, if not logged in
        this.user && await this.user.login();

        let main_elem = $.html( self.html.main, {
          title: self.title,
          bg_color: self.color_scheme,
          renderHome: () => {
            $.setContent( main_elem.querySelector( '#title' ), self.title );
            renderContent();
          }
        } );

        if ( self.user ) {
          await  self.user.start();
          main_elem.querySelector( '#user' ).appendChild( self.user.root );
        }

        renderContent();
        if( !self.footer )
          main_elem.querySelector( '.footer' ).remove();
        else
          renderFooter();

        async function renderContent() {
          $.setContent( main_elem.querySelector( '.article' ), '' );

          for ( const entry of self.content ) {
            let content = $.html( self.html.content );

            $.append( main_elem.querySelector( '.article' ), content );
            $.setContent( content.querySelector( "#section" ), entry.section );
            content.querySelector( "#section" ).style.color = self.color_scheme;

            await self.menu.start({
              root: content.querySelector("#menu-list"),
              data: entry,
              onclick: async event => {
                self.element.querySelector( '#more' ).remove();
                let div = document.createElement( 'small' );
                div.setAttribute( 'id', 'subtitle' );

                $.setContent( main_elem.querySelector( '#title' ), entry.section );
                main_elem.querySelector( '#title' ).appendChild( div );
                $.setContent( main_elem.querySelector( '#subtitle' ), event.title );

                event.ignore[2].root = main_elem.querySelector( '.article' );
                event.ignore[2].parent = self;
                let inst = await $.solveDependency( event.ignore );
                inst.start();
              }
            } );
          }
          $.setContent( self.element, main_elem );
          checkOverflow( self.element.querySelector( '.article' ) );
        }

        async function renderFooter() {
          for( const entry of self.footer ) {
            if( entry.user && self.user.data().user !== entry.user )
              return;
            const footer_entry = $.html( self.html.footer_entry, {
              id: entry.title.toLocaleLowerCase(),
              mouse_over: function () { this.style.color = self.color_scheme; this.style.backgroundColor = 'white'; },
              mouse_leave: function () { this.style.color = 'white'; this.style.backgroundColor = self.color_scheme; },
              icon: entry.icon,
              icon_title: entry.title
            } );

            footer_entry.addEventListener( 'click', async ()=> {
              entry.ignore[2].root = main_elem.querySelector( '.article' );
              entry.ignore[2].parent = self;
              let inst = await $.solveDependency( entry.ignore );
              inst.start();
            } );

            main_elem.querySelector( '.footer' ).appendChild( footer_entry );
            $.setContent( self.element, main_elem );
          }
        }

        function checkOverflow( element ) {
          let checkOverflow = element.clientHeight < element.scrollHeight;

          if ( checkOverflow ) {
            const more = $.html( self.html.more, {
              id: 'more',
              scroll_down: () => {
                console.log( 'click' );
                self.element.querySelector( '.article' ).lastChild.scrollIntoView( { block: 'end',  behavior: 'smooth' } );
              }
            } );
            self.element.appendChild( more );
          }
        }

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();