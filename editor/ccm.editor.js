/**
 * @overview ccm component for quill editor
 * Quill Editor v1.2.4 https://quilljs.com/
 * Copyright (c) 2014, Jason Chen
 * Copyright (c) 2013, salesforce.com
 *
 * @author Tea Kless <tea.kless@web.de>, 2020
 * @license The MIT License (MIT)
 * @version latest (4.0.0)
 * @changes
 * * version 4.0.0 (04.03.2020)
 * - supports adding of interactive content
 * - uses ccm v25.0.0
 * version 3.0.0 (05.09.2018)
 * - uses ccm v18.0.0
 *
 *
 */

( function () {

  const component  = {

    name: 'editor',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {
      //data: {
      //  store: [ "ccm.store", { "name": "editor_data" } ],
      //  key: "demo"
      //},
      //onchange: function () { console.log( this.getValue() ) },
      editor: [ 'ccm.load',
        'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/darcula.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js',
        'https://ccmjs.github.io/tkless-components/libs/quill/quill.js',
        'https://cdn.quilljs.com/1.2.0/quill.snow.css',
        "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css",
        "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js"
      ],
      settings: {
        modules: {
          //syntax: true,    // needed for syntax highlighting

          toolbar: [          // if no toolbar needed set: settings.modules.toolbar: false
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [ 'bold', 'italic', 'underline' ],
            [ 'image', 'video', 'formula' ]
            //['code-block'],  // Include code button in toolbar for syntax highlighting
          ]
        },
        placeholder: 'Write here...',
        theme: 'snow'
      },
      embed_content: true,
      helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.0.1.mjs" ],
      icon: [ "ccm.load", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css",
        { "context": "head", "url": "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css" } ]
    },

    Instance: function () {
      let $, quill, data;

      this.ready = async () => {
        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );

        if ( window.hljs ) hljs.initHighlightingOnLoad();
      };

      this.start = async () => {

        let div = $.html( {} );
        $.setContent( this.element, div );

        quill = new Quill( div, this.settings );

        if ( window.hljs && this.settings.modules.syntax ) {
          const code_block = this.element.querySelector( '.ql-code-block' );
          code_block.addEventListener( 'click', () => {
            window.hljs.highlightBlock( this.element.querySelector( 'div[contenteditable=true] > pre' ) );
          });
        }

        if ( this.embed_content ) {
          this.element.querySelector('.ql-toolbar').appendChild(  $.html(
            {
              "tag": "span",
              "class": "ql-formats",
              "inner":
                {
                  "tag": "button",
                  "id": "custom-button",
                  "inner": "<i class ='far fa-file-code' style='font-size: 1rem;'></i>"
                }
            }
          ) );

          // Import the BlockEmbed blot.
          let BlockEmbed = Quill.import('blots/block/embed');

          // Create a new format based off the BlockEmbed.
          class EmbedContent extends BlockEmbed {

            static create(value) {

              // Create the node using the BlockEmbed's create method.
              let node = super.create(value);

              // Set the srcdoc attribute to equal the value which will be your html.
              node.setAttribute('srcdoc', value);

              // Add a few other iframe fixes.
              node.setAttribute('frameborder', '0');
              node.setAttribute('allowfullscreen', true);
              node.setAttribute('width', '100%');
              return node;
            }

            // return the srcdoc attribute to represent the EmbedContent's value in quill.
            static value(node) {
              return node.getAttribute('srcdoc');
            }

          }

          // Give our new Footer format a name to use in the toolbar.
          EmbedContent.blotName = 'embed-content';

          // Give it a class name to edit the css.
          EmbedContent.className = 'ql-embed-content';

          // Give it a tagName of iframe to tell quill what kind of element to create.
          EmbedContent.tagName = 'iframe';

          // Lastly, register the new EmbedContent format so we can use it in our editor.
          Quill.register(EmbedContent, true);

          let customButton = this.element.querySelector('#custom-button');
          customButton.addEventListener('click', function() {
            const embed_code = prompt( 'Please enter your Embed Code below' );
            if( embed_code !== '' ) {
              let selection = quill.getSelection( true ).index;

              // Insert the EmbedContent with the footerHTML.
              quill.insertEmbed( selection, 'embed-content', embed_code);
            }

          });

        }

        if ( this.data ){
          data= await $.dataset( this.data );
          quill.root.innerHTML = ( $.isObject( data ) ? data.inner : data ) || '';
        }

        if ( this.onchange ) {
          this.element.querySelector( '.ql-editor' ).addEventListener( 'blur', async () => {
            this.onchange.call( this );
          } );
        }
      };

      this.get = () => quill;

      this.getValue = () => {
        return { "inner": quill.root.innerHTML };
      };

    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
