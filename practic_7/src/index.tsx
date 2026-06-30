import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Main from './main/Main';
import List from './list/List';
import Drama from './drama/Drama';
import Chart from './chart/Chart';
import Testing from './testing/Testing';

const router = createBrowserRouter([
  { path: '/', element: <Main /> },
  { path: '/list', element: <List /> },
  { path: '/drama/:id', element: <Drama /> },
  { path: '/chart', element: <Chart /> },
  { path: '/testing', element: <Testing /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();