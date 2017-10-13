( function () {

  var component = {

    name: 'upload',

    ccm: 'https://akless.github.io/ccm/ccm.js',

    config: {
      templates: {
        "main": {
          "class": "main",
          "inner": {
            "class": "container",
            "id": "container",
            "inner": [
              {
                "id": "actions",
                "class":"row",
                "inner": [
                  {
                    "class": "col-lg-7",
                    "inner": [
                      {
                        "tag": "button",
                        "class": "btn btn-success fileinput-button",
                        "inner": [
                          {
                            "tag": "i",
                            "class": "glyphicon glyphicon-plus"
                          },
                          {
                            "tag": "span",
                            "inner": "Add files..."
                          }
                        ]
                      },
                      {
                        "tag": "button",
                        "type": "submit",
                        "class": "btn btn-primary start",
                        "inner": [
                          {
                            "tag": "i",
                            "class": "glyphicon glyphicon-upload"
                          },
                          {
                            "tag": "span",
                            "inner": "Start upload"
                          }
                        ]
                      },
                      {
                        "tag": "button",
                        "type": "reset",
                        "class": "btn btn-warning cancel",
                        "inner": [
                          {
                            "tag": "i",
                            "class": "glyphicon glyphicon-ban-circle"
                          },
                          {
                            "tag": "span",
                            "inner": "Cancel upload"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "class": "col-lg-5",
                    "inner": {
                      "tag": "span",
                      "class": "fileupload-process",
                      "inner": {
                        "id": "total-progress",
                        "class": "progress progress-striped active",
                        "role": "progressbar",
                        "aria-valuemin": "0",
                        "aria-valuemax": "100",
                        "aria-valuenow": "0",
                        "inner": {
                          "class": "progress-bar progress-bar-success",
                          "style": "width:0%",
                          "data-dz-uploadprogress": true
                        }
                      }
                    }
                  }
                ]
              },
              {
                "class": "table table-striped files",
                "id": "previews",
                "inner": {
                  "id": "template",
                  "class": "file-row",
                  "inner": [
                    {
                      "inner": {
                        "tag": "span",
                        "class": "preview img data-dz-thumbnail"
                      }
                    },
                    {
                      "inner": [
                        {
                          "tag": "p",
                          "class": "name",
                          "data-dz-name": true
                        },
                        {
                          "tag": "strong",
                          "class": "error text-danger",
                          "data-dz-errormessage": true
                        }
                      ]
                    },
                    {
                      "inner": [
                        {
                          "tag": "p",
                          "class": "size",
                          "data-dz-size": true
                        },
                        {
                          "class": "progress progress-striped active",
                          "role": "progressbar",
                          "aria-valuemin": "0",
                          "aria-valuemax":"100",
                          "aria-valuenow": "0",
                          "inner": {
                            "class": "progress-bar progress-bar-success",
                            "style": "width:0%",
                            "data-dz-uploadprogress": true
                          }
                        }
                      ]
                    },
                    {
                      "inner": [
                        {
                          "tag": "button",
                          "class": "btn btn-primary start",
                          "inner": [
                            {
                              "tag": "i",
                              "class": "glyphicon glyphicon-upload"
                            },
                            {
                              "tag": "span",
                              "inner": "Start"
                            }
                          ]
                        },
                        {
                          "tag": "button",
                          "class": "btn btn-warning cancel",
                          "data-dz-remove": true,
                          "inner": [
                            {
                              "tag": "i",
                              "class": "glyphicon glyphicon-ban-circle"
                            },
                            {
                              "tag": "span",
                              "inner": "Cancel"
                            }
                          ]
                        },
                        {
                          "tag": "button",
                          "class": "btn btn-danger delete",
                          "data-dz-remove": "true",
                          "inner": [
                            {
                              "tag": "i",
                              "class": "glyphicon glyphicon-trash"
                            },
                            {
                              "tag": "span",
                              "inner": "Delete"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              }
            ]
          }
        }
      },
      libs: [ 'ccm.load',
        { context: 'head', url: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css' },
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
        '../upload/resources/dropzone/dropzone.js',
        '../upload/resources/dropzone/dropzone.css',
        '../upload/resources/default.css'
      ]
    },

    Instance: function () {
      var self = this;

      this.start = function ( callback ) {

        self.ccm.helper.setContent( self.element, self.ccm.helper.html( self.templates.main ) );
        // Get the template HTML and remove it from the doumenthe template HTML and remove it from the doument
        var previewNode = self.element.querySelector("#template");
        previewNode.id = "";
        var previewTemplate = previewNode.parentNode.innerHTML;
        previewNode.parentNode.removeChild(previewNode);

        var myDropzone = new Dropzone(self.element.querySelector('.main'), { // Make the whole body a dropzone
          url: "http://localhost:8080/upload", // Set the url
          thumbnailWidth: 80,
          thumbnailHeight: 80,
          parallelUploads: 20,
          previewTemplate: previewTemplate,
          autoQueue: false, // Make sure the files aren't queued until manually added
          previewsContainer: self.element.querySelector( "#previews" ), // Define the container to display the previews
          clickable: self.element.querySelector('.fileinput-button' ), // Define the element that should be used as click trigger to select files.
        });

        myDropzone.on("addedfile", function(file) {
          // Hookup the start button
          file.previewElement.querySelector(".start").onclick = function() { myDropzone.enqueueFile(file); };
        });

        // Update the total progress bar
        myDropzone.on("totaluploadprogress", function(progress) {
          self.element.querySelector("#total-progress .progress-bar").style.width = progress + "%";
        });

        myDropzone.on("sending", function(file) {
          // Show the total progress bar when upload starts
          self.element.querySelector("#total-progress").style.opacity = "1";
          // And disable the start button
          file.previewElement.querySelector(".start").setAttribute("disabled", "disabled");
        });

        // Hide the total progress bar when nothing's uploading anymore
        myDropzone.on("queuecomplete", function(progress) {
          self.element.querySelector("#total-progress").style.opacity = "0";
        });

        // Setup the buttons for all transfers
        // The "add files" button doesn't need to be setup because the config
        // `clickable` has already been specified.
        self.element.querySelector("#actions .start").onclick = function() {
          myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
        };
        self.element.querySelector("#actions .cancel").onclick = function() {
          myDropzone.removeAllFiles(true);
        };

        if ( callback ) callback();
      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );