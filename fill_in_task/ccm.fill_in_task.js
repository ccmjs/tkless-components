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
//    content: [ "ccm.component", "https://ccmjs.github.io/tkless-components/table/versions/ccm.table-5.1.0.js" ],
//    check: true,
      css: [ "ccm.load", "./resources/default.css" ],
//    onstart: event => console.log( event ),
//    onfinish: function ( data ) { console.log( data );  },
      helper: [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/ccm/helper.mjs" ],
      html: {
        main: {
          "inner": [
            {
              "tag": "form",
              "onsubmit": "%onSubmit%",
              "inner": [
                {
                  "id": "app"
                },
                {
                  "id": "fill-in-task-buttons",
                  "inner": [
                    {
                      "id": "fill-in-task-progress-bar"
                    },
                    {
                      "tag": "input",
                      "type": "submit",
                      "value": "Check",
                      "class": "fill-in-task-btn",
                      "id": "fill-in-task-compare"
                    },
                    {
                      "tag": "button",
                      "type": "button",
                      "inner": "Retry",
                      "class": "fill-in-task-btn",
                      "id": "fill-in-task-retry",
                      "onclick": "%onRetry%"
                    },
                    {
                      "tag": "button",
                      "type": "button",
                      "inner": "Generate Chart",
                      "class": "fill-in-task-btn",
                      "id": "fill-in-task-onfinish",
                      "onclick": "%onFinish%"
                    },
                    {
                      "tag": "input",
                      "type": "submit",
                      "value": "Solution",
                      "class": "fill-in-task-btn",
                      "id": "fill-in-task-solution"
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.min.js", "greedy" ] ],
//     retry: true,
      /*sample_solution: [ "ccm.instance", "https://ccmjs.github.io/tkless-components/table/versions/ccm.table-5.1.0.js", [
        "ccm.load", "https://ccmjs.github.io/tkless-components/table/resources/resources.mjs#demo"
      ] ],*/
      show_solution: true,
      /*solution: {
        "1-4": "4",
        "1-5": "7,00",
        "2-4": "1",
        "2-5": "8,57",
        "3-4": "4",
        "3-5": "60,6"
      }*/
    },

    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      let correct = 0, incorrect = 0, has_feedback = false, $main;

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        // render main HTML
        $.setContent( this.element, $main = $.html( this.html.main, {
          onSubmit: event => {
            event.preventDefault();
            if ( this.check ) {
              if ( !has_feedback )
                events.onCheck();
              else if ( this.show_solution )
                events.onSolution();
            }
            else if ( this.show_solution )
              events.onSolution();
          },
          onRetry: events.onRetry,
          onFinish: events.onFinish
        } ) );

        updateButtons();

        // render content that contains input fields
        const $app = $main.querySelector( '#app' );
        if ( $.isComponent( this.content ) ) {
          const instance = await this.content.start( { shadow: 'none', root: $app } );
          if ( !!instance.element.querySelector( 'form' ) ) {
            let div = document.createElement( 'div' );
            div.appendChild( instance.element.querySelector( 'form > div' ) );
            $.replace( instance.element.querySelector( 'form' ), div  );
          }
        }
        else
          $.setContent( $app, $.html( this.content ) );

        if ( this.onstart ) this.onstart( { instance: this } );

      };

      this.getValue = () => {
        return $.formData( this.element );
      }

      /**
       * contains all event handlers
       * @type {Object.<string,Function>}
       */
      const events = {
        onCheck: () => {
          if ( this.solution ) {
            let form_data = $.formData( this.element );
            compare( this.solution, form_data );
            $.progressBar( { elem: this.element.querySelector( '#fill-in-task-progress-bar' ), color: correct ? undefined : 'red', actual: true } );
            has_feedback = true;
            updateButtons();
          }
        },
        onRetry: () => {
          has_feedback = false;
          this.start();
        },
        onSolution: () => {
          if ( this.sample_solution && $.isInstance( this.sample_solution ) ) {
            $.append( $main, $.html( { 'tag': 'fieldset', 'id': 'fill-in-task-fieldset', 'inner': {'tag': 'legend', "inner": "Solution" } } ));
            $.append( $main.querySelector( 'fieldset' ), this.sample_solution.root );
            setDisabled('fill-in-task-solution', true );
          }
        },
        onFinish: () => {  $.onFinish( this );  }
      };

      const compare = ( data_1, data_2 ) => {
        for ( let key in data_2 ) {
          let elem = this.element.querySelector( '[name="'+ key +'"]' );
          if ( data_2[ key ] !== data_1[ key ] || data_2[ key ] === undefined ) {
            highlight ( elem, '#FF00005E' );
            incorrect++;
          }
          else {
            highlight ( elem, '#28A7458C' );
            correct++
          }
        }
      };

      const highlight = ( elem, color ) => {
        has_feedback = true;
        if ( elem.type === "checkbox" ) {
          elem.style[ 'background-color' ] = color;
          elem.style[ 'box-shadow' ] = '0px 0px 0px 3px'+color;
          elem.style[ 'border-radius' ] = '3px';
        }
        else elem.style['background-color'] = color;
      };

      const updateButtons = () => {

        // set status for buttons
        setHidden( 'fill-in-task-compare', !this.check );
        setHidden( 'fill-in-task-solution', !this.show_solution );
        setHidden( 'fill-in-task-retry', !this.check );
        setHidden( 'fill-in-task-onfinish', !this.onfinish );
        setDisabled( 'fill-in-task-onfinish', this.check && !has_feedback );
        setDisabled( 'fill-in-task-compare', has_feedback );
        setDisabled( 'fill-in-task-retry', !has_feedback );
        setDisabled( 'fill-in-task-solution', this.check && !has_feedback );

      };

      const setDisabled = ( id, disabled ) =>
        this.element.querySelector( '#' + id )[ ( disabled ? 'set' : 'remove' ) + 'Attribute' ]( 'disabled', true );

      const setHidden = ( id, hidden ) =>
        this.element.querySelector( '#' + id ).classList[ hidden ? 'add' : 'remove' ]( 'hidden' );

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
