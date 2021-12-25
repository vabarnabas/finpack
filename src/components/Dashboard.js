import React from 'react'
import { useState, useEffect } from 'react'
//Packages
import { v4 as uuidv4 } from 'uuid';
import { signOut } from "firebase/auth";
import Switch, { Case, Default } from 'react-switch-case';
//Icons & Design
import { HiLogin, HiSearch, HiIdentification, HiX } from 'react-icons/hi'
//Components
import Empty from './Empty';
import UserAdd from './UserAdd';
import Profile from './Profile';
import UserDatabase from './UserDatabase';
import Charge from './Charge';
//JSON
import { menuItems } from './MenuItems';

const Dashboard = (props) => {

    document.title = 'Finpak - Dashboard'

    const { auth, user, firestore } = props;

    const [stateChange, setStateChange] = useState(0);
    const [topLeft, setTopLeft] = useState(localStorage.getItem('topLeft'));
    const [topRight, setTopRight] = useState(localStorage.getItem('topRight'));
    const [bottomLeft, setBottomLeft] = useState(localStorage.getItem('bottomLeft'));
    const [bottomRight, setBottomRight] = useState(localStorage.getItem('bottomRight'));
    const [middle, setMiddle] = useState(sessionStorage.getItem('middle'));

    const [popup, setPopup] = useState(true);
    const [popupText, setPopupText] = useState({
        icon: '🎉',
        message: 'Üdvözöl a Finpak x Limoverse!',
    });

    useEffect(() => {
        setTopLeft(localStorage.getItem('topLeft'));
        setTopRight(localStorage.getItem('topRight'));
        setBottomLeft(localStorage.getItem('bottomLeft'));
        setBottomRight(localStorage.getItem('bottomRight'));
        setMiddle(sessionStorage.getItem('middle'))
    },[stateChange])

    const dashboardItems = [
        {
            position: 'topLeft',
            state: topLeft,
        },
        {
            position: 'topRight',
            state: topRight,
        },
        {
            position: 'bottomLeft',
            state: bottomLeft,
        },
        {
            position: 'bottomRight',
            state: bottomRight,
        },
    ]

    return (
        <div className='h-full w-full flex'>
            {/* Dashboard Nav */}
            <div className="z-10 relative flex flex-col justify-center items-center top-0 left-0 h-full w-16 bg-white dark:bg-gray-900">
                <div className="mt-6 text-slate-300 dark:text-slate-700 space-y-6">
                {menuItems.filter(item => item.show === true).map((item) => (
                    <div onClick={() => {sessionStorage.setItem('middle', item.state);setStateChange(stateChange+1)}} key={uuidv4()} className="w-full flex items-center justify-center hover:text-blue-600 group">
                        <p className="absolute left-[85%] text-slate-600 dark:text-slate-400 shadow text-sm bg-slate-200 dark:bg-slate-800 px-3 py-0.5 rounded-md hidden group-hover:block">{item.text}</p>
                        {item.icon}
                    </div>
                ))}
                </div>
                {/* Lower Nav */}
                <div className="mt-auto mb-6 space-y-6">
                    <div onClick={() => {sessionStorage.setItem('middle', 'profile');setStateChange(stateChange+1)}} className="w-full flex items-center justify-center text-slate-300 dark:text-slate-700 hover:text-blue-600 group">
                            <p className="absolute left-[85%] text-slate-600 dark:text-slate-400 shadow text-sm bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-md hidden group-hover:block">Profilom</p>
                            <HiIdentification className='text-2xl'/>
                    </div>
                    <div onClick={() => signOut(auth)} key={uuidv4()} className="w-full flex items-center justify-center text-slate-300 dark:text-slate-700 hover:text-blue-600 group">
                            <p className="absolute left-[85%] text-slate-600 dark:text-slate-400 shadow text-sm bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-md hidden group-hover:block">Kijelentkezés</p>
                            <HiLogin className='text-2xl'/>
                    </div>
                </div>
            </div>
            {/* Middle Box */}
            <div className={`fixed z-20 items-center justify-center bg-slate-900 bg-opacity-60 top-0 left-0 h-full w-full ${middle ? 'flex' : 'hidden'}`}>
                <div className="w-[90%] h-[80%] md:w-[55%] md:h-[55%] xl:w-[40%] xl:h-[45%]">
                <Switch condition={middle}>
                        <Case value="user-add">
                            <UserAdd key={uuidv4()} firestore={firestore} user={user} position={'middle'} stateChange={stateChange} setStateChange={(stateChange) => setStateChange(stateChange)} />
                        </Case>
                        <Case value="profile">
                            <Profile key={uuidv4()} position={'middle'} stateChange={stateChange} setStateChange={(stateChange) => setStateChange(stateChange)}/>
                        </Case>
                        <Case value="database">
                            <UserDatabase key={uuidv4()} firestore={firestore} user={user} position={'middle'} stateChange={stateChange} setStateChange={(stateChange) => setStateChange(stateChange)} />
                        </Case>
                        <Case value="charge">
                            <Charge key={uuidv4()} firestore={firestore} user={user} position={'middle'} stateChange={stateChange} setStateChange={(stateChange) => setStateChange(stateChange)} />
                        </Case>
                        <Default>
                            <Empty key={uuidv4()} state={middle} position={'middle'} stateChange={stateChange} setStateChange={(stateChange) => setStateChange(stateChange)} />
                        </Default>
                    </Switch>
                </div>
            </div>
            {/* Right Box */}
            <div className="relative flex flex-col w-full">
                {/* Top News Bar */}
                {popup ?
                <div className="absolute top-0 left-0 w-full h-12 flex items-center justify-center bg-slate-100 dark:bg-gray-800 shadow-md dark:shadow-lg text-slate-600 dark:text-slate-400">
                    <HiX onClick={() => setPopup(false)} className='absolute right-6 text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-600'/>
                    <p className="absolute left-4 sm:static text-xs sm:text-sm flex items-center justify-center"><span className="mr-3 hidden sm:block">{popupText.icon}</span>{popupText.message}</p>
                </div> : ''}
                {/* Search Box */}
                <div className="py-[26px] w-full">
                    <div className="flex items-center justify-start pl-4">
                        <HiSearch className='text-lg text-slate-600 dark:text-slate-500 mr-1.5'/>
                        <input placeholder='Keresés' type="text" className="bg-transparent outline-none text-sm text-slate-600 dark:text-slate-500 dark:placeholder:text-slate-500 align-middle" />
                    </div>
                </div>
                <div onClick={(e) => e.stopPropagation()} className="w-full h-full grid grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 md:gap-2 p-2">
                {dashboardItems.map((item) => (
                    <div key={uuidv4()} className="hidden first:flex sm:flex">
                        <Switch condition={item.state}>
                            <Case value="user-add">
                                <UserAdd key={uuidv4()} firestore={firestore} user={user} state={item.state} position={item.position} stateChange={stateChange} setStateChange={(stateChange) => setStateChange(stateChange)}/>
                            </Case>
                            <Case value="database">
                                <UserDatabase key={uuidv4()} firestore={firestore} user={user} position={item.position} stateChange={stateChange} setStateChange={(stateChange) => setStateChange(stateChange)}/>
                            </Case>
                            <Case value="charge">
                                <Charge key={uuidv4()} firestore={firestore} user={user} position={item.position} stateChange={stateChange} setStateChange={(stateChange) => setStateChange(stateChange)}/>
                            </Case>
                            <Default>
                                <Empty key={uuidv4()} state={item.state} position={item.position} stateChange={stateChange} setStateChange={(stateChange) => setStateChange(stateChange)} />
                            </Default>
                        </Switch>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
