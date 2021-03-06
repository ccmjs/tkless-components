/**
 * @overview ccm component for voting
 * @author Tea Kless <tea.kless@web.de>, 2018
 * @license The MIT License (MIT)
 * @version 2.0.0
 *  - ccm v16.6.0
 *  - update "magic line"
 */
{
  var component = {

    name: 'star_rating_result',
    version:[ 2,0,0 ],

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
          "id": "main",
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
      // "detailed": true,
      // "data":  {
      //     "store": [ "ccm.store", "../star_rating_result/resources/datastore.js" ],
      //     "key":   "demo"
      // },
      "css": [ "ccm.load",
        { context: 'head', url: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css' },
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
        'https://ccmjs.github.io/tkless-components/star_rating_result/resources/default.css'
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

      let total = 0;

      this.ready = callback => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        if ( my.logger ) my.logger.log( 'ready', my );

        callback();

      };

      this.start = callback => {

        $.dataset( my.data, function ( dataset ) {

          if ( my.logger ) my.logger.log( 'start', my );

          $.setContent( self.element, $.html( my.html.main ) );

          //calculate average of rating
          let sum = 0;
          let count = 0;

          if ( Object.keys( dataset ).length > 1 ) {
            for ( let i = 1; i <= 5; i++ ) {
              if ( !dataset[ i ] ) continue;
              sum += i * Object.keys( dataset[ i ] ).length;
              count += Object.keys( dataset[ i ] ).length;
            }
            total = sum / count;
          }

          //render html content
          if ( my.detailed ) renderBars();
          renderStars();

          callback && callback();

          function renderStars() {
            for ( let i = 5; i >= 0.5; i -= 0.5 ) {
              self.element.querySelector( '.rating' ).appendChild( $.html( my.html.input, {
                id: i,
                star: i
              } ) );

              self.element.querySelector( '.rating' ).appendChild(  $.html( my.html.label, {
                class: ( ( i * 2 ) % 2 === 0) ? "full" : "half",
                for: i
              } ) );
            }

            $.setContent( self.element.querySelector( '#total-count' ),  count );

            if ( Object.keys( dataset ).length > 1 ) calculateChackedStars();

            function calculateChackedStars() {
              let y = parseInt( total * 100 % 100 );
              let z = parseInt( total ) + ( y < 25 ? 0 : ( y >= 75 ? 1 : 0.5 ) );

              self.element.querySelector( 'input[ id = "'+ z +'" ]' ).checked = true;
            }
          }

          function renderBars() {

            for ( let i = 5; i >= 1; i-- ){
              let bar = $.html( my.html.bar, ""+ i) ;
              self.element.querySelector( '#bars' ).appendChild( bar );

              //render bar
              let percentage_div = bar.querySelector( '.percentage' );
              let percentage = 0;

              if ( dataset[ i ] ) {
                $.setContent( percentage_div, Object.keys( dataset[ i ] ).length );
                percentage =  ( Object.keys( dataset[ i ] ).length * 100 ) / count ;
              }
              else
                $.setContent( percentage_div, " " );

              percentage_div.style.width = percentage + '%';
            }
          }
        } );

      };

      this.getValue = () => total;
    }
  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}