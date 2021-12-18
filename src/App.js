import './App.css';
import { useState } from 'react'
import { initializeApp } from "firebase/app";
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from "firebase/auth";
import {initializeFirestore} from 'firebase/firestore'; 

import Login from './components/Login';
import Dashboard from './components/Dashboard';

const firebaseConfig = {
  apiKey: "AIzaSyBmMdqmGDNJToWv-i69IejXuwxZAXkrMc0",
  authDomain: "finpak-main.firebaseapp.com",
  projectId: "finpak-main",
  storageBucket: "finpak-main.appspot.com",
  messagingSenderId: "85551013636",
  appId: "1:85551013636:web:6a7cd45fa0c7703ffa7a51"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
initializeFirestore(app, {experimentalForceLongPolling: true});

function App() {

  const[user] = useAuthState(auth);

  return (
    <div className="h-screen w-screen select-none overflow-hidden bg-slate-100">
      {user ? <Dashboard auth={auth} /> : <Login auth={auth} />}
    </div>
  );
}

export default App;
