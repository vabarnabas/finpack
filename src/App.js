import { useState, useEffect } from 'react'
import { initializeApp } from "firebase/app";
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from "firebase/auth";
import { initializeFirestore } from 'firebase/firestore'; 
import { getFirestore } from 'firebase/firestore'
import { getStaffData } from './components/Utilities';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Loader from './components/Loader';

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
  const firestore = getFirestore(app);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    },600)
  },[])

  return (
    <div className="h-screen w-screen select-none overflow-hidden bg-slate-100 dark:bg-gray-800">
      {isReady ? (user ? <Dashboard auth={auth} firestore={firestore} user={user} /> : <Login auth={auth} />) : <Loader />}
    </div>
  );
}

export default App;
