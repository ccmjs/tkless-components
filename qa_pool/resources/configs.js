ccm.files[ "configs.js" ] = {
  "ak": {
    "live_poll": {
      "url": "https://ccmjs.github.io/akless-components/live_poll/versions/ccm.live_poll-2.4.0.js",
      "store": [ "ccm.store", { "url": "wss://ccm2.inf.h-brs.de", "name": "qa_akless_live_poll" } ],
      "results": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "qa_akless_live_poll_results" } ],
      "password": "weD5mwz"
    },
    "quiz": {
      "url": "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.1.0.js",
      "store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "qa_akless_quiz" } ]
    },
    "data": {
      "store": [ "ccm.store", { "name": "qa_pool_akless", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo_qa_pool"
    },
  },

  "mw": {
    "data": {
      "store": [ "ccm.store", { "name": "qa_pool_marko_winzker", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "demo_qa_pool"
    },
  }
};
