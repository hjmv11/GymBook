import {Link} from 'react-router-dom'

const Public = () => {

    const content = (
        <>
            <header>
                <h1> Welcome to your GymBook</h1>
                <p>All-in-one fitness journal</p>
            </header>
            <div className='public-container'>
                <Link className='login-button' to="/login">Login</Link>
            </div>   
            <footer>                
            </footer>
        </>
    )

    return content
}

export default Public