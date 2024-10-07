import { jStat } from 'jstat';
function BinomialModel(S, K, T, r, sigma, N, optionType) {
  const dt = T / N;
  const u = Math.exp(sigma * Math.sqrt(dt));
  const d = 1 / u;
  const p = (Math.exp(r * dt) - d) / (u - d);

  let stockPrices = new Array(N + 1);
  for (let i = 0; i <= N; i++) {
    stockPrices[i] = S * Math.pow(u, i) * Math.pow(d, N - i);
  }

  let optionValues = stockPrices.map(price => {
    return optionType === 'Call'
      ? Math.max(0, price - K) 
      : Math.max(0, K - price);
  });

  for (let step = N - 1; step >= 0; step--) {
    for (let i = 0; i <= step; i++) {
      optionValues[i] = Math.exp(-r * dt) * (p * optionValues[i + 1] + (1 - p) * optionValues[i]);
    }
  }

  return optionValues[0];
}

export default BinomialModel;