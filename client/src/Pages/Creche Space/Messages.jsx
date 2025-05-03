import React, { useEffect, useState } from 'react'
import Chat from '../../Components/Messages/Chat'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast,ToastContainer } from 'react-toastify';
import profilePic from './../../Assets/Parent Space/profilepic.png'
import Pusher from 'pusher-js';



const Messages = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user=JSON.parse(localStorage.getItem('user'))
  const route=user.role==='PARENT'?'Parent':'kindergarten'
  const [chats,setChats]=useState(null)
  const [selected,setSelected]=useState(0)

  useEffect(()=>{

     axios.get(`${process.env.REACT_APP_API_URL}/${route}/chats/`,  {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        })
        .then((response) => {
          console.log(response.data); // log the response data (optional)
          setChats(response.data);
        })
        .catch((error) => {
          toast(error);
        });
    
  },[])

  const isOpen = useSelector((state) => state.sidebar.isOpen);
  return (
    <div className={`font-body duration-300 lg:pl-8 pt-8 ${isOpen?'lg:ml-[12rem]':'lg:ml-[6rem]'} h-screen`}>
      <ToastContainer></ToastContainer>
      <h1 className='font-bold lg:text-5xl text-3xl capitalize lg:mt-4 mt-20 mb-8 lg:ml-8'>Messages</h1>
      <div className='grid grid-cols-4'>
          <div className='flex flex-col px-2 overflow-y-scroll'>
            {
              user.role==="PARENT"&&chats&&chats.length>0&&chats.map((chat,index)=>(
                <div className={`flex items-center rounded-2xl py-2 px-4 cursor-pointer  hover:bg-opacity-80 space-x-4 ${selected===index?'bg-blue-secondary hover:bg-blue-secondary':'bg-white hover:bg-gray-200'} duration-300`} onClick={()=>setSelected(index)}>
                  <img className='w-16' src={profilePic} alt="" />
                  <div>
                    <p className='overflow-hidden font-medium'>
                      {chat.etabName}
                    </p>
                    <div className='overflow-hidden whitespace-nowrap text-overflow-ellipsis w-36 text-sm opacity-70'>
                      {chat.msg.from===user.id?'vous :':''}{chat.msg.content}
                    </div>
                  </div>
                  </div>
              ))
            }
            {
              user.role==="KINDERGARTEN"&&chats&&chats.length>0&&chats.map((chat,index)=>(
                <div className={`flex items-center rounded-2xl py-2 px-4 cursor-pointer  hover:bg-opacity-80 space-x-4 ${selected===index?'bg-blue-secondary hover:bg-blue-secondary':'bg-white hover:bg-gray-200'} duration-300`} onClick={()=>setSelected(index)}>
                  <img className='w-16' src={profilePic} alt="" />
                  <div>
                    <p className='overflow-hidden font-medium'>
                      {chat.firstName} {chat.lastName}
                    </p>
                    <div className='overflow-hidden whitespace-nowrap text-overflow-ellipsis w-36 text-sm opacity-70'>
                      {chat.msg.from===user.id?'vous :':''}{chat.msg.content}
                    </div>
                  </div>
                  </div>
              ))
            }
          </div>
          <div className='col-span-3 px-4'>  
            {
              chats&&chats.length>0&&
            <Chat selected={selected} isLoggedIn={isLoggedIn} profilePic={profilePic} account={user.role==="PARENT"?{username:chats[selected].etabName}:{firstName:chats[selected].firstName,lastName:chats[selected].lastName}} partner={chats[selected].partner} chatId={chats.length>0?chats[selected]._id:''}></Chat>
            }
          </div>
        </div>
      </div>
  )
}

export default Messages