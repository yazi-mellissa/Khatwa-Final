import React, { useEffect, useRef, useState } from 'react'
import Dropdown from '../Dropdown';
import MyLink from '../MyLink';
import Slider from './Slider';
import Checkbox from './CheckBox';
import expand from './../../Assets/Parent Space/expand.png'
const Form = (props) => {
    const type = ['','Etatique','Privé']
    const accueil=['','Occasionnel','Régulier']
    const h1 = ['','6:00', '7:00', '8:00', '9:00', '10:00','11:00','12:00']
    const h2 = ['','12:00', '13:00', '14:00', '15:00', '16:00','17:00','18:00','19:00','20:00'];
    const daysEnum = ['Samedi', 'Dimanche', 'Lundi', 'Mardi', 'Mercredi','Jeudi','Vendredi'];
    const pedagogies = ['','Montessori','Pikler-Loczy','Steiner-Waldorf','Freinet','Faber et Mazlish','Snoezelen'];
    const servicesEnum=['Cantine','Transport','Sport','Sorties','Islamique']
    const langEnum = ['Arabe', 'Anglais', 'Francais', 'Autres'];
    const [open,setOpen]=useState(false)
    const handleOpen=(e)=>{
        e.preventDefault()
        setOpen(prev=>!prev)
    }


    return (
        <form action='' className="p-3 w-full  rounded-lg border-2 border-black border-opacity-60 font-body grid grid-cols-1 grid-flow-row gap-x-24 gap-y-7" onSubmit={props.handleSubmit}>
            <div className='w-full flex items-center justify-between cursor-pointer hover:opacity-70 px-4 duration-300' onClick={handleOpen}>
                <p className="flex flex-col justify-center items-start font-bold text-lg ">Filtrer les Résultats</p>
                <button className='flex items-center justify-end hover:opacity-50 active:opacity-100' >
                    <img className='w-4 aspect-square duration-300' src={expand} style={{transform:!open?'':'rotate(180deg)'}} alt="" />
                </button>
            </div>
            {open&& 
            <div className='flex flex-col'>
            <div className='flex flex-col justify-center items-start mb-2  text-lg'>
                <label className='ml-4 font-normal'>Type d'etablissement</label>
                <Dropdown
                    name="typeEtab" value={props.formFields.typeEtab} onChange={(e) => props.handleInputChange(e)}
                    className='border-2 border-blue-primary rounded-full h-10 w-60 px-10 focus:outline-none'
                    elements={type}></Dropdown>


            </div>
            <div className='flex flex-col justify-center items-start mb-2 ml-3  text-lg'>
                <label className='ml-4 font-normal'>Age Maximal</label>
                <div className="flex items-center">
                    <input
                    type="range"
                    name='endAge'
                    min={0} // valeur minimale passée en tant que prop
                    max={6} // valeur maximale passée en tant que prop
                    value={props.formFields.endAge}
                    onChange={props.handleInputChange}
                    className="slider appearance-none h-3 w-50 bg-gray-300 rounded-full outline-none mr-2"
                    />
                    <span className="mr-2">{props.formFields.endAge} Ans</span>
                </div>
            </div>

            <div className='flex flex-col justify-center items-start mb-2  text-lg'>
                <label className='ml-4 font-normal'>Pedagogie</label>
                <Dropdown
                    name="pedagogie" value={props.formFields.pedagogie} onChange={(e) => props.handleInputChange(e)}
                    className='border-2 border-blue-primary rounded-full h-10 w-60 px-10 focus:outline-none'
                    elements={pedagogies}></Dropdown>

            </div>

            <div className="grid grid-cols-2 justify-center items-start mb-2  text-lg ml-3">
                <div className='flex flex-col  ml-3 text-lg'>
                    <label className='font-normal mb-2'>Langue</label>
                    <div className="container mx-auto">
                    {langEnum.map(checkboxValue => (
                <label key={checkboxValue}>
                <div className='flex items-center space-x-2 space-y-2'>

                    <input
                        type="checkbox"
                        value={checkboxValue}
                        checked={props.formFields.languages.includes(checkboxValue)} 
                        onChange={(e)=>props.handleCheckboxChange('languages',e)}
                        className="h-6 w-6 rounded border-blue-primary outline-blue-primary "
                    />
                    <p>{checkboxValue}</p>
                </div>
                </label>
                ))}

                    </div>

                </div>
                <div className='flex flex-col  ml-3 mb-2  text-lg'>
                    <label className=' font-normal mb-2'>Services</label>
                    <div className="container mx-auto">
                    {servicesEnum.map(checkboxValue => (
                <label key={checkboxValue}>
                <div className='flex items-center space-x-2 space-y-2'>

                    <input
                        type="checkbox"
                        value={checkboxValue}
                        checked={props.formFields.services.includes(checkboxValue)} 
                        onChange={(e)=>props.handleCheckboxChange('services',e)}
                        className="h-6 w-6 rounded border-blue-primary outline-blue-primary "
                    />
                    <p>{checkboxValue}</p>
                </div>
                </label>
                ))}
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-center items-start  mb-2  text-lg'>
                <label className='ml-3 font-normal'>Type d'acceuil</label>
                <Dropdown
                    name="typeAccueil" value={props.formFields.typeAccueil} onChange={(e) => props.handleInputChange(e)}
                    className='border-2 border-blue-primary rounded-full h-10 w-60 px-10 focus:outline-none'
                    elements={accueil}></Dropdown>

            </div>

            <div className='flex flex-col justify-center items-start mb-2  ml-3 text-lg'>
                <label className='font-normal'>Distance Maximale</label>
                <div className="flex items-center">
                    <input
                    type="range"
                    name='distance'
                    min={1} 
                    max={1000} 
                    value={props.formFields.distance}
                    onChange={props.handleInputChange}
                    className="slider appearance-none h-3 w-50 bg-gray-300 rounded-full outline-none mr-2"
                    />
                    <span className="mr-2">{props.formFields.distance} Km</span>
                </div>
            </div>
            <div className='flex flex-col justify-center items-start ml-3 mb-2  text-lg'>
                <label className='font-normal'>Cout Maximal</label>
                <div className="flex items-center">
                    <input
                    type="number"
                    name='cout'
                    min={0} // valeur minimale passée en tant que prop
                    max={30000} // valeur maximale passée en tant que prop
                    value={props.formFields.cout}
                    onChange={props.handleInputChange}
                    className="slider appearance-none h-8 p-2 w-50 border-2 border-gray-600 rounded-full outline-none mr-2"
                    />
                    <span className="mr-2"> DA/Mois</span>
                </div>
            </div>
            <div className='flex flex-col justify-center items-start mb-2  ml-3 text-lg'>
                <label className='font-normal mb-2'>Jours d'acceuil</label>
                <div className=" grid grid-cols-2 gap-2 gap-x-10 ">
                {daysEnum.map(checkboxValue => (
                <label key={checkboxValue}>
                <div className='flex items-center space-x-2 space-y-2'>

                    <input
                        type="checkbox"
                        value={checkboxValue}
                        checked={props.formFields.days.includes(checkboxValue)} 
                        onChange={(e)=>props.handleCheckboxChange('days',e)}
                        className="h-6 w-6 rounded border-blue-primary outline-blue-primary "
                    />
                    <p>{checkboxValue}</p>
                </div>
                </label>
                ))}
                </div>
            </div>
            <div className='flex flex-col justify-center items-start ml-3 mb-2  text-lg'>
                <label className='font-normal'>Note minimale</label>
                <div className="flex items-center">
                    <input
                    type="range"
                    name='rating'
                    min={0} // valeur minimale passée en tant que prop
                    max={5} // valeur maximale passée en tant que prop
                    value={props.formFields.rating}
                    onChange={props.handleInputChange}
                    className="slider appearance-none h-3 w-50 bg-gray-300 rounded-full outline-none mr-2"
                    />
                    <span className="mr-2">{props.formFields.rating} Etoiles</span>
                </div>
            </div>
            <div className='flex flex-col justify-center items-start ml-3 mb-2  text-lg'>
                <label className='font-normal'>Capacite Maximale</label>
                <div className="flex items-center">
                    <input
                    type="range"
                    name='capacite'
                    min={5} // valeur minimale passée en tant que prop
                    max={40} // valeur maximale passée en tant que prop
                    value={props.formFields.capacite}
                    onChange={props.handleInputChange}
                    className="slider appearance-none h-3 w-50 bg-gray-300 rounded-full outline-none mr-2"
                    />
                    <span className="mr-2">{props.formFields.capacite} Enfants/Classe</span>
                </div>
            </div>
            <div className="flex flex-wrap gaps-x-4 justify-center items-start mb-2  text-lg ml-3">
                <div className='flex flex-col justify-center items-start  text-lg'>
                    <label className='ml-4 font-normal'>Horraires D'ouverture</label>
                    <Dropdown
                        name="startHour" value={props.formFields.startHour} onChange={(e) => props.handleInputChange(e)}
                        className='border-2 border-blue-primary rounded-full h-10 w-60 px-10 focus:outline-none'
                        elements={h1}></Dropdown>
                </div>
                <div className='flex flex-col justify-center items-start mb-2  text-lg'>
                    <label className='ml-4 font-normal'>Horraires De fermeture</label>
                    <Dropdown
                        name="endHour" value={props.formFields.endHour} onChange={(e) => props.handleInputChange(e)}
                        className='border-2 border-blue-primary rounded-full h-10 w-60 px-10 focus:outline-none'
                        elements={h2}></Dropdown>
                </div>

            </div>
            <button className=" w-full mb-2  self-center h-11 mt-10 bg-blue-primary text-white font-bold rounded-full outline outline-2 outline-blue-primary hover:outline-blue-primary hover:bg-opacity-40 active:bg-blue-primary duration-125ms" type="submit">
                <div></div>
                <p className="justify-self-center">Afficher Les Resultats</p>
            </button>
            </div>
            }
        </form>
    )
}
export default Form
