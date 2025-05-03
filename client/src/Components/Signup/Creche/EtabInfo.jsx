import React,{useState,useEffect,useRef} from 'react'
import expandRight from '../../../Assets/Signup/expand_right.png'
import check from '../../../Assets/Signup/check.png'
import Dropdown from '../../Dropdown'
import MyLink from '../../MyLink'
import TimePicker from 'react-time-picker';



const EtabInfo = (props) => {
    const el=[""]
    const handleNext=(e)=>{
        e.preventDefault()
        props.incProgress()
    }
    const startHours = ['6:00', '7:00', '8:00', '9:00', '10:00','11:00','12:00'];
    const endHours = ['12:00', '13:00', '14:00', '15:00', '16:00','17:00','18:00','19:00','20:00'];
    const daysEnum = ['Samedi', 'Dimanche', 'Lundi', 'Mardi', 'Mercredi','Jeudi','Vendredi'];
    const langEnum = ['Arabe', 'Anglais', 'Francais', 'Autres'];
    
    return(
    <form className='grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-x-24 gap-y-12' action="" onSubmit={(e)=>handleNext(e)}>
        <p className='md:col-span-2 font-semibold text-orange-2 text-lg place-self-center mt-12'>Informations de l’établissement</p>
        <div className='flex self-start relative flex-col justify-center items-start md:col-span-1 text-lg'>
            <label className='ml-4 font-normal capitalize'>Heure de Début<span className=' text-orange-2'>*</span></label>
            <Dropdown required name="startHour" value={props.formFields.startHour} onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-full h-14 w-80 pl-10 pr-6 focus:outline-none'  key='1' elements={startHours}></Dropdown>
        </div>
        <div className='flex self-start relative flex-col justify-center items-start md:col-span-1 text-lg'>
            <label className='ml-4 font-normal capitalize'>Heure de Fin<span className=' text-orange-2'>*</span></label>
            <Dropdown required name="endHour" value={props.formFields.endHour} onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-full h-14 w-80 pl-10 pr-6 focus:outline-none'  key='1' elements={endHours}></Dropdown>
        </div>
        <div className='flex self-start  flex-col justify-center items-start relative text-lg'>
            <label className='ml-4 font-normal capitalize'>Age Minimal<span className=' text-orange-2'>*</span></label>
            <input required type="number" name='startAge' value={props.formFields.startAge} onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-full h-14 w-80 px-10 focus:outline-none' />
            <p className='absolute right-24 top-1/2'>An(s)</p>
        </div>
        <div className='flex self-start  flex-col justify-center items-start relative text-lg'>
            <label className='ml-4 font-normal capitalize'>Age Maximal<span className=' text-orange-2'>*</span></label>
            <input required type="number" name='endAge' value={props.formFields.endAge} onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-full h-14 w-80 px-10 focus:outline-none' />
            <p className='absolute right-24 top-1/2'>An(s)</p>
        </div>
        <div className='flex self-start relative flex-col justify-center items-start  text-lg'>
            <label className='ml-4 font-normal capitalize'>capacité moyenne par classe<span className=' text-orange-2'>*</span></label>
            <input required type="number" name='capacite' value={props.formFields.capacite} onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-full h-14 w-80 px-10 focus:outline-none' />
        </div>
        <div className='flex self-start  flex-col justify-center items-start relative text-lg'>
            <label className='ml-4 font-normal capitalize'>cout moyen<span className=' text-orange-2'>*</span></label>
            <input required type="number" name='cout' value={props.formFields.cout} onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-full h-14 w-80 px-10 focus:outline-none' />
            <p className='absolute right-24 top-1/2'>DA/Mois</p>
        </div>
        
        <div className='flex self-start  flex-col justify-center items-start relative text-lg'>
            <label className='ml-4 font-normal capitalize'>jours d'accueil<span className=' text-orange-2'>*</span></label>
            <div className='flex flex-col border-2 border-blue-primary w-full rounded-2xl p-4'>
                
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
      <div className='flex self-start flex-col justify-center items-start relative text-lg'>
            <label className='ml-4 font-normal capitalize'>Langues<span className=' text-orange-2'>*</span></label>
            <div className='flex flex-col border-2 border-blue-primary w-full rounded-2xl p-4'>
                
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
      <p><span className='text-orange-2'> * </span>  champs obligatoires </p>
        <div className='flex space-x-4'>
            <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-white text-gray-500 font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' onClick={props.decProgress} > <div></div> <p className='justify-self-center'>Retour</p> </button>
            <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-blue-primary text-white font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' type='submit'  > <div></div> <p className='justify-self-center'>Suivant</p> <img className='justify-self-center' src={expandRight} alt="" /></button>
        </div>
    </form>
   )
}

export default EtabInfo