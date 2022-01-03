import { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from "firebase/auth";
import { initializeFirestore } from 'firebase/firestore'; 
import { getFirestore } from 'firebase/firestore'

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Loader from './components/Loader';

const firebaseConfig = {
  apiKey: "AIzaSyBmMdqmGDNJToWv-i69IejXuwxZAXkrMc0",
  authDomain: "finpak-main.firebaseapp.com",
  projectId: "finpak-main",
  storageBucket: "finpak-main.appspot.com",
  messagingSenderId: "85551013636",
  appId: "1:85551013636:web:6a7cd45fa0c7703ffa7a51",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
initializeFirestore(app, {experimentalForceLongPolling: true});

export const firestore = getFirestore(app);

function App() {
  
  const[user] = useAuthState(auth);
  
  const [isReady, setIsReady] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [topLeft, setTopLeft] = useState(localStorage.getItem('topLeft'));
  const [topRight, setTopRight] = useState(localStorage.getItem('topRight'));
  const [bottomLeft, setBottomLeft] = useState(localStorage.getItem('bottomLeft'));
  const [bottomRight, setBottomRight] = useState(localStorage.getItem('bottomRight'));
  const [middle, setMiddle] = useState(sessionStorage.getItem('middle'));

  const [dashboardArray, setDashboardArray] = useState([localStorage.getItem('topLeft'), localStorage.getItem('topRight'), localStorage.getItem('bottomLeft'), localStorage.getItem('bottomRight')]);

  useEffect(() => {
    setDashboardArray([localStorage.getItem('topLeft'), localStorage.getItem('topRight'), localStorage.getItem('bottomLeft'), localStorage.getItem('bottomRight')])
  },[topLeft, topRight, bottomLeft, bottomRight])

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    },600)
  },[])

  window.addEventListener('resize', () => {
    setWindowWidth(window.innerWidth);
  })

  return (
    <div className="h-screen w-screen select-none overflow-hidden bg-slate-100 dark:bg-gray-800">
      {isReady ?
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login auth={auth} />} />
        <Route path="/dashboard" element={!user ? <Navigate to="/dashboard" /> : <Dashboard auth={auth} firestore={firestore} user={user} windowWidth={windowWidth}
        topLeft={topLeft} setTopLeft={(topLeft) => setTopLeft(topLeft)}
        topRight={topRight} setTopRight={(topRight) => setTopRight(topRight)}
        bottomLeft={bottomLeft} setBottomLeft={(bottomLeft) => setBottomLeft(bottomLeft)}
        bottomRight={bottomRight} setBottomRight={(bottomRight) => setBottomRight(bottomRight)}
        middle={middle} setMiddle={(middle) => setMiddle(middle)}
        dashboardArray={dashboardArray}
        />} />
        <Route exact path="/" element={<Navigate to="/login"/>} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes> : <Loader />}
    </div>
  );
}

export default App;