import React from 'react';
import { logoutUser } from '../firebase/auth';
import { Button } from '@mui/material';

const Logout = () => {
  return (
    <Button
      color="inherit"
      onClick={logoutUser}
      sx={{ 
        justifyContent: 'flex-end', // Aligns the text to the right
        width: '100%',              // Makes the button take up full width
        textAlign: 'right'          // Ensures the text inside the button is aligned to the right
      }}
    >
      Logout
    </Button>
  );
};

export default Logout;
