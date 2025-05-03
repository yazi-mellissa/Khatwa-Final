import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../Components/Signup/Nav'
import Footer from '../Components/Footer'

const SharedLayoutSign = () => {
  return (
    <>
        <Nav></Nav>
        <Outlet/>
        <Footer></Footer>
    </>
  )
}

export default SharedLayoutSign