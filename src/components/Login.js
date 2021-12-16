import React from 'react'
import { useState } from 'react';
import {signInWithEmailAndPassword } from "firebase/auth";

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onSignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(props.auth, email, password)
        .then((userCredential) => {
            // Signed in 

            // ...
          })
          .catch((error) => {
            console.log(error.code);
            (() =>
                        {switch(error.code) {
                            case 'auth/invalid-email':
                                return setError('Hibás vagy ismeretlen e-mail cím!');
                            case 'auth/internal-error':
                                return setError('Hibás vagy hiányzó adatok!');
                            case 'auth/wrong-password':
                                return setError('Hibás jelszó!');
                            case 'auth/too-many-requests':
                                return setError('Túl sok próbálkozás');
                            case 'auth/user-not-found':
                                return setError('Ismeretlen felhasználó!')
                            default:
                                setError('');
                        }})() 

          });
    }

    return (
        <div className='flex h-full w-full justify-center items-center'>
            <form onSubmit={onSignIn} className="flex flex-col items-center justify-center">
                <p className="text-3xl text-blue-500 font-bold mb-12">Belépés</p>
                <input value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='E-mail cím' type="email" className={`bg-stone-100 rounded-full px-4 py-1 mb-0.5 focus:outline-none ${error === '' ? '' : 'ring-2 ring-pink-500 text-pink-500'}`} />
                <p className="text-pink-500 mr-auto pl-4 text-xs mb-3">{error}</p>
                <input value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Jelszó' type="password" className="bg-stone-100 rounded-full focus:outline-none px-4 py-1 mb-6" />
                <button className="bg-blue-500 hover:bg-blue-600 text-white w-full rounded-full py-1">Bejelentkezés</button>
            </form>
        </div>
    )
}

export default Login
