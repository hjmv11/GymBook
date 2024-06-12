import React from 'react'
import { Outlet } from 'react-router-dom'
import LogHeader from './LogHeader'

const LogLayout = () => {
  return (
    <>
    <LogHeader/>
    <div className='log-container'>
      <Outlet/>
    </div>
    </>
  )
}

export default LogLayout