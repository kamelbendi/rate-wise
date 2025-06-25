import React, { useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RatesTable from './components/RatesTable';
import countryToFlag from './utils/countryToFlag';
import Header from './components/Header';

const API_URL = 'https://rate-wise.onrender.com/api/conversions';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPairs, setSelectedPairs] = useState([]);
  const [filters, setFilters] = useState({
    country: '',
    currency: '',
    usd_rate: '',
    date: '',
  });

  const fetchData = useCallback(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => {
        setData(json || []);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const currencyPairs = Array.from(
    new Set(data.map((row) => row.country_currency_desc))
  ).sort();

  let filteredData =
    selectedPairs.length === 0
      ? data
      : data.filter((row) => selectedPairs.includes(row.country_currency_desc));

  filteredData = filteredData.filter((row) => {
    const [country, currency] = row.country_currency_desc ? row.country_currency_desc.split('-') : ['', ''];
    return (
      (!filters.country || (country && country.toLowerCase().includes(filters.country.toLowerCase()))) &&
      (!filters.currency || (currency && currency.toLowerCase().includes(filters.currency.toLowerCase()))) &&
      (!filters.usd_rate || String(row.exchange_rate).includes(filters.usd_rate)) &&
      (!filters.date || row.record_date.includes(filters.date))
    );
  });

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleRefresh = () => {
    fetchData();
  };

  const multiSelectProps = {
    options: currencyPairs,
    selected: selectedPairs,
    onChange: setSelectedPairs,
    countryToFlag: countryToFlag,
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh" overflow="hidden">
      <Header />
      <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Typography variant="body1">Loading...</Typography>
          </Box>
        ) : error ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Typography variant="body1" color="error">{error}</Typography>
          </Box>
        ) : (
          <RatesTable
            data={filteredData}
            countryToFlag={countryToFlag}
            filters={filters}
            onFilterChange={handleFilterChange}
            onRefresh={handleRefresh}
            multiSelectProps={multiSelectProps}
          />
        )}
      </Box>
    </Box>
  );
}

export default App;
