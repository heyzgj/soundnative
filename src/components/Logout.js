import React from 'react';
import { logoutUser } from '../firebase/auth';
import { Button } from '@mui/material';

const Logout = () => {
  return (
    <Button color="inherit" onClick={logoutUser}>
      Logout
    </Button>
  );
};

export default Logout; // 确保这是默认导出
