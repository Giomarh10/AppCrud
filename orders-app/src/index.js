import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import MyOrders from './views/MyOrders';
import AddEditOrder from './views/AddEditOrder';
import './index.css';

// Create the router with defined routes
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

// Get the root element from the DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
// Render the app within the root element
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

