import React from 'react'
import Dropdown from '../../Dropdown';
import expandRight from '../../../Assets/Signup/expand_right.png'
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Services = (props) => {
    const pedagogies = ['Montessori','Pikler-Loczy','Steiner-Waldorf','Freinet','Faber et Mazlish','Snoezelen'];
    const typeAccEnum=['Occasionnel','Régulier']
    const typeEtabEnum=['Etatique','Privé']
    const servicesEnum=['Cantine','Transport','Sport','Sorties','Islamique']
    const handleNext=async(e)=>{
        e.preventDefault()
        const reqData={
            email:props.formFields.email,
            password:props.formFields.password,
            phone:props.formFields.phone,
            location:{
                wilaya:props.formFields.wilaya.name,
                commune:props.formFields.commune.name
            },
            lng:props.formFields.location.longitude,
            lat:props.formFields.location.latitude,
            etabName:props.formFields.etabName,
            pedagogie:props.formFields.pedagogie,
            startAge:props.formFields.startAge,
            endAge:props.formFields.endAge,
            capacite:props.formFields.capacite,
            startHour:props.formFields.startHour,
            endHour:props.formFields.endHour,
            days:props.formFields.days,
            typeAccueil:props.formFields.typeAccueil,
            typeEtab:props.formFields.typeEtab,
            cout:props.formFields.cout,
            languages:props.formFields.languages,
            services:props.formFields.services,
            description:props.formFields.description
        }
        console.log(reqData)
        await axios.post(`${process.env.REACT_APP_API_URL}/kindergarten/register`,reqData).then((response) => {
            console.log(response.data); // log the response data (optional)
            props.setToken(response.data)
            props.incProgress()
          })
          .catch((error) => {
            toast.error(error.response.data.error)
          });
    }
    return (
    <form className='grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-x-24 gap-y-12' action="" onSubmit={(e)=>handleNext(e)}>
        <ToastContainer></ToastContainer>
        <p className='md:col-span-2 font-semibold text-orange-2 text-lg place-self-center mt-12'>Informations de l’établissement</p>
        <div className='flex self-start relative flex-col justify-center items-start md:col-span-1 text-lg'>
            <label className='ml-4 font-normal capitalize'>type d'accueil <span className=' text-orange-2'>*</span></label>
            <Dropdown required name="typeAccueil" value={props.formFields.typeAccueil} onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-full h-14 w-80 pl-10 pr-6 focus:outline-none'  key='1' elements={typeAccEnum}></Dropdown>
        </div>
        <div className='flex self-start relative flex-col justify-center items-start md:col-span-1 text-lg'>
            <label className='ml-4 font-normal capitalize'>pedagogie <span className=' text-orange-2'>*</span></label>
            <Dropdown required name="pedagogie" value={props.formFields.pedagogie} onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-full h-14 w-80 pl-10 pr-6 focus:outline-none'  key='1' elements={pedagogies}></Dropdown>
        </div>
        <div className='flex self-start relative flex-col justify-center items-start md:col-span-1 text-lg'>
            <label className='ml-4 font-normal capitalize'>type d'etablissement <span className=' text-orange-2'>*</span></label>
            <Dropdown required name="typeEtab" value={props.formFields.typeEtab} onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-full h-14 w-80 pl-10 pr-6 focus:outline-none'  key='1' elements={typeEtabEnum}></Dropdown>
        </div>
        <div className='flex self-start  flex-col justify-center items-start relative text-lg'>
            <label className='ml-4 font-normal capitalize'>Services<span className=' text-orange-2'>*</span></label>
            <div className='flex flex-col border-2 border-blue-primary w-full rounded-2xl p-4'>
                
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
            <div className='flex space-x-4 mt-12'>
                <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-white text-gray-500 font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' onClick={props.decProgress} > <div></div> <p className='justify-self-center'>Retour</p> </button>
                <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-blue-primary text-white font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' type='submit'  > <div></div> <p className='justify-self-center'>Suivant</p> <img className='justify-self-center' src={expandRight} alt="" /></button>
            </div>
      </div>
    </form>
  )
}

export default Services