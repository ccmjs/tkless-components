ccm.files[ "configs.js" ] = {
  "demo": {
    "editable": true,
    "sorting_by_voting": true,
    "comment_template": "expanded",
    "data": { "store": [ "ccm.store", { "store": "comment" } ], "key": "demo" },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ]
    ],
    "voting": [ "ccm.component", "https://ccmjs.github.io/tkless-components/thumb_rating/versions/ccm.thumb_rating-1.0.0.min.js", {
      "buttons": true,
      "data": { "store": [ "ccm.store", "https://ccmjs.github.io/tkless-components/voting/resources/datastore.js" ] },
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.1.js",
        [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ]
      ]
    } ]
  },

  "local": {
    "editable": true,
    "sorting_by_voting": true,
    "data": { "store": [ "ccm.store", "resources/datastore.js" ], "key": "demo" },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ]
    ],
    "voting": [ "ccm.component", "../thumb_rating/ccm.thumb_rating.js", {
      "buttons": true,
      "data": { "store": [ "ccm.store", "../voting/resources/datastore.js" ] },
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.1.js",
        [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ]
      ]
    } ]
  },

  "localhost": {
    "editable": true,
    "sorting_by_voting": true,
    "data": { "store": [ "ccm.store", { "store": "comment", "url": "http://localhost:8080" } ], "key": "demo" },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ]
    ],
    "voting": [ "ccm.component", "https://ccmjs.github.io/tkless-components/voting/versions/ccm.voting-1.0.0.js", {
      "data": { "store": [ "ccm.store", { "store": "voting", "url": "ws://localhost:8080" } ] },
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.1.js",
        [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ]
      ]
    } ]
  },

  "lea": {
    "comment_template": "expanded",
    "data": {
      "store": [ "ccm.store", { "store": "slidecast_comments", "url": "https://ccm.inf.h-brs.de" } ],
      "key": "learning_apps"
    },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ]
    ],
    "voting": [ "ccm.component", "https://ccmjs.github.io/tkless-components/thumb_rating/versions/ccm.thumb_rating-1.0.0.min.js",
      {
        "buttons": "true",
        "data": { "store": [ "ccm.store", { "store": "voting", "url": "wss://ccm.inf.h-brs.de" } ] },
        "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.1.js",
          [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ]
        ]
      }
    ]
  }
};