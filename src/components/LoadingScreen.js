import React from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <Box className="loading-screen">
      <CircularProgress size={50} />
      <Typography variant="h6" sx={{ mt: 2, color: 'white', fontWeight: 'bold' }}>Loading...</Typography>
    </Box>
  );
};

export default LoadingScreen;
