import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar'; // Adjust the path

export default function BasicTextFields() {
  const [isVisible, setIsVisible] = useState(false); // State to control visibility
  const [optiontype, setoptiontype] = useState("Call"); // State for Select component

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true); // Set visibility to true after a short delay
    }, 100); // Adjust the delay as needed

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  const handleChange = (event) => {
    setoptiontype(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <Paper
        elevation={3}
        className={`item-paper ${isVisible ? 'drop' : 'initial'}`}
        sx={{ 
          backgroundColor: 'rgba(32, 30, 67, 0.8)', 
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: '20vh',
          transition: 'transform 0.3s ease', // Apply transition
          transform: isVisible ? 'scaleY(1)' : 'scaleY(0)', // Initial position
          padding: '15px',
          height: 'fit-content',
          transformOrigin: 'top', // Set the transform origin to the top
        }}
      >
        {["Current stock price", "Strike price", "Time to expiration(in years)", "Risk-free interest rate", "Volatility of the stock", "Number of time steps"].map((field, index) => (
          <Box
            key={index} // Ensure each Box has a unique key
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
            bgcolor='#EEEEEE'
            borderRadius='7px'
            margin='10px'
          >
            <TextField 
              id={`outlined-basic-${index}`} 
              label={field}               
              required // Make the field mandatory
              type="number" // Set the type to number
              variant="outlined" 
            />
          </Box>
        ))}

        {/* Drop-down for selection */}
        <Box sx={{ minWidth: 120, margin: '10px' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Option Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={optiontype}
              label="OptionType"
              onChange={handleChange}
            >
              <MenuItem value={"Put"}>Put</MenuItem>
              <MenuItem value={"Call"}>Call</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <Paper
        elevation={3}
        className={`item-paper ${isVisible ? 'drop' : 'initial'}`}
        sx={{ 
          backgroundColor: 'rgba(32, 30, 67, 0.8)', 
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: '20vh',
          transition: 'transform 0.3s ease', // Apply transition
          transform: isVisible ? 'scaleY(1)' : 'scaleY(0)', // Initial position
          padding: '15px',
          height: 'fit-content',
          transformOrigin: 'top', // Set the transform origin to the top
        }}
      >
        <Button variant="outlined" color="primary">Calculate</Button>
      </Paper>
    </div>
  );
}
