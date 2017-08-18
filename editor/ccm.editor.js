/**
 * @overview ccm component for quill editor
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 */

( function () {

  var filename = "ccm.editor.js";

  var ccm_version = '9.2.0';
  var ccm_url     = 'https://akless.github.io/ccm/version/ccm-9.2.0.min.js';

  var component_name = 'editor';
  var component_obj  = {
    name: component_name,

    config: {
      editor: [ 'ccm.load', '//cdn.quilljs.com/1.2.0/quill.min.js' ],
      editor_css: [ 'ccm.load', '//cdn.quilljs.com/1.2.0/quill.snow.css' ],
      settings: {
        modules: {
          toolbar: [
            [ { header: [ 1, 2, false ] } ],
            [ 'bold', 'italic', 'underline' ],
            [ 'image', 'code-block' ]
          ]
        },
        placeholder: 'Write here...',
        theme: 'snow'
      }
    },

    Instance: function () {
      var editor;

      this.start = function ( callback ) {
        var div = this.ccm.helper.html( {} );
        this.element.innerHTML = '';
        this.element.appendChild( div );
        editor = new Quill( div, this.settings );
        if ( callback ) callback( this );
      };
      this.get = function () { return editor; }
    }
  };

  if ( window.ccm && window.ccm.files ) window.ccm.files[ filename ] = component_obj;
  var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
  if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
  function register() { ccm[ ccm_version ].component( component_obj ); }
}() );