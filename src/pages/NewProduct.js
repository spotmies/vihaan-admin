import React from 'react';
// import { Card } from '@mui/material';
import { styled } from '@mui/material/styles'; 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';

import {
    Card,
    Input,
    Slide,
    Button,
    InputAdornment,
    ClickAwayListener,
    IconButton
  } from '@mui/material';


const EditCard = styled(Card)(({theme}) => ({
   width: 'auto',
   margin: theme.spacing(4),
   borderRadius: '5px',
   background: theme.palette.common.white,
   boxShadow: '1px 1px 10px #d7d7d7'
}));

export default function NewProduct() {
    const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

    return (
        <div>
            <b>Edit Product</b>
            <EditCard> <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={5}>
            Scooties
          </MenuItem>
          <MenuItem value={10}>Test drive</MenuItem>
          <MenuItem value={20}>Charging station</MenuItem>
          {/* <MenuItem value={30}>Logistics</MenuItem>
          <MenuItem value={30}>Notifications</MenuItem> */}
          <MenuItem value={30}>Service centers</MenuItem>
        </Select>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}
      </FormControl>
      <TextField id="outlined-basic" label="Product name" variant="outlined" />
      <TextField id="outlined-basic" label="model" variant="outlined" />
      <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">&#8377;</InputAdornment>}
            label="Amount"
          />
        </FormControl>
    </Box></EditCard>
        </div>
    )
}
