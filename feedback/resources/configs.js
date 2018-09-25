ccm.files[ "configs.js" ] = {

  "demo": {
    "data": { "store": [ "ccm.store", { "name": "feedback", "url": "https://ccm2.inf.h-brs.de" } ], "key": "demo" },
  },

  "localhost": {
    "from_above": "30%",
    "data": { "store": [ "ccm.store", { "name": "feedback", "url": "http://localhost:8080" } ], "key": "demo" }
  },

  "local_left": {
    "from_above": "30%",
    "css": [ "ccm.load", "https://ccmjs.github.io/tkless-components/feedback/resources/left.css" ],
    "data": { "store": [ "ccm.store", { "name": "feedback" } ], "key": "demo" },
  },

  "local_right": {
    "from_above": "30%",
    "css": [ "ccm.load", "https://ccmjs.github.io/tkless-components/feedback/resources/right.css" ],
    "data": { "store": [ "ccm.store", { "name": "feedback" } ], "key": "demo" },
  }

};