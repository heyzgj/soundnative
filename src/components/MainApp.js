import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Paper,
  Snackbar,
} from '@mui/material';
import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';
import './MainApp.css';

const MainApp = ({ user }) => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState('chat');
  const [userName, setUserName] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUserName(user.displayName || user.email);
    }
  }, [user]);

  async function callDeepseekAPI(messages) {
    // 检查 offscreen 文档是否已存在
    const hasOffscreenDocument = chrome.runtime.getContexts && (await chrome.runtime.getContexts({
      contextTypes: ['OFFSCREEN_DOCUMENT'],
      documentUrls: ['offscreen.html']
    })).length > 0;
  
    // 如果 offscreen 文档不存在，则创建它
    if (!hasOffscreenDocument) {
      await chrome.offscreen.createDocument({
        url: 'offscreen.html',
        reasons: ['USER_MEDIA'],
        justification: 'To call Deepseek API',
      });
    }
  
    // 向 offscreen 文档发送消息
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({
        action: "callDeepseekAPI",
        messages: messages,
        apiKey: YOUR_DEEPSEEK_API_KEY, // 将 YOUR_DEEPSEEK_API_KEY 替换为你的实际 API 密钥
      }, (response) => {
        if (response.error) {
          console.error("Error calling Deepseek API:", response.error);
          resolve(null);
        } else {
          resolve(response.result);
        }
      });
    });
  }

  const translateText = async () => {
    setLoading(true);
    const systemPrompt =
      mode === 'chat'
        ? "Your task is to rephrase the input text in [input][/input]in a very natural, native English way while keeping the original meaning intact. Do not translate the text literally. Instead, focus on conveying the same ideas using common English phrases and grammar that a native speaker would use in a casual texting conversation. The casual level range value is from 1 up to 5, now your casual level is at 5. Only output the rephrased response."
        : "Please help rephrase the following input text into fluent, natural, native English: Imagine you are emailing with a someone. Rephrase the input text in a very very very very very natural, native English way while keeping the original meaning intact. Do not translate the text literally. Instead, focus on conveying the same ideas using common English phrases and grammar that a native speaker would use in a email. Only output the rephrased email.";
    // : mode === 'resume'
    // ? 'You are creating a professional resume.'
    // : 'You are a friendly assistant chatting casually.';

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: '[input]' + inputText + '[input]' },
    ];
    try {
      const response = await callDeepseekAPI(messages);
      setOutputText(response);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
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
    <Container maxWidth="sm" sx={{ height: '100%', minHeight: '100vh', overflow: 'auto', padding: 0 }}>
      <AppBar position="static" sx={{ background: '#3a97ad' }}>
        <Toolbar>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Wix Madefor Text', fontWeight: 'bold' }}> */}
            SoundNative
          {/* </Typography> */}
          <Logout sx={{ marginTop: 1 }}/>
        </Toolbar>
      </AppBar>
      <Box sx={{ my: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff', margin: 'auto', maxWidth: '100%', minHeight: 'calc(100vh - 128px)' }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>
          English Translator for Huihui
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          For Huihui's special customization!
        </Typography>
        <TextField
          label="Huihui please enter your text"
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
            label="模式"
            onChange={(e) => setMode(e.target.value)}
          >
            <MenuItem value="chat">Conversation</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={translateText} fullWidth sx={{ mb: 2, background: '#3a97ad' }}>
          Generate
        </Button>
        <Paper sx={{ mt: 2, p: 2, boxShadow: 1, borderRadius: 1, backgroundColor: '#f9f9f9', position: 'relative' }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
              <CircularProgress size={24} />
              <Typography variant="body1" sx={{ ml: 2 }}>正在生成...</Typography>
            </Box>
          ) : (
            <Box sx={{ position: 'relative', paddingRight: '40px', paddingBottom: '40px' }}>
              <Typography variant="body1" sx={{ color: outputText ? 'inherit' : 'grey.500', whiteSpace: 'pre-line' }}>
                {outputText || 'Get ready for the most rap English'}
              </Typography>
              {outputText && (
                <IconButton
                  onClick={handleCopy}
                  sx={{ position: 'absolute', right: 0, bottom: 0 }}
                >
                  <ContentCopyIcon />
                </IconButton>
              )}
            </Box>
          )}
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