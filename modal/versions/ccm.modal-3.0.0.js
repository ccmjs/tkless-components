/**
 * @overview ccmjs-based web component for a modal dialog
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version 3.0.0
 * @changes
 * version 3.0.0 (01.04.2021)
 * - uses ccmjs v26.2.1 as default
 * - uses helper.mjs v7.1.0 as default
 * - HTML templates moved to a template file
 * - changed config properties
 * - removed support for multilingualism
 * - removed logging support
 * - modal dialog can be opened, closed and removed via method
 * - optional click on backdrop closes the modal dialog
 * - modal dialog is opened after start as default
 * - footer buttons are more customizable
 * - modal dialog can be used standalone
 * - 'data-close' attribute marks buttons that closes the modal dialog
 * (for older version changes see ccm.modal-2.0.0.js)
 */

( () => {
  const component = {
    name: 'modal',
    version: [ 3, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.2.1.js',
    config: {
//    "backdrop_close": true,
      "buttons": [
        {
          "html": "<button class='btn btn-secondary' data-close onclick='%%'>Close</button>",
          "onclick": () => {}
        }
      ],
//    "closed": true,
      "content": "My Content",
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
          "./../../tkless-components/modal/resources/default-2.css"
        ]
      ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.1.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/tkless-components/modal/resources/templates.mjs" ],
      "title": "My Header"
    },
    Instance: function () {

      let $;

      this.start = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // render main HTML template
        $.setContent( this.element, $.html( this.html.main, this.title ) );

        // modal dialog can be optionally closed by click on the backdrop area
        if ( this.backdrop_close ) this.element.querySelector( '#backdrop' ).dataset.close = '';

        // render content
        $.setContent( this.element.querySelector( 'main' ), $.isInstance( this.content ) ? this.content.root : $.html( this.content ) );

        // render footer buttons or remove footer
        if ( this.buttons )
          this.buttons.forEach( button => $.append( this.element.querySelector( 'footer' ), $.html( button.html, button.onclick ) ) );
        else
          $.remove( this.element.querySelector( 'footer' ) );

        // each button with a 'data-dismiss' attribute closes the modal dialog when clicked
        this.element.querySelectorAll( '[data-close]' ).forEach( button => button.addEventListener( 'click', this.close ) );

        // is not standalone?
        if ( this.parent ) {
          const root = this.ccm.context.root( this );
          root.element.parentNode.appendChild( this.root );
          root.root.style.position = 'relative';
          this.root.setAttribute( 'style', 'position: absolute; width: 100%; height: 100%; top: 0; left: 0' );
        }

        // initially closed? => close modal dialog
        this.closed && this.close();

      };

      /** opens the modal dialog */
      this.open = () => {
//      if ( this.parent ) document.body.style.overflowY = 'hidden';
        this.root.style.display = 'block';
        this.element.querySelector( '#dialog' ).classList.add( 'show' );
        this.ccm.context.root( this ).element.scrollIntoView( true );
      };

      /** closes the modal dialog */
      this.close = () => {
//      if ( this.parent ) document.body.style.overflowY = 'unset';
        this.element.querySelector( '#dialog' ).classList.remove( 'show' );
        this.root.style.display = 'none';
      };

      /** removes the modal dialog */
      this.remove = () => { this.close(); $.remove( this.root ); };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();