import * as React from 'react';
import { Box, TextField, Paper, Button, InputLabel, MenuItem, FormControl, Select, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import BSModel from '../../components/BlackScholesModel/BlackScholesModel';

function Stocks() {
    const [assetPrice, setAssetPrice] = useState(0);
    const [volatility, setVolatility] = useState(0);
    const [company, setCompany] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [option, setOption] = useState('Call');
    const [timeToMaturity, setTimeToMaturity] = useState(0);
    const [strikePrice, setStrikePrice] = useState(0);
    const [display, setDisplay] = useState(option);
    const [answer, setAnswer] = useState('');

    const handleCalculateChange = () => {
        if (!company || !timeToMaturity || !strikePrice || !option) {
            alert("Please input all the required values!");
            return;
        }

        const apiKey = 'c0f30563f1c44b53a685d72a0c8d59d0';
        const symbol = company;
        const interval = '1min';

        fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.values && data.values.length > 0) {
                    const latestData = data.values[0];
                    setAssetPrice(parseFloat(latestData.close)); 
                } else {
                    console.error("Error: No data available or invalid response structure:", data);
                }
            })
            .catch(error => console.error('Error fetching stock data:', error));

        const intervalForVolatility = '1day';

        fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${intervalForVolatility}&outputsize=30&apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.values && data.values.length > 1) {
                    const prices = data.values.map(entry => parseFloat(entry.close));
                    const returns = prices.slice(1).map((price, i) => (price - prices[i]) / prices[i]);
                    const meanReturn = returns.reduce((acc, curr) => acc + curr, 0) / returns.length;
                    const variance = returns.reduce((acc, curr) => acc + Math.pow(curr - meanReturn, 2), 0) / (returns.length - 1);
                    const calculatedVolatility = Math.sqrt(variance);
                    setVolatility(calculatedVolatility);

                    // Now calculate the option price with updated values
                    calculateOptionPrice(calculatedVolatility);
                }
            })
            .catch(error => console.error('Error fetching volatility data:', error));
    };

    const calculateOptionPrice = (calculatedVolatility) => {
        const riskFreeRate = 0.1;
        const calculatedPrice = BSModel(
            assetPrice,
            timeToMaturity,
            strikePrice,
            volatility,
            riskFreeRate,
            option
        );

        setAnswer(calculatedPrice);
        setDisplay(option);
    };

    const handleCompanyChange = (event) => setCompany(event.target.value);
    const handleTimeToMaturityChange = (event) => setTimeToMaturity(parseFloat(event.target.value));
    const handleStrikePriceChange = (event) => setStrikePrice(parseFloat(event.target.value));
    const handleOptionChange = (event) => setOption(event.target.value);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <Navbar />
            <Paper elevation={3} className={`item-paper ${isVisible ? 'drop' : 'initial'}`}
                sx={{ backgroundColor: 'rgba(32, 30, 67, 0.8)', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20vh', transition: 'transform 0.3s ease', transform: isVisible ? 'scaleY(1)' : 'scaleY(0.2)', padding: '15px', height: 'fit-content', transformOrigin: 'top' }}>
                {["Company", "Time to Maturity", "Strike Price"].map((field, index) => {
                    const handleChangeFunctions = [handleCompanyChange, handleTimeToMaturityChange, handleStrikePriceChange];
                    return (
                        <Box key={index} component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off" bgcolor='#EEEEEE' borderRadius='7px' margin='10px'>
                            <TextField id={`outlined-basic-${index}`} label={field} required variant="outlined" type={index === 1 || index === 2 ? 'number' : 'text'} onChange={handleChangeFunctions[index]} />
                        </Box>
                    );
                })}
                <Box key='4' component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off" bgcolor='#EEEEEE' borderRadius='7px' margin='10px'>
                    <FormControl fullWidth>
                        <InputLabel id="option-type-label">Option Type</InputLabel>
                        <Select labelId="option-type-label" id="option-type" label="Option Type" required value={option} onChange={handleOptionChange}>
                            <MenuItem value={"Call"}>Call</MenuItem>
                            <MenuItem value={"Put"}>Put</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Paper>
            <Paper elevation={3} className={`item-paper ${isVisible ? 'drop' : 'initial'}`} sx={{ backgroundColor: 'rgba(32, 30, 67, 0.8)', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '4vh', transition: 'transform 0.3s ease', transform: isVisible ? 'scaleY(1)' : 'scaleY(0.2)', padding: '15px', height: 'fit-content', width: 'fit-content', transformOrigin: 'top' }}>
                <Button variant="outlined" color="primary" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, borderColor: "#EEEEEE", color: "#EEEEEE" }} onClick={handleCalculateChange}>
                    Calculate
                </Button>
            </Paper>
            {answer && (
                <Paper elevation={3} className={`item-paper ${isVisible ? 'drop' : 'initial'}`} sx={{ backgroundColor: '#508C9B', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '4vh', transition: 'transform 0.3s ease', transform: isVisible ? 'scaleY(1)' : 'scaleY(0.2)', padding: '15px', height: 'fit-content', width: 'fit-content', transformOrigin: 'top' }}>
                    <Typography sx={{ fontWeight: 'bold', color: 'black', fontFamily: 'inherit' }}>
                        <h2>{display} option premium: {answer}</h2>
                    </Typography>
                </Paper>
            )}
        </div>
    );
}

export default Stocks;
