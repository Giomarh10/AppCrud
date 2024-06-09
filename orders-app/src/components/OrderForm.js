import React from 'react';

// Define the OrderForm component, receiving 'order' and 'setOrder'
const OrderForm = ({ order, setOrder }) => {
  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  return ( 
    <form>
      <div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1"> Order #</span>
          <input type="text" name="orderNumber" value={order.orderNumber} onChange={handleInputChange} placeholder="Type the order number" class="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1"> Date:</span>
          <input type="text" name="date" value={order.date} disabled class="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1"> # Products:</span>
          <input type="text"name="productCount"
              value={order.products.length}
              disabled class="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1"> Final Price:</span>
          <input type="text" name="finalPrice"
              value={order.finalPrice}
              disabled class="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
      </div>
    </form>
  );
};

export default OrderForm;