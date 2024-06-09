import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Main component to display orders
function MyOrders() {
  const [orders, setOrders] = useState([]);

  // Effect hook to load orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  // Function to get all orders from the server
  const fetchOrders =  () => {
    axios.get('http://localhost:3001/fetch').then((response)=>{
      setOrders(response.data);
    });
  };

  // Function to delete all orders from the server
  const deleteOrder = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`http://localhost:3001/delete/${id}`);
        fetchOrders();
      } catch (err) {
        console.error(err);
      }
    }
  };

  //Define button to add order
  const AddOrderButton = () => {
    return (
      <Link to="/add-order">
        <button  className='btn btn-dark'>
          Add New Order
        </button>
      </Link>
    );
  };

  //Define button to edit order
  const EditOrderButton = ({ orderId }) => {
    return (
      <Link to={`/add-order/${orderId}`}>
        <button className='btn btn-warning'>
          Edit Order
        </button>
      </Link>
    );
  };

  return (
    <div class="container">
      <div class="card text-center">
        <div class="card-header">
          <h1>My Orders</h1>
        </div>
        <div class="card-body">
          <table class="table table-stripped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Order #</th>
                <th>Date</th>
                <th># Products</th>
                <th>Final Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => {
                return(
                <tr key={order.ID}>
                  <td>{order.ID}</td>
                  <td>{order.ORDERNUM}</td>
                  <td>{order.DATE}</td>
                  <td>{order.PRODUCTS}</td>
                  <td>{order.PRICE}</td>
                  <td>
                    <EditOrderButton orderId={order.ID}/>
                    <button className='btn btn-danger' onClick={() => deleteOrder(order.ID)}>Delete Order</button>
                  </td>
                </tr>
                )
    })}
            </tbody>
          </table>
        </div>
        <div class="card-footer text-body-secondary">
          <AddOrderButton />
        </div>
      </div>
    </div>
  );
}

export default MyOrders;