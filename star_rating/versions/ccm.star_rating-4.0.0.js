/**
 * @overview ccm component for voting
 * @author Tea Kless <tea.kless@web.de>, 2016-2019
 * @license The MIT License (MIT)
 * @version 4.0.0
 * @changes
 * version 3.0.0 (26.04.2019)
 * - data structure changed due to side effects
 * version 3.0.0 (06.01.2019)
 * - uses ccm v20.0.0
 */
( function () {

  const component = {

    name: 'star_rating',
    version: [ 3,0,0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',

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
      // "star_title": ["I do not Like It at All", "I do not Like It", "It Is OK", "I Like It", "Like It a Lot"],
      // "data":  {
      //     "store": [ "ccm.store", "resources/datastore.js" ],
      //     "key":   "demo"
      // },
      // "onfinish": { "log": true },
      // "user":  [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
      //   [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ]
      // ],
      //"show_results": true,
      "rating_result": [ "ccm.component", "https://ccmjs.github.io/tkless-components/star_rating_result/versions/ccm.star_rating_result-3.0.1.js" ],
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

      this.init = async () => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        if ( self.logger ) self.logger.log( 'ready', $.clone( my ) );

        // listen to change event of ccm realtime datastore => (re)render own content
        if ( self.data ) self.data.store.onchange = self.start;

        // listen to login/logout event => (re)render own content
        if ( self.user ) self.user.onchange = self.start;
      };

      this.start = async () => {

        const dataset = await $.dataset( my.data );

        if( !dataset.stars ) dataset.stars = {};

        if( my.show_results )
          return await my.rating_result.start({
            root: self.element,
            detailed: true,
            data: my.data
          });

        let main_elem = $.html( my.html.main );

        // render html content
        renderStars();

        function renderStars() {

          for ( let i = 5; i >= 1; i-- ) {
            const input_elem = $.html( my.html.input, {
              id: i,
              star: i,
              click: doVoting
            } );

            if ( self.user && self.user.isLoggedIn() && dataset.stars[ i ] && dataset.stars[ i ][ self.user.data().user ] ) input_elem.checked = true;
            main_elem.appendChild( input_elem );

            main_elem.appendChild( $.html( my.html.label, {
              for: i,
              title: my.star_title ? my.star_title[ i - 1 ]: ''
            } ) );
          }

          $.setContent( self.element, main_elem );
        }

        async function doVoting()   {

          await self.user.login( self.start );

          let checked = self.element.querySelector( 'input[name="rating"]:checked' ).value;

          let user = self.user.data().user;

          if ( !dataset.stars[ checked ] )
            dataset.stars[ checked ] = {};

          if ( dataset.stars[ checked ][ user ] ) {
            // revert vote
            delete dataset.stars[ checked ][ user ];
          }
          // not voted
          else {

            for ( let key in dataset.stars ) {
              if ( dataset.stars[ key ][ user ] ) delete dataset.stars[ key ][ user ];
            }

            // proceed voting
            dataset.stars[ checked ][ user ] = true;
          }

          // update dataset for rendering => (re)render own content
          await my.data.store.set( dataset );
          await self.start();
        }

      };

    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();