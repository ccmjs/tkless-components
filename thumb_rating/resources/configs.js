ccm.files[ 'configs.js' ] = {
  "demo": {
    "key": "demo",
    "template": "simple",
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.5.0.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ],
    "data": {
      "store": [ "ccm.store", { "name": "thumb_rating_data", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "test_rating"
    }
  },

  "local": {
    "template": "buttons",
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ],
    "data": { "store": [ "ccm.store", { "name": "thumb_rating_data" } ], "key": "demo" }
  }
};
