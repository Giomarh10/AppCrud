import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import MyOrders from './views/MyOrders';
import AddEditOrder from './views/AddEditOrder';
import './index.css';

const router=createBrowserRouter([
  {
  path:"/",
  element:<App/>
  },
  {
    path:"/my-orders",
    element:<MyOrders/>
  },
  {
    path:"/add-order/:id?",
    element:<AddEditOrder/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </React.StrictMode>
);

