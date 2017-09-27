ccm.files[ "configs.js" ] = {
  "demo": {
    editable: true,
    sorting_by_voting: true,
    data: {
      store: [ 'ccm.store', { 'store': 'comment', 'url': 'https://ccm.inf.h-brs.de' } ],
      key: 'demo'
    },
    user: [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-1.2.0.min.js' ],
    voting: [ 'ccm.component', 'https://tkless.github.io/ccm-components/voting/versions/ccm.voting-1.0.0.js', {
      icon_likes: 'fa fa-lg fa-chevron-up',
      icon_dislikes: 'fa fa-lg fa-chevron-down',
      data: { store: [ 'ccm.store', { 'store': 'voting', 'url': 'https://ccm.inf.h-brs.de' } ] },
      user: [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-1.2.0.min.js' ]
    } ]
  },

  "local": {
    editable: true,
    sorting_by_voting: true,
    data: {
      store: [ 'ccm.store', '../comment/resources/datastore.js' ],
      key: 'demo'
    },
    user: [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/ccm.user.js' ], //{ logged_in: true, 'guest.user': 'tmeskh2s' } ],
    voting: [ 'ccm.component', '../voting/ccm.voting.js', {
      icon_likes: 'fa fa-lg fa-chevron-up',
      icon_dislikes: 'fa fa-lg fa-chevron-down',
      data: { store: [ 'ccm.store', '../voting/resources/datastore.js' ] },
      user: [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/ccm.user.js' ]
    } ]
  }
};