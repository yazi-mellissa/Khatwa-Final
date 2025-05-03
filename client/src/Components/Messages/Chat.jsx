import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import { toast,ToastContainer } from 'react-toastify';
import MyLink from '../MyLink';

const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
  cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER
});



const Chat = ({ chatId, isLoggedIn,partner ,account,profilePic,selected}) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const user=JSON.parse(localStorage.getItem('user'))
  const route=user.role==='PARENT'?'Parent':'kindergarten'
  useEffect(()=>{

    chatId!=='' &&  axios.get(`${process.env.REACT_APP_API_URL}/${route}/chats/${chatId}`,  {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        })
        .then((response) => {
          console.log(response.data.chat.messages); // log the response data (optional)
          setMessages(response.data.chat.messages)
          
        })
        .catch((error) => {
          toast(error);
        });
    
  },[selected])

  const handleSubmit = (e) => {
    e.preventDefault();
    

    axios.post(`${process.env.REACT_APP_API_URL}/${route}/chats/${chatId}`, {
      content: message,
      from: user.id
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      })
      .then((response) => {
        console.log(response.data); // log the response data (optional)
        setMessage('');
      })
      .catch((error) => {
        toast(error);
      });
  };

  



  useEffect(() => {
    const channel = pusher.subscribe(`chat-${chatId}`);

    channel.bind('new-message', (message) => {
      setMessages((messages) => [...messages, message]);
      console.log(messages)
    });

    return () => {
      channel.unbind('new-message');
      pusher.unsubscribe(`chat-${chatId}`);
    };
  }, [chatId]);

  
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, []);
  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages]);

  const accountName=  user.role==="PARENT"?account.username:account.firstName+' '+account.lastName


  return (
    <div>
      <ToastContainer></ToastContainer>
      <div className='border-2 border-blue-primary h-[29rem] flex flex-col justify-between '>
        <MyLink className='w-fit' to={`../${partner}`}>
          <div  className='flex font-semibold text-lg hover:underline px-4 py-2 hover: w-fit space-x-2 items-center duration-300'>
            <img className='w-12' src={profilePic} alt="" />
              <p>
                {accountName}
              </p>
          </div>
        </MyLink>
        <div ref={containerRef} className='flex border-y-2 h-full border-blue-primary py-2 flex-col overflow-y-scroll '>
          <ul className='space-y-4 px-8 flex flex-col'>
            {messages.map((message) => (
              <li key={message._id} className={`whitespace-pre-wrap break-words rounded-3xl overflow-x-clip py-2 px-4 w-fit max-w-sm ${message.from===user.id?'bg-blue-primary text-white self-end':' bg-gray-200'}`}>{
                message.content
              }</li>
            ))}
          </ul>
        </div>
          <form className='py-2 bottom-2 w-full right-2 px-4 flex items-center space-x-4 justify-between' onSubmit={handleSubmit}>
            <input
            className='w-full px-4 h-8 rounded-xl outline-none border-[1.5px] border-blue-primary'
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className='bg-blue-primary py-1 px-2 rounded-xl text-white capitalize' type="submit">Envoyer</button>
          </form>
      </div>
    </div>
  );
};

export default Chat;
