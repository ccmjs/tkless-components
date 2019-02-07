ccm.files[ "configs.js" ] = {
  "demo": {
    "key": "demo",
    "submit_button": "Submit",
    "preview": true,
    "defaults": {
      "data.store": "{ [ 'ccm.store',{ 'name':'thumb_rating_data', 'url': 'https://ccm2.inf.h-brs.de' } ], 'key': 'demo' }",
      "user": "[ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js', " +
      "[ 'ccm.get', 'https://ccmjs.github.io/akless-components/user/resources/configs.js', 'compact' ] ]"    }
  },

  "local": {
    "submit_button": "Submit",
    "preview": true,
    "defaults": {
      "data.store": "['ccm.store',{'name':'thumb_rating_data'}]",
      "user": "[ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js', " +
      "[ 'ccm.get', 'https://ccmjs.github.io/akless-components/user/resources/configs.js', 'compact' ] ]"
    },
    "onfinish": { "log": true }
  },

  "crud_app": {
    "builder": [ "ccm.component", "ccm.thumb_rating_builder.js",
      {
        "preview": true,
        "defaults": {
          "data.store": "['ccm.store',{'store':'thumb_rating_data'}]",
          "user": "[ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js', " +
          "[ 'ccm.get', 'https://ccmjs.github.io/akless-components/user/resources/configs.js', 'compact' ] ]"
        },
        "onfinish": { "log": true }
      }
    ],
    "store": [ "ccm.store", { "store": "thumb_rating" } ],
    "url": "../thumb_rating/ccm.thumb_rating.js"
  }
};