import React from 'react'
import { Link } from 'react-router-dom'

const ErrorScreen = () => {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className="text-center flex flex-col items-center justify-center">
                <p className="text-8xl font-semibold text-slate-600">404</p>
                <p className="text-slate-600 w-[70%] text-sm">Sajnos nem találtunk semmit ezen a címen!</p>
                <Link to="/">
                    <p className="text-slate-600 text-xs underline mt-2">Vissza a főoldalra!</p>
                </Link>
            </div>
        </div>
    )
}

export default ErrorScreen
