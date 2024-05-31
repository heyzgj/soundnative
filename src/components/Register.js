import React, { useState } from 'react';
import { registerUser } from '../firebase/auth';
import { Box, TextField, Button, Typography } from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box component="form" onSubmit={handleRegister} sx={{ mt: 2 }}>
      <Typography variant="h6">Register</Typography>
      <TextField
        type="email"
        label="Email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        type="password"
        label="Password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Register
      </Button>
    </Box>
  );
};

export default Register;
