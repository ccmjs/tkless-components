ccm.files[ "configs.js" ] = {

  "demo_chat": {
    "key": "demo",
    "chat": true,
    "editable": true,
    "data": {
      "store": [ "ccm.store", { "store": "chat", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js", {
      "html.logged_in": {
        "id": "logged_in",
        "class": "row",
        "style": "float:none",
        "inner":
          {
            "id": "button",
            "class": "btn btn-default",
            "inner": [
              {
                "tag": "span",
                "id": "user",
                "inner": [
                  { "class": "glyphicon glyphicon-user" },
                  "%user%&#8196;"
                ]
              },
              {
                "tag": "span",
                "class": "glyphicon glyphicon-log-out",
              },
              "Logout"
            ],
            "onclick": "%click%"
          }
      },
      "html.logged_out": {
        "id": "logged_out",
        "class": "row",
        "style": "float:none",
        "inner": {
          "id": "button",
          "class": "btn btn-default",
          "inner": [
            {
              "tag": "span",
              "class": "glyphicon glyphicon-log-in"
            },
            "Login"
          ],
          "onclick": "%click%"
        }
      },
      "realm": "guest",
      "title": "Please enter any Username",
      "no_password": true
    } ]
  },

  "demo_comment": {
    "key": "demo_comment",
    "editable": true,
    "sorting_by_voting": true,
    "template": "expanded",
    "data": {
      "store": [ "ccm.store", { "name": "comment", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo" },
    "voting": [ "ccm.component", "https://ccmjs.github.io/tkless-components/thumb_rating/versions/ccm.thumb_rating-3.0.0.js", {
      "template": "buttons",
      "data": {
        "store": [ "ccm.store", { "name": "voting", "url": "https://ccm2.inf.h-brs.de" }  ],
        "key": "demo_comment"
      },
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js",
        [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]
    } ],
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]
  },

  "chat_local": {
    "chat": true,
    "editable": true,
    "data": {
      "store": [ "ccm.store", { "name": "chat" } ],
      "key": "demo"
    },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js",
      {
        "html.logged_in": {
          "id": "logged_in",
          "class": "row",
          "style": "float:none",
          "inner":
            {
              "id": "button",
              "class": "btn btn-default",
              "inner": [
                {
                  "tag": "span",
                  "id": "user",
                  "inner": [
                    { "class": "glyphicon glyphicon-user" },
                    "%user%&#8196;"
                  ]
                },
                {
                  "tag": "span",
                  "class": "glyphicon glyphicon-log-out",
                },
                "Logout"
              ],
              "onclick": "%click%"
            }

        },
        "html.logged_out": {
          "id": "logged_out",
          "class": "row",
          "style": "float:none",
          "inner": {
            "id": "button",
            "class": "btn btn-default",
            "inner": [
              {
                "tag": "span",
                "class": "glyphicon glyphicon-log-in"
              },
              "Login"
            ],
            "onclick": "%click%"
          }
        },
        "realm": "guest",
        "title": "Guest Mode: Please enter any username",
        "no_password": true
      }
    ]
  },

  "chat_localhost": {
    "editable": true,
    "chat": true,
    "data": {
      "store": [ "ccm.store", { "name": "chat", "url": "ws://localhost:8080" } ],
      "key": "test"
    },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js",
      {
        "html.logged_in": {
          "id": "logged_in",
          "class": "row",
          "style": "float:none",
          "inner":
            {
              "id": "button",
              "class": "btn btn-default",
              "inner": [
                {
                  "tag": "span",
                  "id": "user",
                  "inner": [
                    { "class": "glyphicon glyphicon-user" },
                    "%user%&#8196;"
                  ]
                },
                {
                  "tag": "span",
                  "class": "glyphicon glyphicon-log-out",
                },
                "Logout"
              ],
              "onclick": "%click%"
            }

        },
        "html.logged_out": {
          "id": "logged_out",
          "class": "row",
          "style": "float:none",
          "inner": {
            "id": "button",
            "class": "btn btn-default",
            "inner": [
              {
                "tag": "span",
                "class": "glyphicon glyphicon-log-in"
              },
              "Login"
            ],
            "onclick": "%click%"
          }
        },
        "realm": "guest",
        "title": "Guest Mode: Please enter any username",
        "no_password": true
      }
    ]
  },

  "comment_local": {
    "editable": true,
    "sorting_by_voting": true,
    "template": "expanded",
    "data": {
      "store": [ "ccm.store", { "name": "comment" } ],
      "key": "demo" },
    "voting": [ "ccm.component", "../thumb_rating/ccm.thumb_rating.js", {
      "template": "buttons",
      "data": {
        "store": [ "ccm.store", { "name": "comment_voting" } ],
      },
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js",
        [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]
    } ],
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js", {
      "html.logged_in": {
        "id": "logged_in",
        "class": "row",
        "style": "float:none",
        "inner":
          {
            "id": "button",
            "class": "btn btn-default",
            "inner": [
              {
                "tag": "span",
                "id": "user",
                "inner": [
                  { "class": "glyphicon glyphicon-user" },
                  "%user%&#8196;"
                ]
              },
              {
                "tag": "span",
                "class": "glyphicon glyphicon-log-out",
              },
              "Logout"
            ],
            "onclick": "%click%"
          }
      },
      "html.logged_out": {
        "id": "logged_out",
        "class": "row",
        "style": "float:none",
        "inner": {
          "id": "button",
          "class": "btn btn-default",
          "inner": [
            {
              "tag": "span",
              "class": "glyphicon glyphicon-log-in"
            },
            "Login"
          ],
          "onclick": "%click%"
        }
      },
      "realm": "guest",
      "title": "Please enter any Username",
      "no_password": true
    } ]
  },

  "comment_localhost": {
    "editable": true,
    "sorting_by_voting": true,
    "template": "expanded",
    "data": {
      "store": [ "ccm.store", { "name": "comment", "url": "http://localhost:8080" } ],
      "key": "demo"
    },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js",
      {
        "html.logged_in": {
          "id": "logged_in",
          "class": "row",
          "style": "float:none",
          "inner":
            {
              "id": "button",
              "class": "btn btn-default",
              "inner": [
                {
                  "tag": "span",
                  "id": "user",
                  "inner": [
                    { "class": "glyphicon glyphicon-user" },
                    "%user%&#8196;"
                  ]
                },
                {
                  "tag": "span",
                  "class": "glyphicon glyphicon-log-out",
                },
                "Logout"
              ],
              "onclick": "%click%"
            }

        },
        "html.logged_out": {
          "id": "logged_out",
          "class": "row",
          "style": "float:none",
          "inner": {
            "id": "button",
            "class": "btn btn-default",
            "inner": [
              {
                "tag": "span",
                "class": "glyphicon glyphicon-log-in"
              },
              "Login"
            ],
            "onclick": "%click%"
          }
        },
        "realm": "guest",
        "title": "Guest Mode: Please enter any username",
        "no_password": true
      }
    ],
    "voting": [ "ccm.component", "../thumb_rating/ccm.thumb_rating.js", {
      "data": { "store": [ "ccm.store", { "name": "comment_voting", "url": "http://localhost:8080" } ] },
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js",
        [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ]
      ]
    } ]
  }
};