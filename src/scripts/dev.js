/**
 * Sidebar Menu Component JS Component with Vue.js
 * @version v1.0.0
 * @author Emanoel Lopes/2017
 */
(function(){

  'use strict';

  var sidebarApp = new Vue({
    el: '#MESidebar',

    data: {
      navItems: [],
      sidebarClass: {
        isVisible: false,
        isActive: false
      },
      searchItems: [],      
      subNavClass: {
        isOpen: false
      },
      APIResource: 'https://private-987fcc-mockmesidebarnav.apiary-mock.com/sitemap',
      search: ''
    }, 

    created: function() {
      this.fetchItemsData()
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

