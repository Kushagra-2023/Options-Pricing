import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper,Button } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar'; // Adjust the path
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicTextFields() {
  const [isVisible, setIsVisible] = useState(false); // State to control visibility
  const [option, setOption] = useState('Call');

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true); // Set visibility to true after a short delay
    }, 100); // Adjust the delay as needed

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

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
          transform: isVisible ? 'scaleY(1)' : 'scaleY(0.2)', // Initial position
          padding: '15px',
          height: 'fit-content',
          transformOrigin: 'top', // Set the transform origin to the top
        }}
      >
        {/* <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
          bgcolor='#EEEEEE'
          borderRadius='7px'
          margin='10px'
        >
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Box>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
          bgcolor='#EEEEEE'
          borderRadius='7px'
          margin='10px'
        >
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Box>

        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
          bgcolor='#EEEEEE'
          borderRadius='7px'
          margin='10px'
        >
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Box>

        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
          bgcolor='#EEEEEE'
          borderRadius='7px'
          margin='10px'
        >
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Box>

        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
          bgcolor='#EEEEEE'
          borderRadius='7px'
          margin='10px'
        >
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Box> */}
        {["asset price", "time to maturity", "strike price", "volatility (std/mean)", "risk free interest rate (%rate/100)"].map((field, index) => (
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
            <TextField id={`outlined-basic-${index}`} label={field}               
                required // Make the field mandatory
              type="number" // Restrict input to numeric values
              OutlinedInputProps={{ inputProps: { min: 0 } }}
              variant="outlined" />
          </Box>
        ))}

          <Box
          key='5' // Ensure each Box has a unique key
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
          bgcolor='#EEEEEE'
          borderRadius='7px'
          margin='10px'
          >          
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Option type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"    
              label="Option Type"
              required // Makes the dropdown menu mandatory
              value={option}
              onChange={handleChange}
            >
              <MenuItem value={"Call"}>Call</MenuItem>
              <MenuItem value={"Put"}>Put</MenuItem>
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
          marginTop: '4vh',
          transition: 'transform 0.3s ease', // Apply transition
          transform: isVisible ? 'scaleY(1)' : 'scaleY(0.2)', // Initial position
          padding: '15px',
          height: 'fit-content',
          width: 'fit-content',
          transformOrigin: 'top', // Set the transform origin to the top
        }}
      >
        <Button variant="outlined" color="primary" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, borderColor: "#EEEEEE", color: "#EEEEEE"}}
          noValidate
          autoComplete="off"
          borderRadius='7px'
          margin='10px'>
          Calculate
        </Button>
      </Paper>

    </div>
  );
}
