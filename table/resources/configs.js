ccm.files[ "configs.js" ] = {
  "demo": {
    table_row: 2,
    table_col: 4,
    add_row: true,
    table_head: [ "Header 1", "Header 2", "Header 3", "Header 4" ],
    col_settings: [
      { "type": "text", "placeholder": "Tel: 049..." },
      { "disabled": "true", "foo": "bar", "placeholder": "Hier steht Email" },
      { "type": "date", "bar": "baz" },
      { "type": "textarea", "placeholder": "Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da " +
        "sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um " +
        "Schriften zu testen. Manchmal Sätze, die alle Buchstaben des Alphabets enthalten - man nennt diese Sätze " +
        "»Pangrams«. Sehr bekannt ist dieser: The quick brown fox jumps over the lazy old dog. " }
    ],
    data: [
      [ "", "max.mustermann@mail.com", ""],
      [ "", "", ""],
      [ "", "erika.mustermann@mail.com", ""],
      [ "", "markus.möglich@mail.com", ""],
      [ "", "jane.doe@mail.com", ""]
    ],
    "submit": "true",
    "onfinish": {
      log: true
    }
  }
};