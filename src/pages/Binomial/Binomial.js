import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper,Button } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar'; // Adjust the path
import { useEffect, useState } from 'react';

export default function BasicTextFields() {
  const [isVisible, setIsVisible] = useState(false); // State to control visibility

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
          transform: isVisible ? 'scaleY(1)' : 'scaleY(0)', // Initial position
          padding: '15px',
          height: 'fit-content',
          transformOrigin: 'top', // Set the transform origin to the top
        }}
      >
        {["Current stock price", "Strike price", "Time to expiration(in years).", "Risk-free interest rate", "Volatility of the stock", "Number of time steps", "Option type(put/call)"].map((field, index) => (
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
            type={field === "Option type(put/call)" ? "text" : "number"} // Conditionally set type
            variant="outlined" 
            />
        </Box>
        ))}

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
        <Button variant="outlined" color='Black'>Calculate</Button>
      </Paper>
    </div>
  );
}
