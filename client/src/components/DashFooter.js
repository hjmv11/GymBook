import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const DashFooter = () => {
    const navigate = useNavigate()
    const {pathname} = useLocation()

    const onHomeClick  = () => navigate('/dash')
    const onSignOutClick = () => navigate('/')

    let goHomeButton = null
    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                className="dash-footer_button icon-button"
                title="Home"
                onClick={onHomeClick}
            >
                <FontAwesomeIcon icon={faHouse}   />
            </button>
        )
    }

    let signOutButton = (
        <button
            className='dash-footer_button icon-button'
            title='Sign Out'
            onClick={onSignOutClick}
        >
            <FontAwesomeIcon icon={faRightFromBracket}/>
        </button>
    )

    const content = (
        <footer className='dash-footer'>
            <p>Current User: </p>
            {goHomeButton}
            {signOutButton}
        </footer>
    )

    return content
}

export default DashFooter