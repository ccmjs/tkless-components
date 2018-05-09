ccm.files[ "configs.js" ] = {
  "demo": {
    table_row: 2,
    table_col: 5,
    add_row: true,
    table_head: [ "Header 1", "Header 2", "Header 3", "Header 4", "Header 5" ],
    col_settings: [
      { "type": "tel", "placeholder": "Tel: 049...", "required": true },
      { "foo": "bar", "placeholder": "Hier steht Email" },
      { "type": "date", "bar": "baz" },
      { "type": "textarea", "placeholder": "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da " +
        "sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um " +
        "Schriften zu testen. Manchmal Sätze, die alle Buchstaben des Alphabets enthalten - man nennt diese Sätze " +
        "»Pangrams«. Sehr bekannt ist dieser: The quick brown fox jumps over the lazy old dog. " },
      { "type": "textarea", "disabled": "true", "placeholder": "Hier kannst du nichts schreiben." }
    ],
    data: {
      values: [
        [ "0045/ 12344567", "max.mustermann@mail.com", "12.01.2018",  "textarea 1", "textarea 2"],
        [ "", "", ""],
        [ "", "erika.mustermann@mail.com", "", "", ""],
        [ "", "markus.möglich@mail.com", "", "", ""],
        [ "", "jane.doe@mail.com", "", "", ""]
      ]
    },
    "submit": "true",
    "onchange": function ( result, value, self ) { console.log( result, value, self ); },
    "onfinish": {
      log: true
    }
  }
};