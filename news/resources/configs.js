ccm.files[ "configs.js" ] = {
  "demo" : {
    "key": "demo",
    "data": {
      "store": [ "ccm.store", { "name": "news_data", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ],
    "editable": true
  },

  "local" : {
    "key": "demo",
    "data": { "store": [ "ccm.store" ], "key": "demo" },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ],
    "editable": true
  }

};