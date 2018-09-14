ccm.files[ 'configs.js' ] = {
  "demo": {
    "template": "buttons",
    "user":  [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ]
    ],
    "data": { "store": [ "ccm.store", { "name": "thumb_rating" } ], "key": "demo" }
  },

  "local": {
    "buttons": true,
    "user":  [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.0.0.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ]
    ],
    "data":  { "store": [ "ccm.store", "resources/datastore.js" ], "key": "demo" }
  }
};