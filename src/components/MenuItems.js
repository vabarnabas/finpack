import { HiServer, HiUserAdd } from 'react-icons/hi'

export const menuItems = [
    {
        text: 'Adatbázis',
        icon: <HiServer className='text-2xl'/>,
        state: 'database',
    },
    {
        text: 'Hozzáadás',
        icon: <HiUserAdd className='text-2xl'/>,
        state: 'user-add',
    },
]