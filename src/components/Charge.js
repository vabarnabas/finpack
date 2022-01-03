import React, { useState, useEffect }  from 'react'
import { onSearchQuery, onSearchClick, getCurrentDateTime, getIfJSON, writeDataToDatabase, getPagedDataFromDatabase } from './Utilities';
import { HiX, HiClock, HiLightningBolt, HiCode, HiClipboardList, HiCollection } from 'react-icons/hi'
import { MdLocalGasStation } from 'react-icons/md'
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri'

import MOLRefuel from '../json/refuel.json'
import MOLPlugee from '../json/charge.json'

const Charge = ({ user, setState, position }) => {

    const [view, setView] = useState('main');
    const [code, setCode] = useState('');
    const [showCode, setShowCode] = useState(false);

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

    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(4);
    const [responseData, setResponseData] = useState([]);

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
        writeDataToDatabase('charges', {
            tripId: tripId,
            price: parseInt(price),
            chargeStart: chargeStart,
            chargeEnd: chargeEnd,
            type: (isPlugee ? 'Töltés' : 'Tankolás'),
            place: place,
            autonomyStart: parseInt(autonomyStart),
            autonomyEnd: parseInt(autonomyEnd),
            staff: user.email,
            status: 'open',
            statusMessage: (isPlugee ? 'Töltés' : 'Tankolás') + ' létehozva ' + getCurrentDateTime() + ' dátummal.',
            timestamp: getCurrentDateTime(),
        }, stateChange, (stateChange) => setStateChange(stateChange))
    }

    const onJSONLoad = (e) => {
        e.preventDefault();
        const object = getIfJSON(code) && JSON.parse(code);
        if (object?.version === 'legacy') {
            setTripId(object?.tripId);
            setPrice(parseInt(object?.price));
            setChargeStart(object?.chargeStart);
            setChargeEnd(object?.chargeEnd);
            setIsPlugee(object?.type === 'Kút' ? false : true);
            setPlace(object?.place);
            setAutonomyStart(parseInt(object?.autonomyStart));
            setAutonomyEnd(parseInt(object?.autonomyEnd));
        }
        setCode('');
        setShowCode(false);
    }

    useEffect(() => {
        // getPagedDataFromDatabase('charges', currentPage, pageSize).then(data => setResponseData(data));
    },[currentPage, pageSize])

    return (
        <div onClick={() => {setSelfSearch(false);setShowCode(false)}} className='dashboard-card'>
            <div className="absolute w-full top-3 px-3 flex items-center justify-center">
                <p className="text-xs font-semibold mr-auto text-slate-500 pl-2">TÖLTÉS, TANKOLÁS</p>
                <div className="relative ml-auto flex justify-center items-center space-x-2">
                    {view === 'main' ?
                        <HiCollection onClick={() => setView('list')} className='cursor-pointer text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-600'/> :
                        <HiClipboardList onClick={() => setView('main')} className='cursor-pointer text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-600'/>
                    }
                    <HiCode onClick={(e) => {e.stopPropagation();setSelfSearch(false);setShowCode(!showCode)}} className='text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-600'/>
                    {showCode ?
                        <div onClick={(e) => {e.stopPropagation();setSelfSearch(false)}} className="z-10 absolute w-max top-[110%] right-0 py-2 rounded-lg bg-slate-200 dark:bg-gray-700 shadow shadow-slate-300 dark:shadow-gray-800 overflow-y-scroll scrollbar-hide">
                            <form onSubmit={onJSONLoad} className="relative grid gap-y-3 place-items-center px-4 py-2">
                                <div className="grid grid-cols-2 text-slate-600 dark:text-slate-400">
                                    <input value={code} onChange={(e) => setCode(e.target.value)} type="text" placeholder="Kód" className="input-box text-xs col-span-2" />
                                </div>
                                <button className="text-xs bg-blue-500 hover:bg-blue-600 text-white dark:text-slate-300 w-full rounded-full py-1">Betöltés</button>
                            </form>
                        </div> : ''
                    }
                    <HiX onClick={() => {localStorage.removeItem(position);sessionStorage.removeItem(position);(position === 'middle' ? setState(sessionStorage.getItem(position)) : setState(localStorage.getItem(position)))}} className='cursor-pointer ml-auto text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-600 text-lg'/>
                </div>
            </div>
            {view === 'main' ?
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
                                <div onClick={() => onSearchClick(place, (place) => setPlace(place), (selfSearch) => setSelfSearch(selfSearch))} key={place} className="px-1 flex items-center hover:bg-slate-300 dark:hover:bg-gray-600 text-slate-600 dark:text-slate-400">
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
            </form> : ''}
            {view === 'list' ? 
            <div className="py-10 px-4 h-full w-full flex flex-col items-center justify-center">
                <div className="w-full grid lg:grid-cols-2 gap-2">
                    {responseData.map((item) => (
                        <div key={item.tripId} className="px-2 rounded-lg gap-1 py-1.5 hover:bg-slate-300 dark:hover:bg-gray-600">
                            <p className={`mb-1 self-center font-semibold text-center text-xs text-slate-200 dark:text-slate-300 py-0.5 px-2 rounded-full max-w-max ${item.status === 'ready' ? 'bg-emerald-500' : (item.status === 'standby' ? 'bg-blue-500' : 'bg-pink-500')}`}>{item.status.toUpperCase()}</p>
                            <p className="self-center text-slate-500 dark:text-slate-400 text-xs font-bold">{item.place}</p>
                            <p className="self-center text-slate-500 dark:text-slate-400 text-xs">{item.timestamp}</p>
                        </div>
                    ))}
                </div>
            </div> : ''}
            {view === 'list' ?
            <div className="absolute bottom-2 flex items-center justify-center">
                <RiArrowLeftSFill className='text-2xl text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-600' />
                <p className="text-sm text-slate-500 dark:text-slate-500">{currentPage+1}</p>
                <RiArrowRightSFill className='text-2xl text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-600' />
            </div> : ''}
        </div>
    )
}

export default Charge