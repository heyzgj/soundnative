import React, { useState, useEffect } from 'react';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import LoginPage from './components/LoginPage';
import MainApp from './components/MainApp';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 可以替换为更好的加载动画
  }

  return (
    <div className="App">
      {user ? <MainApp user={user} /> : <LoginPage />}
    </div>
  );
}

export default App;
