ccm.files[ "configs.js" ] = {
  "demo": {
    "inner": "<h1>Mark words in the text below</h1><p>Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen.</p>" +
      "<p>Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen.</p>" +
      "<p>Manchmal Sätze, die alle Buchstaben des Alphabets enthalten - man nennt diese Sätze »Pangrams«.</p>" +
      "<p>Sehr bekannt ist dieser: The quick brown fox jumps over the lazy old dog.</p>" +
      "<p>Oft werden in Typoblindtexte auch fremdsprachige Satzteile eingebaut (AVAIL® and Wefox™ are testing aussi la Kerning), um die Wirkung in anderen Sprachen zu testen.</p>" +
      "<p>In Lateinisch sieht zum Beispiel fast jede Schrift gut aus. Quod erat demonstrandum. Seit 1975 fehlen in den meisten Testtexten die Zahlen, weswegen nach TypoGb.</p>" +
      "<p>204 § ab dem Jahr 2034 Zahlen in 86 der Texte zur Pflicht werden. Nichteinhaltung wird mit bis zu 245 € oder 368 $ bestraft.</p>",
    "submit": true,
    "submit_button_label": "Save",
    "retry": true,
    "show_solution": true,
    "check": true,
    "keywords": [ 'Manchmal', 'Typoblindtexte', 'Zahlen',  'Satzteile'],
    "onfinish": {
      "log": true
    },
    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.0.0.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.min.js", "greedy" ] ],
  }
};