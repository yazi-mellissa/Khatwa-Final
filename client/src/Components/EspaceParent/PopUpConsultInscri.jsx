import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import EnfantCard from './EnfantCard';
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';



function PopUpConsultInscri(props) {
    const user=JSON.parse(localStorage.getItem('user'))    
    const {afficher, setAfficher,id} = props

    // Fonction pour fermer la pop-up
    const fermerPopUp = () => {
        setAfficher(false);
    }
    const [inscription,setInscription]=useState(null)
    useEffect(()=>{

        axios.get(`${process.env.REACT_APP_API_URL}/kindergarten/preinscriptions/${id}`,  {
             headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${user.token}`
             }
           })
           .then((response) => {
             console.log(response.data.insc); // log the response data (optional)
             setInscription(response.data.insc);
           })
           .catch((error) => {
             toast(error);
           });
       
     },[])

    return (
        <div className='z-[1000] absolute'>

          

            {/* Contenu de la pop-up */}
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white  p-6 overflow-y-scroll rounded-md w-3/4 ">
                        <button className="float-right" onClick={fermerPopUp}>X</button>
                        <h2 className="text-xl self-center font-bold text-blue-primary mb-4">Inscription</h2>
                        <p className="mb-2">Details de l'inscription</p>
                        <div className='flex flex-col items-start md:ml-12'>
                        <p className="text-lg font-bold text-orange-2 mb-2">Enfant</p>
                        <EnfantCard enfant={inscription?inscription.child:[]}/>
                            <p className="text-lg font-bold text-orange-2 mt-4">L’estimation de cout </p>
                            <div className='flex flex-col md:flex-row items-center justify-between space-x-8 mt-2'>
                                    <div className='flex flex-col items-start'>
                                        <p className="mb-2">Voici l’estimation approximative des frais d'inscription</p>
                                    </div>
                                <div className="mb-2 border-2 border-blue-primary border-opacity-70 rounded-lg w-fit p-2">Cout Moyen: {inscription&&inscription.cout}DA/mois</div>
                    
                            </div>     
                            <p className="text-lg font-bold text-orange-2 mb-2">Services </p>
                            <div className='flex flex-col md:flex-row items-end justify-between space-x-8 mt-2'>
                                <div>
                                    {
                                        inscription&&
                                        inscription.services.map((service)=>(
                                            <div className='px-2 py-1 bg-orange-1 rounded-full text-white'>{service}</div>
                                        ))
                                    }
                                </div>
                            </div>                     
                        </div>
                       
                   
                </div>
                </div>
            
        </div >
    );
}
export default PopUpConsultInscri