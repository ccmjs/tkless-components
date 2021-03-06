/**
 * @overview ccm component for exercise
 * @author Tea Kless <tea.kless@web.de>, 2018
 * @license The MIT License (MIT)
 * @version 3.0.0
 * @changes
 * version 3.0.0 (26.09.2018)
 * - uses ccm v18.0.0
 *
 */
( function () {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'exercise',
    version: [ 3,0,0 ],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.0.0.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        "main": {
          "class": "container-fluid",
          "inner": [
            {
              "id": "task"
            },
            {
              "id": "input",
              "style": "margin-top: 1.5rem;",
            }
          ]
        },
        "submit": {
          "tag": "input",
          "type": "button",
          "id": "button-submit",
          "class": "btn btn-default pull-right",
          "style": "margin-top: 1.0rem;",
          "onclick": "%submit%"
        }
      },

      //task: "<h1>Einleitung</h1>",
      //submit_button: true,
      //onfinish
      editor: [ "ccm.component", "https://ccmjs.github.io/tkless-components/editor/versions/ccm.editor-3.0.0.js", {
        "settings.modules.toolbar": false
      } ],
      content: [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.1.js" ],
      libs: [ "ccm.load",
        { "context": "head", "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
        "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css"
      ]
     },

    Instance: function () {
      /**
       * own reference for inner functions
       * @type {Instance}
       */
      const self = this;

      /**
       * privatized instance members
       * @type {object}
       */
      let my;

      /**
       * shortcut to help functions
       * @type {Object.<string,function>}
       */
      let $;

      let editor;

      this.ready = async () => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        if ( self.logger ) self.logger.log( 'ready', $.clone(my) );

      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = async () => {

        let main_elem = $.html( my.html.main );

        const instance = await my.content.start( { inner: ( my.inner && my.inner.innerHTML.trim() !== "" ) ? my.inner : my.task } );
        $.setContent( main_elem.querySelector( "#task" ), instance.root  );
        await getEditor();

        if ( my.submit_button ) {
          const submit_button = $.html ( my.html.submit, {
            submit: event  => {
              if ( event ) event.preventDefault();
              $.onFinish( self );
            }
          } );
          main_elem.appendChild( submit_button );

          // individual caption for submit button? => set caption of submit button
          if ( typeof my.submit_button === 'string' ) main_elem.querySelector( '#button-submit' ).value = my.submit_button;

        }

        $.setContent( self.element, main_elem );

        async function getEditor () {

          const instance = await my.editor.start();
          main_elem.querySelector( '#input' ).appendChild( instance.root );
          editor = instance;
        }
      };

      this.getValue = () => editor.get().root.innerHTML;
    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();