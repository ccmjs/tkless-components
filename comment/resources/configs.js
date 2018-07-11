ccm.files[ "configs.js" ] = {
  "chat_local": {
    "chat": true,
    "editable": true,
    "data": {
      "store": [ "ccm.store", { "store": "chat" } ],
      "key": "demo"
    },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.1.js",
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
      "store": [ "ccm.store", { "store": "chat", "url": "ws://localhost:8080" } ],
      "key": "test"
    },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.1.js",
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
      "store": [ "ccm.store", "https://ccmjs.github.io/tkless-components/comment/resources/datastore.js" ],
      "key": "demo" },
    "voting": [ "ccm.component", "https://ccmjs.github.io/tkless-components/thumb_rating/versions/ccm.thumb_rating-2.0.0.js", {
      "template": "buttons",
      "data": {
        "store": [ "ccm.store", "https://ccmjs.github.io/tkless-components/voting/resources/datastore.js" ]
      }
    } ]
  },

  "comment_localhost": {
    "editable": true,
    "sorting_by_voting": true,
    "template": "expanded",
    "data": {
      "store": [ "ccm.store", { "store": "comment", "url": "http://localhost:8080" } ],
      "key": "demo"
    },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.1.js",
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
      "data": { "store": [ "ccm.store", { "store": "comment_voting", "url": "http://localhost:8080" } ] },
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.1.js",
        [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ]
      ]
    } ]
  }
};