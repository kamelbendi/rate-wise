import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Typography,
  IconButton,
  Pagination,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MultiSelect from './MultiSelect';

const black = '#222';
const fontFamily = `'Montserrat', 'Roboto', 'Arial', sans-serif`;

const SortIcon = ({ direction }) => (
  <Box component="span" sx={{ ml: 0.5, display: 'inline-flex', flexDirection: 'column', verticalAlign: 'middle' }}>
    <ArrowUpwardIcon fontSize="inherit" sx={{ color: direction === 'asc' ? black : '#ccc', height: 16 }} />
    <ArrowDownwardIcon fontSize="inherit" sx={{ color: direction === 'desc' ? black : '#ccc', height: 16, mt: -1 }} />
  </Box>
);

const RatesTable = ({
  data,
  countryToFlag,
  filters,
  onFilterChange,
  onRefresh,
  sortBy,
  sortDirection,
  onSort,
  multiSelectProps,
  pagination,
  onPageChange,
  onPageSizeChange,
}) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
    {/* Custom Header */}
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, px: 1, flexShrink: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TrendingUpIcon sx={{ color: black, fontSize: 36 }} />
        <Typography variant="h4" sx={{ color: black, fontWeight: 700, mr: 2, fontFamily }}>
          USD Exchange Rates
        </Typography>
        <Typography variant="h6" sx={{ color: black, fontWeight: 600, fontSize: 18, ml: 1, fontFamily }}>
          {pagination.totalCount} rates
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={onRefresh} color="inherit" sx={{ color: black }}>
          <RefreshIcon sx={{ mr: 0.5 }} />
        </IconButton>
        <Typography variant="h6" sx={{ color: black, fontWeight: 600, fontSize: 18, fontFamily }}>
          Refresh
        </Typography>
      </Box>
    </Box>
    
    {/* MultiSelect - First element under the title */}
    {multiSelectProps && (
      <Box sx={{ mb: 3, px: 1, flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: black, fontFamily, minWidth: 'fit-content' }}>
            Filter by Currency Pairs:
          </Typography>
          <Box sx={{ flex: 1 }}>
            <MultiSelect {...multiSelectProps} />
          </Box>
        </Box>
      </Box>
    )}
    
    {/* Table - Takes remaining space */}
    <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <TableContainer component={Paper} sx={{ flex: 1, overflow: 'auto' }}>
        <Table stickyHeader size="small" sx={{ fontFamily }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 800, fontFamily, fontSize: 18, letterSpacing: 1 }}> {/* Country */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: black, fontWeight: 800, fontFamily, fontSize: 20, letterSpacing: 1 }}>
                    Country
                    <Box onClick={() => onSort('country')} sx={{ cursor: 'pointer', ml: 1 }}>
                      <SortIcon direction={sortBy === 'country' ? sortDirection : undefined} />
                    </Box>
                  </Box>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Country"
                    value={filters.country || ''}
                    onChange={e => onFilterChange('country', e.target.value)}
                    fullWidth
                    sx={{ fontFamily }}
                  />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 800, fontFamily, fontSize: 18, letterSpacing: 1 }}> {/* Currency */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: black, fontWeight: 800, fontFamily, fontSize: 20, letterSpacing: 1 }}>
                    Currency
                    <Box onClick={() => onSort('currency')} sx={{ cursor: 'pointer', ml: 1 }}>
                      <SortIcon direction={sortBy === 'currency' ? sortDirection : undefined} />
                    </Box>
                  </Box>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Currency"
                    value={filters.currency || ''}
                    onChange={e => onFilterChange('currency', e.target.value)}
                    fullWidth
                    sx={{ fontFamily }}
                  />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 800, fontFamily, fontSize: 18, letterSpacing: 1 }}> {/* USD Rate */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: black, fontWeight: 800, fontFamily, fontSize: 20, letterSpacing: 1 }}>
                    USD Rate
                    <Box onClick={() => onSort('usd_rate')} sx={{ cursor: 'pointer', ml: 1 }}>
                      <SortIcon direction={sortBy === 'usd_rate' ? sortDirection : undefined} />
                    </Box>
                  </Box>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="USD Rate"
                    value={filters.usd_rate || ''}
                    onChange={e => onFilterChange('usd_rate', e.target.value)}
                    fullWidth
                    sx={{ fontFamily }}
                  />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 800, fontFamily, fontSize: 18, letterSpacing: 1 }}> {/* Date */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: black, fontWeight: 800, fontFamily, fontSize: 20, letterSpacing: 1 }}>
                    Date
                    <Box onClick={() => onSort('date')} sx={{ cursor: 'pointer', ml: 1 }}>
                      <SortIcon direction={sortBy === 'date' ? sortDirection : undefined} />
                    </Box>
                  </Box>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Date"
                    value={filters.date || ''}
                    onChange={e => onFilterChange('date', e.target.value)}
                    fullWidth
                    sx={{ fontFamily }}
                  />
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx} sx={{ fontFamily, fontWeight: 600, fontSize: 16 }}>
                <TableCell sx={{ fontFamily, fontWeight: 600, fontSize: 16 }}>
                  <Box component="span" sx={{ mr: 1 }}>{countryToFlag(row.country_currency_desc)}</Box>
                  {row.country_currency_desc?.split('-')[0]}
                </TableCell>
                <TableCell sx={{ fontFamily, fontWeight: 600, fontSize: 16 }}>{row.country_currency_desc?.split('-')[1]}</TableCell>
                <TableCell sx={{ fontFamily, fontWeight: 600, fontSize: 16 }}>{row.exchange_rate}</TableCell>
                <TableCell sx={{ fontFamily, fontWeight: 600, fontSize: 16 }}>{row.record_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Google Fonts link for Montserrat */}
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet" />
      </TableContainer>
      
      {/* Pagination Controls - Bottom Right */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        gap: 2, 
        p: 2, 
        borderTop: '1px solid #e0e0e0',
        bgcolor: '#fafafa',
        flexShrink: 0
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ fontFamily, color: black }}>
            Rows per page:
          </Typography>
          <FormControl size="small" sx={{ minWidth: 80 }}>
            <Select
              value={pagination.pageSize}
              onChange={(e) => onPageSizeChange(e.target.value)}
              sx={{ fontFamily }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ fontFamily, color: black }}>
            {((pagination.currentPage - 1) * pagination.pageSize) + 1}-
            {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalCount)} of {pagination.totalCount}
          </Typography>
        </Box>
        
        <Pagination
          count={pagination.totalPages}
          page={pagination.currentPage}
          onChange={(_, page) => onPageChange(page)}
          size="small"
          showFirstButton
          showLastButton
          sx={{
            '& .MuiPaginationItem-root': {
              fontFamily,
              color: black,
            },
            '& .Mui-selected': {
              bgcolor: '#1e293b',
              color: 'white',
            }
          }}
        />
      </Box>
    </Box>
  </Box>
);

export default RatesTable; 