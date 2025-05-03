import React from 'react'
import SettingsBar from '../Components/EspaceParent/SettingsBar'
import { Outlet } from 'react-router-dom'

const SharedLayoutSettings = () => {
  return (
    <>
        <SettingsBar></SettingsBar>
        <Outlet/>
    </>
  )
}

export default SharedLayoutSettings