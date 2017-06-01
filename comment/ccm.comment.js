/**
 * @overview ccm component for commentating
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 */
ccm.component ( {
  name: 'comment',

  config: {
    data: {
      store: [ ccm.store, '../comment/datastore.json' ],
      key: 'test'
    },
    editor: [ ccm.intance, '../editor/ccm.editor.js' ],
    templates: [ ccm.store, '../comment/templates.json']
  },

  Instance: function () {
    var self = this;

    this.render = function ( callback ) {

      ccm.helper.dataset( self.data, function ( dataset ) {
        if ( !dataset.comments ) dataset.comments = [];

        self.element.innerHTML = '';
        self.element.appendChild( ccm.helper.html( self.templates.get( 'main' ), {
          click: function () {
            console.log( 'click!', self.editor.get().getContents() );
          },
          label: 'send'
        } ) );

        self.editor.render( function () {
          self.element.querySelector( '.editor' ).appendChild( self.editor.element );
          if ( callback ) callback( self );
        } );
      } );
    };
  }
} );