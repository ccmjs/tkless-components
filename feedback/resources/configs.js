ccm.files[ "configs.js" ] = {

  "demo": {
    "data": { "store": [ "ccm.store", { "name": "feedback", "url": "https://ccm2.inf.h-brs.de" } ], "key": "demo" },
  },

  "localhost": {
    "from_above": "30%",
    "position": "right",
    "data": { "store": [ "ccm.store", { "name": "feedback", "url": "http://localhost:8080" } ], "key": "demo" }
  },

  "local": {
    "from_above": "30%",
    "position": "right",
    "data": { "store": [ "ccm.store", { "name": "feedback" } ], "key": "demo" },
  }

};