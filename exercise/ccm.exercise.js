/**
 * @overview ccm component for exercise
 * @author Tea Kless <tea.kless@web.de>, 2018
 * @license The MIT License (MIT)
 * @
 */
( function () {

  const component = {

    name: 'exercise',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

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
          "tag": "button",
          "type": "button",
          "id": "button-submit",
          "class": "btn btn-default pull-right",
          "style": "margin-top: 1.0rem;",
          "onclick": "%submit%",
          "inner": "%btn_label%"
        }
      },

      //task: "<h1>Einleitung</h1>",
      //submit_button_label: "Save",
      //onfinish
      //user: [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js",
      //  [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "compact" ] ],
      editor: [ "ccm.component", "https://ccmjs.github.io/tkless-components/editor/versions/ccm.editor-3.0.0.js", {
        "settings.modules.toolbar": false
      } ],
      content: [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.1.js" ],
      libs: [ "ccm.load",
        { "context": "head", "url": "../libs/bootstrap/css/font-face.css" },
        "../libs/bootstrap/css/bootstrap.css"
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

        const submit_button = $.html ( my.html.submit, {
          submit: async event  => {
            if ( event ) event.preventDefault();
            if ( self.user ) {
              await self.user.login();
              $.onFinish( self );
            }
          },
          btn_label: my.submit_button_label ? my.submit_button_label: "Save"
        } );
        main_elem.appendChild( submit_button );

        $.setContent( self.element, main_elem );

        async function getEditor () {

          const instance = await my.editor.start();
          main_elem.querySelector( '#input' ).appendChild( instance.root );
          editor = instance;
        }
      };

      this.getValue = () => { return { result: editor.get().root.innerHTML } };
    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();