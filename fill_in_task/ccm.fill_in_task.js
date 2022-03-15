/**
 * @overview ccmjs-based web component for a fill in  task
 * @author Tea Kless <tea.kless@web.de> 2022
 * @license The MIT License (MIT)
 */

( () => {
  const component = {
    name: 'fill_in_task',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.3.1.min.js',

    config: {
      helper: [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/ccm/helper.mjs" ],
      //content: [ "ccm.component", "https://ccmjs.github.io/tkless-components/table/versions/ccm.table-5.1.0.js" ],
      /*solution: {
        "1-4": "4",
        "1-5": "7,00",
        "2-4": "1",
        "2-5": "8,57",
        "3-4": "4",
        "3-5": "60,6"
      },*/
      css: [ "ccm.load", "resources/default.css" ]
    },

    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      const self = this;

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );

        // define routes
        this.routing && this.routing.define( { home: ( i, j ) => render( parseInt( i ), parseInt( j ) ) } );

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {
        let correct, incorrect;

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        const instance = await this.content.start( { shadow: 'none' } );

        $.setContent( this.element,  instance.root );
        $.append( this.element, $.html( {'tag': 'button', 'inner': 'Check', 'id': 'fill-in-task-compare', 'class': 'fill-in-task-btn' } ) );
        $.append( this.element, $.html( {'tag': 'button', 'inner': 'Retry', 'id': 'fill-in-task-retry', 'class': 'fill-in-task-btn' } ) );
        $.append( this.element, $.html( {'tag': 'div', 'id': 'fill-in-task-progress-bar', } ) );


        this.element.querySelector( '#fill-in-task-compare' ).addEventListener( 'click', ( event) => {
          let form_data = $.formData( this.element );
          compare( this.solution, form_data,  );
          $.progressBar( { elem: this.element.querySelector( '#fill-in-task-progress-bar' ), color: correct? undefined : 'red' } );
          event.target.disabled = true;
        } );

        this.element.querySelector( '#fill-in-task-retry' ).addEventListener( 'click', () => {
         this.start();
        } );

        function compare ( data_1, data_2 ) {
          for( let key in data_1 ) {
            let elem = self.element.querySelector( '[name="'+ key +'"]' );
            if ( data_2[key] !== data_1[key] || data_2[key] === undefined ) {
              highlight ( elem, '#FF00005E' );
              incorrect++;
            }
            else {
              highlight ( elem, '#28A7458C' );
              correct++
            }
          }
        }

        function highlight ( elem, color ) {
          if ( elem.type === "checkbox" ) {
            elem.style[ 'background-color' ] = color;
            elem.style[ 'box-shadow' ] = '0px 0px 0px 3px '+color+'';
            elem.style[ 'border-radius' ] = '3px';
          }
         else {
            elem.style.color = color;
            elem.style['background-color'] = color;
          }
        }
      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
