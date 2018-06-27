ccm.files[ "configs.js" ] = {
  "local": {
    "submit_button": "Submit",
    "preview": true,
    "defaults": {
      "star_title": '[ "Gefällt mir gar nicht", "Gefällt mir nicht", "Ist Ok", "Gefällt mir", "Gefällt mir sehr" ]',
      "data.store": "[ 'ccm.store',{ 'store':'star_rating_data' } ]",
      "user": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.1.js',['ccm.get','https://ccmjs.github.io/akless-components/user/resources/configs.js','guest']]"
    },
    "onfinish": { "log": true }
  },

  "crud_app": {
    "builder": [ "ccm.component", "ccm.star_rating_builder.js",
      {
        "preview": true,
        "defaults": {
          "star_title": '[ "Gefällt mir gar nicht", "Gefällt mir nicht", "Ist Ok", "Gefällt mir", "Gefällt mir sehr" ]',
          "data.store": "[ 'ccm.store',{ 'store':'star_rating_data' } ]",
          "user": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.1.js',['ccm.get','https://ccmjs.github.io/akless-components/user/resources/configs.js','guest']]"
        },
        "onfinish": { "log": true }
      }
    ],
    "store": [ "ccm.store", { "store": "star_rating" } ],
    "url": "../star_rating/ccm.star_rating.js"
  }
};