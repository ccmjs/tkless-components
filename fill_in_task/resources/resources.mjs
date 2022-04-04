export const demo = {
  "content": [ "ccm.component", "https://ccmjs.github.io/tkless-components/table/versions/ccm.table-5.1.0.js", {
    "filter_values": true,
    //"add_row": true,
    //"table_col": 6,
    "table_head": [ "Catalogue No.", "Task", "Fee in Euro per task", "No. of times during trial", "Total in Euro calculated", "checkbox" ],
    "col_settings": [
      { "type": "none" },
      { "type": "none" },
      { "type": "none" },
      { "type": "text", "required": true },
      { "type": "text", "required": true },
      { "type": "checkbox" }
    ],
    "data": {
      "values": [
        [ "2", "Vital signs will include blood <br> pressure (systolic and diastolic) <br>and pulse (beats/minute).", "1,75", "", "", "" ],
        [ "3", "In-depth consultation",	"8,57", "", "", "" ],
        [ "8", "physical examination", "15,15", "", "", "" ]
      ]
    }
  } ],
  "solution": {
    "1-4": "4",
    "1-5": "7,00",
    "1-6": true,
    "2-4": "1",
    "2-5": "8,57",
    "2-6": false,
    "3-4": "4",
    "3-5": "60,6",
    "3-6": false
  },
  "sample_solution": [ "ccm.start", "https://ccmjs.github.io/tkless-components/table/versions/ccm.table-5.1.0.js", [
        "ccm.load", "https://ccmjs.github.io/tkless-components/table/resources/resources.mjs#demo"
      ] ]
}
