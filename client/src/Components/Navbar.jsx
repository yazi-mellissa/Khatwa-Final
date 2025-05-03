import React from 'react'
import { useState, useEffect } from 'react';
import { navLinks } from '../Constants'
import logo from '../Assets/Home/logo png.png'
import menu from '../Assets/Home/menu.png'
import { useLocation } from 'react-router-dom'
import MyNavLink from './MyNavLink';
import MyLink from "./MyLink";



const Navbar = () => {
  const normalClass='cursor-pointer hover:text-blue-primary hover:text-opacity-60'
  const activeClass='cursor-pointer text-orange-1 hover:text-opacity-70'
  const normalClass2='cursor-pointer hover:text-blue-primary hover:text-opacity-60'
  const activeClass2='cursor-pointer text-blue-primary hover:text-opacity-70'
  const [open,setOpen]=useState(false)
  const location=useLocation()

  const handleOpen=()=>{
    setOpen(prev=>!prev)
  }

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
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
 
  return (
    <nav id='nav' className={`font-body navbar flex flex-row justify-between items-center ${location.pathname==='/'?'bg-white':'bg-light-orange-4'} fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out ${showNavbar ? 'translate-y-0' : '-translate-y-full'} ${open ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className='fixed w-full h-full bg-white -z-10 md:hidden'></div>
        <MyNavLink to='/'>
          <img src={logo} alt="" className='logo mt-1 mx-10 w-14 md:w-20 lg:mt-4 lg:mx-24 cursor-pointer flex flex-shrink-0'/>
        </MyNavLink>
        <img className='absolute right-2 md:hidden w-14 mx-10 cursor-pointer' src={menu} onClick={handleOpen} alt="" />
        <ul className={`md:hidden fixed bg-white flex flex-col items-center pt-8 space-y-4 -z-50 w-full h-screen duration-1000`} style={{top:open?'100%':'-100vh'}}>
          {navLinks.map((item)=>
              <li key={item.id} className=''>
                <MyNavLink to={item.id} className={` bg-blue-secondary rounded-xl flex items-center w-80 px-8 font-semibold h-12 ${({isActive})=>isActive?activeClass2:normalClass2}`} activeClassName='text-orange-1' onClick={()=>(setOpen(false))}>{item.title}</MyNavLink>
              </li>
              )}
              <div className='mr-6 ml-8 lg:ml-28 lg:mr-20 space-x-6 flex justify-between'>
                <MyLink to='signup' >
                  <button className=' text-gray-1 font-bold w-32 h-10 rounded-2xl bg-white outline outline-[1.5px] outline-orange-1 hover:bg-blue-primary hover:bg-opacity-40 hover:outline-blue-primary hover:text-white active:bg-blue-primary duration-[125ms]'>S'inscrire</button>
                </MyLink> 
                <MyLink to="signin">
                  <button className=' bg-light-orange-1 bg-opacity-30 text-orange-1 font-bold w-32 h-10 rounded-2xl hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]'>Se connecter</button>
                </MyLink>
              </div>
        </ul>
        <div className='text-gray-1 hidden md:flex'>
            <ul className='flex font-bold text-xs lg:text-base md:space-x-4 lg:space-x-8'> 
            {navLinks.map((item)=>
            <li key={item.id}>
              <MyNavLink to={item.id} className={({isActive})=>isActive?activeClass:normalClass} activeClassName='text-orange-1'>{item.title}</MyNavLink>
            </li>
            )}
            </ul>
        </div>
        <div className='mr-6 ml-8 lg:ml-28 lg:mr-20 space-x-6 flex justify-between'>
          <MyLink to='signup' >
            <button className='hidden md:block text-gray-1 font-bold w-32 h-10 rounded-2xl bg-white outline outline-[1.5px] outline-orange-1 hover:bg-blue-primary hover:bg-opacity-40 hover:outline-blue-primary hover:text-white active:bg-blue-primary duration-[125ms]'>S'inscrire</button>
          </MyLink> 
          <MyLink to='signin'>
           <button className='hidden md:block bg-light-orange-1 bg-opacity-30 text-orange-1 font-bold w-32 h-10 rounded-2xl hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]'>Se connecter</button>
          </MyLink>
        </div>
      </nav>
  )
}

export default Navbar