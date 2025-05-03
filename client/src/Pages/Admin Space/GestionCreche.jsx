import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import profilepic from './../../Assets/Parent Space/profilepic.png';
import location2 from "../../Assets/Parent Space/loca2.png";
import AdminDropdown from "../../Components/Admin Space/AdminDropdown";
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';

const GestionCreche = () => {
    const isOpen = useSelector((state) => state.sidebar.isOpen);

    const [creches,setCreches] =useState([])
    const user=JSON.parse(localStorage.getItem('user'))
    const [refresh,setRefresh]=useState(0)
    const [search,setSearch]=useState('')

    useEffect(()=>{

        axios.get(`http://localhost:3001/admin/kindergartens/`,  {
             headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${user.token}`
             }
           })
           .then((response) => {
             console.log(response.data); // log the response data (optional)
             setCreches(response.data.kindergartens);
           })
           .catch((error) => {
             toast(error);
           });
       
     },[refresh])

     

    const handleDelete=async(e,iid)=>{
        e.preventDefault()
        await axios.delete(`http://localhost:3001/admin/kindergartens/${iid}` ,{
             headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${user.token}`
             }
           })
           .then((response) => {
             console.log(response.data); // log the response data (optional)
             setRefresh(prev=>prev+1);
           })
           .catch((error) => {
             toast(error);
           });
        

        
    }

    const NotifCard = (props) => {
        return (
            <div className={`flex flex-col lg:flex-row  items-center justify-between bg-light-orange-4 hover:bg-opacity-70 duration-300 rounded-2xl px-12 py-4 `}>
                <div className='flex items-center space-x-6 ml-3 mr-3'>
                    <img className='w-12 aspect-square' src={profilepic} alt="" />
                    <div className=' font-bold text-lg'>{props.data.etabName}</div>
                    <div className='text-lg text-orange-2'>{props.data.role}</div>
                </div>
                <div className='flex items-center justify-end mt-3 lg:mt-0 space-x-7 lg:space-x-4'>
                    {
                        user.role==='ADMIN'&&
                        <p className='block undeline text-gray-600 hover:underline '><button className='hover:underline' >Voir le profil</button></p>
                    }
                    {
                        user.role==='ADMIN'&&
                        <p className='block undeline text-gray-600 hover:underline '><button className=' hover:underline' onClick={(e)=>handleDelete(e,props.data._id)}> Supprimer le compte</button></p>
                    }
                </div>
            </div>
        )
    }

    return (
        <div className='pt-1'>

            <div className={`font-body duration-300 mt-0 pt-0 lg:pl-8 ${isOpen ? 'lg:ml-[12rem]' : 'lg:ml-[6rem]'} relative z-10`}>
            <h1 className="font-bold text-2xl capitalize lg:text-3xl mt-[8rem] lg:mt-4 mb-8 ml-3 lg:ml-8 text-orange-2">
            Gestion des Creches 
            </h1>
            <div className="absolute top-20  lg:top-1 right-20 z-50">
            <AdminDropdown name="Mellissa Yazi" />
            </div>
                <div className= {`${isOpen ? 'flex flex-col' : 'flex md:flex-row flex-col'}`} >
                    <h1 className='font-bold lg:w-3/5 lg:text-3xl text-2xl capitalize lg:mt-4 mt-5 mb-8 ml-3 lg:ml-8'>Comptes Creches a Khatwa</h1>
                    <div className='flex relative flex-col w-fit lg:w-2/5 mb-8 ml-3 lg:ml-5 justify-center items-start text-lg ' >

                        <input
                            required
                            name=''
                            value={search}
                            placeholder='Recherche'
                            className='border-2 border-black border-opacity-60 rounded-full h-14  pl-10 pr-20 focus:outline-none relative'
                            onChange={e=>setSearch(e.target.value)}
                        />

                        <div className="absolute top-0 right-3 bottom-0 flex items-center">
                            <img
                                src={location2}
                                alt=""
                                className='cursor-pointer hover:opacity-70 active:opacity-100'
                            />
                        </div>
                

                    </div>
                </div>
                <div class="flex flex-col lg:overflow-y-scroll lg:h-96 p-2 mt-7 lg:ml-8 space-y-2 lg:mr-20 mx-auto">

                {creches&&creches.filter(creche=>creche.etabName.toLowerCase().includes(search.toLowerCase())).map((data, index) => (

                        <NotifCard key={index} data={data} />
                    ))}

                </div>
                        

            </div>
        </div>
    )
}

export default GestionCreche