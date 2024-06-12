import React from 'react'
import { Routes, Route } from "react-router-dom"
import Layout from './components/Layout.js'
import Public from './components/Public.js'
import Login from './features/auth/Login.js'
import DashLayout from './components/DashLayout.js'
import Welcome from './features/auth/Welcome.js'
import UsersList from './features/users/UsersList.js'
import Log from './features/log/Log.js'
import LogLayout from './components/LogLayout.js'
import Today from './features/day/Today.js'
import EditUser from './features/users/EditUser.js'
import NewUserForm from './features/users/NewUserForm.js'
import EditWorkout from './features/workout/EditWorkout.js'
import NewWorkout from './features/workout/NewWorkout.js'

const App = ()  => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Public/>} />
                <Route path="login" element={<Login/>}/>

                <Route path="dash" element={<DashLayout/>}>

                    <Route index element={<Welcome/>}/>

                    <Route path='users'>
                        <Route index element={<UsersList/>}/>
                        <Route path=':id' element={<EditUser/>}/>
                        <Route path='new' element={<NewUserForm/>}/>
                    </Route>

                </Route> {/*End Dash*/}

                <Route path='log' element={<LogLayout/>}>

                    <Route index element={<Log/>}/>

                    <Route path='today'>
                        <Route index element={<Today/>}/>

                        <Route path='new_workout'>
                            <Route index element={<EditWorkout/>}/>
                            <Route index element={<NewWorkout/>}/>
                        </Route>
                    </Route>

                </Route> {/*End Log*/}
            </Route> {/*End Layout*/}
        </Routes>        
  )
}

export default App
