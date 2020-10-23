export default {
  items: [
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          url: '/login',
          icon: 'icon-star',
        },
        {
          name: 'Register',
          url: '/register',
          icon: 'icon-star',
        },
        {
          name: 'Error 404',
          url: '/404',
          icon: 'icon-star',
        },
        {
          name: 'Error 500',
          url: '/500',
          icon: 'icon-star',
        },
      ],
    },
    {
      name: 'Settings',
      url: '/settings',
      icon: 'icon-rocket',
      children: [
        {
          name: 'Filters',
          url: '/settings/Filters',
          icon: 'fa fa-paint-brush',
        },
        {
          name: 'Default Filters',
          url: '/settings/Defaultfilter',
          icon: 'fa fa-filter fa-lg',
        },
        {
          name: 'Custom Filters',
          url: '/settings/Customfilter',
          icon: 'fa fa-shopping-bag fa-lg',
        },
        {
          name: 'Product Filter',
          url: '/settings/Productfilter',
          icon: 'icon-drop',
        },
        {
          name: 'Sorting Options',
          url: '/settings/SortingOptions',
          icon: 'cui-sort-ascending',
        },
        {
          name: 'Paging Options',
          url: '/settings/PagingOptions',
          icon: 'fa fa-pagelines fa-lg',
        },
      ],
    },
  ],
};
