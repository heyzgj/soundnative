import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

if (process.env.NODE_ENV === 'production') {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'G-FHS1NB2B9S');
}

const container = document.getElementById('root');
const root = createRoot(container); // 使用新的 API
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
