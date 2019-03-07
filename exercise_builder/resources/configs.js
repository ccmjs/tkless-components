ccm.files[ "configs.js" ] = {
  "demo": {
    "key": "demo",
    "preview": true,
    "submit_button": "Submit",
    "defaults": {
      "onfinish": {
        "store": {
          "settings": {
            "name": "exercise_data",
            "url": "http://localhost:8080"
          }
        }
      },
      "user": "[ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.0.0.js', " +
        "[ 'ccm.get', 'https://ccmjs.github.io/akless-components/user/resources/configs.js', 'compact' ] ]"
    },
    "onfinish": { "log": true }
  }
};