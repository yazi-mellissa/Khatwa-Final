import React from 'react'
import SideBar from '../Components/SideBar'
import { Outlet } from 'react-router-dom'

const SharedLayoutSpaces = () => {
  return (
    <>
        <SideBar></SideBar>
        <Outlet/>
    </>
  )
}

export default SharedLayoutSpaces