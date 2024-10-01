import Navbar from '../../components/Navbar/Navbar'; // Adjust the path
import Box from '../../components/Box/Box';         // Adjust the path
import "./Homepage.css"; // Import your CSS
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

// Define your items array with Box components
const items = [
    { 
        url: 'https://blog.costan.ro/img/blackscholes/pdf.png', 
        title: "The Black-Scholes Model", 
        text: "The Black-Scholes model, this mathematical equation estimates the theoretical value of derivatives based on other investment instruments, taking the impact of time and other risk factors into account. The equation uses this assumption and factors in other important variables to derive the price of a European-style call option. The Black-Scholes equation requires six variables: volatility, the price of the underlying asset, the strike price of the option, the time until the expiration of the option, the risk-free interest rate, and the type of option, whether it's call or put. Black-Scholes posits that instruments such as stock shares or futures contracts will have a lognormal distribution of prices following a random walk with constant drift and volatility. The equation uses this assumption and factors in other important variables to derive the price of a European-style call option." 
    },
    { 
        url: 'https://investexcel.net/wp-content/uploads/2011/10/Multi-Step-Binomial-Model.png', 
        title: "Binomial Option Pricing Model", 
        text: "The binomial option pricing model is a risk-free method for estimating the value of path-dependent alternatives. With this model, investors can determine how likely they are to buy or sell at a given price in the future. The binomial option model repeatedly uses the same success and failure probabilities until the option expires. A trader might use many different possibilities depending on the current situation. When it comes to valuing American options and embedded options, a binomial tree is an invaluable resource. The binomial options pricing model has several strengths that have made it a popular choice among traders and analysts. One of its main advantages is its flexibility. Unlike the Black-Scholes model, which assumes constant volatility and a continuous price process, the binomial model can accommodate changing volatility and discrete price changes." 
    },
    { 
        url: 'https://code.kx.com/q/wp/option-pricing/img/asset.png', 
        title: "Monte Carlo methods for Option Pricing", 
        text: "A Monte Carlo simulation allows an analyst to determine the size of the portfolio a client would need at retirement to support their desired retirement lifestyle and other desired gifts and bequests. It factors in various important factors including reinvestment rates, inflation rates, asset class returns, tax rates, and even possible lifespans. In terms of theory, Monte Carlo valuation relies on risk neutral valuation. Here the price of the option is its discounted expected value; see risk neutrality and rational pricing. The technique applied then, is to generate a large number of possible, but random, price paths for the underlying (or underlyings) via simulation, and to then calculate the associated exercise value (i.e. \"payoff\") of the option for each path. These payoffs are then averaged and discounted to today. This result is the value of the option." 
    }
];

// Define Item component to render each box
function Item({ item }) {
    return (
        <div className='box1'>
            <Paper elevation={3} className="item-paper" sx={{backgroundColor: 'rgba(32, 30, 67, 0.8)'}}>
                <Box url={item.url} title={item.title} text={item.text} />
            </Paper>
        </div>
    );
}

function Homepage() {
    return (
        <div>
            <Navbar />
            <Carousel sx={{marginTop: '20vh', transition: '250ms', backgroundColor: 'transparent'}}>
                {items.map((item, i) => (
                    <Item key={i} item={item} />
                ))}
            </Carousel>
        </div>
    );
}

export default Homepage;
