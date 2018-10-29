ccm.files[ "configs.js" ] = {
  "demo": {
    key: "demo",
    settings: {
      modules: {
        syntax: true,    // needed for syntax highlighting

        toolbar: [          // if no toolbar needed set: settings.modules.toolbar: false
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [ 'bold', 'italic', 'underline' ],
          ['code-block'],  // Include code button in toolbar for syntax highlighting
        ]
      },
      placeholder: 'Write here...',
      theme: 'snow'
    }
  }
};