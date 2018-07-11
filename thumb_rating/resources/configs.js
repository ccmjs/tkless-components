ccm.files[ 'configs.js' ] = {
  "demo": {
    "template": "buttons",
    "user":  [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ]
    ],
    "data": { "store": [ "ccm.store", { "store": "thumb_rating" } ], "key": "demo" }
  },

  "local": {
    "buttons": true,
    "user":  [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ]
    ],
    "data":  { "store": [ "ccm.store", "resources/datastore.js" ], "key": "demo" }
  }
};