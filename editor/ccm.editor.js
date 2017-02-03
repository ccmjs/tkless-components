/**
 * Created by teakless on 02.02.17.
 */
ccm.component ( {
  name: 'editor',
  config: {
    editor: [ ccm.load, '//cdn.quilljs.com/1.2.0/quill.min.js' ],
    editor_css: [ ccm.load, '//cdn.quilljs.com/1.2.0/quill.snow.css' ],
    settings:  {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      },
      placeholder: 'Write here...',
      theme: 'snow'  // or 'bubble'
    }
  },
  Instance: function () {
    var self = this;
    var editor;
    this.render = function ( callback ) {

      var editor_div = ccm.helper.html( {} );
      self.element.innerHTML = '';
      self.element.append( editor_div );
      editor = new Quill( editor_div, self.settings );

      if ( callback ) callback();
    };

    this.get = function () {
      return editor;
    };
  }
} );