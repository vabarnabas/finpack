import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { HiX } from 'react-icons/hi'
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri'

const UserDatabase = (props) => {

    const [view, setView] = useState('list');
    const [currentPage, setCurrentPage] = useState(0);

    const itemList = [
        {
            userId: uuidv4(),
            price: 10000,
            fee: 0,
            tripId: uuidv4(),
            plate: 'RTC120',
            comment: '',
            status: 'open',
            priority: 'low',
            staff: 'dev@finpak.app',
            statusMessage: 'Ticket megnyitva 2021.11.22. 15:05 dátummal.',
        },
        {
            userId: uuidv4(),
            price: 10000,
            fee: 3292,
            tripId: uuidv4(),
            plate: 'RTC120',
            comment: '',
            status: 'closed',
            priority: 'medium',
            staff: 'dev@finpak.app',
            statusMessage: 'Ticket megnyitva 2021.11.22. 15:05 dátummal.',
        },
        {
            userId: uuidv4(),
            price: 10000,
            fee: 5000,
            tripId: uuidv4(),
            plate: 'RTC120',
            comment: '',
            status: 'open',
            priority: 'urgent',
            staff: 'dev@finpak.app',
            statusMessage: 'Ticket megnyitva 2021.11.22. 15:05 dátummal.',
        },
    ]

    const formatNumber = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    return (
        <div className='dashboard-card'>
            <HiX onClick={() => {localStorage.removeItem(props.position);sessionStorage.removeItem(props.position);props.setStateChange(props.stateChange+1)}} className='absolute top-3 right-3 text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-600 text-lg'/>
            <div className="h-full w-full flex items-center justify-center px-10">
                <div className="absolute bottom-2 flex items-center justify-center">
                    <RiArrowLeftSFill className='text-2xl text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-600' />
                    <p className="text-sm text-slate-500 dark:text-slate-500">{currentPage}</p>
                    <RiArrowRightSFill className='text-2xl text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-600' />
                </div>
                <div className="w-full grid gap-y-2 py-10">
                    {itemList.map(item => (
                        <div key={uuidv4()} className="px-2 rounded-lg grid md:grid-cols-3 grid-rows-2 gap-x-2 py-1.5 hover:bg-slate-300 dark:hover:bg-gray-600">
                            <p className={`md:row-start-1 md:col-start-1 self-center font-semibold text-center text-xs text-slate-200 dark:text-slate-300 py-0.5 px-2 rounded-full max-w-max ${item.status === 'open' ? 'bg-emerald-500' : 'bg-pink-500'}`}>{item.status.toUpperCase()}</p>
                            <p className={`md:row-start-2 md:col-start-1 self-center font-semibold text-center text-xs text-slate-200 dark:text-slate-300 py-0.5 px-2 rounded-full max-w-max ${item.priority === 'low' ? 'bg-emerald-500' : (item.priority === 'medium' ? 'bg-blue-500' : 'bg-pink-500')}`}>{item.priority.toUpperCase()}</p>
                            <p className="md:row-start-1 md:col-start-2 self-center font-bold text-slate-600 dark:text-slate-400">{item.plate}</p>
                            <p className="md:row-start-1 md:col-start-3 col-span-1 text-sm self-center text-slate-600 dark:text-slate-400">{formatNumber(item.price + item.fee) + ' Ft'}</p>
                            <p className="md:row-start-2 md:col-start-2 col-span-2 self-center text-sm text-slate-600 dark:text-slate-400">{item.staff}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserDatabase
