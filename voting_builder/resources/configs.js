ccm.files[ "configs.js" ] = {
  "demo": {
    "key": "demo",
    "submit_button": "Submit",
    "preview": true,
    "defaults": {
      "data.store": "{ [ 'ccm.store',{ 'name':'voting_data', 'url': 'https://ccm2.inf.h-brs.de' } ], 'key': 'demo' }",
      "user": "[ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js', " +
      "[ 'ccm.get', 'https://ccmjs.github.io/akless-components/user/resources/configs.js', 'compact' ] ]"
    }
  },

  "local": {
    "submit_button": "Submit",
    "preview": true,
    "defaults": {
      "data.store": "[ 'ccm.store',{ 'name':'voting_data' } ]",
      "user": "[ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js', " +
      "[ 'ccm.get', 'https://ccmjs.github.io/akless-components/user/resources/configs.js', 'compact' ] ]"
    },
    "onfinish": { "log": true }
  },

  "crud_app": {
    "builder": [ "ccm.component", "ccm.voting_builder.js",
      {
        "preview": true,
        "defaults": {
          "data.store": "[ 'ccm.store',{ 'store':'voting_data' } ]",
          "user": "[ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js', " +
          "[ 'ccm.get', 'https://ccmjs.github.io/akless-components/user/resources/configs.js', 'compact' ] ]"
        },
        "onfinish": { "log": true }
      }
    ],
    "store": [ "ccm.store", { "store": "voting" } ],
    "url": "../voting/ccm.voting.js"
  }
};