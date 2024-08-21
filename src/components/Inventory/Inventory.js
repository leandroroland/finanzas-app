import React, { useState, useEffect } from 'react';
import ProductServiceForm from '../Form/ProductServiceForm';
import InventoryTabs from './InventoryTabs';
import { supabase } from '../../lib/supabaseClient';

const Inventory = () => {
  const [items, setItems] = useState([]);

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

  return (
    <div>
      <ProductServiceForm loadInventory={loadInventory} />
      <InventoryTabs items={items} loadInventory={loadInventory} />
    </div>
  );
};

export default Inventory;
