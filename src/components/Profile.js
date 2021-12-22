import React from 'react'
import { HiX } from 'react-icons/hi'

const Profile = (props) => {
    return (
        <div className='dashboard-card group'>
            <HiX onClick={() => {localStorage.removeItem(props.position);sessionStorage.removeItem(props.position);props.setStateChange(props.stateChange+1)}} className='absolute top-3 right-3 text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-600 text-lg'/>
        </div>
    )
}

export default Profile
