ccm.files[ "configs.js" ] = {

  "chat": {
    "key": "chat",
    "html.inner.0.inner": 'Build your Chat Component',
    "html.inner.1.inner.4": '',
    "html.inner.1.inner.6": '',
    "html.inner.1.inner.7": '',
    "html.inner.1.inner.8": '',
    "submit_button": "Submit",
    "preview": true,
    "defaults": {
      "chat": true,
      "data.store": "{ [ 'ccm.store',{ 'name':'voting_data', 'url': 'https://ccm2.inf.h-brs.de' } ], 'key': 'demo' }",
      "user": "[ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js', " +
      "[ 'ccm.get', 'https://ccmjs.github.io/akless-components/user/resources/configs.js', 'compact' ] ]"
    }
  },

  "demo": {
    "key": "demo",
    "submit_button": "Submit",
    "preview": true,
    "defaults": {
      "data.store": "{ [ 'ccm.store',{ 'name':'voting_data', 'url': 'https://ccm2.inf.h-brs.de' } ], 'key': 'demo' }",
      "user": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js'," +
      "['ccm.get','https://ccmjs.github.io/akless-components/user/resources/configs.js','compact']]"
    }
  },

  "local": {
    "submit_button": "Submit",
    "preview": true,
    "defaults": {
      "data.store": "['ccm.store',{'name':'comment_data'}]",
      "user": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js'," +
      "['ccm.get','https://ccmjs.github.io/akless-components/user/resources/configs.js','compact']]"
    },
    "onfinish": { "log": true }
  }
};