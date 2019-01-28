/**
 * @overview configurations of ccm component for creating apps
 * @author Tea Kless <tea.kless@web.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    "key": "local",
    "data": {
      "store": [ "ccm.store", "https://ccmjs.github.io/tkless-components/accordion/resources/configs.js" ],
      "key": "demo"
    },
    "builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-6.7.2.js", [ "ccm.get", "https://ccmjs.github.io/tkless-components/accordion/resources/configs.js", "accordion_builder" ] ],
    "app": [ "ccm.component", "https://ccmjs.github.io/tkless-components/accordion/versions/ccm.accordion-2.0.0.js" ]},

  "localhost": {
    "key": "localhost",
    "builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/ccm.json_builder.js", {
      "html.inner.1": "",
      "directly": true
    } ],
    "app": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/ccm.content.js" ]
  },

  "demo": {
    "key": "demo",
    "data": { "store": [ "ccm.store", { "name": "quick_decide", "url": "http://localhost:8080" } ] },
    "builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-6.7.0.js", [ "ccm.get", { "name": "submit", "url": "https://ccm2.inf.h-brs.de" }, "quick_decide_builder" ] ],
    "app": [ "ccm.component", "https://ccmjs.github.io/akless-components/quick_decide/versions/ccm.quick_decide-1.3.0.js" ]
  }

};