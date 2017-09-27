ccm.files[ "configs.js" ] = {
  demo: {
    data: { store: [ 'ccm.store', { store: 'voting', url: 'wss://ccm.inf.h-brs.de' } ], key: 'demo' },
    user: [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-1.2.0.min.js' ]
  },

  local: {
    data: { store: [ 'ccm.store', '../voting/resources/datastore.js' ], key: 'demo' },
    user: [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/ccm.user.js' ]
  }
};