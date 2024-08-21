import React, { useEffect } from 'react';
import '../../assets/css/ListSale.css';

const ListSale = ({ sales, loadSales }) => {
  useEffect(() => {
    loadSales();  // Carga inicial de las ventas
  }, [loadSales]);

  return (
    <div className="container">
      <div className="header text-center">
        <h1>Registro de Ventas</h1>
      </div>

      <div id="salesList">
        {sales.length > 0 ? (
          sales.map((sale) => (
            <div key={sale.id} className="sale-item card mb-3 p-3">
              <div className="sale-details">
                <div className="sale-name">{sale.name}</div>
                <div className="sale-price">${sale.price}</div>
                <div className="sale-time text-muted">
                  {new Date(sale.sale_time).toLocaleDateString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' })}{' '}
                  {new Date(sale.sale_time).toLocaleTimeString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' })}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No se encontraron ventas.</p>
        )}
      </div>
    </div>
  );
};

export default ListSale;
