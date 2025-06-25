import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const MultiSelect = ({ options, selected, onChange, countryToFlag }) => (
  <Autocomplete
    multiple
    options={options}
    value={selected}
    onChange={(_, value) => onChange(value)}
    disableCloseOnSelect
    getOptionLabel={(option) => option}
    renderOption={(props, option) => {
      const { key, ...otherProps } = props;
      return (
        <Box component="li" key={key} {...otherProps} id={`multi-select-option-${option.replace(/\s+/g, '-')}`}>
          <span style={{ marginRight: 8 }}>{countryToFlag(option)}</span>
          {option}
        </Box>
      );
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        variant="outlined"
        label="Currency Pairs"
        placeholder="Select currency pairs..."
        id="multi-select-input"
      />
    )}
    sx={{ minWidth: 260 }}
  />
);

export default MultiSelect; 