import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const onHeaderClick = () => navigate('/dash')

  const content = (
    <>
      <h1>Login Page</h1>
      <div className='signin-container'>
        <p>Test</p>
        <button className='signin-button' onClick={onHeaderClick}>Sign In</button>
      </div>
    </>
    
  )

  return content
}

export default Login