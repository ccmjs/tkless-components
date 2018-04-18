/**
 * Created by tkless on 26.09.17.
 */

( function () {

  var component = {

    name: 'learning_unit',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {
      templates: {
        "main": {
          "class": "container",
          "inner": [
            {
              "id": "content"
            },
            {
              "id": "exercises"
            }
          ]
        }
      },

      kea: 'hbrs_se17_bcs_le01',
      content: '<h1>Einleitung</h1>',
      exercise: [ 'ccm.component', '../exercise/exercise.js',
        { data: { store: [ 'ccm.store', { 'store': "../learning_unit/learning_unit_datastore.json" } ] } }
      ],
      css: [ 'ccm.load', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css', { url: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css', context:'head' } ]
    },

    Instance: function () {
      var self = this;

      this.start = function (callback) {
      };
    }
  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );
