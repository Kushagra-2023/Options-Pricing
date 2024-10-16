import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import your page components
import Homepage from './pages/Homepage/Homepage';
import BlackScholes from './pages/BlackScholes/BlackScholes';
import Binomial from './pages/Binomial/Binomial';
import Stocks from './pages/Stocks/Stocks';
import MonteCarlo from './pages/MonteCarlo/MonteCarlo';
// import Contact from './pages/Contact';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/blackscholes" element={<BlackScholes />} />
        <Route path="/binomial" element={<Binomial />} />
        <Route path='/stocks' element={<Stocks />} />
        <Route path="/montecarlo" element={<MonteCarlo />} />
      </Routes> 
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
