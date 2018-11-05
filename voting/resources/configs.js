ccm.files[ "configs.js" ] = {
  "demo": {
    "key": "demo",
    "data": {
      "store": [ "ccm.store", { "name": "voting", "url": "https://ccm2.inf.h-brs.de" }  ],
      "key": "demo"
    },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ]
  },

  "local": {
    "data": { "store": [ "ccm.store", { "name": "voting_data" } ], "key": "demo" },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ]
  },

  "local_dataset": {
    "data": { "store": [ "ccm.store", "../voting/resources/datastore.js" ], "key": "demo" },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ]
  }
};