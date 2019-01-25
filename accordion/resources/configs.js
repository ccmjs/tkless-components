ccm.files[ "configs.js" ] = {

  "demo": {
    "key": "demo",
    "color": "info",
    "size": "lg",
    "entries": [
      {
        "title": "Learning Goals",
        "content": "<h2>Aenean commodo ligula eget dolor aenean massa</h2>" +
        "<ul>" +
        "  <li>Lorem ipsum dolor sit amet, consectetuer adipiscing \n" +
        "  elit. Aenean commodo ligula eget dolor. Aenean \n" +
        "  massa.</li>\n" +
        "  <li>Cum sociis natoque penatibus et magnis dis \n" +
        "  parturient montes, nascetur ridiculus mus. Donec quam \n" +
        "  felis, ultricies nec, pellentesque eu, pretium quis, \n" +
        "  sem.</li>\n" +
        "  <li>Nulla consequat massa quis enim. Donec pede justo, \n" +
        "  fringilla vel, aliquet nec, vulputate eget, arcu.</li>\n" +
        "  <li>In enim justo, rhoncus ut, imperdiet a, venenatis \n" +
        "  vitae, justo. Nullam dictum felis eu pede mollis \n" +
        "  pretium. Integer tincidunt.</li>\n" +
        "</ul>"
      },
      {
        "title": "Lecture",
        "content": "<source src=\"https://ccmjs.github.io/tkless-components/table/ccm.table.js\"> <p>Hier steht <i>ccm</i>-Komponente</p>" +
        "<ccm-table key='[\"ccm.get\",\"https://ccmjs.github.io/tkless-components/table/resources/configs.js\",\"demo\"]'></ccm-table>"
      },
      {
        "title": "Exercises",
        "content": ""
      },
      {
        "title": "Bibliography",
        "content": "..."
      }
    ],
  },

  "dms":{
    "_id": "accordion",
    "title": "Accordion",
    "icon": "https://ccmjs.github.io/tkless-components/accordion/resources/icon.svg",
    "abstract": "Create vertically stacked expandable Content.",
    "url": "https://ccmjs.github.io/tkless-components/accordion/versions/ccm.accordion-2.0.0.js",
    "version": "2.0.0",
    "developer": "Tea Kless",
    "license": "MIT License",
    "website": "https://github.com/ccmjs/tkless-components/",
    "ignore": {
    "builder": [
      {
        "title": "JSON Builder",
        "url": "https://ccmjs.github.io/akless-components/app_builder/versions/ccm.app_builder-1.0.0.js",
        "config": {
          "builder": [
            "ccm.component",
            "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.1.0.js",
            {
              "html.inner.1": "",
              "directly": true
            }
          ]
        }
      }
    ]
  },
    "updated_at": "2018-10-12T11:38:29+02:00",
    "created_at": "2018-10-12T11:38:29+02:00"
  }
};