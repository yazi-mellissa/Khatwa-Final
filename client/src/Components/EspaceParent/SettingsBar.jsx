import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from './../../Redux/Slices/sideBarSlice';
import { SidebarSettingsContent } from '../../Constants';
import Expand from '../../Assets/Parent Space/Expand_left.png'

import MyNavLink from '../MyNavLink'



const SettingsBar = () => {

    const isOpen2=true;
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const dispatch = useDispatch()
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
        <div>
            <div className='hidden mt-10 lg:visible font-body fixed lg:flex flex-col  pl-[2rem] items-start duration-300 space-y-20 ' style={{ width: !isOpen ? '6rem' : '12rem', height: '100vh',marginLeft: !isOpen ? '6rem' : '12rem'}}>
                <div className='flex flex-row space-x-4'>
                    <div className=" font-bold text-xl lg:text-2xl ">Parametres</div>
                </div>
                <div className='flex flex-col space-y-4 '>
                    {

                        SidebarSettingsContent.map((e) => (
                            <MyNavLink to={e.id} className={`flex  hover:bg-gradient-to-l hover:from-white rounded-xl items-center overflow-hidden p-1 duration-300 ease-out`}>
                                {({ isActive }) => (
                                    <>
                                        <div className='rounded-full w-8 aspect-square flex justify-center items-center'><img src={e.icon} className={`${!isActive ? 'p-1' : 'p-[2px]'} duration-300`} style={{ filter: isActive ? 'invert(43%) sepia(40%) saturate(1651%) hue-rotate(335deg) brightness(93%) contrast(91%)' : '' }} alt="" /></div>

                                        <div className='duration-300 transition-all overflow-ellipsis' style={{ width: !isOpen2 ? '0rem' : '6rem', marginLeft: !isOpen ? '0rem' : '8px', color: isActive ? '#E35936' : '' }}><p className={'overflow-clip whitespace-nowrap opacity-70 capitalize'}>{e.title}</p></div>
                                    </>)}
                            </MyNavLink>
                        ))
                    }

                </div>
            </div>

            <div className={`lg:hidden visible opacity-50 w-screen fixed ${isOpen ? 'z-30' : '-z-30'} h-full ${isOpen ? 'bg-black delay-300' : 'bg-none'} duration-300`} onClick={() => isOpen && dispatch(toggleSidebar())}></div>

            
        </div>
    )
}


export default SettingsBar