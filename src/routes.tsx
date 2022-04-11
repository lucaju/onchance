import React from 'react';
import Home from './Home';
import Main from './Main';

const routes = [
  {
    path: '/bot',
    element: <Main />,
  },
  {
    path: '/',
    element: <Home />,
  },
];

export default routes;
