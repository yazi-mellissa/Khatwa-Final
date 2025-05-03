import React, { useState,useEffect } from 'react'
import { useSelector } from "react-redux";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import profilePic from './../../Assets/Parent Space/Parenticon.png'
import phone from './../../Assets/Creche Profile/phone.svg'
import location from './../../Assets/Creche Profile/location.svg'
import message from './../../Assets/Creche Profile/message.svg'
import security from '../../Assets/Parent Space/security.png'
import Comment from '../../Components/EspaceParent/Comment';
import Enfant from '../../Components/EspaceParent/Enfant';
import MyLink from '../../Components/MyLink';
import chat from "../../Assets/Parent Space/chat.png";
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

const ParentProfile = () => {
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const view = true;
    const [user,setUser] = useState(null)
    const {id}=useParams();
    
    const userToken=JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/kindergarten/parent/${id}`,  {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken.token}`
              }
            });
            console.log(response.data)
            setUser(response.data.parent)
          } catch (error) {
            toast(error);
          }
        }
      
        fetchData();
      }, []);

      const navigate=useNavigate()

      const handleMessage=(e)=>{
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_URL}/kindergarten/chats`, {
          partner:id
          },
           {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken.token}`
            }
          })
          .then((response) => {
            console.log(response.data); // log the response data (optional)
            navigate('/messages')
          })
          .catch((error) => {
            toast(error);
          });
      }

    return (

        <div className={`font-body lg:items-start items-center flex flex-col duration-300 mb-10 pt-8 lg:pt-2  ${isOpen ? 'lg:ml-[12rem]' : 'lg:ml-[6rem]'}`}>
            <h1 className='font-bold lg:text-5xl text-3xl capitalize lg:mt-4 mt-20 mb-8 lg:ml-8'>profil</h1>

                    {view && user&&
                        <>
                            <div className='lg:ml-8 flex flex-col items-center lg:flex-row lg:gap-x-5 '>

                            <img className='w-56 rounded-full aspect-square p-10' src={user.profilePic===''?profilePic:`uploads/${user.profilePic}`} alt="" />
                                <div className='flex flex-col items-start lg:ml-8 space-y-2 p-4'>
                                    <p className='font-bold text-xl lg:text-2xl uppercase'>{user.firstName} {user.lastName}</p>

                                    <div className='flex items-center space-x-4'>
                                        <img src={phone} alt="" />
                                        <p>{user.phone}</p>
                                    </div>
                                    <div className='flex items-center space-x-4'>
                                        <img src={message} alt="" />
                                        <p>{user.email}</p>
                                    </div>
                                    <div className='flex items-center space-x-4'>
                                        <img src={location} alt="" />
                                        <p>{user.location.wilaya} , {user.location.commune}</p>
                                    </div>

                                <button onClick={handleMessage} className='w-fit'>
                                    <div className='flex flex-row items-start border-2 border-orange-2 p-1 space-y-2 rounded-lg'>
                                    <div className='flex items-center space-x-2'>
                                        <img src={chat} alt="" />
                                        <p className='text-sm opacity-70'>Envoyer un message direct</p>
                                    </div>
                                    </div>
                                </button>
                                </div>
                            </div>
                            <div className='lg:ml-8 mt-8 opacity-50 h-[1.5px] bg-black w-[90%] '></div>
                            <div className='lg:ml-8 flex flex-col mt-20 '>
                                <div className="uppercase text-base  ml-5 mb-3 font-bold text-orange-2 opacity-75">Enfants</div>
                                <div className='flex flex-col items-center lg:items-end'>



                                    <div className='mb-8  gap-2  grid grid-cols-1 lg:grid-cols-3'>
                                        {user.children.map((c) => <div class="w-full px-2 mb-4">
                                            <Enfant enfant={c} />
                                        </div>)}
                                    </div>

                                   
                                </div>
                            </div>

                        </>

                    }
                    {!view && <div className='self-center'>
                        <div className='flex flex-col justify-between items-center  lg:flex-row lg:gap-x-5'>

                            <img className='w-56 aspect-square p-10' src={user.profilePic} alt="" />
                            <div className='flex flex-col lg:items-start lg:ml-8 space-y-2 pt-8'>
                                <p className='font-bold text-xl lg:text-2xl uppercase'>{user.name}</p>

                            </div>

                        </div>
                        <div className='lg:ml-8 mt-8 opacity-50 h-[1.5px] bg-black w-full '></div>
                        <div className="mb-10 flex flex-col gap-y-10 items-center lg:ml-8 mt-8">
                            <div className=" font-bold text-xl lg:text-2xl ">Ce compte est prive</div>
                            <img className="rounded-full bg-blue-primary bg-opacity-30 p-4 " src={security} alt=""></img>
                        </div>
                    </div>}









 </div >



    )
}

export default ParentProfile
/*  <div className='flex flex-col  items-center'>
                    <div className='lg:ml-8 mt-8 opacity-50 h-[1.5px] bg-black w-[90%] lg:bg-white '></div>
                    <div className='uppercase lg:text-base text-sm font-bold text-orange-2 opacity-75'>Commentaires Recents</div>
                    <div className='lg:ml-8 flex mt-7 flex-col gap-y-5 mb-8'>
                        {
                            comments.map((c) => <Comment comment={c} />)
                        }
                    </div>
                   
                    <button className='px-2 py-1  lg:text-base text-xs mr-2 mb-2 rounded-lg font-bold  text-white bg-light-orange-2 hover:bg-light-orange-1'>MODIFIER MON PROFIL</button>
                  
                </div>
*/