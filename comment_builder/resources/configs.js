ccm.files[ "configs.js" ] = {

  "w&s_chat": {
    "key": "chat",
    "html.inner.0.inner.inner.1.inner": 'Chat',
    "html.inner.1.inner.4": '',
    "html.inner.1.inner.5.inner.1.inner.1": '',
    "html.inner.1.inner.6": '',
    "html.inner.1.inner.7": '',
    "html.inner.1.inner.8": '',
    "submit_button": false,
    "preview": false,
    "defaults": {
      "chat": true,
      "data.store": "[ 'ccm.store',{ 'name':'w&s_chat_data', 'url': 'https://ccm2.inf.h-brs.de' } ]",
      "user": "[ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js', " +
        "[ 'ccm.get', 'https://ccmjs.github.io/akless-components/user/resources/configs.js', 'compact' ] ]"
    }
  },

  "chat": {
    "key": "chat",
    "html.inner.0.inner.inner.1.inner": 'Chat',
    "html.inner.1.inner.4": '',
    "html.inner.1.inner.6": '',
    "html.inner.1.inner.7": '',
    "html.inner.1.inner.8": '',
    "submit_button": "Submit",
    "preview": true,
    "defaults": {
      "chat": true,
      "data.store": "[ 'ccm.store',{ 'name':'chat_data', 'url': 'https://ccm2.inf.h-brs.de' } ]",
      "user": "[ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js', " +
      "[ 'ccm.get', 'https://ccmjs.github.io/akless-components/user/resources/configs.js', 'compact' ] ]"
    }
  },

  "demo": {
    "key": "demo",
    "submit_button": "Submit",
    "preview": true,
    "defaults": {
      "data.store": "[ 'ccm.store',{ 'name':'comment_data', 'url': 'https://ccm2.inf.h-brs.de' } ]",
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