import React from 'react'
import { useState } from 'react'
import { HiX } from 'react-icons/hi'
import { AiOutlinePercentage } from 'react-icons/ai'

const AddForm = (props) => {

    const [userId, setUserId] = useState('')
    const [price, setPrice] = useState('')
    const [fee, setFee] = useState('')
    const [tripId, setTripId] = useState('')
    const [plate, setPlate] = useState('')
    const [comment, setComment] = useState('')
    const [check, setCheck] = useState(false)

    return (
        <div className='group relative w-full h-full flex items-center justify-center bg-slate-200 rounded-lg '>
            <HiX onClick={() => {localStorage.setItem(props.position,'');props.setStateChange(props.stateChange+1)}} className='absolute top-3 right-3 text-slate-500 hover:text-slate-600 text-lg hidden group-hover:block'/>
            <form className="flex flex-col items-center justify-center px-6">
                <p className="text-slate-600 mb-3">Részletfizető Hozzáadása</p>
                <div className="grid grid-cols-2 grid-rows-3 place-content-center gap-4">
                    <input required placeholder='User ID*' type="text" className={`bg-stone-100 rounded-full px-4 py-1 focus:outline-none`} />
                    <input required placeholder='Összeg*' type="text" className={`bg-stone-100 rounded-full px-4 py-1 focus:outline-none`} />
                    <div className="relative flex items-center justify-center">
                        <input required placeholder='Eljárási díj*' type="text" className={`bg-stone-100 rounded-full pl-4 pr-8 py-1 focus:outline-none`} />
                        <AiOutlinePercentage className='absolute right-3 text-slate-500 hover:text-slate-600 cursor-pointer'/>
                    </div>
                    <input placeholder='Trip ID' type="text" className={`bg-stone-100 rounded-full px-4 py-1 focus:outline-none`} />
                    <input placeholder='Rendszám' type="text" className={`bg-stone-100 rounded-full px-4 py-1 focus:outline-none`} />
                    <input placeholder='Komment' type="text" className={`bg-stone-100 rounded-full px-4 py-1 focus:outline-none`} />
                </div>
                <div className="flex items-center justify-center mt-4">
                <input checked={check} onChange={() => setCheck(!check)} required type="checkbox" name="" id="check1" className="accent-blue-500" />
                <label htmlFor='check1'className='ml-2 text-xs text-slate-600'>Elfogadom, hogy helyesen adtam meg minden adatot.</label>
                </div>
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white w-full rounded-full py-1">Leadás</button>
            </form>
        </div>
    )
}

export default AddForm
