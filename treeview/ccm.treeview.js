/**
 * @overview ccmjs-based web component for treeview
 * @author Tea Kless <tea.kless@web.de> 2023
 * @license The MIT License (MIT)
 */

( () => {
  const component = {
    name: 'treeview',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.4.2.min.js',
    config: {
      "html": {
        "class": "container",
        "main": {
          "id": "treeview",
          "class": "row",
          "inner":[
            {
              "id": "tree",
              "class": "col-md-4 col-sm-auto",
              "inner": {
                "class": "list-group"
              }
            },
            {
              "id": "content",
              "class": "col"
            }
          ]
        },
        "node_item": {
          "tag": "button",
          "class": "node list-group-item list-group-item-action",
          "onclick": "%active%",
          "id": "%id%",
          "inner": {
            "tag": "span",
            "inner": [
              {
                "tag": "span",
                "class": "icon",
                "inner": "%icon% "
              },
              {
                "tag": "span",
                "class": "title",
                "inner": "%title% "
              }
            ]
          }
        }
      },
      "onclick": function ( elem, data ){ console.log( elem, data) },
      "collapse_icon": '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">\n' +
          '  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>\n' +
          '</svg>',//svg
      "expand_icon":  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16">\n' +
          '  <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>\n' +
          '</svg>',//svg
      "leaf_icon": '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dot" viewBox="0 0 16 16">\n' +
          '  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>' +
          '</svg>',
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.4.2.min.mjs" ],
      "css": [ "ccm.load", "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap.min.css",
        "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap-icons.min.css",
        'resources/style.css',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js'],
      "dark": false
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      let self = this;

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // setup dark mode
        this.dark === 'auto' && this.element.classList.add( 'dark_auto' );
        this.dark === true && this.element.classList.add( 'dark_mode' );

      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log('start');

        if(!this.data || (this.data.length === '0')) $.setContent( this.element, 'Nothing to display!');

        let main = $.html(this.html.main);
        let j=0;
        generateTree(this.data, 0);

        $.setContent(this.element, main);


        function generateTree(data, indent, child_nr=[]) {
          for(const entry in data){
            if (Array.isArray(data[entry].inner) && !$.isDependency(data[entry].inner)) {
              j++;
              addNode(data[entry], true, indent, j, child_nr);
              generateTree(data[entry].inner, indent+1, [...child_nr, j]);
            }
            else addNode(data[entry], false, indent, 0, child_nr);
          }
        }

        function addNode(data, isArray, indent, parent_nr, child_nr) {
          let elem_node = $.html( self.html.node_item, {
            id: $.generateKey(),
            icon: data.icon? data.icon: isArray? self.expand_icon: self.leaf_icon,
            active: async e => {
              toggleActive(e, isArray);
              if (!isArray && data.inner){
                if ($.isDependency(data.inner) ) {
                  const inst = await $.solveDependencies(data.inner);
                  $.setContent(main.querySelector('#content'), inst.root);
                }
                else $.setContent(main.querySelector('#content'), data.inner);
                self.onclick && self.onclick(main.querySelector('#content'), data);
              }
              },
            title: data.title
          } );
          addIndent(elem_node, indent);
          addBadge(elem_node, data);
          parent_nr && elem_node.setAttribute('data-parent', parent_nr.toString().replaceAll(',', ' '));
          child_nr && elem_node.setAttribute('data-child', child_nr.toString().replaceAll(',', ' '));
          main.querySelector('.list-group').appendChild(elem_node)

          function addIndent(node, number_of_indents) {
            for(let i = 0; i < number_of_indents; i++){
              const indent = $.html( {
                "tag": "span",
                "class": "indent"
              } );
              node.setAttribute('data-indent', number_of_indents);
              node.prepend(indent);
            }
          }

          function addBadge(node, data) {
            if( data.tags && data.tags.length !== 0) {
              for(let i = 1; i < data.tags.length; i++){
                const badge = $.html( {
                  "tag": "span",
                  "class": "badge ms-1",
                  "inner": data.tags[i]
                } );
                switch (data.tags[i]) {
                  case 'easy':
                    badge.classList.add('bg-success');
                  break;
                  case 'middle':
                    badge.classList.add('bg-warning');
                  break;
                  case 'hard':
                    badge.classList.add('bg-danger');
                    break;
                  default:
                    badge.classList.add('bg-secondary');
                    break;

                }
                node.append(badge);
              }
            }
          }

          function toggleActive(e, isArray) {
            main.querySelectorAll('.active').forEach( elem => {
              elem.classList.remove('active');
              elem.classList.remove('hidden');
            } );
            e.currentTarget.classList.toggle('active');

            hideShowSubtree(e.currentTarget, isArray);

            function hideShowSubtree(currentTarget, isArray){
              isArray && currentTarget.classList.toggle('collapsed');
              let nr = parseInt(currentTarget.getAttribute('data-parent'));

              main.querySelectorAll('button[data-child~="'+nr+'"]').forEach( elem => {
                $.setContent(currentTarget.querySelector('.icon'), self.collapse_icon);
                elem.classList.toggle('hidden');
                !elem.classList.contains('hidden')
              });

              isArray && !currentTarget.classList.contains('collapsed') && $.setContent(e.currentTarget.querySelector('.icon'), self.expand_icon);
            }
          }
        }

      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
