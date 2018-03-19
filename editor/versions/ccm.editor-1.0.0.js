/**
 * @overview ccm component for quill editor
 *
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 */

( function () {

  var component  = {

    name: 'editor',
    version:[ 1,0,0 ],

    ccm: 'https://akless.github.io/ccm/version/ccm-11.5.0.min.js',

    config: {
      // add this line for highlighting the code within editor
      //code_highlighting: [ 'ccm.load', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/darcula.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js'],
      editor: [ 'ccm.load', 'https://tkless.github.io/ccm-components/libs/quill/quill.js', '//cdn.quilljs.com/1.2.0/quill.snow.css' ],
      settings: {
        modules: {
          //syntax: true,    // needed for syntax highlighting

          toolbar: [          // if no toolbar needed set: settings.modules.toolbar: false
            [ { header: [ 1, 2, false ] } ],
            [ 'bold', 'italic', 'underline' ],
            [ 'image' ],
            //['code-block'],  // Include code button in toolbar for syntax highlighting
          ]
        },
        placeholder: 'Write here...',
        theme: 'snow'
      }
    },

    Instance: function () {
      var editor;

      this.start = function ( callback ) {

        if( this.code_highlighting ) hljs.initHighlightingOnLoad();

        var div = this.ccm.helper.html( {} );
        this.element.innerHTML = '';
        this.element.appendChild( div );

        editor = new Quill( div, this.settings, function () {
          if ( this.code_highlighting ) {
            var customButton = this.element.querySelector( '.ql-code-block' );
            customButton.addEventListener( 'click', function () {
              hljs.highlightBlock( this.element.querySelector( 'div[contenteditable=true] > pre' ) );
            });
          }

        } );

        if ( callback ) callback( this );
      };
      this.get = function () { return editor; }
    }
  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );