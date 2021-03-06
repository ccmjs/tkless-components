/**
 * @overview ccm component for quill editor
 * @author Tea Kless <tea.kless@web.de>, 2018
 * @license The MIT License (MIT)
 * @version 3.0.0
 * @changes
 * version 3.0.0 (05.09.2018)
 * - uses ccm v18.0.0
 *
 *
 * Quill Editor v1.2.4 https://quilljs.com/
 * Copyright (c) 2014, Jason Chen
 * Copyright (c) 2013, salesforce.com
 */

( function () {

  const component  = {

    name: 'editor',
    version:[ 3,0,0 ],

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {
      editor: [ 'ccm.load',
        [
          [
            'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/darcula.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js'
          ],
          [
            'https://ccmjs.github.io/tkless-components/libs/quill/quill.js',
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

      this.ready = async () => {
        if ( hljs ) hljs.initHighlightingOnLoad();
      };

      this.start = async () => {

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
      };

      this.get = () => editor;
    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();