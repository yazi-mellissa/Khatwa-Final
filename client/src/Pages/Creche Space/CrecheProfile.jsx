import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import L from 'leaflet'
import "leaflet/dist/leaflet.css";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import marker from './../../Assets/Signup/marker.png'
import profilePic from './../../Assets/Creche Profile/pp.png'
import pic1 from './../../Assets/Creche Profile/1.png'
import pic2 from './../../Assets/Creche Profile/2.png'
import pic3 from './../../Assets/Creche Profile/3.png'
import phone from './../../Assets/Creche Profile/phone.svg'
import location from './../../Assets/Creche Profile/location.svg'
import message from './../../Assets/Creche Profile/message.svg'
import star from './../../Assets/Creche Profile/star.svg'
import Comment from '../../Components/Comment';
import { useEffect } from 'react';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';






const CrecheProfile = () => {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const [tab, setTab] = useState(1)
  const [user,setUser] =useState( {
    email: '',
  password: '',
  phone: '',
  location: { wilaya: '', commune: '' },
  lng: '',
  lat: '',
  etabName: '',
  pedagogie: [],
  startAge: '',
  endAge: '',
  capacite: '',
  images: [],
  startHour: '',
  endHour: '',
  days: [],
  children: [],
  Preinscription: [],
  RendezVous: [],
  notifications: [],
  chats: [],
  events: [],
  typeAccueil: '',
  typeEtab: '',
  cout: '',
  languages: [],
  services: [],
  description: '',
  reviews:[],
  notificationMail: false,
  notificationPush: false,
  notificationSMS: false,
  available: false,
  })

  const userToken=JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/kindergarten/profile/`,  {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken.token}`
          }
        });
        console.log(response.data)
        setUser(response.data.kindergarten);
      } catch (error) {
        toast(error);
      }
    }
  
    fetchData();
  }, []);
  
  const markerIcon = L.icon({
    iconUrl: marker,
    iconSize: [24, 36],
    popupAnchor: [0, -32],
  });

  const [comments,setComments] =useState([])


  const [ferme,setFerme]=useState(true)
  useEffect(()=>{
    setComments(user.reviews)
    setFerme(user.available)
  },[user])

