import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders =  () => {
    axios.get('http://localhost:3001/ordenes').then((response)=>{
      setOrders(response.data);
    });
  };

  const deleteOrder = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`http://localhost:3001/eliminar/${id}`);
        fetchOrders();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const AddOrderButton = () => {
    return (
      <Link to="/add-order">
        <button  className='btn btn-success'>
          Add New Order
        </button>
      </Link>
    );
  };

  const EditOrderButton = ({ orderId }) => {
    return (
      <Link to={`/add-order/${orderId}`}>
        <button className='btn btn-success'>
          Edit Order
        </button>
      </Link>
    );
  };

  return (
    <div class="container">
    <div>

    </div>

    <div class="card text-center">
      <div class="card-header">
      <h1>My Orders</h1>
      </div>
      <div class="card-body">
      
      {/* <button onClick={() => fetchOrders()}>Refresh Order</button> */}
      
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
                <button className='btn btn-success' onClick={() => deleteOrder(order.ID)}>Delete Order</button>
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