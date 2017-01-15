/**
 * Sidebar Menu Component JS Component with Vue.js
 * @version v1.0.0
 * @author Emanoel Lopes/2017
 */
(function(){

  'use strict';

  /*
   * Defaults
   */
  var ME = {
    //-Components
    components: {
      sidebarAction: {
        name: 'sidebar-action',
        template: '#MESidebarAction',
        props: []
      },
      filterItems: {
        name: 'sidebar-filter-items',
        template: '#MESidebarFilterItems',
        props: []
      },
      itemsList: {
        name: 'sidebar-items-list',
        template: '#MESidebarItemsList',
        props: []
      },
      obfuscator: {
        name: 'sidebar-obfuscator',
        template: '#MESidebarObfuscator',
        props: []
      }
    },
    //- Resource 
    resource: 'https://private-987fcc-mockmesidebarnav.apiary-mock.com/sitemap'
  };


  /*
   * Vue Instance
   */
  new Vue({
    el: '#MESidebar',

    data: {
      navItems: [],
      sidebarClass: {
        isVisible: false,
        isActive: false
      },
      searchItems: '',
      subNavClass: {
        isOpen: false
      },
      APIResource: ME.resource,
      search: ''
    }, 

    created: function() {
      this.fetchItemsData()
    },

    components: {
      'me-obfuscator': ME.components.obfuscator,
      'me-sidebar-action': ME.components.sidebarAction
    },

    computed: {
      filteredItems: function() {
        return this.navItems.filter(function(item) {
          return item.indexOf(this.serchItems) !== -1;
        }.bind(this));
      }
    },

    methods: {
      showSidebar: function() {
          this.sidebarClass.isActive = !this.sidebarClass.isActive;
          this.sidebarClass.isVisible = !this.sidebarClass.isVisible;
      },
      toggleSubNav: function($id) {
        $($id).toggleClass('is-open');
      },
      fetchItemsData: function() {
        this.$http.get(this.APIResource).then(
          function success(response){
            this.navItems = response.body[0].children;
          },
          function error(response, err) {
            console.log(response.statusText);
          }
        )
      }
    }
  });
})();

