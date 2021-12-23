import { HiServer, HiUserAdd } from 'react-icons/hi'
import { MdLocalGasStation } from 'react-icons/md'

export const menuItems = [
    {
        text: 'User Adatbázis',
        icon: <HiServer className='text-2xl'/>,
        state: 'database',
        placeable: true,
        show: true,
    },
    {
        text: 'Hozzáadás',
        icon: <HiUserAdd className='text-2xl'/>,
        state: 'user-add',
        placeable: true,
        show: true,
    },
    {
        text: 'Töltés, Tankolás',
        icon: <MdLocalGasStation className='text-2xl'/>,
        state: 'charge',
        placeable: true,
        show: true,
    },
    {
        text: 'Profilom',
        icon: null,
        state: 'profile',
        placeable: false,
        show: false,
    },
]