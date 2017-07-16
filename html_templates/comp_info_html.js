ccm.files[ "comp_info_html.js" ] = {
  "main": {
    "id": "main",
    "class": "container",
    "inner": [
      {
        "tag": "header",
        "class": "media",
        "inner": [
          {
            "class": "media-left",
            "tag": "section",
            "id": "logo",
            "inner":
            {
              "tag": "a",
              "inner":
              {
                "tag": "img",
                "src": "%logo%"
              }
            }
          },
          {
            "class": "media-body",
            "tag": "section",
            "id": "trailer",
            "inner": [
              {
                "tag": "h4",
                "id": "title",
                "class": "media-heading",
                "inner": "%title%"
              },
              {
                "tag": "a",
                "href": "%link_to_developer%",
                "id": "developer",
                "inner": [
                  "%developer%",
                  {
                    "tag":"span",
                    "class": "glyphicon glyphicon-chevron-right"
                  }
                ]

              }
            ]
          }
        ]
      },
      {
        "tag": "hr"
      },
      {
        "class": "navigation text-center",
        "inner": {
          "class": "btn-group",
          "inner":[
            {
              "tag": "a",
              "href": "#info",
              "inner": {
                "tag": "button",
                "typ": "button",
                "class": "btn btn-primary",
                "inner": "Information"
              }
            },
            {
              "tag": "a",
              "href": "#prev",
              "inner": {
                "tag": "button",
                "typ": "button",
                "class": "btn btn-primary",
                "inner": "Preview"
              }
            },
            {
              "tag": "a",
              "href": "#demo",
              "inner": {
                "tag": "button",
                "typ": "button",
                "class": "btn btn-primary",
                "inner": "Demo"
              }
            }
          ]
        }
      },
      {
        "id": "info",
        "inner": [
          {
            "tag": "h2"
          },
          {
            "tag": "hr"
          },
          {
            "tag": "p",
            "class": "lead",
            "inner": "%abstract%"
          },
          {
            "tag": "h4",
            "inner": "Description"
          },
          {
            "tag": "p",
            "inner": "description"
          },
          {
            "tag": "h4",
            "inner": "Details"
          },
          {
            "tag": "table",
            "class": "table table-striped",
            "inner": {
              "tag": "tbody",
              "class": "col-md-12",
              "inner": [
                {
                  "tag": "tr",
                  "inner": [
                    {
                      "tag": "th",
                      "inner": "Component name"
                    },
                    {
                      "tag": "tr",
                      "inner": "%component_name%"
                    }
                  ]
                },
                {
                  "tag": "tr",
                  "inner": [
                    {
                      "tag": "th",
                      "inner": "Version"
                    },
                    {
                      "tag": "tr",
                      "inner": "%component_version%"
                    }
                  ]
                },
                {
                  "tag": "tr",
                  "inner": [
                    {
                      "tag": "th",
                      "inner": "URL"
                    },
                    {
                      "tag": "tr",
                      "inner": "%component_url%"
                    }
                  ]
                },
                {
                  "tag": "tr",
                  "inner": [
                    {
                      "tag": "th",
                      "inner": "Developer"
                    },
                    {
                      "tag": "tr",
                      "inner": "%developer_name%"
                    }
                  ]
                },
                {
                  "tag": "tr",
                  "inner": [
                    {
                      "tag": "th",
                      "inner": "LICENSE"
                    },
                    {
                      "tag": "tr",
                      "inner": "%license%"
                    }
                  ]
                }
              ]
            }
          },
          {
            "class": "text-right",
            "inner": {
              "tag": "a",
              "href": "#main",
              "inner": {
                "tag": "span",
                "class": "label label-default",
                "inner": "back to top"
              }
            }
          }
        ]
      },
      {
        "id": "prev",
        "inner": [
          {
            "tag": "h3",
            "inner": "Preview"
          },
          {
            "tag": "hr"
          },
          {
            "class": "row",
            "inner": [
              {
                "class": "col-xs-6 col-md-3",
                "inner":{
                  "tag": "a",
                  "href": "https://placeholder.com",
                  "inner":{
                    "tag": "img",
                    "src": "http://via.placeholder.com/650x850"
                  }
                }
              },
              {
                "class": "col-xs-6 col-md-3",
                "inner":{
                  "tag": "a",
                  "href": "https://placeholder.com",
                  "inner":{
                    "tag": "img",
                    "src": "http://via.placeholder.com/650x850"
                  }
                }
              },
              {
                "class": "col-xs-6 col-md-3",
                "inner":{
                  "tag": "a",
                  "href": "https://placeholder.com",
                  "inner":{
                    "tag": "img",
                    "src": "http://via.placeholder.com/650x850"
                  }
                }
              }
            ]

          },
          {
            "class": "text-right",
            "inner": {
              "tag": "a",
              "href": "#main",
              "inner": {
                "tag": "span",
                "class": "label label-default",
                "inner": "back to top"
              }
            }
          }
        ]
      },
      {
        "id": "demo",
        "inner":[
          {
            "tag": "h3",
            "inner": "Live demo with demo data"
          },
          {
            "tag": "hr"
          },
          {
            "tag": "section",
            "id": "demo"
          },
          {
            "class": "text-right",
            "inner": {
              "tag": "a",
              "href": "#main",
              "inner": {
                "tag": "span",
                "class": "label label-default",
                "inner": "back to top"
              }
            }
          }
        ]
      }
    ]
  }
}