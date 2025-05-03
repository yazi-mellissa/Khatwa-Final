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
import dist from "../../Assets/Parent Space/distance.png";
import chat from "../../Assets/Parent Space/chat.png";
import MyLink from '../../Components/MyLink';
import time from "../../Assets/Parent Space/time.png";
import annuler from "../../Assets/Parent Space/annuler.png";
import PopUpRdv from '../../Components/EspaceParent/PopUpRdv';
import PopUpInscri from '../../Components/EspaceParent/PopUpInscri';
import { useEffect } from 'react';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import PopUpComment from '../../Components/EspaceParent/PopUpComment';



const CrecheConsultation = () => {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const userToken=JSON.parse(localStorage.getItem('user'))
  const {id}=useParams()
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
  reviews:[],
  chats: [],
  events: [],
  typeAccueil: '',
  typeEtab: '',
  cout: '',
  languages: [],
  services: [],
  description: '',
  notificationMail: false,
  notificationPush: false,
  notificationSMS: false,
  available: false,
  })
  const [distance,setDistance]=useState(0)

  const markerIcon = L.icon({
    iconUrl: marker,
    iconSize: [24, 36],
    popupAnchor: [0, -32],
  });
  
  const [preinscri, setPreinscri] = useState(false);
  const [rdv, setRdv] = useState(false);
  const [rvList,setRvList]=useState([])
  const [inscri, setInscri] = useState(false);
  const [ferme, setFerme] = useState(false);
  const [comments,setComments] =useState([])
  const [found,setFound]=useState(true)


  useEffect(()=>{
    setComments(user.reviews)
  },[user.reviews])
  const [refresh,setRefresh]=useState(0)



  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Parent/kindergarten/${id}`,  {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken.token}`
          }
        });
        console.log(response.data)
        setDistance(response.data.distance)
        setUser(response.data.kindergarten);
        setFound(response.data.found)
        setRdv(response.data.rendezVous.filter(rv=>rv.State==='En attente').length>0)
        setFerme(!response.data.kindergarten.available)
        setRvList(response.data.rendezVous)
        
        
      } catch (error) {
        toast(error);
      }
    }
  
    fetchData();
  }, [refresh]);
  
  const navigate=useNavigate()

  const handleMessage=(e)=>{
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/Parent/chats`, {
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

  const handleCancel=async(e)=>{
    const id=rvList.find(r=>r.State==="En attente").id
    await axios.patch(`${process.env.REACT_APP_API_URL}/Parent/rendezvous/${id}`,{
        status:"Annulée"
    }  ,{
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${userToken.token}`
         }
       })
       .then((response) => {
         console.log(response.data); // log the response data (optional)
         setRefresh(prev=>prev+1)
       })
       .catch((error) => {
         toast(error);
       });
    

    
}


  const handleRefresh = () => {
    setRefresh(refresh + 1);
  };
  return (
    <div key={refresh} className={`font-body lg:items-start items-center flex flex-col duration-300 pt-8 lg:pt-2 ${isOpen ? 'lg:ml-[12rem]' : 'lg:ml-[6rem]'} relative`}>


      <div className='lg:ml-28 flex flex-col lg:flex-row items-center'>

      <img className='w-56 aspect-square rounded-full' src={user.profilePic===''?profilePic:`uploads/${user.profilePic}`} alt="" />
        <div className='flex flex-col'>
          <div className='flex flex-col items-start lg:ml-8 space-y-2 pt-8'>
            <p className='font-bold text-blue-primary text-xl lg:text-2xl uppercase'>{user.etabName}</p>
            <div className='flex items-center space-x-2'>
              <img src={star} alt="" />
              <p className='font-semibold opacity-70'>{user.rating}</p>
            </div>
          </div>
          <div className='flex flex-row items-start lg:ml-8 space-y-2 mt-2 mb-2'>

            <div className='flex items-center space-x-2'>
              <img src={dist} alt="" />
              <p className='font-semibold opacity-70'>{distance} Km</p>
            </div>
          </div>
          <button onClick={handleMessage} className='w-fit'>
            <div className='flex flex-row items-start border-2 border-orange-2 lg:ml-8 space-y-2 p-1 rounded-lg'>
              <div className='flex items-center space-x-2'>
                <img src={chat} alt="" />
                <p className='text-sm opacity-70'>Envoyer un message direct</p>
              </div>
            </div>
          </button>
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
          {!preinscri && !inscri && !ferme &&
            <div className='grid grid-cols-1'>
              <div className='flex flex-col items-center'>
                <p className='font-bold self-center '>Inscrivez votre enfant dans cette crèche</p>
                <p className='text-center'>Remplissez le formulaire ci-dessous pour réserver une place pour votre enfant dans la crèche</p>
                <PopUpInscri kindergartenId={id} cout={user.cout} servicesEnum={user.services} />
                
              </div>
            </div>}
          {preinscri && !inscri && !ferme &&
            <div className='grid grid-cols-1'>
              <div className='flex flex-col'>
                <p className='font-bold self-center '>Inscrivez votre enfant dans cette crèche</p>
                <p className='text-center'>Vous avez deja rempli le formulaire d’inscription. votre demande est en cours de traitement. vous receverez une notification vous informant du resultat.</p>
                <button className=" w-3/4 mb-2  self-center h-11 mt-2 bg-blue-secondary text-green  font-bold rounded-full  bg-opacity-70  duration-125ms" type="submit">
                  <div className='flex flex-row gap-x-4'>
                    <img src={time} className='w-7 ml-4' alt="" />
                    <p className="justify-self-center">Preinscription en Attente</p>
                  </div>
                </button>
                <button className=" w-3/4 mb-2  self-center h-11 mt-2 bg-light-orange-2  text-orange-2  font-bold rounded-full  bg-opacity-70 active:bg-light-orange-2 duration-125ms" type="submit">
                  <div className='flex flex-row gap-x-4'>
                    <img src={annuler} className='w-7 ml-4' alt="" />
                    <p className="justify-self-center">Annuler La Preinscription</p>
                  </div>
                </button>
              </div>
            </div>}
          {inscri && !preinscri && !ferme &&
            <div className='grid grid-cols-1'>
              <div className='flex flex-col'>
                <p className='font-bold self-center '>Inscrivez votre enfant dans cette crèche</p>
                <p className='text-center'>felicitations ! vous etes deja inscrit dans cette creche. si vous souhaitez annuler cliquez sur ce bouton</p>
                <button className=" w-3/4 mb-2  self-center h-11 mt-2 bg-light-orange-2  text-orange-2  font-bold rounded-full  bg-opacity-70 active:bg-light-orange-2 duration-125ms" type="submit">
                  <div className='flex flex-row gap-x-7'>
                    <img src={annuler} className='w-7 ml-4' alt="" />
                    <p className="justify-self-center ">Annuler L'Inscription</p>
                  </div>
                </button>
              </div>
            </div>}

          {ferme && !inscri && !preinscri &&
            <div className='grid grid-cols-1'>
              <div className='flex flex-col items-center'>
                <p className='font-bold self-center '>Oups, cette creche a ferme les inscriptions !</p>
                <p className='text-center'>Vous pouvez reconsulter ce profil a tout moment afin de savoir si elles ont ete ouvertes.</p>
                <button className=" w-[18rem] mb-2  self-center h-11 mt-2 bg-light-orange-2  text-orange-2  font-bold rounded-full  bg-opacity-70 active:bg-light-orange-2 duration-125ms" type="submit">
                        <div className='flex flex-row gap-x-7'>
                            <img src={annuler} className='w-7 ml-4' alt="" />
                            <p className="justify-self-center ">Inscriptions Fermees</p>
                        </div>
                    </button>
              
              </div>
            </div>}
          {!rdv &&
            <div className='grid grid-cols-1'>
              <div className='flex flex-col items-center '>
                <p className='font-bold self-center '>Vous avez toujours des questions?</p>
                <p className='text-center'>Demandez un rendez-vous avec les responsables de la crèche en cliquant sur le bouton maintenant!</p>
                
                <PopUpRdv 
                  kindergartenId={id}
                />
              </div>
            </div>}
          {rdv &&
            <div className='grid grid-cols-1'>
              <div className='flex flex-col'>
                <p className='font-bold self-center '>Vous avez toujours des questions?</p>
                <p className='text-center'>votre demande de rdv est en cours de traitement.
                  vous receverez une notification vous informant du resultat.</p>
                <button className=" w-3/4 mb-2  self-center h-11 mt-2 bg-blue-secondary text-green  font-bold rounded-full  bg-opacity-70  duration-125ms" type="submit">
                  <div className='flex flex-row gap-x-4'>
                    <img src={time} className='w-7 ml-4' alt="" />
                    <p className="justify-self-center">Demande De Rdv En Attente</p>
                  </div>
                </button>
                <button className=" w-3/4 mb-2  self-center h-11 mt-2 bg-light-orange-2  text-orange-2  font-bold rounded-full  bg-opacity-70 active:bg-light-orange-2 duration-125ms" onClick={(e)=>handleCancel(e)}>
                  <div className='flex flex-row gap-x-4' >
                    <img src={annuler} className='w-7 ml-4' alt="" />
                    <p className="justify-self-center">Annuler La Demande</p>
                  </div>
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
        <div className='flex flex-col items-center w-full'>
        <div className='lg:pl-28 gap-y-4 gap-x-8 lg:pr-28 mt-12 grid md:grid-cols-2 grid-cols-1 w-full mb-8'>
          {
            comments.map((c) => <Comment comment={c} />)
          }
        </div>
          {
            !found&&
            <PopUpComment setRefresh={setRefresh} kindergartenId={id}></PopUpComment>
          }

        </div>

      }
      {
        tab === 3 && user.reviews.length===0&&
        <div className='flex flex-col items-center'>
          <div className=' lg:pl-28 gap-y-4 gap-x-8 lg:pr-28 mt-12 place-items-center grid grid-cols-1 w-full mb-8'>
            <p className='text-5xl font-regular my-20'>Aucun Commentaire</p> 
          </div>
          {
            !found&&<PopUpComment handleRefresh={setRefresh} refresh={refresh} kindergartenId={id}></PopUpComment>
          }

        </div>

      }
    </div>
  )
}

export default CrecheConsultation