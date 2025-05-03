import React, { useState } from 'react'
import { useSelector } from "react-redux";
import Toggle from '../../../Components/EspaceParent/Toggle';
import axios from 'axios';
import Mdp from '../../../Components/EspaceParent/Mdp';
import Mdp1 from '../../../Components/EspaceParent/Mdp1';

const Compte = (props) => {
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const isOpen1 = true
    const [formFields, setFormFields] = useState({
        oldpassowrd: '',
        password: '',
        confirmPassword: '',
    });
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
        <div className={`font-body duration-300 md:pl-8 pt-8 ${isOpen ? 'md:ml-[12rem]' : 'md:ml-[6rem]'}`}>
            <div className={`font-body md:items-start items-center flex flex-col duration-300 pt-8 md:pt-2 ${isOpen1 ? 'md:ml-[12rem]' : 'md:ml-[12rem]'}`}>

                <div className='mt-20 md:mt-0 md:ml-12 col-span-1 md:col-span-3 flex flex-col items-center md:items-start mb-5'>
                    <div className=" font-bold text-xl md:text-2xl ">Mon Compte</div>
                    <div className=' mt-8 opacity-50 h-[1.5px] bg-black w-[90%]'></div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 ml-5 md:ml-0'>
                        <div className='flex flex-col'>

                            <div className=" font-bold text-lg  text-orange-1 ">Mot de passe</div>

                            <div className='text-lg opacity-60 '>
                                Vous souhaitez changer de mot de passe?
                            </div>
                        </div>
                        <div className=''>

                            <Mdp handleConfirmPasswordBlur={handleConfirmPasswordBlur} formFields={formFields} handleInputChange={handleInputChange} confirmPasswordTouched={confirmPasswordTouched} />
                        </div>

                    </div>
                    <div className=' mt-8 opacity-50 h-[1.5px] bg-black w-[90%]'></div>
                    <div className='grid grid-cols-1  gap-4 mt-5 ml-5 md:ml-0'>


                        <div className=" font-bold text-lg  text-orange-1 ">Notifications push</div>
                        <div className='flex space-x-3'>
                            <Toggle/>
                            <div className=' text-lg opacity-80'> Afficher vos informations et les informations de vos enfants sur votre profil </div>
                        </div>
            


                    </div>
                    <div className=' mt-8 opacity-50 h-[1.5px] bg-black w-[90%]'></div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 ml-5 md:ml-0'>
                        <div className='flex flex-col'>

                            <div className=" font-bold text-lg  text-orange-1 ">Suppression de  compte</div>
                            <div className='text-lg  opacity-60 '>
                                vous souhaitez quitter Khatwa deja ! sachez que vous pouvez recreer un compte quand vous le voulez, nous attendrons votre retour avec impatience
                            </div>
                        </div>
                        <div className=''>

                            <Mdp1 formFields={formFields} handleInputChange={handleInputChange} confirmPasswordTouched={confirmPasswordTouched} />
                        </div>

                    </div>

                </div>
            </div>
        </div>

    )
}
export default Compte
/*
                        <div className='flex flex-col w-3/4 gap-x-1'>
                           
                            <div className=' text-lg opacity-100 font-semibold'>comptes signalés</div>
                            <div className=' text-lg opacity-60 '>si vous trouvez le contenu ou les interactions d’un compte inappropriés ou indésirables vous pouvez le signaler a notre equipe</div>
                            <div className=' text-lg opacity-100  text-blue-primary hover:underline'>voir la liste des comptes signalés</div>


                        </div>*/