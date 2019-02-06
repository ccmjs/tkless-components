ccm.files[ "configs.js" ] = {
  "local": {
    "data":  {
      "store": [ "ccm.store", { "name": "star_rating_data" } ],
      "key": "demo"
    },
    "star_title": ["I do not Like It at All", "I do not Like It", "It Is OK", "I Like It", "Like It a Lot"],
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ]
  }
};