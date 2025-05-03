import React, { useState } from 'react'
import { useSelector } from "react-redux";
import Toggle from '../../../Components/EspaceParent/Toggle';



const Notif = (props) => {
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const isOpen1 = true
    const [on1,setOn1]=useState(false)
    const [on2,setOn2]=useState(false)
    const [on3,setOn3]=useState(false)

    return (
        <div className={`font-body duration-300 md:pl-8 pt-8 ${isOpen ? 'md:ml-[12rem]' : 'md:ml-[6rem]'}`}>
            <div className={`font-body md:items-start items-center flex flex-col duration-300 pt-8 md:pt-2 ${isOpen1 ? 'md:ml-[12rem]' : 'md:ml-[12rem]'}`}>

                <div className='mt-20 md:mt-0 md:ml-12 col-span-1 md:col-span-3 flex flex-col items-center md:items-start mb-5'>
                    <div className=" font-bold text-xl md:text-2xl ">Notifications</div>
                    <p className='opacity-70 text-lg'>Découvrez l’activité de votre crèche sur Khatwa</p>
                    <div className=' mt-8 opacity-50 h-[1.5px] bg-black w-[90%]'></div>
                 
                        <div className='mt-10 flex flex-col'>
                            <div className='flex flex-raw'>
                                <div className=" font-bold text-lg  text-orange-1 ">Notifications par mail</div>
                                <Toggle on={on1} setOn={setOn1} key={1} />
                            </div>
                            <div className='tetx-sm opacity-60 '>
                                Recevez des mails pour ne rien rater lorsque vous etes hors ligne. Vous pouvez desactiver cette option.
                            </div>
                        </div>


                   
                    <div className=' mb-10 mt-8 opacity-50 h-[1.5px] bg-black w-[90%]'></div>
                  
                        <div className='flex flex-col'>
                            <div className='flex flex-raw'>
                                <div className=" font-bold text-lg  text-orange-1 ">Notifications push</div>
                                <Toggle on={on2} setOn={setOn2} key={2} />
                            </div>
                            <div className='tetx-sm opacity-60 '>
                                Recevez des notifications push pour ne rien rater lorsque vous etes en ligne. Vous pouvez desactiver cette option.
                            </div>
                        </div>


                    
                    <div className=' mb-10 mt-8 opacity-50 h-[1.5px] bg-black w-[90%]'></div>
                   
                        <div className='flex flex-col'>
                            <div className='flex flex-raw'>
                                <div className=" font-bold text-lg  text-orange-1 ">Notifications par SMS</div>
                                <Toggle on={on3} setOn={setOn3} key={3} />
                            </div>
                            <div className='tetx-sm opacity-60 '>
                                Recevez des notifications par SMS sur votre téléphone pour ne rien rater lorsque vous etes hors ligne. Vous pouvez desactiver cette option.
                            </div>
                        </div>


               

                </div>

            </div>
        </div>
     

   )
}
export default Notif