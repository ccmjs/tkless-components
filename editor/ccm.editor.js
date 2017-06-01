/**
 * @overview ccm component for quill editor
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 */
ccm.component ( {
  name: 'editor',
  config: {
    editor: [ ccm.load, '//cdn.quilljs.com/1.2.0/quill.min.js' ],
    editor_css: [ ccm.load, '//cdn.quilljs.com/1.2.0/quill.snow.css' ],
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
    this.render = function ( callback ) {
      var div = ccm.helper.html( {} );
      this.element.innerHTML = '';
      this.element.appendChild( div );
      editor = new Quill( div, this.settings );
      if ( callback ) callback( this );
    };
    this.get = function () { return editor; }
  }
} );