import React, { useState, useEffect }  from 'react'
import { v4 as uuidv4 } from 'uuid';
import { onSearchQuery, onSearchClick, getCurrentDateTime, writeDataToDatabase } from './Utilities';
import { HiX, HiClock, HiFolder, HiLightningBolt } from 'react-icons/hi'
import { MdLocalGasStation } from 'react-icons/md'

import MOLRefuel from '../json/refuel.json'
import MOLPlugee from '../json/charge.json'

import Loader from './Loader';

const Charge = (props) => {

    const { firestore, user } = props;

    const [view, setView] = useState('list');

    const [stateChange, setStateChange] = useState(0);
    const [tripId, setTripId] = useState('');
    const [price, setPrice] = useState('');
    const [chargeStart, setChargeStart] = useState('');
    const [chargeEnd, setChargeEnd] = useState('');
    const [place, setPlace] = useState('');
    const [autonomyStart, setAutonomyStart] = useState('');
    const [autonomyEnd, setAutonomyEnd] = useState('');

    const [isPlugee, setIsPlugee] = useState(true);
    const typeText = (isPlugee ? <p className='flex items-center justify-center'><HiLightningBolt className='mr-1'/>Plugee</p> : <p className='flex items-center justify-center'><MdLocalGasStation className='mr-1'/>Kút</p>)

    const [placeList, setPlaceList] = useState([])
    const [selfSearch, setSelfSearch] = useState(false);

    const places = (isPlugee ? MOLPlugee : MOLRefuel)

    useEffect(() => {
        setTripId('');
        setPrice('');
        setChargeStart('');
        setChargeEnd('');
        setPlace('');
        setAutonomyStart('');
        setAutonomyEnd('');
    },[stateChange])

    const onFormSubmit = (e) => {
        e.preventDefault();
        writeDataToDatabase(firestore, 'charges', {
            tripId: tripId,
            price: parseInt(price),
            chargeStart: chargeStart,
            chargeEnd: chargeEnd,
            place: place,
            autonomyStart: autonomyStart,
            autonomyEnd: autonomyEnd,
            staff: user.email,
            status: 'open',
            statusMessage: (isPlugee ? 'Töltés' : 'Tankolás') + ' létehozva ' + getCurrentDateTime() + ' dátummal.',
            timestamp: getCurrentDateTime(),
        }, stateChange, (stateChange) => setStateChange(stateChange))
    }

    return (
        <div className='dashboard-card'>
            <div className="absolute w-full top-3 px-3 flex items-center justify-center">
                <p className="text-xs font-semibold mr-auto text-slate-500 pl-2">TÖLTÉS, TANKOLÁS</p>
                <div className="relative ml-auto flex justify-center items-center space-x-2">
                <HiFolder className='cursor-pointer text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-600'/>
                <HiX onClick={() => {localStorage.removeItem(props.position);sessionStorage.removeItem(props.position);props.setStateChange(props.stateChange+1)}} className='cursor-pointer ml-auto text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-600 text-lg'/>
                </div>
            </div>
            <form onSubmit={onFormSubmit} className="py-10 px-4 h-full w-full flex flex-col items-center justify-center">
                <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-2 place-content-center gap-x-4 gap-y-3 xl:gap-y-4">
                    <input value={tripId} onChange={(e) => setTripId(e.target.value)} required placeholder='Trip ID*' type="text" className={`input-box`} />
                    <div className="relative flex items-center justify-center">
                        <p className="absolute right-3 text-slate-500 dark:text-slate-400 text-sm">Ft</p>
                        <input value={price} onChange={(e) => setPrice(e.target.value)} required placeholder='Összeg*' type="number" className={`input-box pr-8`} />
                    </div>
                    <div className="relative flex items-center justify-center">
                        <HiClock onClick={() => setChargeStart(getCurrentDateTime())} className="absolute cursor-pointer right-3 text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-500 text-sm" />
                        <input value={chargeStart} onChange={(e) => setChargeStart(e.target.value)} required placeholder='Töltés kezdete*' type="text" className={`input-box pr-8`} />
                    </div>
                    <div className="relative flex items-center justify-center">
                        <HiClock onClick={() => setChargeEnd(getCurrentDateTime(Date.now() + 600000))} className="absolute cursor-pointer right-3 text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-500 text-sm" />
                        <input value={chargeEnd} onChange={(e) => setChargeEnd(e.target.value)} required placeholder='Töltés vége*' type="text" className={`input-box pr-8`} />
                    </div>
                    <button onClick={(e) => {e.preventDefault();setIsPlugee(!isPlugee)}} className="w-full bg-blue-500 hover:bg-blue-600 text-sm text-white dark:text-slate-300 rounded-full py-1">{typeText}</button>
                    <div onClick={(e) => e.stopPropagation()}  className="relative flex items-center justify-center">
                        <input onFocus={() => setSelfSearch(true)} value={place} onChange={(e) => onSearchQuery(e.target.value, (place) => setPlace(place), places, (placeList) => setPlaceList(placeList), (selfSearch) => setSelfSearch(selfSearch))} placeholder='Helyszín' type="text" className={`input-box`} />
                        {(place !== '' && selfSearch) ? 
                        <div className="z-20 w-full absolute top-[105%] rounded-lg max-h-24 bg-slate-200 dark:bg-gray-700 shadow shadow-slate-300 dark:shadow-gray-800 overflow-y-scroll scrollbar-hide">
                            {placeList.map((place) => (
                                <div onClick={() => onSearchClick(place, (place) => setPlace(place), (selfSearch) => setSelfSearch(selfSearch))} key={uuidv4()} className="px-1 flex items-center hover:bg-slate-300 dark:hover:bg-gray-600 text-slate-600 dark:text-slate-400">
                                    <p className="py-2 px-3 text-left text-xs">{place}</p>
                                </div>
                            ))}
                        </div> : ''}
                    </div>
                    <div className="relative flex items-center justify-center">
                        <p className="absolute right-3 text-slate-500 dark:text-slate-400 text-sm">Km</p>
                        <input value={autonomyStart} onChange={(e) => setAutonomyStart(e.target.value)} required placeholder='Kezdeti hatótáv*' type="number" className={`input-box pr-8`} />
                    </div>
                    <div className="relative flex items-center justify-center">
                        <p className="absolute right-3 text-slate-500 dark:text-slate-400 text-sm">Km</p>
                        <input value={autonomyEnd} onChange={(e) => setAutonomyEnd(e.target.value)} required placeholder='Vég hatótáv*' type="number" className={`input-box pr-8`} />
                    </div>
                    <div className="md:col-span-3 lg:col-span-2 xl:col-span-2">
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-sm text-white dark:text-slate-300 rounded-full py-1">Leadás</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Charge
