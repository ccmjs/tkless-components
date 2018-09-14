ccm.files[ "configs.js" ] = {
  "demo": {
    "data": { "store": [ "ccm.store", { "name": "voting" } ], "key": "demo" },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ]
    ]
  },

  "local": {
    "data": { "store": [ "ccm.store", "../voting/resources/datastore.js" ], "key": "demo" },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ]
    ]
  }
};