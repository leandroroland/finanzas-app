import React from 'react';
import { supabase } from '../../lib/supabaseClient';

const InventoryItem = ({ item, loadInventory }) => {
  const handleDelete = async () => {
    const { error } = await supabase.from('inventory').delete().eq('id', item.id);
    if (!error) loadInventory();
  };

  const handleEdit = () => {
    // Aquí podrías abrir un modal para editar el ítem
    console.log('Editar item:', item);
  };

  return (
    <li className="list-group-item">
      {item.name} - {item.type} - ${item.price} {item.type === 'product' ? '- Stock: ' + item.stock : ''}
      <div className="actions">
        <button className="btn btn-secondary btn-sm" onClick={handleEdit}>Editar</button>
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>Eliminar</button>
      </div>
    </li>
  );
};

export default InventoryItem;