import React, { useEffect, useState } from 'react';
import CrecheCard from '../../Components/EspaceParent/CrecheCard';
import Creches from './Creches';
import Map from './Map';
import familyicon from '../../Assets/Parent Space/familyicon.png';
import { toggleSidebar } from "./../../Redux/Slices/sideBarSlice";
import { useDispatch, useSelector } from "react-redux";
import location1 from "../../Assets/Parent Space/loca1.png";
import location2 from "../../Assets/Parent Space/loca2.png";
import MyLink from '../../Components/MyLink';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import L from 'leaflet'
import "leaflet/dist/leaflet.css";
import marker from './../../Assets/Signup/marker.png'
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';

function ParentHome(props) {
    const userToken=JSON.parse(localStorage.getItem('user'))
    const [wilayaskindergartens,setWilayaskindergartens]=useState([])
    const [subscribedKindergartens,setSubscribedKindergartens]=useState([])
    const [wilaya,setWilaya]=useState('')
    
    const markerIcon = L.icon({
        iconUrl: marker,
        iconSize: [24, 36],
        popupAnchor: [0, -32],
    });
    const isOpen = useSelector((state) => state.sidebar.isOpen);

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/Parent/accueil/`,  {
             headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${userToken.token}`
             }
           })
           .then((response) => {
             console.log(response.data); // log the response data (optional)
             setWilaya(response.data.wilaya)
             setWilayaskindergartens(response.data.wilayaskindergartens)
             setSubscribedKindergartens(response.data.subscribedkindergartens)
           })
           .catch((error) => {
             toast(error);
           });
    },[])

    return (
        <div className={` font-body duration-300 lg:pl-8 pt-8 ${isOpen ? 'lg:ml-[12rem]' : 'lg:ml-[6rem]'}`}>
            <div className='grid grid-col-1 gap-y-5 ml-8 mt-20 md:mt-0 md:ml-12'>
                <h1 className='text-orange-2 text-2xl md:text-3xl font-bold '>Bienvenue sur KHATWA</h1>
                
            </div>

            <div className="flex flex-col md:grid md:grid-cols-3  mt-0">
            <div className="md:col-span-2 p-5 ">
                    <div className='flex flex-col md:flex-row md:justify-between items-center'>
                        <h1 className=' text-xl font-bold flex space-x-4'>Decouvrez les creches a <p className='ml-2 text-orange-2'>{wilaya}</p> </h1>
                        <button onClick={()=>props.setLocated(true)}>
                        <button className='w-fit h-fit flex items-center justify-center bg-blue-primary hover:bg-blue-third rounded-full mb-2 font-bold text-white text-lg duration-300 active:bg-blue-primary px-8 py-2' onClick={()=>props.setLocated(false)}>
                            <p className=' capitalize'>
                                découvrir d'autres crèches
                            </p>
                        </button>
                        </button>
                    </div>


                    {wilayaskindergartens&& wilayaskindergartens.map((Creche, index) => (
                        <CrecheCard key={index} creche={Creche} />
                    ))}
                    <div className=' mt-8 mb-8 opacity-70 h-[1.5px] bg-black w-[90%]'></div>
                    <h1 className=' text-xl font-bold '>Crèches auxquelles vous êtes inscrit </h1>
                    {subscribedKindergartens&& subscribedKindergartens.map((Creches, index) => (
                        <CrecheCard key={index} creche={Creches} />
                    ))}
                    {
                        !subscribedKindergartens&&
                        <div className='mt-12 ml-60 text-2xl'>Aucune Creche</div>
                    }


                </div>

                <div className=" md:overflow-y-visible mb-4 p-4">
                    <img className="hidden md:block" src={familyicon} alt="family" />
                    


                </div>
            </div>



        </div>
    );
}

export default ParentHome;
/* <div className="absolute top-0 left-3 bottom-0 flex items-center">
                        <img
                            src={location1}
                            alt=""
                            className=' cursor-pointer hover:opacity-70 active:opacity-100'
                        />
                    </div>*/