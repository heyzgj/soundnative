import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// if (process.env.NODE_ENV === 'production') {
//   window.dataLayer = window.dataLayer || [];
//   function gtag() {
//     window.dataLayer.push(arguments);
//   }
//   gtag('js', new Date());
//   gtag('config', 'G-FHS1NB2B9S');
// }

const theme = createTheme();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
