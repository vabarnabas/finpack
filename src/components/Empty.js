import React from 'react'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { menuItems } from './MenuItems';

const Empty = (props) => {

    const [dashboardArray, setDashboardArray] = useState([localStorage.getItem('topLeft'), localStorage.getItem('topRight'), localStorage.getItem('bottomLeft'), localStorage.getItem('bottomRight')])

    useEffect(() => {
        setDashboardArray([localStorage.getItem('topLeft'), localStorage.getItem('topRight'), localStorage.getItem('bottomLeft'), localStorage.getItem('bottomRight')])
    },[props.stateChange])

    return (
        <div className='dashboard-card group'>
            <div className={`hidden group-hover:grid grid-flow-col ${'grid-cols-' + Math.min(4,menuItems.length)} gap-4 mx-10 bg-white dark:bg-gray-600 rounded-3xl px-6 py-3 shadow shadow-slate-400 dark:shadow-slate-700 text-slate-300 dark:text-slate-400`}>
                {menuItems.filter(item => item.show === true).filter(item => item.placeable === true).map((item) => (
                    <div onClick={() => {if(!dashboardArray.includes(item.state)){localStorage.setItem(props.position, item.state);props.setStateChange(props.stateChange+1)}}} key={uuidv4()} className={`flex items-center justify-center group ${dashboardArray.includes(item.state) ? 'text-slate-100 dark:text-slate-500' : 'cursor-pointer hover:text-blue-600'}`}>
                        {item.icon}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Empty
