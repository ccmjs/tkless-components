/**
 * @overview ccm component for voting
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 */
( function () {

  var ccm_version = '9.0.0';
  var ccm_url     = 'https://akless.github.io/ccm/ccm.js';

  var component_name = 'star_rating_result';
  var component_obj  = {

    name: component_name,
    config: {
      templates: {
        "main": {
          "class": "main",
          "inner": [
            {
            "id": "reviewed_stars",
            "inner": [
              {
                "class" : "rating"
              },
              {
                "id": "total-count"
              }
            ]
            },
            {
              "id": "bars"
            }
          ]
        },

        "input": {
          "tag": "input",
          "type": "radio",
          "name": "rating",
          "id":   "%id%",
          "value":"%star%"
        },

        "label": {
          "tag": "label",
          "class": "%class%",
          "for": "%for%"
        },

        "bar": {
          "class": "bar",
          "inner": [
            {
              "class": "stars",
              "inner": "%% Sterne"
            },
            {
              "class": "container",
              "inner": {
                "class": "percentage"
              }
            }
          ]
        }
      },

      data:  {
          store: [ 'ccm.store', 'https://tkless.github.io/ccm-components/star_rating_result/star_rating_datastore.js' ],
          key:   'demo'
      },
      style: [ 'ccm.load', 'https://tkless.github.io/ccm-components/star_rating_result/style.css' ],
      icons: [ 'ccm.load', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css', { url: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css', context: document.head } ]

    },

    Instance: function () {
      var self = this;
      var total = 0;

      this.start = function ( callback ) {

        self.ccm.helper.dataset( self.data.store, self.data.key, function ( dataset ) {
          if ( !dataset ) dataset = {};

          self.ccm.helper.setContent( self.element, self.ccm.helper.protect( self.ccm.helper.html( self.templates.main ) ) );

          //calculate average of rating
          var sum = 0;
          var count = 0;

          for ( var i = 1; i <= 5; i++ ) {
            if ( !dataset[ i ] ) continue;
            sum += i * Object.keys( dataset[ i ] ).length;
            count += Object.keys( dataset[ i ] ).length;
          }
          total = sum / count;

          //render html content
          renderBars();
          renderStars();

          function renderStars() {

            for ( var i = 5; i >= 0.5; i -= 0.5 ) {
              self.element.querySelector( '.rating' ).appendChild( self.ccm.helper.protect( self.ccm.helper.html( self.templates.input, {
                id: i,
                star: i
              } ) ) );

              self.element.querySelector( '.rating' ).appendChild( self.ccm.helper.protect( self.ccm.helper.html( self.templates.label, {
                class: ( ( i * 2 ) % 2 === 0) ? "full" : "half",
                for: i
              } ) ) );
            }

            self.element.querySelector( '#total-count' ).innerHTML = count;

            calculateChackedStars();

            function calculateChackedStars() {
              var y = parseInt( total * 100 % 100 );
              var z = parseInt( total ) + ( y < 25 ? 0 : ( y >= 75 ? 1 : 0.5 ) );

              self.element.querySelector( 'input[ id = "'+ z +'" ]' ).checked = true;
            }
          }

          function renderBars() {

            for ( var i = 5; i >= 1; i-- ){
              var bar = self.ccm.helper.protect( self.ccm.helper.html( self.templates.bar, i ) );
              self.element.querySelector( '#bars' ).appendChild( bar );

              //render bar
              var percentage_div = bar.querySelector( '.percentage' );
              var percentage = 0;

              if ( dataset[i] ) {
                percentage_div.innerHTML = Object.keys( dataset[ i ] ).length;
                percentage =  ( Object.keys( dataset[ i ] ).length * 100 ) / count ;
              }
              else
                percentage_div.innerHTML = '';

              percentage_div.style.width = percentage + '%';
            }
          }

          if ( callback )callback();
        } );

      };

      this.getVoting = function () {
       return total;
      }

    }
  };

  var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
  if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
  function register() { ccm[ ccm_version ].component( component_obj ); }
}() );