export const demo = {
    /*"inner": "<h1>Mark words in the text below</h1><p>Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen.</p>" +
    "<p>Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen.</p>" +
    "<p>Manchmal Sätze, die alle Buchstaben des Alphabets enthalten - man nennt diese Sätze »Pangrams«.</p>" +
    "<p>Sehr bekannt ist dieser: The quick brown fox jumps over the lazy old dog.</p>" +
    "<p>Oft werden in Typoblindtexte auch fremdsprachige Satzteile eingebaut (AVAIL® and Wefox™ are testing aussi la Kerning), um die Wirkung in anderen Sprachen zu testen.</p>" +
    "<p>In Lateinisch sieht zum Beispiel fast jede Schrift gut aus. Quod erat demonstrandum. Seit 1975 fehlen in den meisten Testtexten die Zahlen, weswegen nach TypoGb.</p>" +
    "<p>204 § ab dem Jahr 2034 Zahlen in 86 der Texte zur Pflicht werden. Nichteinhaltung wird mit bis zu 245 € oder 368 $ bestraft.</p>",*/
    "inner": [ "ccm.start", "https://ccmjs.github.io/tkless-components/table/versions/ccm.table-5.0.0.js", {
        table_head: [ "Name", "First Name", "Role", "Email", "Telephone", "Fax" ],
        data: {
            values:
                [
                  ["Doe", "John", "PM", "john.doe@mail.com", "011223456", ""],
                  ["Doe", "Jahn", "Nurse", "jane.doe@mail.com", "0678534", ""]
                ]
            }
        }
    ],
    "submit": true,
    "submit_button_label": "Save",
    "retry": true,
    "show_solution": true,
    "check": true,
    "keywords": [ 'John', 'Nurse'],
    "progressbar_with_points": true,
    "oncheck": ( instance ) => ( console.log( instance.getValue() ) ),
    //"data": { solutions: [ 'PM', 'Doe' ], marked: [ 'mark-word-15' ] },
    //"show_results": true,
    "onfinish": { "log": true }
};
