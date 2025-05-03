import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';



function PopUpConsultRdv(props) {
    const {id}=props
    // Etat local pour le contrôle de l'affichage de la pop-up
    const {afficher, setAfficher} = props

    const [rdv,setRdv]=useState({
        objet:'',
        description:'',
        date:''
    })
    const userToken=JSON.parse(localStorage.getItem('user'))


    // Fonction pour fermer la pop-up
    const fermerPopUp = () => {
        setAfficher(false);
    }
    useEffect(()=>{

        axios.get(`${process.env.REACT_APP_API_URL}/kindergarten/rendezvous/${id}`,  {
             headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${userToken.token}`
             }
           })
           .then((response) => {
             console.log(response.data); // log the response data (optional)
             setRdv(response.data.rv);
           })
           .catch((error) => {
             toast(error);
           });
       
     },[])
    return (
        <div className='z-[10000000000000000000] absolute'>

            
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-6 overflow-y-scroll rounded-md pb-20">
                        <button className="float-right" onClick={fermerPopUp}>X</button>
                        <h2 className="text-lg font-bold text-blue-primary mb-4">Formulaire de prise de rendez-vous</h2>
                        <p className="mb-2">Remplissez ce formulaire afin  de prendre un rendez-vous avec un responsable de cette creche</p>
                        <div className='flex flex-col items-center'>
                            <p className="text-lg font-bold text-orange-2 mb-2">Objet du rdv</p>
                            <div cols="20" rows="1" className="mb-2 outline-none border-2 resize-none p-4 border-blue-primary border-opacity-70 rounded-lg w-3/4" >{rdv.objet}</div>
                            <p className="text-lg font-bold text-orange-2 mb-2">Description</p>
                            <div cols="20" rows="4" className=" outline-none mb-2 border-2 resize-none p-4 border-blue-primary border-opacity-70 rounded-lg w-3/4" >{rdv.description}</div>
                            <p className="text-lg font-bold text-orange-2 mb-2">Date de Rendez-vous</p>
                            <div cols="20" rows="4" className=" outline-none mb-2 border-2 resize-none p-4 border-blue-primary border-opacity-70 rounded-lg w-3/4" >{rdv.date}</div>

                        </div>
                        

                   
                </div>
                </div>
            
        </div >
    );
}
export default PopUpConsultRdv