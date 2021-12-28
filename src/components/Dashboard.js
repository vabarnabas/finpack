import React from 'react'
import { useState } from 'react'
//Packages
import { v4 as uuidv4 } from 'uuid';
import { signOut } from "firebase/auth";
import Switch, { Case, Default } from 'react-switch-case';
//Icons & Design
import { HiLogin, HiSearch, HiX, HiCog } from 'react-icons/hi'
//Components
import Empty from './Empty';
import UserAdd from './UserAdd';
import Settings from './Settings';
import UserDatabase from './UserDatabase';
import Charge from './Charge';
import Switcher from './Switcher';
//JSON
import { menuItems } from './MenuItems';

const Dashboard = (props) => {

    document.title = 'Finpak - Dashboard'

    const { auth, user, firestore, windowSize } = props;

    const { topLeft, setTopLeft, topRight, setTopRight, bottomLeft, setBottomLeft, bottomRight, setBottomRight, middle, setMiddle, dashboardArray } = props;

    const [popup, setPopup] = useState(true);
    const [popupText, setPopupText] = useState({
        icon: '🎉',
        message: 'Üdvözöl a Finpak x Limoverse!',
    });

    return (
        <div className='h-full w-full flex'>
            {/* Dashboard Nav */}
            <div className="z-10 relative flex flex-col justify-center items-center top-0 left-0 h-full w-16 bg-white dark:bg-gray-900">
                <div className="mt-6 text-slate-300 dark:text-slate-700 space-y-6">
                {menuItems.filter(item => item.show === true).map((item) => (
                    <div onClick={() => {sessionStorage.setItem('middle', item.state);setMiddle(item.state)}} key={uuidv4()} className="w-full flex items-center justify-center hover:text-blue-600 group">
                        <p className="absolute left-[85%] text-slate-600 dark:text-slate-400 shadow text-sm bg-slate-200 dark:bg-slate-800 px-3 py-0.5 rounded-md hidden group-hover:block">{item.text}</p>
                        {item.icon}
                    </div>
                ))}
                </div>
                {/* Lower Nav */}
                <div className="mt-auto mb-6 space-y-6">
                    <div onClick={() => {sessionStorage.setItem('middle', 'profile');setMiddle('profile')}} className="w-full flex items-center justify-center text-slate-300 dark:text-slate-700 hover:text-blue-600 group">
                            <p className="absolute left-[85%] text-slate-600 dark:text-slate-400 shadow text-sm bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-md hidden group-hover:block">Beállítások</p>
                            <HiCog className='text-2xl'/>
                    </div>
                    <div onClick={() => signOut(auth)} key={uuidv4()} className="w-full flex items-center justify-center text-slate-300 dark:text-slate-700 hover:text-blue-600 group">
                            <p className="absolute left-[85%] text-slate-600 dark:text-slate-400 shadow text-sm bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-md hidden group-hover:block">Kijelentkezés</p>
                            <HiLogin className='text-2xl'/>
                    </div>
                </div>
            </div>
            {/* Middle Box */}
            <div className={`fixed z-30 items-center justify-center bg-slate-900 bg-opacity-60 top-0 left-0 h-full w-full ${middle ? 'flex' : 'hidden'}`}>
                <div className="w-[90%] h-[80%] md:w-[55%] md:h-[55%] xl:w-[40%] xl:h-[45%]">
                    <Switcher dashboardArray={dashboardArray} firestore={firestore} user={user} state={middle} setState={(e) => setMiddle(e)} position={'topLeft'} />
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
                    <Switcher dashboardArray={dashboardArray} firestore={firestore} user={user} state={topLeft} setState={(e) => setTopLeft(e)} position={'topLeft'} />
                    <Switcher dashboardArray={dashboardArray} firestore={firestore} user={user} state={topRight} setState={(e) => setTopRight(e)} position={'topRight'} />
                    <Switcher dashboardArray={dashboardArray} firestore={firestore} user={user} state={bottomLeft} setState={(e) => setBottomLeft(e)} position={'bottomLeft'} />
                    <Switcher dashboardArray={dashboardArray} firestore={firestore} user={user} state={bottomRight} setState={(e) => setBottomRight(e)} position={'bottomRight'} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
