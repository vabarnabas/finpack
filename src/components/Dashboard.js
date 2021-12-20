import React from 'react'
import { useState, useEffect } from 'react'
import { signOut } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';
import { HiLogin, HiSearch} from 'react-icons/hi'
import { menuItems } from './MenuItems';
import Switch, { Case, Default } from 'react-switch-case';

import Empty from './Empty';
import AddForm from './AddForm';

const Dashboard = (props) => {

    const [state, setState] = useState('');
    const [stateChange, setStateChange] = useState(0)
    const [topLeft, setTopLeft] = useState(localStorage.getItem('topLeft'));
    const [topRight, setTopRight] = useState(localStorage.getItem('topRight'));
    const [bottomLeft, setBottomLeft] = useState(localStorage.getItem('bottomLeft'));
    const [bottomRight, setBottomRight] = useState(localStorage.getItem('bottomRight'));

    const [selfSearch, setSelfSearch] = useState(false);

    useEffect(() => {
        setTopLeft(localStorage.getItem('topLeft'));
        setTopRight(localStorage.getItem('topRight'));
        setBottomLeft(localStorage.getItem('bottomLeft'));
        setBottomRight(localStorage.getItem('bottomRight'));
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
            <div className="z-10 relative flex flex-col justify-center items-center top-0 left-0 h-full w-16 bg-white">
                <div className="mt-6 text-slate-200 space-y-8">
                {menuItems.map((item) => (
                    <div onClick={() => setState(item.state)} key={uuidv4()} className="w-full flex items-center justify-center hover:text-blue-600 group">
                        <p className="absolute left-[85%] text-slate-600 shadow text-sm bg-slate-200 px-2 py-0.5 rounded-md hidden group-hover:block">{item.text}</p>
                        {item.icon}
                    </div>
                ))}
                </div>
                <div onClick={() => signOut(props.auth)} key={uuidv4()} className="mt-auto mb-6 w-full flex items-center justify-center text-slate-200 hover:text-blue-600 group">
                        <p className="absolute left-[85%] text-slate-600 shadow text-sm bg-slate-200 px-2 py-0.5 rounded-md hidden group-hover:block">Kijelentkezés</p>
                        <HiLogin className='text-2xl'/>
                </div>
            </div>
            {/* State Box */}
            <div className="fixed z-20 hidden items-center justify-center bg-slate-500 bg-opacity-60 top-0 left-0 h-full w-full">
                <div className="w-[50%] h-[50%]">
                    <Empty key={uuidv4()} state={'middle'} position={'middle'} stateChange={stateChange} setStateChange={(stateChange) => setStateChange(stateChange)} />
                </div>
            </div>
            {/* Right Box */}
            <div className="flex flex-col w-full">
            {/* Search Box */}
            <div className="py-[26px] w-full">
                <div className="flex items-center justify-start pl-4">
                        <HiSearch className='text-lg text-slate-600 mr-1.5'/>
                        <input placeholder='Keresés' type="text" className="bg-transparent outline-none text-sm text-slate-600 align-middle" />
                </div>
            </div>
            <div onClick={(e) => e.stopPropagation()} className="w-full h-full grid grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 md:gap-2 p-2">
            {dashboardItems.map((item) => (
                <div key={uuidv4()} className="hidden first:flex sm:flex">
                    <Switch condition={item.state}>
                        <Case value="user-add">
                        <AddForm key={uuidv4()} state={item.state} position={item.position} stateChange={stateChange} setStateChange={(stateChange) => setStateChange(stateChange)}/>
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
