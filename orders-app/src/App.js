import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//Define Button View Order
const ViewOrdersButton = () => {
  return (
    <Link to="/my-orders">
      <button  className='btn btn-primary'>
        View my Orders
      </button>
    </Link>
  );
};

//Main component of app
function App() {
  return (
    <div class="container">
    <div className="App">
    </div>
    <div class="card text-center">
      <h5 class="card-header"><h1>Welcome to Orders App</h1></h5>
      <div class="card-body">
      <ViewOrdersButton />
      </div>
    </div>
    </div>
  );
}

export default App;