import React, { useState } from 'react'
import { useSelector } from "react-redux";
import Toggle from '../../Components/EspaceParent/Toggle';
import axios from 'axios';
import Mdp from '../../Components/EspaceParent/Mdp';

import AdminDropdown from '../../Components/Admin Space/AdminDropdown';
import Pic from "../../Components/EspaceParent/Pic"
const SettingsAdmin = (props) => {
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const [formFields, setFormFields] = useState({
        oldpassowrd: '',
        password: '',
        confirmPassword: '',
        profilePic: '',
    })
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormFields(prevFields => ({
            ...prevFields,
            [name]: value,
        }));

    };


    const submit = async (e) => {
        console.log('submit')
        try {
            await axios.post("http://localhost:8000/", formFields)
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleConfirmPasswordBlur = () => {
        setConfirmPasswordTouched(true);
    };

    return (
        <div className={`font-body duration-300 lg:pl-8 pt-8 ${isOpen ? 'lg:ml-[12rem]' : 'lg:ml-[6rem]'} relative z-10`}>
             <h1 className="font-bold text-2xl capitalize lg:text-3xl mt-[8rem] lg:mt-4 mb-8 ml-3 lg:ml-8 text-orange-2">
         Parametres 
        </h1>
            <div className="fixed top-20  lg:top-2 right-0 z-50">
                <AdminDropdown name="Mellissa Yazi" />
            </div>

         

                <div className='mt-20 md:mt-0 md:ml-12 col-span-1 md:col-span-3 flex flex-col items-center md:items-start mb-5'>
                <h1 className="font-bold text-2xl capitalize lg:text-3xl mt-[8rem] lg:mt-4 mb-8 ml-3 lg:ml-8 text-black ">
         Mon Compte
        </h1>
                    <div className=' mt-8 opacity-50 h-[1.5px] bg-black w-[90%]'></div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-10  mt-5 ml-5 md:ml-0'>
                        <div className='flex flex-col'>

                            <div className=" font-bold text-lg  text-orange-1 ">Mot de passe</div>

                            <div className='text-lg opacity-60 '>
                                Vous souhaitez changer le mot de passe?
                            </div>
                        </div>
                        <div >

                            <Mdp className='' handleConfirmPasswordBlur={handleConfirmPasswordBlur} formFields={formFields} handleInputChange={handleInputChange} confirmPasswordTouched={confirmPasswordTouched} />
                        </div>

                    </div>

                    <div className=' mt-8 opacity-50 h-[1.5px] bg-black w-[90%]'></div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 ml-5 md:ml-0'>
                        <div className='flex flex-col'>

                            <div className=" font-bold text-lg  text-orange-1 ">Photo de profil</div>
                            <div className='text-lg  opacity-60 '>
                            Vous pouvez changer votre photo de profil ici.
                            </div>
                        </div>
                        <div className=''>
                        <Pic formFields={formFields} handleInputChange={handleInputChange} />
                         
                        </div>

                    </div>

                </div>
       
        </div>

    )
}
export default SettingsAdmin
