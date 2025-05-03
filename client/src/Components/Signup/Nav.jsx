import React, { useState } from 'react'
import { navLinks2 } from '../../Constants'
import logo from '../../Assets/Home/logo png.png'
import MyNavLink from '../MyNavLink'


const Nav = () => {
  
  return (
    <nav className={`w-full font-body navbar flex flex-row justify-between items-center bg-light-orange-4 duration-[250ms] `}>
        <MyNavLink to='/'>
          <img src={logo} alt="" className='logo mt-1 mx-10 w-14 md:w-20 lg:mt-4 lg:mx-24 cursor-pointer flex flex-shrink-0'/>
        </MyNavLink>       
        <div className='text-gray-1 flex x-6 lg:mr-24 md:mr-10 mr-6 '>
            <ul className='flex font-bold text-[10px] lg:text-base space-x-4 lg:space-x-8'> 
            {navLinks2.map((item)=>
            <li key={item.id}>
              <MyNavLink to={`../${item.id}`} className='cursor-pointer flex space-x-1 md:space-x-2 items-center hover:text-blue-primary hover:text-opacity-60' >
                <img src={item.logo} alt="" className='w-6 md:w-auto'/>
                <p>{item.title}</p>
              </MyNavLink>
            </li>
            )}
            </ul>
        </div>
      </nav>
  )
}

export default Nav