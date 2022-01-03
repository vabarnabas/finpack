import React from 'react'

import Switch, { Case, Default } from 'react-switch-case';

import Empty from './Empty';
import UserAdd from './UserAdd';
import Settings from './Settings';
import UserDatabase from './UserDatabase';
import Charge from './Charge';

const Switcher = ({ user, state, setState, position, dashboardArray }) => {


    return (
        <div className='w-full h-full relative flex items-center justify-center'>
            <Switch condition={state}>
                <Case value="user-add">
                    <UserAdd user={user} state={state} setState={setState} position={position} />
                </Case>
                <Case value="database">
                    <UserDatabase user={user} state={state} setState={setState} position={position} />
                </Case>
                <Case value="charge">
                     <Charge user={user} state={state} setState={setState} position={position} />
                </Case>
                <Case value="settings">
                     <Settings user={user} state={state} setState={setState} position={position} />
                </Case>
                <Default>
                    <Empty dashboardArray={dashboardArray} state={state} setState={setState} position={position} />
                </Default>
            </Switch>
        </div>
    )
}

export default Switcher
