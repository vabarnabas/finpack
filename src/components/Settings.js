import React from 'react'
import { HiX, HiFolder } from 'react-icons/hi'

const Settings = (props) => {
    return (
        <div className='dashboard-card group'>
            <div className="absolute w-full top-3 px-3 flex items-center justify-center">
                <p className="text-xs font-semibold mr-auto text-slate-500 pl-2">BEÁLLÍTÁSOK</p>
                <div className="relative ml-auto flex justify-center items-center space-x-2">
                <HiFolder className='text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-600'/>
                <HiX onClick={() => {localStorage.removeItem(props.position);sessionStorage.removeItem(props.position);(props.position === 'middle' ? props.setState(sessionStorage.getItem(props.position)) : props.setState(localStorage.getItem(props.position)))}} className='ml-auto text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-600 text-lg'/>
                </div>
            </div>
        </div>
    )
}

export default Settings
