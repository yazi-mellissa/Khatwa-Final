import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import Notifs from './Notifs';
import Card from "../../Components/EspaceParent/Card"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';

const Notifications = () => {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  
  const userToken=JSON.parse(localStorage.getItem('user'))
  const path=userToken.role==="PARENT"?'Parent':'kindergarten'
  const [notifData,setNotifData]=useState({
    notifications:[]
  })
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/${path}/notifications/`,  {
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${userToken.token}`
         }
       })
       .then((response) => {
         console.log(response.data); // log the response data (optional)
         setNotifData(response.data)
         
       })
       .catch((error) => {
         toast(error);
       });
},[])
const[read,setRead]=useState(true)


  return (

    <div className={` font-body lg:items-start items-center duration-300 pt-8 lg:pt-2 ${isOpen ? 'lg:ml-[12rem]' : 'lg:ml-[6rem]'}`}>
     
      <div className='ml-8 md:ml-12 '>
      <h1 className='font-bold lg:text-5xl text-3xl capitalize lg:mt-4 mt-20 mb-8 lg:ml-8'>notifications</h1>
      <div className='flex items-center justify-end pr-24 space-x-4 mb-8'>
      <button className={`w-20 p-1 rounded-full ${read?'bg-blue-primary text-white':'bg-gray-100'}`} onClick={()=>setRead(true)}>
          toutes
        </button>
        <button className={`w-20 p-1 rounded-full ${!read?'bg-blue-primary text-white':'bg-gray-100'}`} onClick={()=>setRead(false)}>
          non lues
        </button>
      </div>
      <div className="flex flex-col  mt-0 mb-12 mr-12 space-y-[2px]">
        
        {read&& notifData.notifications.map((Notifs, index) => (
          <Card key={index} notif={Notifs} />
        ))}
         {!read&& notifData.notifications.filter(notif=>notif.is_read===false).map((Notifs, index) => (
          <Card key={index} notif={Notifs} />
        ))}
          
      </div>
      
      </div>
    </div >


  )
}

export default Notifications