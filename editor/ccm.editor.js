/**
 * @overview ccm component for quill editor
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 *
 *
 * Quill Editor v1.2.4 https://quilljs.com/
 * Copyright (c) 2014, Jason Chen
 * Copyright (c) 2013, salesforce.com
 */

( function () {


  var component  = {

    name: 'editor',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {
      editor: [ 'ccm.load',
        [
          [
            'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/darcula.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js'
          ],
          [
            '../libs/quill/quill.js',
            '//cdn.quilljs.com/1.2.0/quill.snow.css'
          ]
        ]
      ],
      settings: {
        modules: {
          //syntax: true,    // needed for syntax highlighting

          toolbar: [          // if no toolbar needed set: settings.modules.toolbar: false
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [ 'bold', 'italic', 'underline' ],
            [ 'image' ]
            //['code-block'],  // Include code button in toolbar for syntax highlighting
          ]
        },
        placeholder: 'Write here...',
        theme: 'snow'
      }
    },

    Instance: function () {
      let editor;

      this.ready = callback => {
        if ( hljs ) hljs.initHighlightingOnLoad();
        callback();
      };

      this.start = callback => {

        let div = this.ccm.helper.html( {} );
        this.element.innerHTML = '';
        this.element.appendChild( div );

        editor = new Quill( div, this.settings );

        if ( hljs && this.settings.modules.syntax ) {
          const customButton = this.element.querySelector( '.ql-code-block' );
          customButton.addEventListener( 'click', () => {
            hljs.highlightBlock( this.element.querySelector( 'div[contenteditable=true] > pre' ) );
          });
        }

        if ( callback ) callback();
      };

      this.get = () => editor;
    }
  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );