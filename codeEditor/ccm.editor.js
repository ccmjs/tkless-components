/**
 * @overview ace coding editor as ccm component
 * @author tkless2s <tea.kless@web.de>, 2016
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

    key: 'demo',
    ace_path: './lib/ace/min/',
    ace_lib: [ ccm.load, './lib/ace/min/ace.js', [ './lib/ace/min/mode-html.js', './lib/ace/min/theme-monokai.js' ] ],
    theme:  'monokai',
    mode: "html",
    showGutter: true, // show line numbers and errors
    useWorker: true,  // enable syntax validation
    previewarea: 'div.result',

    user:  [ ccm.instance, './components/user.js' ]

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

      if (self.element.is(jQuery('body')))
        position = 'absolute';

      var styles = {
        height : "100%",
        width: "100%",
        position: position
      };

      ccm.helper.element( self).html(ccm.helper.html ({ tag: 'div', class: 'ccm-editor'+ self.index } )).css(styles);

      var editor = ace.edit('ccm-' + self.index);

      editor.setOptions({
        fontSize: '1em',
        theme: 'ace/theme/' + self.theme,
        highlightActiveLine: true,
        highlightSelectedWord: true,
        showPrintMargin: false,
        showGutter: self.showGutter,
        mode: "ace/mode/" + self.mode,
        useWorker: self.useWorker // enable syntax validation
      });

      editor.focus(); // focus the ace editor
      editor.navigateFileEnd(); // set cursor to the end of file

      self.store.get( self.key, function ( dataset ) {

        // login user if not logged in
        if ( !self.user.isLoggedIn() ) return self.user.login( function () { self.render( callback ); } );

        var previewarea = jQuery(jQuery.find( self.previewarea ));

        previewarea.html( editor.getValue() );
        editor.getSession().on('change', function(e) {
          previewarea.html( editor.getValue() );
          self.store.set( { key: self.key, user: self.user.data().key, contents: editor.getValue() } );
        });

        // perform callback
        if ( callback ) callback();

      });

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