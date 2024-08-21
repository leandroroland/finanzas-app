import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import '../../assets/css/RegisterSale.css';

const RegisterSale = ({ onSale }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    const { data, error } = await supabase.from('inventory').select('*');
    if (error) {
      console.error('Error al cargar el inventario:', error);
    } else {
      setItems(data);
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleSale = async () => {
    if (!selectedItem) {
      alert('Por favor, seleccione un servicio o producto.');
      return;
    }

    const saleTimeInArgentina = new Date().toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" });

    const saleData = {
      product_id: selectedItem.id,
      name: selectedItem.name,
      type: selectedItem.type,
      price: selectedItem.price,
      sale_time: new Date(saleTimeInArgentina).toISOString(),
    };

    if (selectedItem.type === 'product' && selectedItem.stock > 0) {
      const { error: updateError } = await supabase
        .from('inventory')
        .update({ stock: selectedItem.stock - 1 })
        .eq('id', selectedItem.id);

      if (updateError) {
        console.error('Error al actualizar el stock:', updateError);
        return;
      }
    } else if (selectedItem.type === 'product' && selectedItem.stock <= 0) {
      alert('No hay suficiente stock para este producto.');
      return;
    }

    const { error: insertError } = await supabase.from('sales').insert([saleData]);

    if (insertError) {
      console.error('Error al registrar la venta:', insertError);
    } else {
      alert(`Venta registrada: ${selectedItem.name} - $${selectedItem.price}`);
      onSale();  // Llama a la función onSale para recargar la lista de ventas
    }
  };

  return (
    <div className="register-sale">
      <h2>Registrar Venta</h2>
      <ul id="added-items-list" className="list-group">
        {items.map((item) => (
          <li
            key={item.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${selectedItem?.id === item.id ? 'active' : ''}`}
            onClick={() => handleSelectItem(item)}
          >
            {item.name} - {item.type} - ${item.price}
            {item.type === 'product' && (
              <span className="badge bg-primary rounded-pill">{item.stock}</span>
            )}
          </li>
        ))}
      </ul>
      <button className="btn btn-success w-100 mt-3" onClick={handleSale}>
        Registrar Venta
      </button>
    </div>
  );
};

export default RegisterSale;
