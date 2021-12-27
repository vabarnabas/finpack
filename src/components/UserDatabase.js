import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { getFormattedNumber } from './Utilities'
import { HiX, HiFilter } from 'react-icons/hi'
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri'

const UserDatabase = (props) => {

    const [view, setView] = useState('list');
    const [filter, setFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const itemList = [
        {
            id: uuidv4(),
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
            timestamp: '2021.11.12. 23:51',
        },
        {
            id: uuidv4(),
            userId: uuidv4(),
            price: 1000000,
            fee: 3292,
            tripId: uuidv4(),
            plate: 'RTC120',
            comment: '',
            status: 'closed',
            priority: 'medium',
            staff: 'dev@finpak.app',
            statusMessage: 'Ticket megnyitva 2021.11.22. 15:05 dátummal.',
            timestamp: '2021.11.12. 23:51',
        },
        {
            id: uuidv4(),
            userId: uuidv4(),
            price: 10000,
            fee: 5000,
            tripId: uuidv4(),
            plate: 'SAA421',
            comment: '',
            status: 'open',
            priority: 'urgent',
            staff: 'dev@finpak.app',
            statusMessage: 'Ticket megnyitva 2021.11.22. 15:05 dátummal.',
            timestamp: '2021.11.12. 23:51',
        },
        {
            id: uuidv4(),
            userId: uuidv4(),
            price: 10000,
            fee: 5000,
            tripId: uuidv4(),
            plate: 'SAA421',
            comment: '',
            status: 'open',
            priority: 'urgent',
            staff: 'dev@finpak.app',
            statusMessage: 'Ticket megnyitva 2021.11.22. 15:05 dátummal.',
            timestamp: '2021.11.12. 23:51',
        },
        {
            id: uuidv4(),
            userId: uuidv4(),
            price: 10000,
            fee: 5000,
            tripId: uuidv4(),
            plate: 'SAA421',
            comment: '',
            status: 'open',
            priority: 'urgent',
            staff: 'dev@finpak.app',
            statusMessage: 'Ticket megnyitva 2021.11.22. 15:05 dátummal.',
            timestamp: '2021.11.12. 23:51',
        },
        {
            id: uuidv4(),
            userId: uuidv4(),
            price: 10000,
            fee: 5000,
            tripId: uuidv4(),
            plate: 'SAA421',
            comment: '',
            status: 'open',
            priority: 'urgent',
            staff: 'dev@finpak.app',
            statusMessage: 'Ticket megnyitva 2021.11.22. 15:05 dátummal.',
            timestamp: '2021.11.12. 23:51',
        },
    ]

    return (
        <div onClick={() => setFilter(false)} className='dashboard-card'>
            <div className="absolute w-full top-3 px-3 flex items-center justify-center">
                <p className="text-xs font-semibold mr-auto text-slate-500 pl-2">ADATBÁZIS</p>
                <div className="relative ml-auto flex justify-center items-center space-x-2">
                    <HiFilter onClick={(e) => {e.stopPropagation();setFilter(!filter)}} className='cursor-pointer text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-600'/>
                    {filter ?
                    <div onClick={(e) => e.stopPropagation()} className="absolute w-max top-[110%] right-0 py-2 rounded-lg bg-slate-200 dark:bg-gray-700 shadow shadow-slate-300 dark:shadow-gray-800 overflow-y-scroll scrollbar-hide">
                        <div className="relative grid gap-y-3 place-items-center px-4 py-2">
                            <div className="grid grid-cols-2 text-slate-600 dark:text-slate-400">
                                <p className="text-xs">Státusz:</p>
                                <select className='text-xs rounded px-1 bg-slate-100 dark:bg-gray-600 text-slate-600 dark:text-slate-400' name="" id="">
                                    <option className='text-xs' value="low">OPEN</option>
                                    <option className='text-xs' value="medium">CLOSED</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 text-slate-600 dark:text-slate-400">
                                <p className="text-xs">Prioritás:</p>
                                <select className='text-xs rounded px-1 bg-slate-100 dark:bg-gray-600 text-slate-600 dark:text-slate-400' name="" id="">
                                    <option className='text-xs' value="low">LOW</option>
                                    <option className='text-xs' value="medium">MEDIUM</option>
                                    <option className='text-xs' value="high">HIGH</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 text-slate-600 dark:text-slate-400">
                                <input type="text" placeholder="Rendszám" className="input-box text-xs col-span-2" />
                            </div>
                            <button className="text-xs bg-blue-500 hover:bg-blue-600 text-white dark:text-slate-300 w-full rounded-full py-1">Szűrés</button>
                        </div>
                    </div> : ''
                    }
                <HiX onClick={() => {localStorage.removeItem(props.position);sessionStorage.removeItem(props.position);props.setStateChange(props.stateChange+1)}} className='cursor-pointer text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-600 text-lg'/>
                </div>
            </div>
            <div className="h-full w-full flex items-center justify-center px-4 py-10">
                <div className="absolute bottom-2 flex items-center justify-center">
                    <RiArrowLeftSFill className='text-2xl text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-600' />
                    <p className="text-sm text-slate-500 dark:text-slate-500">{currentPage}</p>
                    <RiArrowRightSFill className='text-2xl text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-600' />
                </div>
                {view === 'list' ?
                    <div className="w-full grid lg:grid-cols-2 gap-2">
                        {itemList.map(item => (
                            <div key={uuidv4()} className="px-2 rounded-lg grid grid-rows-2 grid-cols-3 gap-1 py-1.5 hover:bg-slate-300 dark:hover:bg-gray-600">
                                <p className={`row-start-1 col-start-1 self-center font-semibold text-center text-xs text-slate-200 dark:text-slate-300 py-0.5 px-2 rounded-full max-w-max ${item.status === 'open' ? 'bg-emerald-500' : 'bg-pink-500'}`}>{item.status.toUpperCase()}</p>
                                <p className={`row-start-2 col-start-1 self-center font-semibold text-center text-xs text-slate-200 dark:text-slate-300 py-0.5 px-2 rounded-full max-w-max ${item.priority === 'low' ? 'bg-emerald-500' : (item.priority === 'medium' ? 'bg-blue-500' : 'bg-pink-500')}`}>{item.priority.toUpperCase()}</p>
                                <p className="row-start-1 col-start-2 self-center text-slate-500 dark:text-slate-400 font-bold">{item.plate}</p>
                                <p className="row-start-2 col-start-2 self-center text-slate-500 dark:text-slate-400 text-xs">{getFormattedNumber(item.price + item.fee) + ' Ft'}</p>
                                <p className="row-start-1 col-start-3 row-span-2 self-center text-slate-500 dark:text-slate-400 text-xs">{item.timestamp}</p>
                            </div>
                        ))}
                    </div> : 
                    <div className="w-full flex flex-col items-center justify-center">
                    </div>
                }
            </div>
        </div>
    )
}

export default UserDatabase
