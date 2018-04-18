/**
 * @overview ccm component for voting
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 */
( function () {

  var component  = {

    name: 'star_rating',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {
      templates: {
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

      data:  {
          store: [ 'ccm.store', '../star_rating/star_rating_datastore.js' ],
          key:   'demo'
      },
      star_title: [ "Gefällt mir gar nicht", "Gefällt mir nicht",
        "Ist Ok", "Gefällt mir", "Gefällt mir sehr" ],
      user:  [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/ccm.user.min.js' ],
      css: [ 'ccm.load',
        { url: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css', context: document.head },
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
        '../star_rating/style.css'
      ]
    },


    Instance: function () {
      var self = this;

      this.init = function ( callback ) {

        // listen to change event of ccm realtime datastore => (re)render own content
        self.data.store.onChange = function () { self.start(); };

        callback();
      };

      this.start = function ( callback ) {

        document.head.appendChild( self.ccm.helper.html( {
           tag:   'style',
           inner: "@font-face { font-family: 'FontAwesome'; src: url('../libs/font-awesome/fonts/fontawesome-webfont.eot?v=4.7.0'); src: url('../libs/font-awesome/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'), url('../libs/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'), url('../libs/font-awesome/fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'), url('../libs/font-awesome/fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype'), url('../libs/font-awesome/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg'); font-weight: normal; font-style: normal; }"
        } ) );

        self.ccm.helper.dataset( self.data.store, self.data.key, function ( dataset ) {

          var main_elem = self.ccm.helper.html( self.templates.main );

          // render html content
          renderStars();


          function renderStars() {

            for ( var i = 5; i >= 1; i-- ) {
              var input_elem = self.ccm.helper.html( self.templates.input, {
                id: i,
                star: i,
                click: function () { if ( self.user ) doVoting(); }
              } );

              if ( self.user && self.user.isLoggedIn() && dataset[ i ] && dataset[ i ][ self.user.data().user ] ) input_elem.checked = true;
              main_elem.appendChild( input_elem );

              main_elem.appendChild( self.ccm.helper.html( self.templates.label, {
                for: i,
                title: self.star_title[ i - 1 ]
              } ) );
            }

            self.ccm.helper.setContent( self.element, self.ccm.helper.protect( main_elem ) );

          }

          function doVoting() {

            self.user.login( function () {

              var checked = self.element.querySelector( 'input[name="rating"]:checked' ).value;

              var user = self.user.data().key;

              if ( !dataset[ checked ] )
                dataset[ checked ] = {};

              if ( dataset[ checked ][ user ] ) {
                // revert vote
                delete dataset[ checked ][ user ];
              }
              // not voted
              else {

                for ( var key in dataset ) {
                  if ( dataset[ key ][ user ] ) delete dataset[ key ][ user ];
                }

                // proceed voting
                dataset[ checked ][ user ] = true;
              }

              // update dataset for rendering => (re)render own content
              self.data.store.set( dataset, function () { self.start(); } );

            });
          }

          if ( callback )callback();
        } );

      };

    }
  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );