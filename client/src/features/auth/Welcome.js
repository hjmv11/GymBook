import React from 'react'
//link to different components 
import { Link } from 'react-router-dom'

const Welcome = () => {
    const date = new Date()
    const today = new Intl.DateTimeFormat("en-US", {dateStyle: 'full', timeStyle: 'long'}).format(date)

    const content = (
        <section  className='welcome'>
            <p>{today}</p>
            <h1>Welcome To Your GymBook</h1>
            <p><Link className='dash-link' to='/log'>Log</Link></p>
            <p><Link className='dash-link' to='/log/today'>Today</Link></p>
            <p><Link className='dash-link' to="/dash/users">User Settings</Link></p>
        </section>
    )

    return content
}

export default Welcome