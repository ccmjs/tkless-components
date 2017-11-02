/**
 * @overview ccm component for building a fill-in-the-blank text
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 */

( function () {

  var component = {

    name: 'fill_in_the_blank_text_builder',
    version:[ 1,0,0 ],

    ccm: {
      url: 'https://akless.github.io/ccm/version/ccm-10.0.0.min.js',
      integrity: 'sha384-AND32Wbfnmb3f2vRMHkXSJpi81oFmy3eO1FbMHb5i2XOzwg0z+T1de180FUH1Tjt',
      crossorigin: 'anonymous'
    },

    config: {
      templates: {
        "main": {
          "inner": [
            {
              "tag": "legend",
              "class": "text-primary",
              "inner": "Build your fill-in-the-blank text "
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
                  "class": "feedback form-group",
                  "inner": [
                    {
                      "tag": "label",
                      "class": "control-label col-md-2",
                      "inner": "Feedback"
                    },
                    {
                      "class": "col-md-10",
                      "inner": {
                        "tag": "select",
                        "class": "select-solution form-control",
                        "name": "feedback",
                        "onchange": "%change_feedback%",
                        "inner": [
                          {
                            "tag":"option",
                            "inner": "None",
                            "value": "none"
                          },
                          {
                            "tag":"option",
                            "inner": "Show only correctness",
                            "value": "correctness"
                          },
                          {
                            "tag":"option",
                            "inner": "Show correctness and solutions",
                            "value": "solutions"
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
                  "class": "restart form-group",
                  "inner": [
                    {
                      "tag": "label",
                      "class": "control-label col-md-2",
                      "inner": "Restart after finish:"
                    },
                    {
                      "class": "col-md-10",
                      "inner": {
                        "class": "checkbox",
                        "onchange": "%change_button%",
                        "inner": {
                          "tag": "label",
                          "inner": {
                            "tag": "input",
                            "type": "checkbox",
                            "name": "restart"
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
                  "inner": [
                    {
                      "tag": "legend",
                      "class": "legend text-primary",
                      "inner": "As it already looks like..."
                    },
                    {
                      "id": "preview"
                    }
                  ]
                },
                {
                  "class": "submit-button form-group",
                  "inner": [

                    {
                      "class": "col-md-12 text-right",
                      "inner": {
                        "tag": "button",
                        "type": "submit",
                        "class": "btn btn-primary",
                        "inner": "Save App"
                      }
                    }
                  ]

                }
              ]
            }
          ]
        }
      },

      //submit_button: true,
      /*start_state: {
        blank: true,
        css_layout: "['ccm.load','https://akless.github.io/ccm-components/cloze/resources/lea.css']",
        feedback: true,
        solutions: true,
        key : '1505038949159X2007155418531874',
        keywords: true,
        text: '<p>In order to [[serve]] you well, Karma needs to know about your project in order to test it and this is done via a configuration file. The easiest way to generate an initial configuration file is by using the karma init command. This page lists all of the available configuration options.</p>',
        time: 123,
        user: "['ccm.instance','https://akless.github.io/ccm-components/user/ccm.user.js',{'sign_on':'guest'}]",
        captions: { submit: 'Submit', finish: 'Restart' },
        onfinish: { restart: true }
      },*/
      editor: [ 'ccm.component', 'https://tkless.github.io/ccm-components/editor/versions/ccm.editor-1.0.0.min.js',
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
      preview: [ 'ccm.component', 'https://akless.github.io/ccm-components/cloze/versions/ccm.cloze-2.1.0.min.js' ],
      onfinish: {
        log: true,
        store_settings: { store: "clozes", url: "wss://ccm.inf.h-brs.de" },
        key: "demo",
        embed_code: "cloze"
      },

      css: [ 'ccm.load',
        { context: 'head', url: 'https://tkless.github.io/ccm-components/lib/bootstrap/css/font-face.css' },
        'https://tkless.github.io/ccm-components/lib/bootstrap/css/bootstrap.css',
        'https://tkless.github.io/ccm-components/fill_in_the_blank_text_builder/resources/default.css' ],

    },

    Instance: function () {
      var self = this;
      var editor;

      this.submit = function () {
        if ( self.onfinish ) self.ccm.helper.onFinish( self, prepareResultData() );
      };

      this.start = function (callback) {

        var $ = self.ccm.helper;

        $.setContent( self.element, $.html( self.templates.main, {
          submit: function ( event ) {
            event.preventDefault();
            self.submit();
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

          change_button: renderPreview,

          change_feedback: renderPreview,

          time: renderPreview

        } ) );


        if( !self.submit_button ) {
          self.element.querySelector( '.form-horizontal' ).removeChild( self.element.querySelector( '.submit-button' ) );
        }

        self.editor.start( { root: self.element.querySelector( '#editor-container' ) }, function ( instance ) {
          editor = instance;

          editor.get().on('text-change', function() {
            renderPreview();
          });

          if( self.start_state ) {
            for( var property in self.start_state ) {
              if( self.start_state[ property ] ) {
                switch( property ) {
                  case 'user':
                  case 'css_layout':
                    self.element.querySelector('select[name="' + property + '"] option[value="' + self.start_state[ property ] + '"]').selected = true;
                    break;
                  case 'keywords':
                    if( !self.start_state[ property ]) {
                      self.element.querySelector('select[name="provided"] option[value="none"]').selected = true;
                      break;
                    }

                   if( self.start_state[ property ] === true ) {
                    self.element.querySelector('select[name="provided"] option[value="auto"]').selected = true;
                    break;
                   }

                   self.element.querySelector('select[name="provided"] option[value="manually"]').selected = true;
                   self.element.querySelector('input[name="keywords"]').value = self.start_state[ property ].join( ' ' );
                   self.element.querySelector('.keywords').style.display = 'block';
                   break;
                  case 'blank':
                    self.element.querySelector( 'input[type="checkbox"][name="' + property + '"]' ).checked = true;
                    break;
                  case 'onfinish':
                    self.element.querySelector( 'input[type="checkbox"][name="restart"]' ).checked = true;
                    break;
                  case 'feedback':
                    if( !self.start_state[ property ] ) {
                      self.element.querySelector( 'select[name="feedback"] option[value="none"]' ).selected = true;
                      break;
                    }
                    self.element.querySelector( 'select[name="feedback"] option[value="correctness"]' ).selected = true;
                    break;
                  case 'solutions':
                    if( self.start_state[ 'feedback' ] && self.start_state[ property ] )
                      self.element.querySelector( 'select[name="feedback"] option[value="solutions"]' ).selected = true;
                    break;
                  case 'time':
                    self.element.querySelector('input[type="number"][name="time"]').value =  self.start_state[ property ];
                    break;
                  case 'text':
                    editor.get().root.innerHTML = self.ccm.helper.protect( self.start_state[ property ] );
                    break;
                }
              }
            }
          }
        } );

        function renderPreview() {
          self.element.querySelector( '#preview' ).innerHTML = '<div></div>';
          var config_data = prepareResultData();
          config_data.root = self.element.querySelector( '#preview div' );
          self.preview.start( config_data );
        }

        if ( callback ) callback();
      };

      function prepareResultData() {
        var config_data = self.ccm.helper.formData( self.element.querySelector( 'form' ) );

        config_data.text = editor.get().root.innerHTML;
        config_data.captions = { submit: 'Submit', finish: 'Restart' };

        if ( config_data.provided === 'auto' )
          config_data.keywords = true;
        else if ( config_data.provided === 'manually' && config_data.keywords.trim() )
          config_data.keywords = config_data.keywords.trim().split( ',' );
        else
          delete config_data.keywords;
        delete config_data.provided;

        if ( config_data.feedback === 'solutions' )
        { config_data.feedback = true; config_data.solutions = true; }
        else if ( config_data.feedback === 'correctness' )
          config_data.feedback = true;
        else
          delete config_data.feedback;

        if ( config_data.restart )
          config_data.onfinish = { restart: true };
        delete config_data.restart;

        self.ccm.helper.decodeDependencies( config_data );
        return config_data;
      }
    }
  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );