import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import BinomialModel from '../../components/BinomialModel/BinomialModel';

export default function Binomial() {
  const [isVisible, setIsVisible] = useState(false);
  const [option, setOption] = useState('Call');
  const [assetPrice, setAssetPrice] = useState('');
  const [timeToMaturity, setTimeToMaturity] = useState('');
  const [timesteps, setTimeSteps] = useState('');
  const [strikePrice, setStrikePrice] = useState('');
  const [volatility, setVolatility] = useState('');
  const [riskFreeRate, setRiskFreeRate] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCalculateChange = (event) => {
    if (
      assetPrice === '' ||
      volatility === '' ||
      timeToMaturity === '' ||
      strikePrice === '' ||
      riskFreeRate === '' ||
      volatility === '' || 
      option === '' ||
      timesteps === ''
    ) {
      alert('Please input all the required values!');
      return;
    }

    const calculatedPrice = BinomialModel(
      parseFloat(assetPrice),
      parseFloat(strikePrice),
      parseFloat(timeToMaturity),
      parseFloat(riskFreeRate),
      parseFloat(volatility),
      parseInt(timesteps),
      option
    );

    setAnswer(calculatedPrice);
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
          transition: 'transform 0.3s ease',
          transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
          padding: '15px',
          height: 'fit-content',
          transformOrigin: 'top',
        }}
      >
        {[
          'Current stock price',
          'Strike price',
          'Time to expiration(in years)',
          'Volatility of the stock',
          'Risk-free interest rate',
          'Number of time steps',
        ].map((field, index) => {
          const handleChangeFunctions = [
            (e) => setAssetPrice(e.target.value),
            (e) => setStrikePrice(e.target.value),
            (e) => setTimeToMaturity(e.target.value),
            (e) => setVolatility(e.target.value),
            (e) => setRiskFreeRate(e.target.value),
            (e) => setTimeSteps(e.target.value),
          ];
          return (
            <Box
              key={index}
              component="form"
              sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
              noValidate
              autoComplete="off"
              bgcolor="#EEEEEE"
              borderRadius="7px"
              margin="10px"
            >
              <TextField
                id={`outlined-basic-${index}`}
                label={field}
                required
                type="number"
                variant="outlined"
                onChange={handleChangeFunctions[index]}
              />
            </Box>
          );
        })}
        <Box
          key="5"
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
          bgcolor="#EEEEEE"
          borderRadius="7px"
          margin="10px"
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Option type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="OptionType"
              required
              value={option}
              onChange={(e) => setOption(e.target.value)}
            >
              <MenuItem value="Call">Call</MenuItem>
              <MenuItem value="Put">Put</MenuItem>
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
          transition: 'transform 0.3s ease',
          transform: isVisible ? 'scaleY(1)' : 'scaleY(0.2)',
          padding: '15px',
          height: 'fit-content',
          width: 'fit-content',
          transformOrigin: 'top',
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            borderColor: '#EEEEEE',
            color: '#EEEEEE',
          }}
          noValidate
          autoComplete="off"
          borderRadius="7px"
          margin="10px"
          onClick={handleCalculateChange}
        >
          Calculate
        </Button>
      </Paper>
      {answer && (
        <Paper
          elevation={3}
          sx={{
            backgroundColor: 'rgba(32, 30, 67, 0.8)',
            padding: '15px',
            width: 'fit-content',
            color: '#EEEEEE',
            margin: 'auto',
            marginTop: '4vh',
          }}
        >
          The calculated option price is: {answer}
        </Paper>
      )}
    </div>
  );
}
