ccm.files[ "configs.js" ] = {
  "demo": {
    table_row: 5,
    table_col: 3,
    table_head: [ "header-1", "header-2", "header-3" ],
    col_settings: [
      { "type": "number", "placeholder": "Tel: 049..." },
      { "disabled": "true", "foo": "bar", "placeholder": "Hier steht Email" },
      { "type": "date", "foo": "bar" }
    ],
    data: [
      [ "", "max.mustermann@mail.com", ""],
      [ "", "", ""],
      [ "", "erika.mustermann@mail.com", ""],
      [ "", "markus.möglich@mail.com", ""],
      [ "", "jane.doe@mail.com", ""]
    ]
  }
};