import React from 'react'
import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

const dashLayout = () => {
  return (
    <>
    <DashHeader/>
    <div className='dash-container'>
      <Outlet/>
    </div>
    <DashFooter/>
    
    </>
  )
}

export default dashLayout