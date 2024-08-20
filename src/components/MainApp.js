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
  CircularProgress,
  Paper,
  Snackbar,
} from '@mui/material';
import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';
import './MainApp.css';
import './WixMadeforText.css'; // Include custom font

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

  const translateText = async () => {
    setLoading(true);
    const systemPrompt = mode === 'chat'
      // ? 'Your task is to rephrase the input text into fluent, natural, native English: Imagine you are texting casually with a friend. Rephrase the input text in a very very very very very natural, native English way while keeping the original meaning intact. Do not translate the text literally. Instead, focus on conveying the same ideas using common English phrases and grammar that a native speaker would use in a casual texting conversation. The causl level range value is from 1 up to 5, now your casual level is 3. Only output the rephrased English response. Now the input is:'
      ? 'Your task is to rephrase the input text in [input][/input]in a very natural, native English way while keeping the original meaning intact. Do not translate the text literally. Instead, focus on conveying the same ideas using common English phrases and grammar that a native speaker would use in a casual texting conversation. The casual level range value is from 1 up to 5, now your casual level is at 5. Only output the rephrased response.'
      : 'Please help rephrase the following input text into fluent, natural, native English: Imagine you are emailing with a someone. Rephrase the input text in a very very very very very natural, native English way while keeping the original meaning intact. Do not translate the text literally. Instead, focus on conveying the same ideas using common English phrases and grammar that a native speaker would use in a email. Only output the rephrased email.';
      // : mode === 'resume'
      // ? 'You are creating a professional resume.'
      // : 'You are a friendly assistant chatting casually.';

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: '[input]' + inputText  + '[/input]'},
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Wix Madefor Text', fontWeight: 'bold' }}>
            SoundNative
          </Typography>
          <Logout sx={{ marginTop: 1 }}/>
        </Toolbar>
      </AppBar>
      <Box sx={{ my: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff', margin: 'auto', maxWidth: '100%', minHeight: 'calc(100vh - 128px)' }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>
          老婆牌老外交流神器
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          为灰灰老婆专门定制！
        </Typography>
        <TextField
          label="老婆请输入您的文本"
          multiline
          fullWidth
          rows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="mode-select-label">模式</InputLabel>
          <Select
            labelId="mode-select-label"
            value={mode}
            label="模式"
            onChange={(e) => setMode(e.target.value)}
          >
            <MenuItem value="chat">聊天</MenuItem>
            <MenuItem value="email">邮件</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={translateText} fullWidth sx={{ mb: 2, background: '#3a97ad' }}>
          生成
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
                {outputText || '最Rap的英语会出现在这里'}
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
        message="文本已复制到剪贴板"
      />
    </Container>
  );
};

export default MainApp;
