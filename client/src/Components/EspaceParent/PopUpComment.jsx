import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import annuler from "../../Assets/Parent Space/annuler.png";
import Enfantsel from './Enfantsel';
import MyLink from '../MyLink';
import Checkbox from './CheckBox';
import star from '../../Assets/Parent Space/star.png'
import starfilled from '../../Assets/Parent Space/star1.png'

import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';
function PopUpComment(props) {
    const {refresh,setRefresh,kindergartenId}=props
    // Etat local pour le contrôle de l'affichage de la pop-up
    const [afficher, setAfficher] = useState(false);
    const [child,setChild]=useState(null)
    const [comment,setComment] = useState('')
    const [rating,setRating] = useState(1)
    const ratings=[1,2,3,4,5]

    

    // Fonction pour fermer la pop-up
    const fermerPopUp = () => {
        setAfficher(false);
    }
    const userToken=JSON.parse(localStorage.getItem('user'))

    
    
    const handleRadioChange=(e)=>{
        setChild(e.target.value)
        console.log(e.target.value)
    }
    

    const handleComment=async(e)=>{
        e.preventDefault()
        await axios.post(`${process.env.REACT_APP_API_URL}/Parent/reviews/${kindergartenId}`, {
        content:comment,
        rating:rating
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken.token}`
        }
      })
      .then((response) => {
        console.log(response.data); // log the response data (optional)
        setRefresh(prev=>prev+1);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    }
    return (
        <div className='z-[100000]'>
            <ToastContainer></ToastContainer>
            <button onClick={() => setAfficher(true)}>

                <button onClick={() => setAfficher(true)}>
                <button className=" w-[18rem] mb-2  self-center h-11 mt-2 bg-blue-primary text-white font-bold rounded-full outline outline-2 outline-blue-primary hover:outline-blue-primary hover:bg-opacity-40 active:bg-blue-primary duration-125ms" type="submit">
                  <div></div>
                  <p className="justify-self-center">Ajouter un Commentaire</p>
                </button>
                </button>
            </button>

            {/* Contenu de la pop-up */}
            {afficher &&
                <div className="fixed inset-0  bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-6 overflow-y-scroll w-4/5 h-4/5 rounded-md">
                        <button className="float-right" onClick={fermerPopUp}>X</button>
                        <h2 className="text-lg font-bold text-blue-primary mb-4">Commentaire</h2>
                        
                        <div className='flex items-center justify-center mb-12'>
                            {
                                ratings.map((r)=>(
                                    <div className=' hover:bg-gray-100 rounded-full p-1' onClick={()=>setRating(r)}>
                                        <img className='w-12 aspect-square' src={r>rating?star:starfilled} alt="" />
                                    </div>  
                                ))
                            }
                            
                        </div>
                       
                        <textarea onChange={(e)=>setComment(e.target.value)} value={comment} name=""  id="" cols="20" rows="4" className='border-2 w-full border-blue-primary rounded-xl outline-none p-4 resize-none'></textarea>
                        

                        <button onClick={handleComment} className=" px-4 mb-2 self-end float-right mt-5 h-11  bg-blue-primary text-white font-bold rounded-full outline outline-2 outline-blue-primary hover:outline-blue-primary hover:bg-opacity-40 active:bg-blue-primary duration-125ms" type="submit">
                            
                            <p className="justify-self-center"onClick={fermerPopUp}>Ajouter Commentaire</p>
                        </button>
                    </div>
                </div>
            }
        </div >
    );
}
export default PopUpComment



