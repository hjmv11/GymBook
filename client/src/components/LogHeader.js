import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const LogHeader = () => {
    const navigate = useNavigate()
    const {pathname} = useLocation()

    const onHomeClick  = () => navigate('/dash')
    const onSignOutClick = () => navigate('/')
    const onBackClick = () => navigate(-1)

    let goHomeButton = null
    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                className="log-header_button icon-button"
                title="Home"
                onClick={onHomeClick}
            >
                <FontAwesomeIcon icon={faHouse}   />
            </button>
        )
    }

    let h1
    if (pathname == '/log/today') {
         h1 = 'Today'
    } else h1 = 'Log'

    let signOutButton = (
        <button
            className='log-header_button icon-button'
            title='Sign Out'
            onClick={onSignOutClick}
        >
            <FontAwesomeIcon icon={faRightFromBracket}/>
        </button>
    )

    let backButton = (
        <button
            className='log-header_button icon-button'
            title='Back'
            onClick={onBackClick}
        >
            <FontAwesomeIcon icon={faChevronLeft}/>
        </button>
    )

    const content = (
        <header className="log-header">
            <div className="log-header_container">
                <div className='log-back'>
                    {backButton}
                </div>
                <Link to="/log">
                    <h1 className='log-header_title'>{h1}</h1>
                </Link>
                <div className='log-nav'>
                    {goHomeButton}
                    {signOutButton}   
                </div>                
            </div>
            
        </header>
    )

    return content
}

export default LogHeader