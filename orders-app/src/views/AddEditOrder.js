import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OrderForm from '../components/OrderForm';

// Main component for adding or editing an order
const AddEditOrder = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [order, setOrder] = useState({
    orderNumber: '',
    date: new Date().toISOString().slice(0, 10),
    products: [],
    finalPrice: 0,
  });
  // Define 3 random products for the combo box
  // eslint-disable-next-line
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
  ]);

  // Fetch the order by ID if an ID is provided
  useEffect(() => {
    if (id) {
      axios.get(`/get/${id}`)
        .then(response => {
          setOrder(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the order!', error);
        });
    }
  }, [id]);

  // Handle input changes for order form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  // Handle adding a product to the order
  const handleAddProduct = () => {
    const product = products.find(p => p.id === parseInt(order.selectedProductId));
    const qty = parseInt(order.selectedProductQty);

    //Total price calculation
    var totalPrice=0
    if(product&&product?.price){
      totalPrice=product.price * qty
    }
    else{
      totalPrice=0
    }

    //Create product, add it to order and update price
    const newProduct = { ...product, qty, totalPrice: totalPrice };
    setOrder({
      ...order,
      products: [...order.products, newProduct],
      finalPrice: order.finalPrice + newProduct.totalPrice,
    });
  };

  //Handle saving the order: Create or update if there is an id
  const handleSaveOrder = () => {
    const productCount = order.products.length;
    const orderData = {
      ...order,
      productCount
    };
    if (id) {
      //Update crud operation
      axios.put(`http://localhost:3001/update/${id}`, orderData)
        .then(() => {
          history('/my-orders');
        })
        .catch(error => {
          console.error('There was an error updating the order!', error);
        });
    } else {
      //Create crud operation
      axios.post('http://localhost:3001/create', orderData)
        .then(() => {
          history('/my-orders');
        })
        .catch(error => {
          console.error('There was an error creating the order!', error);
        });
    }
  };
 
  return (
    <div class="container">
      <div>
        <div class="card text-center">
          <div class="card-header">
            <h1>{id ? 'Edit Order' : 'Add Order'}</h1>
          </div>
          <div class="card-body">
            <OrderForm order={order} setOrder={setOrder} />
            <button className='btn btn-info' onClick={handleSaveOrder}>Save Order</button>
          </div>
        </div>

        <div class="card text-center">
          <div class="card-header">
            <h2>Products</h2>
          </div>
          <div class="card-body">
            <table class="table table-stripped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Unit Price</th>
                  <th>Qty</th>
                  <th>Total Price</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.qty}</td>
                    <td>{product.totalPrice}</td>
                    <td>
                      <button className='btn btn-warning'>Edit</button>
                      <button className='btn btn-danger'>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div class="card text-center">
          <div class="card-header">
            <h2>Add Product</h2>
          </div>
          <div class="card-body">
            <select class="form-select" name="selectedProductId" onChange={handleInputChange}>
              <option value="none" selected disabled hidden>Select an Option</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1"> Quantity:</span>
              <input  type="number" name="selectedProductQty" placeholder="Type the quantity of products" onChange={handleInputChange} class="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <button className='btn btn-secondary' type="button" onClick={handleAddProduct}>Add Product</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditOrder;