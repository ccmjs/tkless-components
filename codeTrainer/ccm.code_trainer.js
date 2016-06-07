/**
 * @overview <i>ccm</i> component for code trainer
 * @author Tea Kless <tmeskh2s@h-brs.de> 2016
 * @copyright Copyright (c) 2016 Bonn-Rhein-Sieg University of Applied Sciences
 * @license The MIT License (MIT)
 */

ccm.component( {

  /*-------------------------------------------- public component members --------------------------------------------*/

  /**
   * @summary component name
   * @memberOf ccm.components.code_trainer
   * @type {ccm.name}
   */
  name: 'code_trainer',

  /**
   * @summary default instance configuration
   * @memberOf ccm.components.code_trainer
   * @type {ccm.components.code_trainer.config}
   */
  config: {

    html:   [ ccm.load, './json/code_trainer_html.json' ],
    key:    'demo',
    store:  [ ccm.store, './json/code_trainer.json' ],
    style:  [ ccm.load, './css/code_trainer.css' ],
    editor: [ ccm.instance, './components/editor.js'],
    onFinish: function ( code_trainer ) { code_trainer.render(); },
    standalone: true

  },

  /*-------------------------------------------- public component classes --------------------------------------------*/

  /**
   * @summary constructor for creating <i>ccm</i> instances out of this component
   * @alias ccm.components.code_trainer.Code_trainer
   * @class
   */
  Instance: function () {

    /*------------------------------------- private and public instance members --------------------------------------*/

    /**
     * @summary own context
     * @private
     */
    var self = this;

    /**
     * @summary initialize <i>ccm</i> instance
     * @description
     * Called one-time when this <i>ccm</i> instance is created, all dependencies are solved and before dependent <i>ccm</i> components, instances and datastores are initialized.
     * This method will be removed by <i>ccm</i> after the one-time call.
     * @param {function} callback - callback when this instance is initialized
     */
    this.init = function ( callback ) {


      if( self.editor ){
        self.editor.element = self.element.find( '.content > .editor > .code' );
      }
      // perform callback
      callback();

    };

    /**
     * @summary render content in own website area
     * @param {function} [callback] - callback when content is rendered
     */
    this.render = function ( callback ) {

      /**
       * website area for own content
       * @type {ccm.element}
       */
      var element = ccm.helper.element( self );

      // get dataset for rendering
      ccm.helper.dataset( self, function ( dataset ) {

        element.html( ccm.helper.html( self.html.main, { title: dataset.title  } ) );

        if ( !self.standalone ) {
          element.find( '.header' ).remove();
          element.find( '.footer').remove();
        }

        renderTask( dataset.tasks[ 0 ], 0 );

        // translate own content
        if ( self.lang ) self.lang.render();

        // perform callback
        if ( callback ) callback();

        function renderTask( task, i ) {

          ccm.helper.find( self, '.content' ).html( ccm.helper.html ( self.html.task, {

            title: task.title,
            text: task.text,
            click: function () {
              if ( i < dataset.tasks.length - 1 )
                renderTask( dataset.tasks[ i + 1 ], i + 1 );
              else {
                self.onFinish(self);
              }
            },
            input: function () {

              ccm.helper.find( self, '.result' ).html( jQuery( this ).text() );

            }

          } ) );

          if( self.editor ) self.editor.render();


          ccm.helper.find( self, '.code' ).click( function () {
            ccm.helper.find( self, jQuery( this ), '.editable' ).focus();
          } );
        }

      } );

    };

  }

  /*------------------------------------------------ type definitions ------------------------------------------------*/

  /**
   * @namespace ccm.components.code_trainer
   */

  /**
   * @summary <i>ccm</i> instance configuration
   * @typedef {ccm.config} ccm.components.code_trainer.config
   * @property {string} classes - css classes for own website area
   * @property {ccm.element} element - own website area
   * @property {Object.<ccm.key, ccm.html>} html - <i>ccm</i> html data templates for own content
   * @property {ccm.key} key - key of [code_trainer dataset]{@link ccm.components.code_trainer.dataset} for rendering
   * @property {ccm.instance} lang - <i>ccm</i> instance for multilingualism
   * @property {ccm.store} store - <i>ccm</i> datastore that contains the [code_trainer dataset]{@link ccm.components.code_trainer.dataset} for rendering
   * @property {ccm.style} style - css for own content
   * ...
   */

  /**
   * @summary code_trainer dataset for rendering
   * @typedef {ccm.dataset} ccm.components.code_trainer.dataset
   * @property {ccm.key} key - dataset key
   * ...
   */

} );