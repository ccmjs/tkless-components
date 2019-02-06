ccm.files[ 'configs.js' ] = {
  'demo': {
    data: { store: [ 'ccm.store', 'https://ccmjs.github.io/tkless-components/question/resources/datastore.js' ], key: "demo" },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ],
    voting: [  "ccm.component", "https://ccmjs.github.io/tkless-components/voting/versions/ccm.voting-3.0.0.js", {
      data: { store: [ 'ccm.store', { 'name': 'voting_data', 'url': 'https://ccm.inf.h-brs.de' } ] },
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js" ]
    } ]
  },

  'local': {
    data: { store: [ 'ccm.store', '../question/resources/datastore.js' ], key: "demo" },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ],
    voting: [ 'ccm.component', '../voting/ccm.voting.js', {
      data: { store: [ 'ccm.store', '../voting/resources/datastore.js' ] },
      user: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js' ]
      }
    ]
  },

  "localhost": {
    "data": { "store": [ "ccm.store", { "name": "question_data", "url": 'http://localhost:8080' } ], "key": "demo" },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ],
    "voting": [ 'ccm.component', 'https://ccmjs.github.io/tkless-components/voting/versions/ccm.voting-3.0.0.js', {
      "data": { store: [ 'ccm.store', { 'name': 'voting_data', 'url': 'ws://localhost:8080' } ] },
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
        [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ]
      }
    ]
  }
};