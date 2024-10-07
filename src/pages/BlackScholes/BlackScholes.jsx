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
import BSModel from '../../components/BlackScholesModel/BlackScholesModel';
import Typography from '@mui/material/Typography';


export default function BlackScholes() {
  const [isVisible, setIsVisible] = useState(false); 
  const [option, setOption] = useState('Call');

  const [assetPrice, setAssetPrice] = useState('');
  const [timeToMaturity, setTimeToMaturity] = useState('');
  const [strikePrice, setStrikePrice] = useState('');
  const [volatility, setVolatility] = useState('');
  const [riskFreeRate, setRiskFreeRate] = useState('');

  const [display, setDisplay] = useState(option);

  const [answer, setAnswer] = useState('');

  const handleCalculateChange = (event) => {
    if(assetPrice === '' || timeToMaturity === '' || strikePrice === '' || riskFreeRate === '' || option === '')
    {
      alert("Please input all the required values!");
      return;
    }
    const calculatedPrice = BSModel(
      parseFloat(assetPrice), 
      parseFloat(timeToMaturity), 
      parseFloat(strikePrice), 
      parseFloat(volatility), 
      parseFloat(riskFreeRate), 
      option
    );
    
    setAnswer(calculatedPrice);   
    setDisplay(option); 

    // setAssetPrice('');
    // setTimeToMaturity('');
    // setStrikePrice('');
    // setVolatility('');
    // setRiskFreeRate('');
    // setOption('');
    console.log(answer);
  };

  const handleAssetPriceChange = (event) => {
    setAssetPrice(event.target.value);
  };

  const handleTimeToMaturityChange = (event) => {
    setTimeToMaturity(event.target.value);
  };

  const handleStrikePriceChange = (event) => {
    setStrikePrice(event.target.value);
  };

  const handleVolatilityChange = (event) => {
    setVolatility(event.target.value);
  };

  const handleRiskFreeRateChange = (event) => {
    setRiskFreeRate(event.target.value);
  };


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
        {["Asset Price", "Time to Maturity", "Strike Price", "Volatility (std/mean)", "Risk-Free Interest Rate (%rate/100)"].map((field, index) => {
          const handleChangeFunctions = [
            handleAssetPriceChange,
            handleTimeToMaturityChange,
            handleStrikePriceChange,
            handleVolatilityChange,
            handleRiskFreeRateChange,
          ];

          return (
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
                type="number" // Restrict input to numeric values
                OutlinedInputProps={{ inputProps: { min: 0 } }} // Fix prop name
                variant="outlined"
                onChange={handleChangeFunctions[index]} // Use corresponding change handler
              />
            </Box>
          );
        })}

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
            <InputLabel id="demo-simple-select-label">Option Type</InputLabel>
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
          margin='10px'
          onClick={handleCalculateChange}>
          Calculate
        </Button>
      </Paper>
        
      {(answer !== '') ? (
      <Paper
        elevation={3}
        className={`item-paper ${isVisible ? 'drop' : 'initial'}`}
        sx={{ 
          backgroundColor: '#508C9B',
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
        <Typography sx={{ fontWeight: 'bold', color: 'black', fontFamily: 'inherit'}}>
          <h2>{display} option premium: {answer}</h2>
        </Typography>
      </Paper>
    ) : null}

    </div>
  );
}
