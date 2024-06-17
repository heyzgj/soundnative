import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; // 注释掉这行
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, collection, addDoc, connectFirestoreEmulator } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7C3GEUUGkuIFlo1ZfC4vnZOXdcuPU_MI",
  authDomain: "soundnative-cf988.firebaseapp.com",
  projectId: "soundnative-cf988",
  storageBucket: "soundnative-cf988.appspot.com",
  messagingSenderId: "602876846249",
  appId: "1:602876846249:web:dc24d643d9f37cb13489b8",
  measurementId: "G-FHS1NB2B9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // 注释掉这行
const auth = getAuth(app);
const db = getFirestore(app);

// 连接到本地模拟器
if (window.location.hostname === 'localhost') {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export { auth, db, collection, addDoc };
