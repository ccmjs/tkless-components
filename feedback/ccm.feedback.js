/**
 * @overview ccm component for feedback
 * @author Tea Kless <tea.kless@web.de>, 2017
 * @license The MIT License (MIT)
 */

{
  const component = {

    name: 'feedback',

    ccm: 'https://akless.github.io/ccm/ccm.js',

    config: {
      "templates": {
        "feedback": {
          "id": "slideout",
          "inner": [
            {
              "tag": "img",
              "src": "../feedback/resources/feedback.png",
              "alt": "feedback"
            },
            {
              "id": "slideout-inner",
              "inner":[
                {
                  "class": "row panel panel-success",
                  "inner": {
                    "tag": "form",
                    "inner": [
                      {
                        "class": "panel-body",
                        "inner": [
                          {
                          "class": "form-group",
                            "inner": [
                              {
                                "tag": "label",
                                "for": "Title",
                                "inner": "Title"
                              },
                              {
                                "tag": "input",
                                "type": "text",
                                "required": true,
                                "class": "form-control",
                                "id": "Title"
                              },
                            ]
                          },
                          {
                            "class": "form-group",
                            "inner": {
                              "tag": "textarea",
                              "required": true,
                              "rows": "5",
                              "class": "form-control",
                              "placeholder": "Write here..."
                            }
                          },

                          {
                            "class": "form-group",
                            "inner": {
                              "tag": "button",
                              "class": "btn btn-info btn-sm pull-right",
                              "typ": "submit",
                              "inner": "Submit",
                              "onclick": "%submit%"
                            }
                          }

                        ]
                      }
                    ]
                  }
                }
             ]
            }
          ]
        }
      },

      "from_above": "70%",

      css: [ 'ccm.load',
        { context: 'head', url: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css' },
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
        '../feedback/resources/default.css'
      ]
    },

    Instance: function () {
      let $;

      this.ready = callback => {
        $ = this.ccm.helper;
        callback();
      };

      this.start = callback => {

        $.dataset( this.data, dataset => {

          if ( this.logger ) self.logger.log( 'start', dataset );

          if ( !dataset.feedbacks ) dataset.feedbacks =[];

          $.setContent( this.element, this.ccm.helper.html( this.templates.feedback, {
            submit: () => {
              console.log(this.element.querySelector( 'input[type=text]' ).value);

              let data = {
                "title": this.element.querySelector( 'input[type=text]' ).value,
                "content": this.element.querySelector( 'textarea' ).value
              };

              dataset.feedbacks.push( data );
              // update dataset
              this.data.store.set( dataset, () => {

                if ( this.logger ) {
                  data = $.clone( data );
                  delete dataset.user;
                  this.logger.log( 'create', data );
                }
              } );
            }
          } ));

          // change feedback position from above
          if ( this.from_above ) {
            this.element.querySelector( '#slideout' ).style.top = this.from_above;
            this.element.querySelector( '#slideout-inner' ).style.top = this.from_above;
          }


          if ( callback ) callback();
      } );

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}