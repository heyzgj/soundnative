import React, { useState, useEffect } from 'react';
import { fetchChatCompletion } from '../api/deepseek';
import Logout from './Logout';
import {
  Container,
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  AppBar,
  Toolbar,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Snackbar,
  Paper,
} from '@mui/material';
import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';
import { auth } from '../firebase/config';
import './MainApp.css';

const MainApp = ({ user }) => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState('business');
  const [userName, setUserName] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setUserName(user.displayName || user.email); // 使用用户名称或邮箱
    }
  }, [user]);

  const translateText = async () => {
    const systemPrompt = mode === 'business'
      ? 'You are a professional assistant in a business environment.'
      : mode === 'email'
      ? 'You are writing a formal email.'
      : mode === 'resume'
      ? 'You are creating a professional resume.'
      : 'You are a friendly assistant chatting casually.';

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: inputText },
    ];
    try {
      const response = await fetchChatCompletion(messages);
      setOutputText(response);

      if (window.gtag) {
        window.gtag('event', 'translate', {
          event_category: 'Text Translation',
          event_label: mode,
          value: inputText.length,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText).then(() => {
      setCopySuccess(true);
    });
  };

  const handleCloseSnackbar = () => {
    setCopySuccess(false);
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ height: '100vh', overflow: 'auto' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SoundNative
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {userName}
          </Typography>
          <Logout />
        </Toolbar>
      </AppBar>
      <Box sx={{ my: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff', margin: 'auto', maxWidth: '600px' }}>
        <Typography variant="h4" gutterBottom>
          Text Generator
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Generate professional or casual text in seconds
        </Typography>
        <TextField
          label="Enter your text here"
          multiline
          fullWidth
          rows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="mode-select-label">Mode</InputLabel>
          <Select
            labelId="mode-select-label"
            value={mode}
            label="Mode"
            onChange={(e) => setMode(e.target.value)}
          >
            <MenuItem value="business">Business</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="resume">Resume</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={translateText} fullWidth sx={{ mb: 2 }}>
          Generate
        </Button>
        <Paper className="output-box" sx={{ mt: 2, p: 2, boxShadow: 1, borderRadius: 1, backgroundColor: '#f9f9f9', position: 'relative' }}>
          <Typography variant="body1">{outputText}</Typography>
          <IconButton
            onClick={handleCopy}
            className="copy-button"
          >
            <ContentCopyIcon />
          </IconButton>
        </Paper>
      </Box>
      <Snackbar
        open={copySuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Text copied to clipboard"
      />
    </Container>
  );
};

export default MainApp;
