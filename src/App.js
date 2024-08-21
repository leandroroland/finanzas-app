import React, { useCallback, useState } from 'react';
import RegisterSale from './components/RegisterSale/RegisterSale';
import ListSale from './components/ListSale/ListSale';
import { supabase } from './lib/supabaseClient';  // Importa supabase aquí

function App() {
  const [filters, setFilters] = useState({});
  const [sales, setSales] = useState([]);

  const loadSales = useCallback(async () => {
    let query = supabase.from('sales').select('*').order('sale_time', { ascending: false });

    if (filters.dateFrom) {
      query = query.gte('sale_time', filters.dateFrom);
    }
    if (filters.dateTo) {
      query = query.lte('sale_time', `${filters.dateTo}T23:59:59`);
    }
    if (filters.type && filters.type !== "") {
      query = query.eq('type', filters.type);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error al cargar las ventas:', error);
    } else {
      setSales(data);
    }
  }, [filters]);

  return (
    <div className="App">
      <RegisterSale onSale={loadSales} />
      <ListSale sales={sales} loadSales={loadSales} setFilters={setFilters} />
    </div>
  );
}

export default App;
