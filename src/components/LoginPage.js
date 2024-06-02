import React, { useState } from 'react';
import { loginUser, registerUser } from '../firebase/auth';
import { auth } from '../firebase/config';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { Box, TextField, Button, Typography, Divider, Link, Container, Tabs, Tab, IconButton, InputAdornment } from '@mui/material';
import { Google as GoogleIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import './LoginPage.css';
import './WixMadeforText.css'; // Include custom font

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState('login');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // Sign out the current user to ensure the Google login popup is triggered
      await signOut(auth);
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Box className="login-box" sx={{ textAlign: 'center', p: 3, boxShadow: 3, borderRadius: 2, width: '100%' }}>
        <Typography variant="h3" sx={{ mb: 3, fontFamily: 'Wix Madefor Text', fontWeight: 'bold', color: '#3a97ad' }}>
          SoundNative
        </Typography>
        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered sx={{ mb: 2 }}>
          <Tab label="LOGIN" value="login" sx={{ color: tab === 'login' ? '#3a97ad' : '#000', fontWeight: 'bold', width: '50%' }} />
          <Tab label="REGISTER" value="register" sx={{ color: tab === 'register' ? '#3a97ad' : '#000', fontWeight: 'bold', width: '50%' }} />
        </Tabs>
        {tab === 'login' && (
          <Box component="form" onSubmit={handleLogin} sx={{ textAlign: 'left', mt: 2 }}>
            <TextField
              type="email"
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              type={showPassword ? 'text' : 'password'}
              label="Password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, background: '#3a97ad', fontWeight: 'bold', color: '#fff' }}>
              Login
            </Button>
            <Link href="#" variant="body2" sx={{ display: 'block', mt: 2, color: '#3a97ad', fontWeight: 'bold' }}>
              Forgot password?
            </Link>
          </Box>
        )}
        {tab === 'register' && (
          <Box component="form" onSubmit={handleRegister} sx={{ textAlign: 'left', mt: 2 }}>
            <TextField
              type="text"
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              type="email"
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              type={showPassword ? 'text' : 'password'}
              label="Password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, background: '#3a97ad', fontWeight: 'bold', color: '#fff' }}>
              Register
            </Button>
          </Box>
        )}
        {tab === 'login' && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account? <Link href="#" onClick={() => setTab('register')} sx={{ color: '#3a97ad', fontWeight: 'bold' }}>Register</Link>
          </Typography>
        )}
        {tab === 'register' && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            By continuing, you agree to our <Link href="#" sx={{ color: '#3a97ad', fontWeight: 'bold' }}>Terms of Service</Link> & <Link href="#" sx={{ color: '#3a97ad', fontWeight: 'bold' }}>Privacy Policy</Link>.
          </Typography>
        )}
        <Divider sx={{ my: 2 }}>or</Divider>
        <Button
          variant="contained"
          fullWidth
          startIcon={<GoogleIcon />}
          sx={{ mb: 2, backgroundColor: '#3a97ad', fontWeight: 'bold', color: '#fff' }}
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
