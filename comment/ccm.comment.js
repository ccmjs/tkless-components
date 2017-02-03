/**
 * Created by teakless on 02.02.17.
 */
ccm.component ( {
  name: 'comment',
  config: {
    editor: [ ccm.load, '//cdn.quilljs.com/1.2.0/quill.min.js' ],
    editor_css: [ ccm.load, '//cdn.quilljs.com/1.2.0/quill.snow.css' ]
  },
  Instance: function () {
    var self = this;
    this.render = function ( callback ) {

      var editor_div = ccm.helper.html( {} );
      self.element.innerHTML = '';
      self.element.appendChild( editor_div );
      var quill = new Quill( editor_div, {
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
          ]
        },
        placeholder: 'Compose an epic...',
        theme: 'snow'  // or 'bubble'
      } );

      var editor_submit = ccm.helper.html( { tag: 'button', inner: "Save", onclick: function () {
        var editor_content = quill.getContents();
        console.log ( editor_content);

      } } );
      self.element.appendChild( editor_submit);


      if ( callback ) callback();
    }
  }
} );