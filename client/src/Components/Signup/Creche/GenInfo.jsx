import React, { useEffect,useRef } from 'react'
import { useState } from 'react'
import Dropdown from '../../Dropdown'
import expandRight from '../../../Assets/Signup/expand_right.png'
import check from '../../../Assets/Signup/check.png'
import MapPicker from '../../MapPicker'
import location from '../../../Assets/Signup/location.png'
import MyLink from '../../MyLink'
import Wilayas from '../../../Constants/Wilayas'
import Communes from '../../../Constants/Communes'

const GenInfo = (props) => {
    const [lng, setLng] = useState(3.1739156);
    const [lat, setLat] = useState(36.7050299);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const cpRef=useRef(null)
    const [isChecked, setIsChecked] = useState(false);
    const [visible1,setVisible1]=useState(false)
    const [visible2,setVisible2]=useState(false)
    const [wilayas,setWilayas]=useState(null)
    const [communes,setCommunes]=useState(null)
    const [wilaya,setWilaya]=useState(props.formFields.wilaya.name)
    const [commune,setCommune]=useState(props.formFields.commune.name)
  
    const wilayaRef=useRef(null)
    const communeRef=useRef(null)
  
    const handleClick1=(e)=>{
        setWilaya(e.target.textContent)
        setVisible1(false)
        console.log('rani hna')
        const c={
          name:'',
          id:'',
          longitude:'',
          latitude:''
        }
        setCommune('')
  
        props.handleCommuneInput(c.name,c.id,c.longitude,c.latitude)
        props.handleWilayaInput(e.target.textContent,Wilayas.find(w=>w.name===e.target.textContent).id)
    }
    const handleClick2=(e)=>{
      setCommune(e.target.textContent)
      setVisible2(false)
      const c=Communes.find(c=>c.name===e.target.textContent)
      props.handleCommuneInput(e.target.textContent,c.id)
  }
     const handleChange1=(e)=>{
        setWilaya(e.target.value)
        setVisible1(true)
     }
     const handleChange2=(e)=>{
      setCommune(e.target.value)
      setVisible2(true)
   }
    useEffect(()=>{
      const tmp=Wilayas.filter(w=>w.name.toLowerCase().includes(wilaya.toLowerCase()))
      setWilayas(tmp.map((w)=>(
        {
          name:w.name,
          id:w.id
        })
      ))
      console.log(tmp)
  
    },[wilaya])
  
    useEffect(()=>{
      const tmp= Communes.filter(c=>
        (c.name.toLowerCase().includes(commune.toLowerCase()) && c.wilaya_id===props.formFields.wilaya.id))
      setCommunes(tmp.map((c)=>(
        {
          name:c.name,
          id:c.id,
          longitude:c.longitude,
          latitude:c.latitude
        })
      ))
      console.log(tmp)
  
    },[commune])
  
  
  const handleNext=(e)=>{
      props.formFields.wilaya.name===""?
        wilayaRef.current.setCustomValidity("Choisissez votre wilaya"):
        wilayaRef.current.setCustomValidity("")
        props.formFields.commune.name===""?
        communeRef.current.setCustomValidity("Choisissez votre commune"):
        communeRef.current.setCustomValidity("")
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        props.incProgress()
      }
    function handleCheckboxChange(event) {
        setIsChecked(event.target.checked);
    }
    useEffect(()=>{
        const tmp=props.formFields.password===props.formFields.confirmPassword
        setPasswordsMatch(tmp)
        console.log(props.formFields.password,props.formFields.confirmPassword,passwordsMatch)
        passwordsMatch?
        cpRef.current.setCustomValidity("")
        :cpRef.current.setCustomValidity("pass don't match")
    },[props.formFields.confirmPassword,passwordsMatch])
  
    const [map,setMap]=useState(false)
   
    useEffect(()=>{
        props.handleLocation(lng,lat)
    },[lng,lat])
    return (
    <div className='font-body ' >
        <form  action="" onSubmit={(e)=>handleSubmit(e)}>
        <div className='grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-x-24 gap-y-12'>

        <p className='md:col-span-2 font-semibold text-orange-2 text-lg place-self-center mt-12'>Informations de l’établissement</p>
                <div className='flex relative flex-col justify-center items-start  text-lg'>
                    <label className='ml-4 font-normal'>Nom de l’établissement<span className=' text-orange-2'>*</span></label>
                    <input required type="text" name='etabName' value={props.formFields.etabName} onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-full h-14 w-80 px-10 focus:outline-none' />
                </div>
                <div className='flex relative flex-col justify-center items-start w-fit text-lg'>
                    <label className='ml-4 font-normal'>Adresse exacte<span className=' text-orange-2'>*</span></label>
                    <input required type="text" name='' value={`${(props.formFields.location.longitude+',')||''}${props.formFields.location.latitude||''}`} className='border-2 border-blue-primary rounded-full h-14 w-80 pl-10 pr-20 focus:outline-none' />
                    <img src={location} alt="" className='absolute right-8 top-1/2 cursor-pointer hover:opacity-70 active:opacity-100' onClick={()=>setMap(prev=>!prev)}/>
                </div>
                {
                    map&&
                <div className='md:col-span-2'>
                    <MapPicker lng={lng} lat={lat} setLng={setLng} setLat={setLat} />
                </div>
                
                }
                
            <div className='flex relative flex-col justify-center items-start  text-lg'>
                <label className='ml-4 font-normal'>E-mail de l’établissement<span className=' text-orange-2'>*</span></label>
                <input required type="text" name='email' value={props.formFields.email} onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-full h-14 w-80 px-10 focus:outline-none' />

            </div>
            <div className='flex relative flex-col justify-center items-start  text-lg'>
                <label className='ml-4 font-normal'>Numéro de téléphone<span className=' text-orange-2'>*</span></label>
                <input required type="tel" name='phone' value={props.formFields.phone} pattern="[0-9]{3}[0-9]{3}[0-9]{4}" onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-full h-14 w-80 px-10 focus:outline-none' />
            </div>
            <div className='flex relative flex-col justify-center items-start  text-lg'>
                <label className='ml-4 font-normal'>Mot de passe<span className=' text-orange-2'>*</span></label>
                <input required type="password" name='password' value={props.formFields.password} onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-full h-14 w-80 px-10 focus:outline-none' />

            </div>
            <div className='flex relative flex-col justify-center items-start  text-lg'>
                <label className='ml-4 font-normal'>Confirmation mot de passe<span className=' text-orange-2'>*</span></label>
                <input ref={cpRef} required type="password" name='confirmPassword' value={props.formFields.confirmPassword} onChange={(e)=>props.handleInputChange(e)} onBlur={props.handleConfirmPasswordBlur} className='border-2 border-blue-primary rounded-full h-14 w-80 px-10 focus:outline-none' />
            </div>
            <div className='flex relative md:col-span-2 flex-col justify-center items-start  text-lg'>
                <label className='ml-4 font-normal'>Description<span className=' text-orange-2'>*</span></label>
                <textarea required type="text" name='description' value={props.formFields.description} placeholder='Ecrivez une description de votre établissement... ' onChange={(e)=>props.handleInputChange(e)} className='border-2 resize-none border-blue-primary rounded-2xl h-32 w-80 md:w-96 p-4 text-base focus:outline-none'> </textarea>

            </div>
            <p><span className='text-orange-2'> * </span>  champs obligatoires </p>
        </div>

        <div className='font-body grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-x-24 mt-6'>
            <div className='md:text-lg place-self-center text-center flex flex-col col-span-2 items-center w-80 md:w-auto mb-12'>
                <p className='font-normal flex'>Adresse de votre domicile<p className='text-orange-2'>*</p></p>
                <p className='opacity-70'>cela nous permettra de vous proposer aux parents à proximité</p>
            </div>
            <div className='flex flex-col col-span-2 space-y-12 mb-6'>
                <div className='flex flex-col justify-center items-center text-lg'>
                    <input id='hh' required ref={wilayaRef} type="text" name='wilaya' value={wilaya} onChange={(e)=>handleChange1(e)} className='border-2 border-blue-primary rounded-full h-14 w-80 md:w-[30rem] px-10 focus:outline-none' placeholder='Entrez le nom de votre ville'/>
                    {wilaya!='' &&visible1 &&wilayas.length>0 && <ul className='flex flex-col col-span-2 space-y-2 mt-4 max-h-52 overflow-auto'>
                        { wilayas.map((w)=>(
                        <li className='flex flex-col justify-center items-center text-lg'onClick={(e)=>handleClick1(e)}>
                            <div className='bg-blue-secondary flex items-center cursor-pointer hover:bg-blue-primary hover:text-white rounded-full h-10 w-80 md:w-[30rem] px-10 focus:outline-none duration-300' >{w.name}</div>
                        </li>
                        ))}
                    </ul>}
                </div>
                <div className='flex flex-col justify-center items-center text-lg'>
                    <input required ref={communeRef} type="text" name='commune' value={commune} onChange={(e)=>handleChange2(e)} className='border-2 border-blue-primary rounded-full h-14 w-80 md:w-[30rem] px-10 focus:outline-none' placeholder='Entrez le nom de votre commune'/>
                    {commune!='' &&visible2 &&<ul className='flex flex-col col-span-2 space-y-2 max-h-52 mt-4 overflow-auto'>
                        { communes.map((c)=>(
                        <li className='flex flex-col justify-center items-center text-lg'onClick={(e)=>handleClick2(e)}>
                            <div className='bg-blue-secondary flex items-center cursor-pointer hover:bg-blue-primary hover:text-white rounded-full h-10 w-80 md:w-[30rem] px-10 focus:outline-none duration-300' >{c.name}</div>
                        </li>
                        ))}
                    </ul>}
                </div>
            </div>
            <p className='col-span-2 md:ml-52'><span className='text-orange-2'> * </span>  champs obligatoires </p>
            <div>
            </div>
            <div className='my-8 col-span-2 place-self-center md:col-span-1 md:text-lg text-sm'>
                <div className='flex space-x-2'>
                <div className='relative w-5 h-5 rounded-full'>
                    <input required type="checkbox" className='appearance-none bg-transparent border-2 border-gray-600 rounded-full h-5 w-5 text-gray-600  ' onChange={(e)=>handleCheckboxChange(e)} style={{ boxShadow: 'none'}}/>
                    {isChecked && <img src={check} alt="" className='absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />}
                </div>
                <p className='w-80 md:w-96 '>J’accepte les conditions générales d’utilisation et la politique de confidentialité</p>
                </div>
            </div>
            <div></div>
            <div className='flex md:col-span-1 col-span-2 place-self-center md:place-self-auto justify-start space-x-4'>
                    <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-white text-gray-500 font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' onClick={props.decProgress}> <div></div> <p className='justify-self-center'>Retour</p> </button>
                    <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-blue-primary text-white font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' type='submit' onClick={handleNext} > <div></div> <p className='justify-self-center'>Suivant</p> <img className='justify-self-center' src={expandRight} alt="" /></button>
            </div>
        </div>
        </form>
    </div>
  )
}

export default GenInfo