import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import InventoryItem from './InventoryItem';

const InventoryTabs = ({ items, loadInventory }) => {
  const [type, setType] = useState('product');

  return (
    <div className="container mt-5">
      <h2>Inventario</h2>
      <Tabs
        id="inventory-tabs"
        activeKey={type}
        onSelect={(k) => setType(k)}
        className="mb-3"
      >
        <Tab eventKey="product" title="Productos">
          <ul id="products-list" className="list-group">
            {items.filter(item => item.type === 'product').map((item) => (
              <InventoryItem key={item.id} item={item} loadInventory={loadInventory} />
            ))}
          </ul>
        </Tab>
        <Tab eventKey="service" title="Servicios">
          <ul id="services-list" className="list-group">
            {items.filter(item => item.type === 'service').map((item) => (
              <InventoryItem key={item.id} item={item} loadInventory={loadInventory} />
            ))}
          </ul>
        </Tab>
      </Tabs>
    </div>
  );
};

export default InventoryTabs;
