import React, { useState } from 'react'
import { useSelector } from "react-redux";
import expandRight from "../../../Assets/Parent Space/chevron_right.png"




const Aide = (props) => {
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const isOpen1 = true
    const [nomdutilisateur, setNomdutilisateur] = useState('');
    const [objet, setObjet] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Nomdutilisatuer: ${nomdutilisateur} Objet: ${objet} Message: ${message}`);
    };
    return (
        <div className={`font-body duration-300 md:pl-8 pt-8 ${isOpen ? 'md:ml-[12rem]' : 'md:ml-[6rem]'}`}>
            <div className={`font-body md:items-start items-center flex flex-col duration-300 pt-8 md:pt-2 ${isOpen1 ? 'md:ml-[12rem]' : 'md:ml-[12rem]'}`}>

                <div className='mt-20 md:mt-0 ml-8 md:ml-0 p-4 pt-0 col-span-1 md:col-span-3 flex flex-col items-center md:items-start mb-5'>
                    <div className=" font-bold text-xl md:text-2xl ">Aide</div>
                    <p className='opacity-60 text-lg '>Vous avez des questions concernant Khatwa? vous rencontrez un probleme lors de l’utilisation? ici vous touverez vos reponses </p>
                    <div className=' mt-8 opacity-50 h-[1.5px] bg-black w-[90%]'></div>
                    <div className='grid grid-cols-1  gap-y-1 mt-10 '>
                        

                            <div className="  font-bold text-lg  text-orange-1 ">Signaler un probleme</div>

                            <div className='text-lg opacity-60 '>
                                Vous avez rencontré un probleme? Expliquez nous brievement ce qui s’est passé ou ce qui ne fonctionne pas
                            </div>
                            <div className='flex flex-col self-start '>
                                <textarea
                                    className="w-3/4 block rounded-xl mt-4 mb-4 border-black border-opacity-60  border-2 outline-none py-2 px-4 transition duration-400 ease-in-out hover:box-shadow-xl hover:scale-105  text-top"
                                    autoComplete="off"
                                    name="Message"
                                    id="message"
                                    required
                                    placeholder="message"
                                    value={message}
                                    onChange={(event) => setMessage(event.target.value)}
                                />
                             
                        
                                 <button
                                    className=' self-start outline outline-2 outline-orange-1 bg-light-orange-1  text-orange-2 font-bold w-[7rem] h-10 rounded-lg  hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]'
                                    type='submit'
                                >
                                    <p className='text-lg'>Envoyer</p>
                                </button>
                           
                                </div>

                        


                    </div>
                 
                </div>
            </div>
        </div>
    )
}
export default Aide