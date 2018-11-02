ccm.files[ "configs.js" ] = {

  "chat": {
    "key": "chat",
    "html.inner.0.inner": 'Build your Chat Component',
    "html.inner.1.inner.2": '',
    "html.inner.1.inner.4": '',
    "html.inner.1.inner.5": '',
    "html.inner.1.inner.6": '',
    "submit_button": "Submit",
    "preview": true,
    "defaults": {
      "chat": true,
      "data.store": "['ccm.store',{'name':'chat_data'}]",
      "user": "[ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js', " +
      "[ 'ccm.get', 'https://ccmjs.github.io/akless-components/user/resources/configs.js', 'compact' ] ]"
    },
    "onfinish": { "log": true }
  },

  "demo": {
    "key": "demo",
    "submit_button": "Submit",
    "preview": true,
    "defaults": {
      "data.store": "['ccm.store',{'name':'comment_data'}]",
      "user": "['ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js'," +
      "['ccm.get','https://ccmjs.github.io/akless-components/user/resources/configs.js','compact']]"
    },
    "onfinish": { "log": true }
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