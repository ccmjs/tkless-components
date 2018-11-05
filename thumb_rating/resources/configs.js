ccm.files[ 'configs.js' ] = {
  "demo": {
    "key": "demo",
    "template": "buttons",
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ],
    "data": {
      "store": [ "ccm.store", { "name": "thumb_rating_data", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo"
    }
  },

  "local": {
    "template": "buttons",
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ],
    "data": { "store": [ "ccm.store", { "name": "thumb_rating_data" } ], "key": "demo" }
  },

  "local_datastore": {
    "buttons": true,
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ],
    "data":  { "store": [ "ccm.store", "resources/datastore.js" ], "key": "demo" }
  }
};