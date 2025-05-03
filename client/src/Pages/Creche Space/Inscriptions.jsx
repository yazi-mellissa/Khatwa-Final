import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import profilePic from './../../Assets/Parent Space/profilepic.png'
import PopUpConsultInscri from '../../Components/EspaceParent/PopUpConsultInscri';
import Toggle from '../../Components/EspaceParent/Toggle';
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';
import PopUpConsultRdv from '../../Components/PopUpConsultRdv';

const Inscriptions = () => {
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const user=JSON.parse(localStorage.getItem('user'))
    const [view,setView]=useState('En attente')
    const views=['En attente','Acceptées','Refusées','Annulées']
    const states=['En attente','Acceptée','Refusée','Annulée']
    const [inscriptionsData,setInscriptionData] =useState([])
    const [rendezVousData,setRendezVousData] =useState([])

    const [afficher, setAfficher] = useState(false);
    const [afficherrdv, setAfficherrdv] = useState(false);

    useEffect(()=>{

        axios.get(`${process.env.REACT_APP_API_URL}/kindergarten/preinscriptions/`,  {
             headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${user.token}`
             }
           })
           .then((response) => {
             console.log(response.data); // log the response data (optional)
             setInscriptionData(response.data.inscriptions);
           })
           .catch((error) => {
             toast(error);
           });
       
     },[])

     useEffect(()=>{

        axios.get(`${process.env.REACT_APP_API_URL}/kindergarten/rendezvous/`,  {
             headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${user.token}`
             }
           })
           .then((response) => {
             console.log(response.data); // log the response data (optional)
             setRendezVousData(response.data.rendezvous);
           })
           .catch((error) => {
             toast(error);
           });
       
     },[])

     const [id,setId]=useState(null)
   
    const InscriptionCard=(props)=>{
        return(
            <div className={`flex items-center justify-between border-[1.5px] hover:bg-light-orange-3 border-orange-1 bg-light-orange-4 rounded-2xl px-12 py-4 duration-300`}>
                <div className='flex items-center space-x-6'>
                    <img className='w-12 aspect-square' src={props.img} alt="" />
                    <div className='font-bold text-lg'>{props.name}</div>
                </div>
                <div className='flex items-center justify-end space-x-4'>
                    
                    <button className='hidden md:block bg-blue-secondary text-black text-opacity-70 font-bold w-32 h-10 rounded-3xl hover:bg-orange-1 hover:outline-blue-primary hover:text-white hover:bg-opacity-100 active:bg-blue-primary duration-[125ms]' onClick={(e)=>handleConsulter(e,props.id)}>Consulter</button>
                    { props.view===0&&
                        <button className='hidden md:block bg-blue-primary text-white font-bold w-32 h-10 rounded-3xl hover:bg-light-orange-2 hover:outline-blue-primary hover:text-white hover:bg-opacity-100 active:bg-blue-primary duration-[125ms]' onClick={(e)=>handleStatus(e,props.id,1)}>Accepter</button>
                    }    
                    {
                        props.view===0&&
                        <button className='hidden md:block bg-white text-orange-1 font-bold w-32 h-10 rounded-3xl hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' onClick={(e)=>handleStatus(e,props.id,2)}>Refuser</button>
                    }
                     {
                        props.view===1&&
                        <button className='hidden md:block bg-white text-orange-1 font-bold w-32 h-10 rounded-3xl hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' onClick={(e)=>handleStatus(e,props.id,3)}>Annuler</button>
                    }
                </div>
            </div>
        )
    }

    const RdvCard=(props)=>{
        return(
            <div className={`flex items-center justify-between border-[1.5px] hover:bg-light-orange-3 border-orange-1 bg-light-orange-4 rounded-2xl px-12 py-4 duration-300`}>
                <div className='flex items-center space-x-6'>
                    <img className='w-12 aspect-square' src={props.img} alt="" />
                    <div className='font-bold text-lg'>{props.name}</div>
                </div>
                <div className='flex items-center justify-end space-x-4'>
                    
                    <button className='hidden md:block bg-blue-secondary text-black text-opacity-70 font-bold w-32 h-10 rounded-3xl hover:bg-orange-1 hover:outline-blue-primary hover:text-white hover:bg-opacity-100 active:bg-blue-primary duration-[125ms]' onClick={(e)=>handleConsulterrdv(e,props.id)}>Consulter</button>
                    { props.view===0&&
                        <button className='hidden md:block bg-blue-primary text-white font-bold w-32 h-10 rounded-3xl hover:bg-light-orange-2 hover:outline-blue-primary hover:text-white hover:bg-opacity-100 active:bg-blue-primary duration-[125ms]' onClick={(e)=>handleStatusrdv(e,props.id,1)}>Accepter</button>
                    }    
                    {
                        props.view===0&&
                        <button className='hidden md:block bg-white text-orange-1 font-bold w-32 h-10 rounded-3xl hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' onClick={(e)=>handleStatusrdv(e,props.id,2)}>Refuser</button>
                    }
                     {
                        props.view===1&&
                        <button className='hidden md:block bg-white text-orange-1 font-bold w-32 h-10 rounded-3xl hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' onClick={(e)=>handleStatusrdv(e,props.id,3)}>Annuler</button>
                    }
                </div>
            </div>
        )
    }

    const handleConsulter=(e,iid)=>{
        e.preventDefault()
        setAfficher(true)
        setId(iid)
    }

    const handleConsulterrdv=(e,iid)=>{
        e.preventDefault()
        setAfficherrdv(true)
        setId(iid)
    }

    const handleStatus=async(e,iid,view)=>{
        e.preventDefault()
        setId(iid)
        await axios.patch(`${process.env.REACT_APP_API_URL}/kindergarten/preinscriptions/${iid}`,{
            status:states[view]
        }  ,{
             headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${user.token}`
             }
           })
           .then((response) => {
             console.log(response.data); // log the response data (optional)
             setInscriptionData(prev=>prev.map((insc)=>{
                if(insc.element._id===iid){
                    return({...insc,element:{...insc.element,State:states[view]}})
                }
                else{
                    return(insc)
                }
             }));
           })
           .catch((error) => {
             toast(error);
           });
        

        
    }

    const handleStatusrdv=async(e,iid,view)=>{
        e.preventDefault()
        setId(iid)
        await axios.patch(`${process.env.REACT_APP_API_URL}/kindergarten/rendezvous/${iid}`,{
            status:states[view]
        }  ,{
             headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${user.token}`
             }
           })
           .then((response) => {
             console.log(response.data); // log the response data (optional)
             setRendezVousData(prev=>prev.map((insc)=>{
                if(insc.element._id===iid){
                    return({...insc,element:{...insc.element,state:states[view]}})
                }
                else{
                    return(insc)
                }
             }));
           })
           .catch((error) => {
             toast(error);
           });
        

        
    }

    const [mode,setMode]=useState(false)

  return (
    <div>
    
    
    { mode===false&&
    <div className={`font-body relative duration-300 lg:pl-8 pt-8 ${isOpen?'lg:ml-[12rem]':'lg:ml-[6rem]'}`}>
                    {afficher &&
                    <PopUpConsultInscri id={id} afficher={afficher} setAfficher={setAfficher}/>
                    }
        <div className='flex space-x-4 mt-2'>
          <button className={`uppercase lg:text-base text-sm font-bold ${mode === false ? 'text-orange-2' : 'text-black opacity-75'} duration-300`} onClick={() => setMode(false)}>Inscriptions</button>
        <button className={`uppercase lg:text-base text-sm font-bold ${mode === true ? 'text-orange-2' : 'text-black opacity-75'} duration-300`} onClick={() => setMode(true)}>Rendez-vous</button>
        </div>
        <h1 className='font-bold lg:text-5xl text-3xl capitalize lg:mt-4 mt-20 mb-8 lg:ml-8'>inscriptions</h1>

        
        <div className='flex justify-end items-center mr-28 mb-4'>
            <div className='flex space-x-4 z-0'>
                {
                    views.map((v)=>(
                        <div onClick={()=>setView(v)} className={`font-bold cursor-pointer  ${view===v?'text-blue-primary':'text-black opacity-70'}`}>{v}</div>
                    ))
                }
            </div>
        </div>
        {
            views.map((v)=>(
            view===v&&
            <div className='flex flex-col space-y-2 mr-20'>
                {inscriptionsData.length>0&&
                    inscriptionsData.filter((data)=>data.element.State===states[views.indexOf(v)]).map((data,index)=>(
                        <InscriptionCard id={data.element._id} view={views.indexOf(v)} index={index} img={profilePic} name={data.firstName+' '+data.lastName}></InscriptionCard>
                    ))
                }
                {inscriptionsData.filter(ins=>ins.element.State===states[views.indexOf(v)]).length===0&&
                    <div className='flex flex-col items-center mt-20 text-4xl space-y-2 mr-20'>
                        <div>Aucune Inscription</div>
                    </div>
                }
            </div>
            ))
        }

    </div>
    }
    { mode===true&&
    <div className={`font-body relative duration-300 lg:pl-8 pt-8 ${isOpen?'lg:ml-[12rem]':'lg:ml-[6rem]'}`}>
         {afficherrdv &&
                    <PopUpConsultRdv id={id} afficher={afficherrdv} setAfficher={setAfficherrdv}/>
        }
         <div className='flex space-x-4 mt-2'>
          <button className={`uppercase lg:text-base text-sm font-bold ${mode === false ? 'text-orange-2' : 'text-black opacity-75'} duration-300`} onClick={() => setMode(false)}>Inscriptions</button>
          <button className={`uppercase lg:text-base text-sm font-bold ${mode === true ? 'text-orange-2' : 'text-black opacity-75'} duration-300`} onClick={() => setMode(true)}>Rendez-vous</button>
        </div>
        <h1 className='font-bold lg:text-5xl text-3xl capitalize lg:mt-4 mt-20 mb-8 lg:ml-8'>Rendez-vous</h1>
        <div className='flex justify-end items-center mr-28 mb-4'>
            <div className='flex space-x-4 z-0'>
                {
                    views.map((v)=>(
                        <div onClick={()=>setView(v)} className={`font-bold cursor-pointer  ${view===v?'text-blue-primary':'text-black opacity-70'}`}>{v}</div>
                    ))
                }
            </div>
        </div>
        {
            views.map((v)=>(
            view===v&&
            <div className='flex flex-col space-y-2 mr-20'>
                {rendezVousData.length>0&&
                    rendezVousData.filter((data)=>data.element.state===states[views.indexOf(v)]).map((data,index)=>(
                        <RdvCard id={data.element._id} view={views.indexOf(v)} index={index} img={profilePic} name={data.firstName+' '+data.lastName}></RdvCard>
                    ))
                }
                {rendezVousData.filter(rv=>rv.element.state===states[views.indexOf(v)]).length===0&&
                    <div className='flex flex-col items-center mt-20 text-4xl space-y-2 mr-20'>
                        <div>Aucun Rendez-vous</div>
                    </div>
                }
            </div>
            ))
        }
    </div>
    }
    </div>

  )
}

export default Inscriptions