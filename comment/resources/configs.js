/*----------------------------------------------------- DEPRECATED ---------------------------------------------------*/

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

  "demo_comment_v6": {
    "key": "demo_comment",
    "editable": true,
    "data": {
      "store": [ "ccm.store", { "name": "comment_data", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "test"
    },
    "voting": [ "ccm.component", "https://ccmjs.github.io/tkless-components/voting/versions/ccm.voting-4.0.0.js", {
      "data": {
        "store": [ "ccm.store", { "name": "voting_data", "url": "https://ccm2.inf.h-brs.de" }  ],
        "key": "test_comment"
      }
    } ],
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.5.0.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ]
  },
};
