/**
 * @overview ccm component for exercise
 * @author Tea Kless <tea.kless@web.de>, 2018
 * @license The MIT License (MIT)
 */
( function () {

  var component = {

    name: 'exercise',

    ccm: 'https://akless.github.io/ccm/version/ccm-15.0.2.js',

    config: {
      html: {
        "main": {
          "class": "container",
          "inner": [
            {
              "id": "task",
              "class": "col-md-10"
            },
            {
              "id": "input",
              "class": "col-md-10"
            },
          ]
        },
        "submit": {
          "style": "margin-top: 10px;",
          "class": "col-md-10",
          "inner": {
              "tag": "button",
              "class": "btn btn-default pull-right",
              "typ": "button",
              "inner": "Submit",
              "onclick": "%submit%"
            }
        }
      },

      //task: "<h1>Einleitung</h1>",
      //submit: true,
      //onfinish
      editor: [ 'ccm.component', '../editor/ccm.editor.js',
        { 'settings.modules.toolbar': false },
        { 'settings.placeholder': 'Write your comment here ...' }
      ],
      libs: [ 'ccm.load',
        { context: 'head', url: '../../ccm-components/libs/bootstrap/css/font-face.css' },
        '../../ccm-components/libs/bootstrap/css/bootstrap.css'
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

      this.ready = callback => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        if ( self.logger ) self.logger.log( 'ready', my );

        callback();

      };

      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = function (callback) {

        let main_elem = $.html( my.html.main );

        $.setContent( main_elem.querySelector( "#task" ), $.html( my.task ) );

        getEditor();

        if ( my.submit ) {
          const submit_button = $.html ( my.html.submit, {
            submit: function ( event ) {
              if ( event ) event.preventDefault();
              $.onFinish( self );
            }
          } );
          main_elem.appendChild( submit_button );
        }

        $.setContent( self.element, main_elem );


        if ( callback ) callback();

        function getEditor () {

          my.editor.start( function ( instance ) {
            main_elem.querySelector( '#input' ).appendChild( instance.root );
            editor = instance;
          } );
        }
      };

      this.getValue = () => editor.get().root.innerHTML;
    }
  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );