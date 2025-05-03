import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Outlet } from 'react-router-dom'

const SharedLayout = () => {
  return (
    <>
        <Navbar></Navbar>
        <Outlet/>
        <Footer></Footer>
    </>
  )
}

export default SharedLayout