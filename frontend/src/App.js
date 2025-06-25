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
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 25,
    totalPages: 1,
    totalCount: 0
  });
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [debouncedDate, setDebouncedDate] = useState('');

  const fetchData = useCallback((page = 1, pageSize = 25, dateFilter = '') => {
    setLoading(true);
    
    const params = new URLSearchParams({
      fields: 'country_currency_desc,exchange_rate,record_date',
      'page[number]': page.toString(),
      'page[size]': pageSize.toString(),
    });

    let filterString = 'record_date:gte:2001-01-01';
    
    // Add date filter if provided
    if (dateFilter) {
      // If it's just a year (4 digits), filter for that entire year
      if (/^\d{4}$/.test(dateFilter)) {
        filterString = `record_date:gte:${dateFilter}-01-01,record_date:lte:${dateFilter}-12-31`;
      } else {
        // Otherwise, use exact date match
        filterString = `record_date:eq:${dateFilter}`;
      }
    }

    // Add currency filter if selected
    if (selectedPairs.length > 0) {
      const currencyFilter = selectedPairs.join(',');
      filterString = `country_currency_desc:in:(${currencyFilter}),${filterString}`;
    }

    params.set('filter', filterString);

    fetch(`${API_URL}?${params}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.data || []);
        setPagination(prev => ({
          ...prev,
          currentPage: page,
          pageSize: pageSize,
          totalPages: json.meta?.['total-pages'] || 1,
          totalCount: json.meta?.['total-count'] || 0
        }));
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, [selectedPairs]);

  // Debounce effect for date filter
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedDate(filters.date);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [filters.date]);

  useEffect(() => {
    fetchData(pagination.currentPage, pagination.pageSize, debouncedDate);
  }, [fetchData, pagination.currentPage, pagination.pageSize, debouncedDate]);

  // Handle pagination changes
  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  const handlePageSizeChange = (newPageSize) => {
    setPagination(prev => ({ ...prev, pageSize: newPageSize, currentPage: 1 }));
  };

  // Handle sorting
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  // Get unique currency pairs for the filter
  const currencyPairs = Array.from(
    new Set(data.map((row) => row.country_currency_desc))
  ).sort();

  // Filter data by selected pairs (now handled by API)
  let filteredData = data;

  // Apply column filters
  filteredData = filteredData.filter((row) => {
    const [country, currency] = row.country_currency_desc ? row.country_currency_desc.split('-') : ['', ''];
    return (
      (!filters.country || (country && country.toLowerCase().includes(filters.country.toLowerCase()))) &&
      (!filters.currency || (currency && currency.toLowerCase().includes(filters.currency.toLowerCase()))) &&
      (!filters.usd_rate || String(row.exchange_rate).includes(filters.usd_rate))
    );
  });

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Reset pagination when debounced date changes
  useEffect(() => {
    if (debouncedDate !== filters.date) {
      setPagination(prev => ({ ...prev, currentPage: 1 }));
    }
  }, [debouncedDate]);

  const handleRefresh = () => {
    fetchData(pagination.currentPage, pagination.pageSize, filters.date);
  };

  // MultiSelect props to pass to RatesTable
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
            pagination={pagination}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        )}
      </Box>
    </Box>
  );
}

export default App;
