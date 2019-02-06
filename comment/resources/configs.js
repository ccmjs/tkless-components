ccm.files[ "configs.js" ] = {

  "demo_chat": {
    "key": "demo",
    "chat": true,
    "editable": true,
    "data": {
      "store": [ "ccm.store", { "name": "chat_data", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
      { "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] }  ]
  },

  "demo_comment": {
    "key": "demo_comment",
    "editable": true,
    "sorting_by_voting": true,
    "template": "expanded",
    "data": {
      "store": [ "ccm.store", { "name": "comment_data", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo" },
    "voting": [ "ccm.component", "https://ccmjs.github.io/tkless-components/thumb_rating/versions/ccm.thumb_rating-3.0.0.js", {
      "template": "buttons",
      "data": {
        "store": [ "ccm.store", { "name": "voting", "url": "https://ccm2.inf.h-brs.de" }  ],
        "key": "demo_comment"
      },
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js",
        [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ]
    } ],
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ]
  },

  "chat_local": {
    "chat": true,
    "editable": true,
    "data": {
      "store": [ "ccm.store", { "name": "chat" } ],
      "key": "demo"
    },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ]
  },

  "chat_localhost": {
    "editable": true,
    "chat": true,
    "data": {
      "store": [ "ccm.store", { "name": "chat", "url": "ws://localhost:8080" } ],
      "key": "test"
    },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ]  ]
  },

  "comment_local": {
    "editable": true,
    "sorting_by_voting": true,
    "template": "expanded",
    "data": {
      "store": [ "ccm.store", { "name": "comment" } ],
      "key": "demo" },
    "voting": [ "ccm.component", "https://ccmjs.github.io/tkless-components/thumb_rating/versions/ccm.thumb_rating-3.0.0.js", {
      "template": "buttons",
      "data": {
        "store": [ "ccm.store", { "name": "comment_voting" } ],
      },
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js",
        [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ]
    } ],
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
      { "key": [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] }  ]
  },

  "comment_localhost": {
    "editable": true,
    "sorting_by_voting": true,
    "template": "expanded",
    "data": {
      "store": [ "ccm.store", { "name": "comment", "url": "http://localhost:8080" } ],
      "key": "demo"
    },
    "voting": [ "ccm.component", "../thumb_rating/ccm.thumb_rating.js", {
      "data": { "store": [ "ccm.store", { "name": "comment_voting", "url": "http://localhost:8080" } ] },
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js",
        [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ]
      ]
    } ],
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ]
  }
};