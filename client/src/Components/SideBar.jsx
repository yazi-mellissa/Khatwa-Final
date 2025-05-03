import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from '../Redux/Slices/sideBarSlice'; 
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { SidebarCrecheContent } from '../Constants';
import { SidebarParentContent } from '../Constants';
import { SidebarAdminContent } from '../Constants';

import expand from './../Assets/Sidebar/expand.svg'
import signout from './../Assets/Sidebar/signout.svg'
import settings from './../Assets/Sidebar/settings.svg'

import MyNavLink from './MyNavLink'
import logo from '../Assets/Home/logo png.png'
import { logout,reset } from './../Redux/Slices/authSlice'



const SideBar = () => {

  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch=useDispatch()
  const userToken=JSON.parse(localStorage.getItem('user'))
  const parent=userToken&&userToken.role==='PARENT'
  const admin= (userToken&&userToken.role==='ADMIN')||(userToken&&userToken.role==='MODERATOR')
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [sideBarData,setSideBarData]=useState([])
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setShowNavbar(isScrollingUp || currentScrollPos < 100);
    };

    window.addEventListener('scroll', handleScroll);
  
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(reset())
  }, [user,isSuccess, isError, message, dispatch])
  const handleDisconnect=(event)=>{
    event.preventDefault();
      dispatch(logout())
  }

  useEffect(()=>{
      setSideBarData(parent?SidebarParentContent:admin?SidebarAdminContent:SidebarCrecheContent)
  },[parent])
  return (
    <div>
      <ToastContainer></ToastContainer>
      <div className='hidden lg:visible font-body fixed lg:flex flex-col space-y-4 pl-[2rem] items-start bg-light-orange-4 duration-300' style={{width:!isOpen?'6rem':'12rem',height:'100vh'}}>
          <MyNavLink to='/'>
            <img src={logo} alt="" className='logo mt-4 w-16 cursor-pointer'/>
          </MyNavLink>
          <img src="" alt="" />
          <button className='rounded-full w-8 aspect-square' onClick={()=>dispatch(toggleSidebar())}><img className='p-1 duration-300' src={expand} style={{transform:!isOpen?'':'rotate(-180deg)'}}></img></button>
          <div className='flex flex-col space-y-3'>
          {
              
            sideBarData.map((e)=>(
              <MyNavLink to={e.id} className={`flex bg-white hover:bg-gradient-to-l hover:from-white hover:bg-light-orange-4 rounded-xl items-center overflow-hidden p-1 duration-300 ease-out`}>
                  {({ isActive }) => (
                    <>
                      <div className='rounded-full w-8 aspect-square flex justify-center items-center'><img src={e.icon} className={`${!isActive?'p-1':'p-[2px]'} duration-300`} style={{filter:isActive? 'invert(43%) sepia(40%) saturate(1651%) hue-rotate(335deg) brightness(93%) contrast(91%)':''}} alt="" /></div>
                      
                      <div className='duration-300 transition-all overflow-ellipsis' style={{width:!isOpen?'0rem':'6rem',marginLeft:!isOpen?'0rem':'8px',color:isActive?'#E35936':''}}><p className={'overflow-clip whitespace-nowrap opacity-70 capitalize'}>{e.title}</p></div>
                    </>)}
              </MyNavLink>
            ))
          }
          <button onClick={handleDisconnect} className={`flex hover:bg-gradient-to-l hover:from-white hover:bg-light-orange- rounded-xl items-center overflow-hidden p-1 duration-300 ease-out`}>
                      <div className='rounded-full w-8 aspect-square flex justify-center items-center'><img src={signout} className={`p-[2px] duration-300`} alt="" /></div>
                      
                      <div className='duration-300 transition-all overflow-ellipsis' style={{width:!isOpen?'0rem':'6rem',marginLeft:!isOpen?'0rem':'8px'}}><p className={'overflow-clip whitespace-nowrap opacity-70 capitalize'}>Deconnecter</p></div>
          </button>
          <MyNavLink to='settings' className={`flex hover:bg-gradient-to-l hover:from-white hover:bg-light-orange- rounded-xl items-center overflow-hidden p-1 duration-300 ease-out`}>
          {({ isActive }) => (
                    <>
                      <div className='rounded-full w-8 aspect-square flex justify-center items-center relative'><img src={settings} className={`${!isActive?'':''} absolute duration-300 `} style={{filter:isActive? 'invert(43%) sepia(40%) saturate(1651%) hue-rotate(335deg) brightness(93%) contrast(91%)':''}} alt="" /></div>
                      
                      <div className='duration-300 transition-all overflow-ellipsis' style={{width:!isOpen?'0rem':'6rem',marginLeft:!isOpen?'0rem':'8px',color:isActive?'#E35936':''}}><p className={'overflow-clip whitespace-nowrap opacity-70 capitalize'}>Parametres</p></div>
                    </>)}
          </MyNavLink>
          </div>
      </div>
      
      <div className={`lg:hidden visible opacity-50 w-screen fixed ${isOpen?'z-30':'-z-30'} h-full ${isOpen?'bg-black delay-300':'bg-none'} duration-300`} onClick={()=>isOpen&&dispatch(toggleSidebar())}></div>
      <div className={`visible lg:hidden h-20 bg-light-orange-4 flex fixed z-50 w-full justify-center items-center ${!isOpen?showNavbar ?'translate-y-0':'-translate-y-full' : '-translate-y-0'} duration-300`}>
         <button className='rounded-full w-24 aspect-square fixed left-0 z-50' onClick={()=>dispatch(toggleSidebar())}><img className='p-1 duration-300' src={expand} style={{transform:!isOpen?'':'rotate(-180deg)'}}></img></button>
          <MyNavLink to='/'>
            <img src={logo} alt="" className='logo w-8 cursor-pointer'/>
          </MyNavLink>
          <div></div>
          
          
      </div>
      <div className={`font-body visible lg:hidden flex flex-col pt-20 px-8 space-y-4 fixed top-0 bg-light-orange-4 h-full ${isOpen?'left-0 duration-500':'-left-full delay-300 duration-1000'} ease-in-out z-40 transition-out `}>
          {
            
            SidebarCrecheContent.map((e)=>(
              <MyNavLink to={e.id} className={`flex bg-white hover:bg-gradient-to-l hover:from-white hover:bg-light-orange-4 rounded-xl items-center overflow-hidden p-1 duration-300 ease-out`}>
                  {({ isActive }) => (
                    <>
                      <div className='rounded-full w-8 aspect-square flex justify-center items-center'><img src={e.icon} className={`${!isActive?'p-1':'p-[2px]'} duration-300`} style={{filter:isActive? 'invert(43%) sepia(40%) saturate(1651%) hue-rotate(335deg) brightness(93%) contrast(91%)':''}} alt="" /></div>
                      
                      <div className='duration-300 transition-all overflow-ellipsis' style={{width:!isOpen?'0rem':'6rem',marginLeft:!isOpen?'0rem':'8px',color:isActive?'#E35936':''}}><p className={'overflow-clip whitespace-nowrap opacity-70 capitalize'}>{e.title}</p></div>
                    </>)}
              </MyNavLink>
            ))
          }
          </div>
    </div>
  )
}

export default SideBar