const handleStatus=async(e)=>{
  e.preventDefault()
  await axios.patch(`${process.env.REACT_APP_API_URL}/kindergarten/profile`,{
      available:!ferme
  }  ,{
       headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${userToken.token}`
       }
     })
     .then((response) => {
       console.log(response.data); // log the response data (optional)
       setFerme(prev=>!prev)
     })
     .catch((error) => {
       toast(error);
     });
  

  
}

  return (
    <div className={`font-body lg:items-start items-center flex flex-col duration-300 pt-8 lg:pt-2 ${isOpen ? 'lg:ml-[12rem]' : 'lg:ml-[6rem]'} relative`}>
      <ToastContainer></ToastContainer>
      <h1 className='font-bold lg:text-5xl text-3xl capitalize lg:mt-4 mt-20 mb-8 lg:ml-8'>mon profil</h1>

      <div className='lg:ml-28 flex flex-col lg:flex-row items-center'>
        <img className='w-56 aspect-square rounded-full' src={user.profilePic===''?profilePic:`uploads/${user.profilePic}`} alt="" />
        <div className='flex flex-col items-start lg:ml-8 space-y-2 pt-8'>
          <p className='font-bold text-blue-primary text-xl lg:text-2xl uppercase'>{user.etabName}</p>
          <div className='flex items-center space-x-2'>
            <img src={star} alt="" />
            <p className='font-semibold opacity-70'>{user.rating}</p>
          </div>
        </div>
      </div>
      <div className='lg:ml-28 mt-8 opacity-70 h-[1.5px] bg-black w-[80%]'></div>
      <div className='lg:ml-28'>
        <div className='flex space-x-4 mt-2'>
          <button className={`uppercase lg:text-base text-sm font-bold ${tab === 1 ? 'text-orange-2' : 'text-black opacity-75'} duration-300`} onClick={() => setTab(1)}>a propos</button>
          <button className={`uppercase lg:text-base text-sm font-bold ${tab === 2 ? 'text-orange-2' : 'text-black opacity-75'} duration-300`} onClick={() => setTab(2)}>photos</button>
          <button className={`uppercase lg:text-base text-sm font-bold ${tab === 3 ? 'text-orange-2' : 'text-black opacity-75'} duration-300`} onClick={() => setTab(3)}>Commentaires</button>
        </div>
      </div>
      {
        tab === 1 &&
        <div className='lg:ml-28 lg:mr-20 mt-10 px-4 lg:px-0 flex flex-col items-center lg:items-start lg:grid lg:grid-cols-2 lg:gap-x-6 gap-y-6 mb-8'>
          <div className='flex flex-col gap-y-2 w-full'>
            <div className='p-4 h-fit w-full space-y-4 border-2 border-blue-primary rounded-lg'>
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
            </div>
            <div className='p-4 place-self-start h-fit col-span-1 border-2 w-full border-blue-primary rounded-lg'>
              <p className='uppercase font-bold text-lg opacity-75 mb-2  ml-2'>Description</p>
              <p>{user.description}</p>
            </div>
            <div className='p-4 place-self-start w-full h-fit col-span-1 border-2 border-blue-primary rounded-lg'>
              <div className='flex space-x-12'>
                <p className='uppercase font-bold opacity-75'>Services</p>
                <div className='flex flex-wrap '>
                  {user.services.map((s) => (
                    <div className='px-2 py-1 lg:text-base text-xs mr-2 mb-2 rounded-full text-white bg-light-orange-2'>{s}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-y-2'>
          {
            user.lat&&
            <div className=' h-72 lg:h-52 px-2 pt-2 border-2 border-blue-primary rounded-lg'>
              <MapContainer
                center={[user.lat, user.lng]}
                zoom={17}
                style={{ height: "95%" }}
              >
                <TileLayer
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                />
                <Marker position={[user.lat, user.lng]} icon={markerIcon}>
                  <Popup>{user.etabName.toUpperCase()}</Popup>
                </Marker>
              </MapContainer>
            </div>
          }
            <div>

            </div>




            <div className='p-4   place-self-start w-full h-fit col-span-1 border-2 border-blue-primary rounded-lg space-y-3'>
            <div className='flex space-x-2'>
                <p className='uppercase font-bold opacity-75'>type d'etablissement :</p>
                <div>{user.typeEtab}</div>
              </div>
              <div className='flex space-x-2'>
                <p className='uppercase font-bold opacity-75'>age d’accueil :</p>
                <div>{user.startAge} Ans - {user.endAge} Ans</div>
              </div>
              <div className='flex space-x-2'>
                <p className='uppercase font-bold opacity-75'>jours d'acceuil:</p>
                <div className='flex flex-wrap'>{user.days.map((day)=> <p className='mr-2'>{day}</p> )}</div>
              </div>
               
              <div className='flex space-x-2'>
                <p className='uppercase font-bold opacity-75'>horaire :</p>
                <div>{user.startHour} - {user.endHour}</div>
              </div>
               
              <div className='flex space-x-2'>
                <p className='uppercase font-bold opacity-75'>type d'accueil:</p>
                <div>{user.typeAccueil}</div>
              </div>
              <div className='flex space-x-2'>
                <p className='uppercase font-bold opacity-75'>capacité moyenne par classe :</p>
                <div>{user.capacite}</div>
              </div>
              <div className='flex space-x-2'>
                <p className='uppercase font-bold opacity-75'>cout moyen :</p>
                <div>{user.cout}DA/Mois</div>
              </div>
             
              <div className='flex space-x-2'>
                <p className='uppercase font-bold opacity-75'>langues enseignees:</p>
                <div>{user.languages.map((lng)=> <p>{lng}</p> )}</div>
              </div>
               
              <div className='flex space-x-2'>
                <p className='uppercase font-bold opacity-75'>pedagogie :</p>
                <div>{user.pedagogie[0]}</div>
              </div>
            </div>
          </div>
          {ferme && 
          <div className='grid grid-cols-1'>
            <div className='flex flex-col w-fit items-center md:items-start'>
                    <p className='capitalize font-bold'>vous n’avez plus de places disponibles?</p>
                    <p>Si vous n’avez plus de places disponibles ou que vous souhaitez fermer les inscriptions dans votre creche, cliquez ici. vous pouvez les reouvrir a n’importe quel moment en recliquant sur la bouton</p>
            </div>
            <div>

            </div>
          </div>}
          {ferme && 
            <div className='grid grid-cols-1'>
              <div className='flex flex-col items-center'>
                <button className=" w-[18rem] mb-2  self-center h-11 mt-2 bg-light-orange-2  text-orange-2  font-bold rounded-full  bg-opacity-70 active:bg-light-orange-2 duration-125ms" onClick={(e)=>handleStatus(e)}>
                        
                            <p className="justify-self-center ">Fermer les inscriptions</p>
                     
                    </button>
              
              </div>
            </div>}
            {!ferme && 
          <div className='grid grid-cols-1'>
            <div className='flex flex-col w-fit items-center md:items-start'>
                    <p className='capitalize font-bold'>vous souhaitez rouvrir les inscriptions?</p>
                    <p>Si vous souhaitez rouvrir les inscriptions, cliquez sur ce bouton.</p>
            </div>
            <div>

            </div>
          </div>}
          {!ferme && 
            <div className='grid grid-cols-1'>
              <div className='flex flex-col items-center'>
                <button className=" w-[18rem] mb-2  self-center h-11 mt-2 bg-blue-secondary   text-green  font-bold rounded-full  bg-opacity-70 duration-125ms" onClick={(e)=>handleStatus(e)}>
                        
                            <p className="justify-self-center ">Ouvrir les inscriptions</p>
                     
                    </button>
              
              </div>
            </div>}
        </div>

      }
      {
        tab === 2 && user.images.length>0&&
        <div className='lg:ml-28 mt-12 w-[20rem] lg:w-[45rem] mb-8 rounded-xl'>
          <Carousel>
            {user.images.map((img) => (
              <div>
                <img src={img} />
              </div>
            ))}
          </Carousel>
        </div>
      }
      {
        tab === 2 && user.images.length===0&&
        <div className='lg:pl-28 gap-y-4 gap-x-8 lg:pr-28 mt-12 place-items-center grid grid-cols-1 w-full mb-8'>
          <p className='text-5xl font-regular my-20'>Aucune Image</p> 
        </div>

      }
      {
        tab === 3 && user.reviews.length>0&&
        <div className='lg:pl-28 gap-y-4 gap-x-8 lg:pr-28 mt-12 grid md:grid-cols-2 grid-cols-1 w-full mb-8'>
          {
            comments.map((c) => <Comment comment={c} />)
          }
        </div>
      }
      {
        tab === 3 && user.reviews.length===0&&
        <div className='lg:pl-28 gap-y-4 gap-x-8 lg:pr-28 mt-12 place-items-center grid grid-cols-1 w-full mb-8'>
          <p className='text-5xl font-regular my-20'>Aucun Commentaire</p> 
        </div>

      }
    </div>
  )
}

export default CrecheProfile