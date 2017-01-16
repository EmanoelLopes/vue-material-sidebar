/**
 * Sidebar Menu Component JS Component with Vue.js
 * @version v1.0.0
 * @author Emanoel Lopes/2017
 */
(function(){

  'use strict';

  /* 
   * Utils
   */
  var _ = require('lodash');

  /*
   * Defaults
   */
  var ME = {
    //- Resource 
    resource: '/do/api/v1/sitemap'
  };

  /*
   * Vue Instance
   */
  var Sidebar = new Vue({
    el: '#MESidebar',

    data: {
      navItems: [],
      filterItems: '',
      sidebarClass: {
        isVisible: false,
        isActive: false
      },
      subNavClass: {
        isOpen: false
      },
      APIResource: ME.resource
    }, 

    mounted: function() {
      this.fetchItemsData()
    },

    computed: {
      filteredItems: function() {
        var list =  this.navItems;
        var filter = this.filterItems;
        
        if(_.isEmpty(filter)) {
          return list;
        }

        return _.filter(list, function(item){
          return item.description.indexOf(filter) > -1;
        });
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
            Vue.set(this, 'navItems', response.body[0].children);
          },
          function error(response, err) {
            console.log(response.statusText);
          }
        )
      },
      clearSearch: function(e) {        
        e.preventDefault();
        document.querySelector('#FastMenuSearch .mdl-textfield--floating-label').classList.remove('is-dirty');
        this.filterItems = '';
      }
    }
  });

})();


