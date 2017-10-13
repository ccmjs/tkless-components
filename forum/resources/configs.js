ccm.files[ 'configs.js' ] = {
  'demo': {
    data: { store: [ 'ccm.store', { 'store': 'forum', 'url': 'https://ccm.inf.h-brs.de' } ], key: 'demo' },
    user:  [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/ccm.user.js', { 'sign_on': 'demo'} ],

    question: [ 'ccm.component', 'https://tkless.github.io/ccm-components/question/versions/ccm.question-1.0.0.js', {
      data: { store: [ 'ccm.store', { 'store': 'question', 'url': 'ws://ccm.inf.h-brs.de' } ] },
      user:  [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/ccm.user.js', { logged_in: true, 'sign_on': 'demo'} ],
      voting: [ 'ccm.component', 'https://tkless.github.io/ccm-components/voting/versions/ccm.voting-1.0.0.js', {
        data: { store: [ 'ccm.store', { 'store': 'voting', 'url': 'ws://ccm.inf.h-brs.de' } ] },
        user: [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/ccm.user.js', { 'sign_on': 'demo' } ]
      }]
    } ],

  },

  'local': {
    data: { store: [ 'ccm.store', '../forum/resources/datastore.js' ], key: "demo" },
    user:  [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/ccm.user.js' ],

    question: [ 'ccm.component', '../question/ccm.question.js', {
      data: { store: [ 'ccm.store', '../question/resources/datastore.js' ] },
      user:  [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/ccm.user.js', { logged_in: true } ],
      voting: [ 'ccm.component', '../voting/ccm.voting.js', {
        data: { store: [ 'ccm.store', '../voting/resources/datastore.js' ] },
        user: [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/ccm.user.js' ]
      } ]
    } ]

  },

  'localhost': {
    data: { store: [ 'ccm.store', { 'store': 'forum', 'url': 'ws://localhost:8080' } ], key: 'demo' },
    user:  [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/ccm.user.js', { 'sign_on': 'demo'} ],

    question: [ 'ccm.component', '../question/ccm.question.js', {
      data: { store: [ 'ccm.store', { 'store': 'question', 'url': 'ws://localhost:8080' } ] },
      user:  [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/ccm.user.js', { logged_in: true, 'sign_on': 'demo'} ],
      voting: [ 'ccm.component', '../voting/ccm.voting.js', {
        data: { store: [ 'ccm.store', { 'store': 'voting', 'url': 'ws://localhost:8080' } ] },
        user: [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/ccm.user.js', { 'sign_on': 'demo' } ]
        }
      ]
    } ],

  },
};