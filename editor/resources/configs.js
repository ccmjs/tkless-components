ccm.files[ "configs.js" ] = {
  "demo": {
    code_highlighting: [ 'ccm.load', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/darcula.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js'],
    settings: {
      modules: {
        syntax: true,    // needed for syntax highlighting

        toolbar: [          // if no toolbar needed set: settings.modules.toolbar: false
          [ { header: [ 1, 2, false ] } ],
          [ 'bold', 'italic', 'underline' ],
          ['code-block'],  // Include code button in toolbar for syntax highlighting
        ]
      },
      placeholder: 'Write here...',
      theme: 'snow'
    }
  }
};