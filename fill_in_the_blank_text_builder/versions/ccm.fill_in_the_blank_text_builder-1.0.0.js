/**
 * @overview ccm component for building a fill-in-the-blank text
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 * @version 1.0.0
 */

( function () {

  var component = {

    name: 'fill_in_the_blank_text_builder',
    version:[ 1,0,0 ],

    ccm: {
      url: 'https://akless.github.io/ccm/version/ccm-10.0.0.min.js',
      integrity: 'sha384-bCcBv9yCHVcXtsHxkfPcFeT+j77G112ZADZ1DkxcYdxjflPG4lTiiFiB3Jp+c2NG',
      crossorigin: 'anonymous'
    },

    config: {
      templates: {
        "main": {
          "class": "container-fluid",
          "inner": [
            {
              "class": "page-header",
              "inner": {
                "tag": "h1",
                "class": "text-primary",
                "inner": [
                  "Build your fill in the blank-text "
                ]
              }
            },
            {
              "tag": "form",
              "class": "form-horizontal",
              "onsubmit": "%submit%",
              "inner": [
                {
                  "class": "sign-on form-group",
                  "inner": [
                    {
                      "tag": "label",
                      "class": "control-label col-md-2",
                      "inner": "Sign-on:"
                    },
                    {
                      "class": "col-md-10",
                      "inner": {
                        "tag": "select",
                        "onchange": "%user%",
                        "class": "user form-control",
                        "name": "user",
                        "inner": [
                          {
                            "tag":"option",
                            "inner": "None",
                            "value": ""
                          },
                          {
                            "tag":"option",
                            "inner": "Guest Mode",
                            "value": "['ccm.instance','https://akless.github.io/ccm-components/user/ccm.user.js',{'sign_on':'guest'}]"
                          },
                          {
                            "tag":"option",
                            "inner": "Demo Mode",
                            "value": "['ccm.instance','https://akless.github.io/ccm-components/user/ccm.user.js',{'sign_on':'demo'}]"
                          },
                          {
                            "tag":"option",
                            "inner": "H-BRS FB02",
                            "value": "['ccm.instance','https://akless.github.io/ccm-components/user/ccm.user.js',{'sign_on':'hbrsinfkaul'}]"
                          }
                        ]
                      }
                    }
                  ]
                },
                {
                  "class": "layout form-group",
                  "inner": [
                    {
                      "tag": "label",
                      "class": "control-label col-md-2",
                      "inner": "Layout:"
                    },
                    {
                      "class": "col-md-10",
                      "inner": {
                        "tag": "select",
                        "onchange": "%change_layout%",
                        "class": "form-control",
                        "name": "css_layout",
                        "inner": [
                          {
                            "tag":"option",
                            "inner": "Default",
                            "value": "['ccm.load','https://akless.github.io/ccm-components/cloze/resources/default.css']"
                          },
                          {
                            "tag":"option",
                            "inner": "LEA-like",
                            "value": "['ccm.load','https://akless.github.io/ccm-components/cloze/resources/lea.css']"
                          }
                        ]
                      }
                    }
                  ]
                },
                {
                  "class": "solution form-group",
                  "inner": [
                    {
                      "tag": "label",
                      "class": "control-label col-md-2",
                      "inner": "Provided answers"
                    },
                    {
                      "class": "col-md-10",
                      "inner": {
                        "tag": "select",
                        "class": "select-solution form-control",
                        "name": "provided",
                        "onchange": "%provided%",
                        "inner": [
                          {
                            "tag":"option",
                            "inner": "None",
                            "value": "none"
                          },
                          {
                            "tag":"option",
                            "inner": "Auto generated",
                            "value": "auto"
                          },
                          {
                            "tag":"option",
                            "inner": "Manually",
                            "value": "manually"
                          }
                        ]
                      }
                    }
                  ]
                },
                {
                  "class": "keywords form-group",
                  "style": "display: none",
                  "inner": [
                    {
                      "tag": "label",
                      "class": "control-label col-md-2",
                      "inner": "Manually:"
                    },
                    {
                      "class": "col-md-10",
                      "inner": {
                        "tag": "input",
                        "type": "text",
                        "name": "keywords",
                        "class": "manually form-control",
                        "placeholder": "type something and hit enter"
                      }
                    }

                  ]
                },
                {
                  "class": "blank form-group",
                  "inner": [
                    {
                      "tag": "label",
                      "class": "control-label col-md-2",
                      "inner": "Blank gaps:"
                    },
                    {
                      "class": "col-md-10",
                      "inner": {
                        "class": "checkbox",
                        "onchange": "%change_blank%",
                        "inner": {
                          "tag": "label",
                          "inner": {
                            "tag": "input",
                            "type": "checkbox",
                            "name": "blank"
                          }
                        }
                      }
                    }

                  ]
                },
                {
                  "class": "feedback form-group",
                  "inner": [
                    {
                      "tag": "label",
                      "class": "control-label col-md-2",
                      "inner": "Feedback:"
                    },
                    {
                      "class": "col-md-10",
                      "inner": {
                        "class": "checkbox",
                        "onchange": "%change_feedback%",
                        "inner": {
                          "tag": "label",
                          "inner": {
                            "tag": "input",
                            "type": "checkbox",
                            "name": "feedback "
                          }
                        }
                      }
                    }

                  ]
                },
                {
                  "class": "time-limit form-group",
                  "inner": [
                    {
                      "tag": "label",
                      "class": "control-label col-md-2",
                      "inner": "Time Limit:"
                    },
                    {
                      "class": "col-md-10",
                      "inner": {
                        "tag": "input",
                        "type":"number",
                        "onchange": "%time%",
                        "class": "form-control",
                        "name": "time",
                        "placeholder": "time in seconds"
                      }
                    }
                  ]
                },
                {
                  "class": "editor form-group",
                  "inner": [
                    {
                      "tag": "label",
                      "class": "control-label col-md-2",
                      "inner": "Your Text:"
                    },
                    {
                      "class": "col-md-10",
                      "id": "editor-container"
                    }
                  ]
                },
                {
                  "class": "submit-button form-group",
                  "inner": [
                    {
                      "tag": "label",
                      "class": "control-label col-md-2"
                    },
                    {
                      "class": "col-md-10",
                      "inner": {
                        "tag": "button",
                        "type": "submit",
                        "class": "btn btn-primary",
                        "inner": "Submit"
                      }
                    }
                  ]

                }
              ]
            },
            {
              "tag": "fieldset",
              "inner": [
                {
                  "tag": "legend",
                  "inner": "Preview"
                },
                {
                  "id": "preview",
                  "inner": {}
                }
              ]
            }
          ]
        }

      },

      editor: [ 'ccm.component', 'https://tkless.github.io/ccm-components/editor/ccm.editor.js',
        { 'settings.modules.toolbar': [
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          ['bold', 'italic', 'underline'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'align': [] }]
        ],
          'settings.placeholder': 'Type here...'
        }
      ],
      style: [ 'ccm.load', 'https://tkless.github.io/ccm-components/fill_in_the_blank_text_builder/style.css' ],
      bootstrap_css: [ 'ccm.load', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css', { url: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css', context:'head' } ],
      preview: [ 'ccm.component', 'https://akless.github.io/ccm-components/cloze/versions/ccm.cloze-2.0.0.min.js' ],
      onfinish: {
        log: true,
        store_settings: { store: "clozes", url: "wss://ccm.inf.h-brs.de" },
        key: "demo",
        embed_code: "cloze"
      }
    },

    Instance: function () {
      var self = this;
      var editor;

      this.start = function (callback) {

        var $ = self.ccm.helper;
        $.setContent( self.element, self.ccm.helper.html( self.templates.main, {
          submit: function ( event ) {
            event.preventDefault();
            if ( self.onfinish ) $.onFinish( self, prepareResultData() );
          },

          user: renderPreview,

          change_layout: renderPreview,

          provided: function () {
            if ( this.value === 'manually' )
              self.element.querySelector('.keywords').style.display = 'block';
            else
              self.element.querySelector( '.keywords' ).style.display = 'none';
          },

          change_blank: renderPreview,

          change_feedback: renderPreview,

          time: renderPreview

        } ) );

        self.editor.start( { root: self.element.querySelector( '#editor-container' ) }, function ( instance ) {
          editor = instance;

          editor.get().on('text-change', function() {
            renderPreview();
          });
        } );

        function prepareResultData() {
          var config_data = $.formData( self.element.querySelector( 'form' ) );

          config_data[ "text" ] = editor.get().root.innerHTML;

          if ( config_data.provided === 'auto' )
            config_data.keywords = true;
          else if ( config_data.provided === 'manually' && config_data.keywords.trim() )
            config_data.keywords = config_data.keywords.trim().split( ' ' );
          else
            delete config_data.keywords;
          delete config_data.provided;

          $.decodeDependencies( config_data );
          return config_data;
        }

        function renderPreview() {
          self.element.querySelector( '#preview' ).innerHTML = '<div></div>';
          var config_data = prepareResultData();
          config_data.root = self.element.querySelector( '#preview div' );
          self.preview.start( config_data );
        }

        if ( callback ) callback();
      };
    }
  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );