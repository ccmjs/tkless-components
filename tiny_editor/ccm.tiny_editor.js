/**
 * @overview ccm component of tinymce editor
 * @author Tea Kless <tea.kless@ccmjs.eu> 2024
 * @license The MIT License (MIT)
 */

( () => {
  const component = {
    name: 'tiny_editor',
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',
    config: {
      html: {
        "id": "main",
        "inner": {
          tag: 'div',
          inner: [
            { tag: 'textarea'},
            {
              tag: 'button',
              inner: '%button_label%',
              onclick: '%button_click%'
            }
          ]
        }
      },
      data: {
        store: [ "ccm.store", { url: "https://ccm2.inf.h-brs.de", name: "test" } ],
        key: "bar"
      },
      helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/helper.mjs" ],
      initial: {
        branding: true,
        promotion: false,
      },
      onchange: event => { console.log( event );  },
      onfinish: {
        alert: "Saved!",
        confirm: "Are you really sure?",
        log: true,
        restart: true,
        store: true
      },
      onstart: event => { console.log( event );  },
      text: {
        button_label: "Speichern",
      },
      lib: [ "ccm.load",  { url: "https://ccmjs.github.io/tkless-components/libs/tinymce/tinymce.min.js", context:'head' } ],
    },

    Instance: function () {
      let $, editor;
      this.init = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );
      };

      this.start = async () => {

        $.setContent(this.element, $.html(this.html, {
          button_label: this.text.button_label || "Speichern",
          button_click: () => {
            this.onfinish && $.onFinish( this );
          }
        }));

        this.initial.target = this.element.querySelector('textarea');

        if (this.onchange ) this.initial.setup = editor => editor.on('change', event => this.onchange({app: this, event, editor}));

       editor = (await tinymce.init(this.initial))[0];

        if ( this.data ){
          const data = await $.dataset( this.data );
          editor.setContent( data?.inner || '' );
        }
        this.onstart && await this.onstart({app:this});

      };

      this.get = () => editor;

      this.getValue = () => {
        return { inner: editor.getContent('textarea') };
      };
    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();