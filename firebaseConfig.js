
import { initializeApp, getApp, getApps } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB6wdxcyDbHhZ2JZr2aM9PtOJ8EVNL7Tww",
  authDomain: "taskflow-app-577d8.firebaseapp.com",
  projectId: "taskflow-app-577d8",
  storageBucket: "taskflow-app-577d8.firebasestorage.app",
  messagingSenderId: "882555001651",
  appId: "1:882555001651:web:5ba65e10de79508c65fc46",
};

const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

let auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  if (error.code === 'auth/already-initialized') {
    auth = getAuth(app);
  } else {
    throw error;
  }
}

const db = getFirestore(app);

export { app, auth, db };
