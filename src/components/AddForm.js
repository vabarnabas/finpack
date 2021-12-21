import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { HiX } from 'react-icons/hi'
import plates from '../json/plates.json'

const AddForm = (props) => {

    const [userId, setUserId] = useState('')
    const [price, setPrice] = useState('')
    const [fee, setFee] = useState('')
    const [tripId, setTripId] = useState('')
    const [plate, setPlate] = useState('')
    const [comment, setComment] = useState('')
    const [check, setCheck] = useState(false)

    const [plateList, setPlateList] = useState([])
    const [selfSearch, setSelfSearch] = useState(false);

    console.log('selfSearch: ' + selfSearch + ' plate: ' + plate)

    const filterItems = (array, query) => {
        return array.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) !== -1)
    }

    const searchPlate = (arg1) => {
        setPlate(arg1)
        setPlateList(filterItems(plates, arg1));
        setSelfSearch(true);
    }

    const searchClick = (arg1) => {
        setPlate(arg1);
        setSelfSearch(false);
    }

    return (
        <div onClick={() => setSelfSearch(false)} className='dashboard-card group'>
            <HiX onClick={() => {localStorage.removeItem(props.position);props.setStateChange(props.stateChange+1)}} className='absolute top-3 right-3 text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-600 text-lg block lg:hidden md:group-hover:block'/>
            <form className="flex flex-col items-center justify-center px-6">
                <p className="text-slate-600 dark:text-slate-400 mb-3">Részletfizető Hozzáadása</p>
                <div className="grid grid-cols-1 md:grid-cols-2 place-content-center gap-4">
                    <input value={userId} onChange={(e) => setUserId(e.target.value)} required placeholder='User ID*' type="text" className={`input-box`} />
                    <div className="relative flex items-center justify-center">
                        <p className="absolute right-3 text-slate-500 dark:text-slate-400">Ft</p>
                        <input value={price} onChange={(e) => {setPrice(e.target.value)}} required placeholder='Összeg*' type="number" className={`input-box pr-8`} />
                    </div>
                    <div className="relative flex items-center justify-center">
                        <p className="absolute right-3 text-slate-500 dark:text-slate-400">Ft</p>
                        <input value={fee} onChange={(e) => setFee(e.target.value)} required placeholder='Eljárási díj*' type="number" className={`input-box pr-8`} />
                    </div>
                    <input value={tripId} onChange={(e) => setTripId(e.target.value)} placeholder='Trip ID' type="text" className={`input-box`} />
                    <div onClick={(e) => e.stopPropagation()}  className="relative flex items-center justify-center">
                        <input onFocus={() => setSelfSearch(true)} value={plate} onChange={(e) => searchPlate(e.target.value.trim().replace('-','').toUpperCase().substring(0,6))} placeholder='Rendszám' type="text" className={`input-box`} />
                        {(plate !== '' && selfSearch) ? 
                        <div className="w-full absolute top-[105%] rounded-lg max-h-24 bg-slate-200 dark:bg-gray-700 shadow shadow-slate-300 dark:shadow-gray-800 overflow-y-scroll scrollbar-hide">
                            {plateList.map((plate) => (
                                <div onClick={() => searchClick(plate)} key={uuidv4()} className="px-1 flex items-center hover:bg-slate-300 dark:hover:bg-gray-600 text-slate-600 dark:text-slate-400">
                                    <p className="py-2 px-3 text-left text-xs">{plate}</p>
                                </div>
                            ))}
                        </div> : ''}
                    </div>
                    <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Komment' type="text" className={`input-box`} />
                </div>
                <div className="flex items-center justify-center mt-4">
                <input checked={check} onChange={() => setCheck(!check)} required type="checkbox" name="" id="check1" className="bg-gray-600 accent-blue-500" />
                <label htmlFor='check1'className='ml-2 text-xs text-slate-600 dark:text-slate-400'>Elfogadom, hogy helyesen adtam meg minden adatot.</label>
                </div>
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white dark:text-slate-300 w-full rounded-full py-1">Leadás</button>
            </form>
        </div>
    )
}

export default AddForm
