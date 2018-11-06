ccm.files[ "configs.js" ] = {
  "learning_apps": {
    key:"learning_apps",
    slides: [ 'ccm.get', 'https://ccmjs.github.io/tkless-components/slidecast/resources/datasets.js', 'learning_apps.slides'],
  },

  "demo": {
    key:"demo",
    slides: [ 'ccm.get', 'https://ccmjs.github.io/tkless-components/slidecast/resources/datasets.js', 'demo_online.slides'],
  },

  "local": {
    slides: [ 'ccm.get', 'resources/datasets.js', 'demo_offline.slides'],
  }
};