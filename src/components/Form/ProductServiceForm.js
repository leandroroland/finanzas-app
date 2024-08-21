import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const ProductServiceForm = ({ loadInventory }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('service');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const handleTypeChange = (selectedType) => {
    setType(selectedType);
    setName('');
    setPrice('');
    setStock('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const item = {
      name,
      type,
      price: parseFloat(price),
      stock: type === 'product' ? parseInt(stock) : null,
    };

    const { error } = await supabase.from('inventory').insert([item]);

    if (error) {
      console.error('Error al insertar el item:', error);
    } else {
      loadInventory(); // Llamar a loadInventory después de la inserción
    }

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setType('service');
    setPrice('');
    setStock('');
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Producto o Servicio</h2>
      <form id="product-service-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Tipo</label>
          <select
            className="form-control"
            id="type"
            value={type}
            onChange={(e) => handleTypeChange(e.target.value)}
            required
          >
            <option value="service">Servicio</option>
            <option value="product">Producto</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        {type === 'product' && (
          <div className="mb-3" id="stock-group">
            <label htmlFor="stock" className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
};

export default ProductServiceForm;
