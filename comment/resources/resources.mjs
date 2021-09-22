/**
 * @overview data-based resources of ccmjs-based web component for commentary
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const local = {
  "css": [ "ccm.load",
    [  // serial
      "./../libs/bootstrap-5/css/bootstrap.css",
      "./../comment/resources/styles.css"
    ],
    "./../libs/bootstrap-5/css/bootstrap-icons.css",
    { "url": "./../libs/bootstrap-5/css/bootstrap-fonts.css", "context": "head" },
  ],
  "data": {
    "store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "comment-data" } ],
    "key": { "app": "test" }
  },
  "html.1": "./../comment/resources/templates.mjs",
  "libs": [ "ccm.load",
    "./../libs/dayjs/dayjs.min.js",
    "./../libs/dayjs/relativeTime.min.js"
  ],
  "picture": "./../comment/resources/user.svg",
  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "cloud" ] ]
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "data": {
    "store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "comment-data" } ],
    "key": { "app": "demo" }
  }
};

/**
 * example for app state data
 * @type {Object}
 */
export const data = {
  "test,comment1": {
    "key": [ "test", "comment1" ],
    "app": "test",
    "comment": "comment1",
    "picture": "https://akless.github.io/akless/resources/images/akless.jpg",
    "user": "André Kless",
    "text": "Hi",
    "created_at": "2021-09-14T18:09:42+01:00",
    "updated_at": "2021-09-14T18:09:42+01:00",
    "_": { "creator": "akless", "realm": "cloud" }
  },
  "test,comment1,answer1": {
    "key": [ "test", "comment1", "answer1" ],
    "app": "test",
    "comment": "comment1",
    "answer": "answer1",
//  "picture": "user.svg",
    "user": "Tea Kless",
    "text": "Re: Hi",
    "created_at": "2021-09-14T18:10:42+01:00",
    "updated_at": "2021-09-14T18:10:42+01:00",
    "_": { "creator": "tkless", "realm": "cloud" },
  },
  "test,comment1,answer2": {
    "key": [ "test", "comment1", "answer2" ],
    "app": "test",
    "comment": "comment1",
    "answer": "answer2",
    "picture": "https://akless.github.io/akless/resources/images/akless.jpg",
    "user": "André Kless",
    "text": "Re: Re: Hi",
    "created_at": "2021-09-14T18:11:42+01:00",
    "updated_at": "2021-09-14T18:11:42+01:00",
    "_": { "creator": "akless", "realm": "cloud" },
  },
  "test,comment2": {
    "key": [ "test", "comment2" ],
    "app": "test",
    "comment": "comment2",
//  "picture": "user.svg",
    "user": "Tea Kless",
    "text": "Huhu",
    "created_at": "2021-09-15T07:12:42+01:00",
    "updated_at": "2021-09-15T07:13:42+01:00",
    "_": { "creator": "tkless", "realm": "cloud" }
  },
  "test,akless": {
    "key": [ "test", "akless" ],
    "app": "test",
    "user": "akless",
    "comments": {
      "test,comment2": {
        "like": true,
        "heart": true
      }
    },
    "_": { "creator": "akless", "realm": "cloud" }
  },
  "test,mkless": {
    "key": [ "test", "mkless" ],
    "app": "test",
    "user": "mkless",
    "comments": {
      "test,comment2": {
        "like": false,
        "heart": true,
        "report": true
      }
    },
    "_": { "creator": "mkless", "realm": "cloud" }
  }
};