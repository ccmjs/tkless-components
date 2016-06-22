/**
 * @overview ace coding editor as ccm component
 * @author tea.kless <tea.kless@web.de>, 2016
 * @license The MIT License (MIT)
 * @see https://ace.c9.io
 * @see https://github.com/ajaxorg/ace
 */

ccm.component( {
  
  /*-------------------------------------------- public component members --------------------------------------------*/
  
  /**
   * component name
   * @type {string}
   * @ignore
   */
  name: 'editor',
  
  /**
   * @summary default instance configuration
   * @type {ccm.components.editor.config}
   * @ignore
   */
  config: {

    key:          'demo',
    ace_path:     './lib/ace/min/',
    aceJs:        [ ccm.load, 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.3/ace.js' ],
    theme:        'monokai',
    mode:         'html',
    showGutter:   true, // show line numbers and errors
    useWorker:    true,  // enable syntax validation
    previewarea: 'div.result'

  },
  
  /*-------------------------------------------- public component classes --------------------------------------------*/
  
  /**
   * @alias ccm.components.editor
   * @class
   */
  Instance: function () {
    
    /*----------------------------------------------- instance members -----------------------------------------------*/
    
    /**
     * @summary own context
     * @private
     * @type {ccm.instance}
     * @this ccm.instance
     */
    var self = this;


    /*------------------------------------------- public instance methods --------------------------------------------*/


    /**
     * @summary initialize <i>ccm</i> instance
     * @description Called one-time when this instance is created, all dependencies are solved and before dependent <i>ccm</i> instances will be initialized.
     * @param {function} [callback] - callback when this instance is initialized (and before first render call)
     */
    this.init = function ( callback ) {

      ace.config.set( "basePath", self.ace_path );
      // perform callback
      if ( callback ) callback();

    };

    
    /**
     * @summary render editor in own website area
     * @param {function} callback - callback when ccm instance is rendered (first parameter is ccm instance)
     */
    this.render = function ( callback ) {
      /**
       * website area for own content
       * @type {ccm.element}
       */
      var element = ccm.helper.element( self );

      var position = 'relative';

      if ( self.element.is(jQuery( 'body' )))
        position = 'absolute';

      var styles = {
        height : "100%",
        width: "100%",
        position: position
      };

      ccm.helper.element( self).html( ccm.helper.html ({ tag: 'div', class: 'ccm-editor'+ self.index } )).css( styles );

      console.log(self.previewarea);

      var editor = ace.edit( 'ccm-' + self.index );

      editor.setOptions({
        fontSize: '1em',
        theme: 'ace/theme/' + self.theme,
        highlightActiveLine: true,
        highlightSelectedWord: true,
        showPrintMargin: false,
        showGutter: self.showGutter,
        mode: "ace/mode/" + self.mode
        //useWorker: self.useWorker // enable syntax validation
      });

      editor.focus(); // focus the ace editor
      editor.navigateFileEnd(); // set cursor to the end of file
    }
    
  }
  
  /*------------------------------------------------ type definitions ------------------------------------------------*/
  
  /**
   * @summary ccm instance configuration
   * @typedef {ccm.config} ccm.components.editor.config
   * @property {ccm.element} element - website area of ccm instance
   * @property {string} classes - CSS classes for website area
   * @property {ccm.style} style - CSS for website area
   */
  
} );