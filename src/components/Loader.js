import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Loader = () => {
    return (
        <div className="h-full w-full flex items-center justify-center bg-inherit">
            <AiOutlineLoading3Quarters className='animate-spin text-6xl text-slate-500'/>
        </div>
    )
}

export default Loader
