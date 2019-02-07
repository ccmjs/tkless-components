ccm.files[ 'configs.js' ] = {
  'demo': {
    data: { store: [ 'ccm.store', { 'store': 'forum', 'url': 'https://ccm.inf.h-brs.de' } ], key: 'demo' },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ],

    question: [ 'ccm.component', 'https://ccmjs.github.io/tkless-components/question/versions/ccm.question-2.0.0.js', {
      data: { store: [ 'ccm.store', { 'store': 'question', 'url': 'ws://ccm.inf.h-brs.de' } ] },
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
        [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ],
      voting: [ 'ccm.component', 'https://ccmjs.github.io/tkless-components/voting/versions/ccm.voting-3.0.0.js', {
        data: { store: [ 'ccm.store', { 'store': 'voting', 'url': 'ws://ccm.inf.h-brs.de' } ] },
        "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
          [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ]
      }]
    } ],

  },

  'local': {
    data: { store: [ 'ccm.store', '../forum/resources/datastore.js' ], key: "demo" },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ],

    question: [ 'ccm.component', '../question/ccm.question.js', {
      data: { store: [ 'ccm.store', '../question/resources/datastore.js' ] },
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
        [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ],
      voting: [ 'ccm.component', '../voting/ccm.voting.js', {
        data: { store: [ 'ccm.store', '../voting/resources/datastore.js' ] },
        "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
          [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ]
      } ]
    } ]

  },

  'localhost': {
    data: { store: [ 'ccm.store', { 'store': 'forum', 'url': 'ws://localhost:8080' } ], key: 'demo' },
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ],

    question: [ 'ccm.component', '../question/ccm.question.js', {
      data: { store: [ 'ccm.store', { 'store': 'question', 'url': 'ws://localhost:8080' } ] },
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
        [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ],
      voting: [ 'ccm.component', '../voting/ccm.voting.js', {
        data: { store: [ 'ccm.store', { 'store': 'voting', 'url': 'ws://localhost:8080' } ] },
        "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
          [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ]
        }
      ]
    } ],

  },
};