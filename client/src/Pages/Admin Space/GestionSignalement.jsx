import React, { useState } from 'react'
import { useSelector } from "react-redux";
import Toggle from '../../Components/EspaceParent/Toggle';
import axios from 'axios';
import Mdp from '../../Components/EspaceParent/Mdp';
import PopUpCmp from '../../Components/Admin Space/PopUpCmp';
import AdminDropdown from '../../Components/Admin Space/AdminDropdown';
import profilePic from './../../Assets/Parent Space/Parenticon.png'
import commentaire from '../../Assets/Admin Space/commentaire.png'
import compte from '../../Assets/Admin Space/compte.png'
const GestionSignalement = (props) => {

    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const [tab, setTab] = useState(1);

    const CmptData = [
        {
            id: '',
            parent_id: '',
            name: 'Amor Mohamed',
            profilePic: profilePic,
            text: 'Signale par: Yazi Mellissa',
        },
        {
            id: '',
            parent_id: '',
            name: 'Amor Yahia',
            text: 'Signale par: Yazi Mellissa',
            profilePic: profilePic

        },
        {
            id: '',
            parent_id: '',
            name: 'Seghairi Abderraouf',
            text: 'Signale par: Yazi Mellissa',
            profilePic: profilePic

        },
        {
            id: '',
            parent_id: '',
            name: 'Seghairi Hhhh',
            text: 'Signale par: Yazi Mellissa',
            profilePic: profilePic

        },
        {
            id: '',
            parent_id: '',
            name: 'Seghairi Hhhh',
            text: 'Signale par: Yazi Mellissa',
            profilePic: profilePic

        },
        {
            id: '',
            parent_id: '',
            name: 'Seghairi Hhhh',
            text: 'Signale par: Yazi Mellissa',
            profilePic: profilePic

        },
        {
            id: '',
            parent_id: '',
            name: 'Amor Mohamed',
            text: 'Signale par: Yazi Mellissa',
            profilePic: profilePic
        },
        {
            id: '',
            parent_id: '',
            name: 'Amor Yahia',
            text: 'Signale par: Yazi Mellissa',
            profilePic: profilePic

        },
        {
            id: '',
            parent_id: '',
            name: 'Seghairi Abderraouf',
            text: 'Signale par: Yazi Mellissa',
            profilePic: profilePic

        },
        {
            id: '',
            parent_id: '',
            name: 'Seghairi Hhhh',
            text: 'Signale par: Yazi Mellissa',
            profilePic: profilePic

        },
        {
            id: '',
            parent_id: '',
            name: 'Seghairi Hhhh',
            text: 'Signale par: Yazi Mellissa',
            profilePic: profilePic

        },
        {
            id: '',
            parent_id: '',
            name: 'Seghairi Hhhh',
            text: 'Signale par: Yazi Mellissa',
            profilePic: profilePic

        },
    ]
    const CommentaireData = [
        {
            id: '',
            parent_id: '',
            name: 'Amor Mohamed',
            profilePic: profilePic,
            text: 'Signale par: Yazi Mellissa',
            commentaire: 'blablabla',
        },
        {
            id: '',
            parent_id: '',
            name: 'Amor Yahia',
            text: 'Signale par: Yazi Mellissa',
            profilePic: profilePic,
            commentaire: 'blablabla',

        },
        {
            id: '',
            parent_id: '',
            name: 'Seghairi Abderraouf',
            text: 'Signale par: Yazi Mellissa',
            profilePic: profilePic,
            commentaire: 'blablabla',

        },
        {
            id: '',
            parent_id: '',
            name: 'Seghairi Hhhh',
            text: 'Signale par: Yazi Mellissa',
            profilePic: profilePic,
            commentaire: 'blablabla',

        },
        {
            id: '',
            parent_id: '',
            name: 'Seghairi Hhhh',
            text: 'Signale par: Yazi Mellissa',
            profilePic: profilePic,
            commentaire: 'blablabla',

        },
        {
            id: '',
            parent_id: '',
            name: 'Seghairi Hhhh',
            text: 'Signale par: Yazi Mellissa',
            profilePic: profilePic,
            commentaire: 'blablabla',

        },
        {
            id: '',
            parent_id: '',
            name: 'Amor Mohamed',
            text: 'Signale par: Yazi Mellissa',
            profilePic: profilePic,
            commentaire: 'blablabla',
        },
        {
            id: '',
            parent_id: '',
            name: 'Amor Yahia',
            text: 'Signale par: Yazi Mellissa',
            profilePic: profilePic,
            commentaire: 'blablabla',

        },
        {
            id: '',
            parent_id: '',
            name: 'Seghairi Abderraouf',
            text: 'Signale par: Yazi Mellissa',
            profilePic: profilePic,
            commentaire: 'blablabla',

        },
        {
            id: '',
            parent_id: '',
            name: 'Seghairi Hhhh',
            text: 'Signale par: Yazi Mellissa',
            profilePic: profilePic,
            commentaire: 'blablabla',

        },
        {
            id: '',
            parent_id: '',
            name: 'Seghairi Hhhh',
            text: 'Signale par: Yazi Mellissa',
            profilePic: profilePic,
            commentaire: 'blablabla',

        },
        {
            id: '',
            parent_id: '',
            name: 'Seghairi Hhhh',
            text: 'Signale par: Yazi Mellissa',
            profilePic: profilePic,
            commentaire: 'blablabla',

        },
    ]
    const [showDetails, setShowDetails] = useState(false);
    
    const handleDetailsClick = () => {
        setShowDetails(!showDetails);
    };
    const CmptCard = (props) => {
        return (
            <div className={`flex flex-col lg:flex-row  items-center justify-between bg-white border-blue-primary border-2 rounded-2xl px-12 py-4 `}>
                <div className='flex flex-col'>
                    <div className='flex items-center space-x-6 ml-3 mr-3'>
                        <img className='w-12 aspect-square' src={profilePic} alt="" />
                        <div className='font-bold text-lg'>{props.CmptData.name}</div>

                    </div>
                    <div className='text-sm  text-opacity-70'>{props.CmptData.text}</div>
                </div>
                <div className='flex items-center justify-end mt-3 lg:mt-0 space-x-7 lg:space-x-4'>

                    <PopUpCmp text=" www" text1="balbala" />
                    <p className='block hover:underline text-gray-600 '><a href="../settings"> Supprimer le compte</a></p>
                </div>
            </div>
        )
    }
    const CommentaireCard = (props) => {
        return (
            <div className='flex flex-col'>
            <div className={`flex flex-col lg:flex-row  items-center justify-between bg-white border-blue-primary border-2 rounded-2xl px-12 py-4 `}>
                <div className='flex flex-col'>
                    <div className='flex items-center space-x-6 ml-3 mr-3'>

                        <img className='w-12 aspect-square' src={profilePic} alt="" />
                        <div className='font-bold text-lg'>{props.CommentaireData.name}</div>
                    </div>
                    <div className='text-sm  text-opacity-70'>{props.CommentaireData.text}</div>
                </div>
                <div className='flex items-center justify-end mt-3 lg:mt-0 space-x-7 lg:space-x-4'>


                    <p className='block underline text-gray-600'>
                        <a href="" onClick={handleDetailsClick}>Voir plus de détail</a>
                    </p>

                    <p className='block hover:underline text-gray-600 '><a href="./"> Supprimer le commentaire</a></p>
                </div>
                
            </div>
            <div>
            {showDetails && (
                <div className='text-sm ml-3 text-opacity-70'>{props.CommentaireData.commentaire}</div>
            )}
        </div>
        </div>
            
         
        )
    }



return (
    <div className={`font-body duration-300 lg:pl-8 pt-8 ${isOpen ? 'lg:ml-[12rem]' : 'lg:ml-[6rem]'} relative z-10`}>
        <h1 className="font-bold text-2xl capitalize lg:text-3xl mt-[8rem] lg:mt-4 mb-8 ml-3 lg:ml-8 text-orange-2">
            Gestion des Signalements
        </h1>
        <div className="fixed top-20  lg:top-2 right-0 z-50">
            <AdminDropdown name="Mellissa Yazi" />
        </div>
        <div className='mt-20 md:mt-0  col-span-1 md:col-span-2 flex flex-col items-center md:items-start mb-5'>
            <div className='lg:ml-10'>
                <div className='flex space-x-4 mt-2'>
                    <button className={`uppercase lg:text-base text-sm font-bold ${tab === 1 ? 'text-orange-2' : 'text-black opacity-75'} duration-300`} onClick={() => setTab(1)}>Comptes</button>
                    <button className={`uppercase lg:text-base text-sm font-bold ${tab === 2 ? 'text-orange-2' : 'text-black opacity-75'} duration-300`} onClick={() => setTab(2)}>Commentaires</button>

                </div>
                {
                    tab === 1 &&

                    <div>
                            <div class="p-5 flex flex-col justify-between items-center  mt-7 lg:w-full space-y-2 lg:mr-10 mx-auto">
                            <img className="w-15"src={compte} alt=""/>
                            <p className='block  text-gray-600 text-3xl'> Pas De Comptes Signales</p>
                            </div> 

                        <div class="p-5 flex flex-col justify-between lg:overflow-y-scroll lg:h-96  mt-7 lg:w-full space-y-2 lg:mr-10 mx-auto">
                            {CmptData.map((CmptData, index) => (
                                <CmptCard key={index} CmptData={CmptData} />
                            ))}
                        </div>
                    </div>
                }
                {
                    tab === 2 &&
                    <div>
                         <div class="p-5 flex flex-col justify-between items-center  mt-7 lg:w-full space-y-2 lg:mr-10 mx-auto">
                            <img className="w-15"src={commentaire} alt=""/>
                            <p className='block  text-gray-600 text-3xl'> Pas De Commentaires Signales</p>
                            </div> 

                        <div class="p-5 flex flex-col justify-between lg:overflow-y-scroll lg:h-96 lg:w-full mt-7 space-y-2 lg:mr-10 mx-auto">
                            {CommentaireData.map((CommentaireData, index) => (
                                <CommentaireCard key={index} CommentaireData={CommentaireData} />
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>
)
}
export default GestionSignalement