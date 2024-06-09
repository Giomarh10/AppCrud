import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewOrdersButton = () => {
  return (
    <Link to="/my-orders">
      <button  className='btn btn-success'>
        View my Orders
      </button>
    </Link>
  );
};

function App() {
  return (
    <div class="container">
    <div className="App">
    </div>
    <div class="card">
      <h5 class="card-header"><h1>Welcome to Orders App</h1></h5>
      <div class="card-body">
      <ViewOrdersButton />
      </div>
    </div>
    </div>
  );
}

export default App;