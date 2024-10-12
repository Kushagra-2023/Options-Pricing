function randomNormal(mean = 0, stddev = 1) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Avoid 0
    while (v === 0) v = Math.random();
    return stddev * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) + mean;
}

// Monte Carlo Option Pricing function without mathjs
function monteCarloOptionPricing(assetPrice, strikePrice, timeToMaturity, riskFreeRate, volatility, numSimulations, optionType = 'Call') {
    const lastPrice = assetPrice;  // Current price of the asset
    const numDays = Math.floor(timeToMaturity * 252);  // Assuming 252 trading days in a year

    const drift = (riskFreeRate - 0.5 * Math.pow(volatility, 2)) * timeToMaturity;
    const stddev = volatility * Math.sqrt(timeToMaturity);

    let simulations = [];

    for (let i = 0; i < numSimulations; i++) {
        const randomShock = randomNormal();  // Generate random value from normal distribution
        const futurePrice = lastPrice * Math.exp(drift + stddev * randomShock);
        simulations.push(futurePrice);
    }

    let payoffs;

    if (optionType === 'Call') {
        payoffs = simulations.map(price => Math.max(price - strikePrice, 0));
    } else if (optionType === 'Put') {
        payoffs = simulations.map(price => Math.max(strikePrice - price, 0));
    } else {
        throw new Error("Invalid option type. Choose 'Call' or 'Put'.");
    }

    const optionPrice = Math.exp(-riskFreeRate * timeToMaturity) * (payoffs.reduce((a, b) => a + b, 0) / payoffs.length);

    return { optionPrice, simulations };
}

export default monteCarloOptionPricing;


// Example usage
// const assetPrice = 100;      // Current asset price
// const strikePrice = 60;      // Strike price
// const timeToMaturity = 1;    // Time to maturity in years (e.g. 1 year)
// const riskFreeRate = 0.1;    // Risk-free interest rate (e.g., 10% as 0.1)
// const volatility = 0.25;     // Volatility as decimal (e.g., 25% as 0.25)
// const numSimulations = 10000;  // Number of Monte Carlo simulations
// const optionType = 'call';   // Option type ('call' or 'put')

// const result = monteCarloOptionPricing(assetPrice, strikePrice, timeToMaturity, riskFreeRate, volatility, numSimulations, optionType);

// console.log(`The estimated price of the ${optionType} option is: $${result.optionPrice.toFixed(2)}`);
