import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { signOut } from "firebase/auth";

const Navbar = (props) => {

    const navigationItems = [
        {
            id: uuidv4(),
            text: 'Kijelentkezés',
            isSolid: true,
            onclick: () => {signOut(props.auth);},
            dependency: props.user,
        },
    ]

    return (
        <div className='fixed top-0 left-0 flex items-center justify-center h-14 w-screen overflow-hidden'>
            <div className="flex items-center justify-center text-white absolute right-6 space-x-4">
                {navigationItems.map((item) => (
                    <div onClick={item.onclick} key={item.id} className={`px-4 py-1 font-semibold rounded ${item.dependency ? 'block' : 'hidden'} ${item.isSolid ? 'bg-blue-500 hover:bg-blue-600' : 'text-blue-500 hover:text-blue-600'}`}>
                        <p className="">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Navbar
