import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';



function PopUpRdv(props) {
    const {kindergartenId}=props
    // Etat local pour le contrôle de l'affichage de la pop-up
    const [afficher, setAfficher] = useState(false);

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
    const handleRdv=async(e)=>{
        e.preventDefault()
        await axios.post(`${process.env.REACT_APP_API_URL}/Parent/rendezvous/${kindergartenId}`, {
        objet:rdv.objet,
        description:rdv.description,
        date:rdv.date
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken.token}`
        }
      })
      .then((response) => {
        console.log(response.data); // log the response data (optional)
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    }
    return (
        <div className='z-[1000000] relative'>

            <button onClick={() => setAfficher(true)}>


                <button className=" w-[18rem] mb-2  self-center h-11 mt-2 bg-blue-primary text-white font-bold rounded-full outline outline-2 outline-blue-primary hover:outline-blue-primary hover:bg-opacity-40 active:bg-blue-primary duration-125ms" type="submit">
                    <div></div>
                    <p className="justify-self-center">Rendez-vous</p>
                </button>
            </button>

            {/* Contenu de la pop-up */}
            {afficher &&
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-6 overflow-y-scroll rounded-md">
                        <button className="float-right" onClick={fermerPopUp}>X</button>
                        <h2 className="text-lg font-bold text-blue-primary mb-4">Formulaire de prise de rendez-vous</h2>
                        <p className="mb-2">Remplissez ce formulaire afin  de prendre un rendez-vous avec un responsable de cette creche</p>
                        <div className='flex flex-col items-center'>
                            <p className="text-lg font-bold text-orange-2 mb-2">Objet du rdv</p>
                            <textarea cols="20" rows="1" className="mb-2 outline-none border-2 resize-none p-4 border-blue-primary border-opacity-70 rounded-lg w-3/4" onChange={(e)=>setRdv({...rdv,objet:e.target.value})}>{rdv.objet}</textarea>
                            <p className="text-lg font-bold text-orange-2 mb-2">Description</p>
                            <textarea cols="20" rows="4" className=" outline-none mb-2 border-2 resize-none p-4 border-blue-primary border-opacity-70 rounded-lg w-3/4" onChange={(e)=>setRdv({...rdv,description:e.target.value})}>{rdv.description}</textarea>
                            <p className="text-lg font-bold text-orange-2 mb-2">Date de Rendez-vous</p>
                            <div className='w-3/4'>
                                <DatePicker placeholderText="Date de Rendez-vous" className='mb-2 border-2 p-2 border-blue-primary border-opacity-70 rounded-lg w-full' selected={rdv.date} onChange={(date) => setRdv({ ...rdv, date })} showTimeSelect timeFormat="HH:mm" timeIntervals={30} dateFormat="dd/MM/yyyy HH:mm" />
                            </div>
                        </div>
                        <button className=" w-fit p-2 mb-2  self-end float-right mt-5 h-11  bg-blue-primary text-white font-bold rounded-full outline outline-2 outline-blue-primary hover:outline-blue-primary hover:bg-opacity-40 active:bg-blue-primary duration-125ms" type="submit" onClick={handleRdv}>
                            <div></div>
                            <p className="justify-self-center"onClick={fermerPopUp}>Prendre un rendez-vous</p>
                        </button>

                   
                </div>
                </div>
            }
        </div >
    );
}
export default PopUpRdv