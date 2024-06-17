import React, { useState, useEffect } from 'react';
import MainApp from './components/MainApp';
import LoginPage from './components/LoginPage';
import LoadingScreen from './components/LoadingScreen';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth/web-extension';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return user ? <MainApp user={user} /> : <LoginPage />;
}

export default App;
