import React, { useState,useEffect } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios';
import Modifypro from '../../../Components/EspaceParent/Modifypro';
import Info1 from '../../../Components/EspaceParent/Info1';
import Info2 from '../../../Components/EspaceParent/Info2';
import Pic from '../../../Components/EspaceParent/Pic';
import Children from '../../../Components/EspaceParent/Children';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import L from 'leaflet'
import "leaflet/dist/leaflet.css";
import marker from '../../../Assets/Signup/marker.png'
import { toast,ToastContainer } from 'react-toastify';
import Wilayas from '../../../Constants/Wilayas';
import Communes from '../../../Constants/Communes';
import MapPicker from '../../../Components/MapPicker';



const Edit = (props) => {
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const isOpen1 = true
    const [tab, setTab] = useState(1)
    const userToken=JSON.parse(localStorage.getItem('user'))
    const [lng, setLng] = useState(3.1739156);
    const [lat, setLat] = useState(36.7050299);

    
    const user = {
        etabName: 'crèche le bébé roi',
        location: {
            longitude: 3.1739156,
            latitude: 36.7050299
        },
    }
    const markerIcon = L.icon({
        iconUrl: marker,
        iconSize: [24, 36],
        popupAnchor: [0, -32],
    });
    const [account,setAccount]=useState({birth_date: "",
    chats: [],
    children: [],
    email: "",
    firstName: "",
    lastName: "",
    lat: 0,
    lng: 0,
    location: { commune: '', wilaya: '' },
    notificationMail: false,
    notificationPush: false,
    notificationSMS: false,
    notifications: [],
    password: "",
    phone: "",
    picturePath: "",
    preinscriptions: [],
    privateAcc: false,
    profilePic: "",
    rendezVous: [],
    role: ""}
  )
    const [formFields, setFormFields] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',

        wilaya: {
            name: '',
            id: '',
        },
        commune: {
            name: '',
            id: '',
            longitude: '',
            latitude: ''
        },
        profilePic: '',
        children: [

        ]
    })
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormFields(prevFields => ({
            ...prevFields,
            [name]: value,
        }));

    };
    const handleChildInput = (event, index) => {
        const { name, value } = event.target;
        const updatedChild = { ...formFields.children[index], [name]: value };
        const updatedChildren = [...formFields.children];
        updatedChildren[index] = updatedChild;
        setFormFields({ ...formFields, children: updatedChildren });


    }
    const pushChild = (child) => {
        setFormFields(prevFields => (
            {
                ...prevFields,
                children: [...prevFields.children, (child)]
            }
        ))
    }

    const popChild = () => {
        setFormFields(prevFields => ({
            ...prevFields,
            children: [...formFields.children.slice(0, formFields.children.length - 1)]
        }))
        console.log(formFields.children)
    }
    const handleWilayaInput = (name, id) => {
        const updatedWilaya = { ...formFields.wilaya, name: name, id: id };
        console.log('Log : ', updatedWilaya)
        setFormFields(prevFields => ({ ...prevFields, wilaya: updatedWilaya }));
    }
    const handleCommuneInput = (name, id, lg, lt) => {
        const updatedCommune = { ...formFields.commune, name: name, id: id, longitude: lg, latitude: lt };
        console.log('Log : ', updatedCommune)
        setFormFields(prevFields => ({ ...prevFields, commune: updatedCommune }));
    }
    const submit = async (e) => {
        console.log('submit')
        try {
            await axios.post("http://localhost:8000/", formFields)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(()=>{
        axios.get(`http://localhost:3001/Parent/profile`,  {
             headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${userToken.token}`
             }
           })
           .then((response) => {
             console.log(response.data); // log the response data (optional)
             setAccount(response.data.parent)
             
           })
           .catch((error) => {
             toast(error);
           });
    },[])


    useEffect(()=>{
        setLng(account.lng)
        setLat(account.lat)
        setFormFields(
            {
                firstName: account.firstName,
                lastName: account.lastName,
                phone: account.phone,
                email: account.email,

                wilaya: {
                    name: account.location.wilaya,
                    id: Wilayas.find(w=>w.name=account.location.wilaya)&&Wilayas.find(w=>w.name=account.location.wilaya).id,
                },
                commune: {
                    name: account.location.commune,
                    id: Communes.find(c=>c.name=account.location.commune)&&Communes.find(c=>c.name=account.location.commune).id,
                    longitude: Communes.find(c=>c.name=account.location.commune)&&Communes.find(c=>c.name=account.location.commune).longitude,
                    latitude: Communes.find(c=>c.name=account.location.commune)&&Communes.find(c=>c.name=account.location.commune).latitude
                },
                profilePic: '',
                children: account.children
            
            }
        )
    },[account])

    const handleUpdate=async(e)=>{
        e.preventDefault()
        await axios.patch(`http://localhost:3001/Parent/profile`,{
            account:{
                firstName:formFields.firstName,
                lastName:formFields.lastName,
                lng:lng,
                lat:lat
            }
        }  ,{
             headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${userToken.token}`
             }
           })
           .then((response) => {
             console.log(response.data); // log the response data (optional)
           })
           .catch((error) => {
             toast(error);
           });
    }

    return (
        <div className={`font-body duration-300 lg:pl-8 pt-8 ${isOpen ? 'lg:ml-[12rem]' : 'lg:ml-[6rem]'}`}>
            <div className={`font-body lg:items-start items-center flex flex-col duration-300 pt-8 lg:pt-2 ${isOpen1 ? 'lg:ml-[12rem]' : 'lg:ml-[12rem]'}`}>

                <div className='lg:ml-10'>
                    <div className=" font-bold text-xl lg:text-2xl ">Modifier Mon Profil</div>
                    <div className='flex space-x-4 mt-2'>
                        <button className={`uppercase lg:text-base text-sm font-bold ${tab === 1 ? 'text-orange-2' : 'text-black opacity-75'} duration-300`} onClick={() => setTab(1)}>a propos</button>
                        <p>|</p>
                        <button className={`uppercase lg:text-base text-sm font-bold ${tab === 2 ? 'text-orange-2' : 'text-black opacity-75'} duration-300`} onClick={() => setTab(2)}>enfants</button>
                    </div>
                    {
                        tab === 1 &&
                        <div>
                            <div className='grid grid-cols-1  md:grid-cols-2 space-x-32 grid-flow-row'>
                                <div className='flex relative flex-col  justify-center items-start'>
                                <div className='font-body grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-x-24 mt-6' >
                                <div className='flex flex-col col-span-2 space-y-12 mb-6'>
                                    <div className='flex relative flex-col justify-center items-start  text-lg'>
                                        <label className='ml-4 font-normal'>Nom</label>
                                        <input required type="text" name='lastName' value={formFields.lastName} onChange={(e)=>handleInputChange(e)} className='border-2 border-blue-primary rounded-lg h-14 w-80 px-10 focus:outline-none' />

                                    </div>
                                    <div className='flex relative flex-col justify-center items-start  text-lg'>
                                        <label className='ml-4 font-normal'>Prénom</label>
                                        <input required type="text" name='firstName' value={formFields.firstName} onChange={(e)=>handleInputChange(e)} className='border-2 border-blue-primary rounded-lg h-14 w-80 px-10  focus:outline-none' />

                                    </div>
                                    </div>
                                

                                </div>
                                    
                                    <div className='justify-center items-center mt-4 md:items-start md:mt-0'>
                                    <div className=' text-lg ml-2'>
                                        Adresse Exacte
                                    </div>
                                    <div className='w-[20rem]'>
                                        <MapPicker lng={lng} lat={lat} setLng={setLng} setLat={setLat} />
                                    </div>
                                    
                                </div>
                                </div>
                                <div className='flex relative md:flex-row flex-col justify-center items-center md:items-start'>
                                    <Pic formFields={formFields} handleInputChange={handleInputChange} />
                                </div>
                               
                            </div>
                            <div className='flex items-center justify-center md:justify-end mt-10 mb-5 md:mr-2'>
                                <div className='flex space-x-4'>
                                    <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-white text-gray-500 font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]'>
                                        <div></div>
                                        <p className='justify-self-center'>Annuler</p>
                                    </button>

                                    <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-blue-primary text-white font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' type='submit' onClick={(e)=>handleUpdate(e)}>
                                        <div></div>
                                        <p className='justify-self-center'>Enregistrer</p>
                                    </button>
                                </div>
                            </div>

                        </div>

                    }
                    {
                        tab === 2 &&
                        <div>

                            <div className='grid grid-cols-1  grid-flow-row'>
                                <Children submit={submit} formFields={formFields} pushChild={pushChild} popChild={popChild} handleChildInput={handleChildInput} />

                            </div>


                            <div className='flex items-center justify-center md:justify-end mt-10 mb-5 md:mr-2'>
                                <div className='flex space-x-4'>
                                    <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-white text-gray-500 font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]'>
                                        <div></div>
                                        <p className='justify-self-center'>Annuler</p>
                                    </button>

                                    <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-blue-primary text-white font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' type='submit' onClick={(e)=>handleUpdate(e)}>
                                        <div></div>
                                        <p className='justify-self-center'>Enregistrer</p>
                                    </button>
                                </div>
                            </div>
                        </div>

                    }

                </div>
            </div>


        </div>
    )

}
export default Edit