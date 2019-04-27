/**
 * @overview ccm component for voting
 * @author Tea Kless <tea.kless@web.de>, 2016-2019
 * @license The MIT License (MIT)
 *  @version 4.0.0
 * @changes
 * version 4.0.0 (26.04.2019)
 * - refactoring due to the changed data structure of the star rating
 * version 3.0.1 (06.02.2019)
 * - uses ccm v20.0.0
 * version 3.0.0 (14.09.2018)
 * - uses ccm v18.0.0
 */

( function () {

  const component = {

    name: 'star_rating_result',
    version: [ 4,0,0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',

    config: {

      "html": {
        "main": {
          "id": "main",
          "inner": [
            {
              "id": "reviewed_stars",
              "inner": [
                { "class" : "rating" },
                { "id": "total-count" }
              ]
            },
            { "id": "bars" }
          ]
        },
        "input": {
          "disabled": true,
          "tag": "input",
          "type": "radio",
          "name": "rating",
          "id": "%id%",
          "value": "%star%"
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
      "css": [ "ccm.load",
        { "context": "head", "url": "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" },
        "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css",
        "https://ccmjs.github.io/tkless-components/star_rating_result/resources/default.css"
      ]

      //  "data": {
      //    "store": [ "ccm.store", "https://ccmjs.github.io/tkless-components/star_rating_result/resources/datastore.js" ],
      //    "key": "demo"
      //  },
      //  "detailed": true

    },

    Instance: function () {

      const self = this;
      let $, total = 0;

      this.ready = async () => {

        // shortcut to help functions
        $ = self.ccm.helper;

        // logging of 'ready' event
        self.logger && self.logger.log( 'ready', $.privatize( self, true ) );

      };

      this.start = async () => {

        const dataset = await $.dataset( self.data );

        if ( !dataset.stars ) dataset.stars = {};

        // logging of 'start' event
        self.logger && self.logger.log( 'start', dataset );

        $.setContent( self.element, $.html( self.html.main ) );

        // calculate average of rating
        let sum = 0;
        let count = 0;
        for ( let i = 1; i <= 5; i++ ) {
          if ( !dataset.stars[ i ] ) continue;
          sum += i * Object.keys( dataset.stars[ i ] ).length;
          count += Object.keys( dataset.stars[ i ] ).length;
        }
        total = count ? sum / count : 0;

        // render html content
        if ( self.detailed ) renderBars();
        renderStars();

        function renderStars() {
          for ( let i = 5; i >= 0.5; i -= 0.5 ) {
            self.element.querySelector( '.rating' ).appendChild( $.html( self.html.input, {
              id: i,
              star: i
            } ) );

            self.element.querySelector( '.rating' ).appendChild(  $.html( self.html.label, {
              class: ( ( i * 2 ) % 2 === 0) ? "full" : "half",
              for: i
            } ) );
          }

          $.setContent( self.element.querySelector( '#total-count' ),  count );

          total && calculateCheckedStars();

          function calculateCheckedStars() {
            let y = parseInt( total * 100 % 100 );
            let z = parseInt( total ) + ( y < 25 ? 0 : ( y >= 75 ? 1 : 0.5 ) );

            self.element.querySelector( 'input[ id = "'+ z +'" ]' ).setAttribute( 'checked', true );
          }
        }

        function renderBars() {

          for ( let i = 5; i >= 1; i-- ){
            let bar = $.html( self.html.bar, ""+ i) ;
            self.element.querySelector( '#bars' ).appendChild( bar );

            //render bar
            let percentage_div = bar.querySelector( '.percentage' );
            let percentage = 0;

            if ( dataset.stars[ i ] ) {
              $.setContent( percentage_div, Object.keys( dataset.stars[ i ] ).length );
              percentage =  ( Object.keys( dataset.stars[ i ] ).length * 100 ) / count ;
            }
            else
              $.setContent( percentage_div, " " );

            percentage_div.style.width = percentage + '%';
          }
        }

      };

      this.getValue = () => total;

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();