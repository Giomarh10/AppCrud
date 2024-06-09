import React, { useState } from 'react';

const predefinedProducts = [
  { id: 1, name: 'lapiz', unitPrice: 1.5 },
  { id: 2, name: 'borrador', unitPrice: 2.5 },
  { id: 3, name: 'regla', unitPrice: 4.0 }
];

const ProductModal = ({ onSave, onClose }) => {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [qty, setQty] = useState(1);

  const handleProductChange = (e) => {
    setSelectedProductId(e.target.value);
  };

  const handleQtyChange = (e) => {
    setQty(e.target.value);
  };

  const handleSave = () => {
    const selectedProduct = predefinedProducts.find(p => p.id === parseInt(selectedProductId));
    if (selectedProduct) {
      const productToSave = {
        ...selectedProduct,
        unitPrice:selectedProduct.unitPrice,
        qty: parseInt(qty),
        totalPrice: selectedProduct.unitPrice * qty
      };
      onSave(productToSave);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Product</h2>
        <div>
          <label>Product:</label>
          <select value={selectedProductId} onChange={handleProductChange}>
            <option value="">Select a product</option>
            {predefinedProducts.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" value={qty} onChange={handleQtyChange} min="1" />
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ProductModal;