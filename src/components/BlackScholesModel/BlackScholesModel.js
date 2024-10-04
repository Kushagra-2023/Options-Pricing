// import React, { useEffect, useState } from 'react';
import { jStat } from 'jstat';

function BSModel(S, t, K, sigma, r, option) {
  // Helper functions for Call and Put
  const Call = (S, t, K, sigma, r) => {
    const d1 = (Math.log(S / K) + (r + (Math.pow(sigma, 2) / 2)) * t) / (sigma * Math.sqrt(t));
    const d2 = d1 - sigma * Math.sqrt(t);
    
    return S * jStat.normal.cdf(d1, 0, 1) - K * Math.exp(-r * t) * jStat.normal.cdf(d2, 0, 1);
  };

  const Put = (S, t, K, sigma, r) => {
    const d1 = (Math.log(S / K) + (r + (Math.pow(sigma, 2) / 2)) * t) / (sigma * Math.sqrt(t));
    const d2 = d1 - sigma * Math.sqrt(t);
    
    return K * Math.exp(-r * t) * jStat.normal.cdf(-d2, 0, 1) - S * jStat.normal.cdf(-d1, 0, 1);
  };

  // Calculate based on option type
  let price;
  if (option === "Call") {
    price = Call(S, t, K, sigma, r);
  } else {
    price = Put(S, t, K, sigma, r);
  }

  return price !== undefined ? price.toFixed(2) : null;
}

export default BSModel;


// export default function BSModel({ S, t, K, sigma, r, option }) {
//   const [price, setPrice] = useState(null); // State to hold the calculated price

//   const Call = (S, t, K, sigma, r) => {
//     const d1 = (Math.log(S / K) + (r + (Math.pow(sigma, 2) / 2)) * t) / (sigma * Math.sqrt(t));
//     const d2 = d1 - sigma * Math.sqrt(t);
    
//     const result = S * jStat.normal.cdf(d1, 0, 1) - K * Math.exp(-r * t) * jStat.normal.cdf(d2, 0, 1);
//     return result;
//   };

//   const Put = (S, t, K, sigma, r) => {
//     const d1 = (Math.log(S / K) + (r + (Math.pow(sigma, 2) / 2)) * t) / (sigma * Math.sqrt(t));
//     const d2 = d1 - sigma * Math.sqrt(t);
    
//     const result = K * Math.exp(-r * t) * jStat.normal.cdf(-d2, 0, 1) - S * jStat.normal.cdf(-d1, 0, 1);
//     return result;
//   };

//   // Effect to calculate price when inputs change
//   useEffect(() => {
//     if (option === "Call") {
//       setPrice(Call(S, t, K, sigma, r));
//     } else {
//       setPrice(Put(S, t, K, sigma, r));
//     }
//   }, [S, t, K, sigma, r, option]); // Recalculate if any of these props change

//   return (
//     <div>
//       <h2>{option} Option Price: {price !== null ? price.toFixed(2) : "Calculating..."}</h2>
//     </div>
//   );
// }
