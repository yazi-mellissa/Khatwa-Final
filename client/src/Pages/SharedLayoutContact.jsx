import React from 'react'
import Navbar from '../Components/Navbar'

import { Outlet } from 'react-router-dom'

const SharedLayoutContact = () => {
  return (
    <>
        <Navbar></Navbar>
        <Outlet/>
       
    </>
  )
}

export default SharedLayoutContact