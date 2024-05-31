import React, { useState } from 'react';
import { loginUser, registerUser } from '../firebase/auth';
import { auth } from '../firebase/config';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { Box, TextField, Button, Typography, Divider, Link, Container, Tabs, Tab, IconButton, InputAdornment } from '@mui/material';
import { Google as GoogleIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import './LoginPage.css';

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
      // 先登出当前用户，确保每次点击 Google 登录按钮时都会触发登录弹窗
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
    <Container maxWidth="xs">
      <Box className="login-box" sx={{ textAlign: 'center', mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<GoogleIcon />}
          fullWidth
          sx={{ mb: 2, backgroundColor: '#4285F4' }}
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </Button>
        <Divider sx={{ my: 2 }}>or</Divider>
        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered>
          <Tab label="Login" value="login" />
          <Tab label="Register" value="register" />
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
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
            <Link href="#" variant="body2" sx={{ display: 'block', mt: 2 }}>
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
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Register
            </Button>
          </Box>
        )}
        {tab === 'login' && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account? <Link href="#" onClick={() => setTab('register')}>Register</Link>
          </Typography>
        )}
        {tab === 'register' && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            By continuing, you agree to our <Link href="#">Terms of Service</Link> & <Link href="#">Privacy Policy</Link>.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default LoginPage;
