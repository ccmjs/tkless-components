ccm.files[ "configs.js" ] = {
  "demo": {
    "key": "demo",
    "submit_button": "Submit",
    "preview": true,
    "defaults": {
      "star_title": '[ "I do not Like It At All", "I do not Like It", "It Is OK", "I Like It", "I Like It a Lot" ]',
      "data.store": "{ [ 'ccm.store',{ 'name':'star_rating_data', 'url': 'https://ccm2.inf.h-brs.de' } ], 'key': 'demo' }",
      "user": "[ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js', " +
      "[ 'ccm.get', 'https://ccmjs.github.io/akless-components/user/resources/configs.js', 'compact' ] ]"
    }
  },

  "local": {
    "submit_button": "Submit",
    "preview": true,
    "defaults": {
      "star_title": '[ "I do not Like It At All", "I do not Like It", "It Is OK", "I Like It", "I Like It a Lot" ]',
      "data.store": "[ 'ccm.store',{ 'name':'star_rating_data' } ]",
      "user": "[ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js', " +
      "[ 'ccm.get', 'https://ccmjs.github.io/akless-components/user/resources/configs.js', 'compact' ] ]"
    },
    "onfinish": { "log": true }
  },

  "crud_app": {
    "builder": [ "ccm.component", "ccm.star_rating_builder.js",
      {
        "preview": true,
        "defaults": {
          "star_title": '[ "I do not Like It At All", "I do not Like It", "It Is OK", "I Like It", "I Like It a Lot" ]',
          "data.store": "[ 'ccm.store',{ 'store':'star_rating_data' } ]",
          "user": "[ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js', " +
          "[ 'ccm.get', 'https://ccmjs.github.io/akless-components/user/resources/configs.js', 'compact' ] ]"
        },
        "onfinish": { "log": true }
      }
    ],
    "store": [ "ccm.store", { "store": "star_rating" } ],
    "url": "../star_rating/ccm.star_rating.js"
  }
};