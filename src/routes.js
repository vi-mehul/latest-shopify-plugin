import React from 'react';

const Cards = React.lazy(() => import('./views/Settings/Cards'));
const Filters = React.lazy(() => import('./views/Settings/Filters/Filters'));
const Defaultfilter = React.lazy(() => import('./views/Settings/Defaultfilter/Defaultfilter'));
const Customfilter = React.lazy(() => import('./views/Settings/Customfilter/Customfilter'));
const Productfilter = React.lazy(() => import('./views/Settings/Productfilter/Productfilter'));
const SortingOptions = React.lazy(() => import('./views/Settings/SortingOptions/SortingOptions'));
const PagingOptions = React.lazy(() => import('./views/Settings/PagingOptions/'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/settings/Filters', exact: true, name: 'Home' },
  { path: '/', exact: true, name: 'Settings' },
  { path: '/settings/Filters', name: 'Filters', component: Filters },
  { path: '/settings/Defaultfilter', name: 'Defaultfilter', component: Defaultfilter },
  { path: '/settings/Customfilter', name: 'Customfilter', component: Customfilter },
  { path: '/settings/Productfilter', name: 'Productfilter', component: Productfilter },
  { path: '/settings/SortingOptions', name: 'SortingOptions', component: SortingOptions },
  { path: '/settings/PagingOptions', name: 'PagingOptions', component: PagingOptions },
];

export default routes;
