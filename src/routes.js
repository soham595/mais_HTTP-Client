import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const HTTPClient = React.lazy(() => import('./views/HTTPClient'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/home', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/http-client', name: 'HTTPClient', component: HTTPClient },
];

export default routes;
