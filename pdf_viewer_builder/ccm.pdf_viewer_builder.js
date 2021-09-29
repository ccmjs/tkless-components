/**
 * @overview ccmjs-based web component for building a PDF viewer
 * @author Tea Kless <tea.kless@web.de> 2019
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (4.0.0)
 * @changes
 * version 4.0.0 (11.09.2021): reimplementation by akless
 */

( () => {
  const component = {
    name: 'pdf_viewer_builder',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.1.1.min.js',
    config: {
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap.min.css",
          "https://ccmjs.github.io/tkless-components/pdf_viewer_builder/resources/styles.min.css"
        ]
      ],
//    "data": { "store": [ "ccm.store" ] },
      "defaults": {},
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.5.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/tkless-components/pdf_viewer_builder/resources/templates.mjs" ],
      "libs": [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/js/bootstrap.bundle.min.js" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.min.js", "greedy" ] ],
      "onfinish": { "log": true },
      "shadow": "none",
      "text": {
        "denied": "Message: Access Denied",
        "denied_info": "Message that appears in the case of a password-protected PDF when you have entered an incorrect password.",
        "download": "Tooltip: Download PDF",
        "download_info": "Tooltip that appears when you move the mouse cursor over the \"Download PDF\" button.",
        "downloadable": "PDF can be downloaded",
        "downloadable_info": "If enabled, there is an additional button in the navigation bar that can be used to download the PDF. In addition, the current page can be saved as an image by right-clicking on a page. You can prevent the PDF from being downloaded via the web interface by deactivating this field.",
        "first": "Tooltip: First Page",
        "first_info": "Tooltip that appears when you move the mouse cursor over the \"First Page\" button.",
        "general": "General Settings",
        "jump": "Tooltip: Jump to Page",
        "jump_info": "Tooltip that appears when you move the mouse cursor over the input field that let you jump to a specific page.",
        "labels": "Texts and Labels",
        "last": "Tooltip: Last Page",
        "last_info": "Tooltip that appears when you move the mouse cursor over the \"Last Page\" button.",
        "next": "Tooltip: Next Page",
        "next_info": "Tooltip that appears when you move the mouse cursor over the \"Next Page\" button.",
        "pdf": "URL of the PDF",
        "pdf_info": "If you only have the PDF as a file on your filesystem, you must first publish it under a public URL, which you then specify here. It is important that the PDF can also be accessed cross-domain using <a href='https://en.wikipedia.org/wiki/Cross-origin_resource_sharing' target='_blank'>CORS</a>. Developers familiar with <a href='https://github.com/about/' target='_blank'>GitHub</a> can use <a href='https://pages.github.com/' target='_blank'>GitHub Pages</a>. Via GitHub Pages the PDF can be published for free and CORS is already set there by default.",
        "prev": "Tooltip: Previous Page",
        "prev_info": "Tooltip that appears when you move the mouse cursor over the \"Previous Page\" button.",
        "preview": "Preview",
        "preview_title": "App Preview",
        "protected": "Message: Protected PDF",
        "protected_info": "Message that appears in the case of a password-protected PDF.",
        "submit": "Submit",
        "user": "Required Account",
        "user_info": "Here you can set whether the PDF should only be displayed for people who log in with a specific account.<ul class=\"m-0 pl-4\"><li><b>Digital Makerspace Account:</b> The user must log in with a Digital Makerspace account.</li><li><b>H-BRS FB02 Account:</b> The user has to authenticate with an account from the Department of Computer Sciences at Hochschule Bonn-Rhein-Sieg University of Applied Sciences.</li></ul>"
      },
      "tool": [ "ccm.component", "https://ccmjs.github.io/tkless-components/pdf_viewer/versions/ccm.pdf_viewer-7.0.0.min.js" ]
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );  // set shortcut to help functions
        delete this.tool.config.parent;                                            // remove no needed parent reference
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );      // logging of 'ready' event
      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        /**
         * initial app configuration (priority order: [high] this.data -> this.defaults -> this.tool.config [low])
         * @type {Object}
         */
        const config = await $.integrate( await $.dataset( this.data ), await $.integrate( this.defaults, this.tool.config ) );

        this.logger && this.logger.log( 'start', $.clone( config ) );  // logging of 'start' event
        this.render( config );                                         // render webpage area

      };

      /**
       * renders the webpage area
       * @param {Object} [config = this.getValue()] - initial app configuration
       */
      this.render = ( config = this.getValue() ) => this.html.render( this.html.main( config, this, events ), this.element );

      /**
       * returns current resulting app configuration
       * @returns {Object} current resulting app configuration
       */
      this.getValue = () => $.formData( this.element.querySelector( 'form' ) );

      /**
       * contains all event handlers
       * @type {Object.<string,Function>}
       */
      const events = {

        /** when the value of an input field changes */
        onChange: () => this.render( this.getValue() ),

        /**
         * when 'preview' button is clicked
         */
        onPreview: () => {
          const preview_body = this.element.querySelector( '#pvb-preview .modal-body' );
          $.setContent( preview_body, '' );
          this.tool.start( Object.assign( this.getValue(), { root: preview_body } ) );
        },

        /**
         * when 'submit' event of the main HTML form is triggered
         * @param {Object} event
         */
        onSubmit: event => {
          event.preventDefault();
          const config = this.getValue();                                 // get resulting app configuration
          this.logger && this.logger.log( 'finish', $.clone( config ) );  // logging of 'finish' event
          $.onFinish( this, config );                                     // trigger finish actions
        }

      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();