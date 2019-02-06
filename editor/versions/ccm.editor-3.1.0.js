/**
 * @overview ccm component for quill editor
 * @author Tea Kless <tea.kless@web.de>, 2019
 * @license The MIT License (MIT)
 * @version 3.0.0
 * @changes
 * version 3.0.0 (06.01.2019)
 * - uses ccm v20.0.0
 * version 3.1.0 (05.09.2018)
 * - supports onchange callback and getValue method
 * - uses ccm v18.3.0
 *
 *
 * Quill Editor v1.2.4 https://quilljs.com/
 * Copyright (c) 2014, Jason Chen
 * Copyright (c) 2013, salesforce.com
 */

( function () {

  const component  = {

    name: 'editor',
    version:[ 3,1,0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',

    config: {
      //data: {
      //  store: [ "ccm.store", { "name": "editor_data" } ],
      //  key: "demo"
      //},
      //onchange: function () { console.log( this.getValue() ) },
      editor: [ 'ccm.load',
        [
          [
            'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/darcula.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js'
          ],
          [ 'https://ccmjs.github.io/tkless-components/libs/quill/quill.js' ]//, 'https://cdn.quilljs.com/1.2.0/quill.snow.css' ]
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
      let self = this;
      let $;

      this.init = async () => {
        // set shortcut to help functions
        $ = self.ccm.helper;
      };

      this.ready = async () => {
        if ( hljs ) hljs.initHighlightingOnLoad();
      };

      this.start = async () => {

        let div = $.html( {} );
        this.element.innerHTML = '';
        this.element.appendChild( div );

        editor = new Quill( div, self.settings );

        if ( hljs && this.settings.modules.syntax ) {
          const customButton = self.element.querySelector( '.ql-code-block' );
          customButton.addEventListener( 'click', () => {
            hljs.highlightBlock( self.element.querySelector( 'div[contenteditable=true] > pre' ) );
          });
        }

        if ( self.data ){
          const data= await $.dataset( self.data );
          editor.root.innerHTML =  data.inner;
        }

        if ( self.onchange )
          editor.on('text-change', () => self.onchange.call( self ) );
      };

      this.get = () => editor;

      this.getValue = () => {
        return { "inner": editor.root.innerHTML };
      };

    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();