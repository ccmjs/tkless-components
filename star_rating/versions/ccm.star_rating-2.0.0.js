/**
 * @overview ccm component for voting
 * @author Tea Kless <tea.kless@web.de>, 2018
 * @license The MIT License (MIT)
 * @version 2.0.0
 *  - ES6
 *  - adjust defualt config
 *  - use ccm v16.6.0
 */
{
  var component = {

    name: 'star_rating',
    version: [ 2, 0, 0 ],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: {
      url: 'https://ccmjs.github.io/ccm/versions/ccm-16.6.0.js',
      integrity: 'sha256-9U5Q2yiY5v1Tqp8ZJjCRnZrG8T1B14LdVf/PWOOUycE= sha384-LcGBJPmX/Aq5Jkre3q9yE+UCsd7vPWIgeBb9ayc4TIAl5H1nJpewlkKCDK8eCc7s sha512-YANGRGQdJYghxk/7O2bIMsT+XOJ1fzE6Lc6zGJxG+GsdMKznGTdZ8z3d+fnrvqOeEl6qmqxkIP6DueDq2dG0rw==',
      crossorigin: 'anonymous'
    },

    config: {
      "html": {
        "main": {
          "class" : "rating"
        },

        "input": {
          "tag": "input",
          "type": "radio",
          "name": "rating",
          "id":   "%id%",
          "value":"%star%",
          "onclick": "%click%"
        },

        "label": {
          "tag": "label",
          "class": "label",
          "for": "%for%",
          "title": "%title%"
        }
      },
      // "star_title": [ "Gefällt mir gar nicht", "Gefällt mir nicht",
      //   "Ist Ok", "Gefällt mir", "Gefällt mir sehr" ],
      // "data":  {
      //     "store": [ "ccm.store", "resources/datastore.js" ],
      //     "key":   "demo"
      // },
      // "onfinish": {
      //   "log": true
      // },
      // "user":  [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-7.0.1.js",
      //   [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ]
      // ],
      "css": [ "ccm.load",
        { "context": "head", "url": "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" },
        "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css",
        "https://ccmjs.github.io/tkless-components/star_rating/resources/default.css"
      ]
    },


    Instance: function () {
      /**
       * own reference for inner functions
       * @type {Instance}
       */
      const self = this;

      /**
       * privatized instance members
       * @type {object}
       */
      let my;

      /**
       * shortcut to help functions
       * @type {Object.<string,function>}
       */
      let $;

      this.init = callback => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        if ( self.logger ) self.logger.log( 'ready', my );

        // listen to change event of ccm realtime datastore => (re)render own content
        my.data.store.onChange = function () { self.start(); };

        callback();
      };

      this.start = callback => {

        $.dataset( my.data, function ( dataset ) {

          let main_elem = $.html( my.html.main );

          // render html content
          renderStars();

          function renderStars() {

            for ( let i = 5; i >= 1; i-- ) {
              const input_elem = $.html( my.html.input, {
                id: i,
                star: i,
                click: function () { if ( self.user ) doVoting(); }
              } );

              if ( self.user && self.user.isLoggedIn() && dataset[ i ] && dataset[ i ][ self.user.data().user ] ) input_elem.checked = true;
              main_elem.appendChild( input_elem );

              main_elem.appendChild( $.html( my.html.label, {
                for: i,
                title: my.star_title ? my.star_title[ i - 1 ]: ''
              } ) );
            }

            $.setContent( self.element, main_elem );

            if ( callback )callback();
          }

          function doVoting() {

            self.user.login( function () {

              let checked = self.element.querySelector( 'input[name="rating"]:checked' ).value;

              let user = self.user.data().user;

              if ( !dataset[ checked ] )
                dataset[ checked ] = {};

              if ( dataset[ checked ][ user ] ) {
                // revert vote
                delete dataset[ checked ][ user ];
              }
              // not voted
              else {

                for ( let key in dataset ) {
                  if ( dataset[ key ][ user ] ) delete dataset[ key ][ user ];
                }

                // proceed voting
                dataset[ checked ][ user ] = true;
              }

              // update dataset for rendering => (re)render own content
              my.data.store.set( dataset, function () { self.start(); } );

            });
          }
        } );

      };

    }
  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}