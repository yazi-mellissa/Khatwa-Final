import React, { useEffect, useRef, useState } from 'react'
import expandRight from '../../../Assets/Signup/expand_right.png'
import Dropdown from '../../Dropdown'
import MyLink from '../../MyLink'


const GenInfo = (props) => {
    const el=['Mr','Mme']
    const cpRef=useRef(null)
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    useEffect(()=>{
        const tmp=props.formFields.password===props.formFields.confirmPassword
        setPasswordsMatch(tmp)
        console.log(props.formFields.password,props.formFields.confirmPassword,passwordsMatch)
        passwordsMatch?
        cpRef.current.setCustomValidity("")
        :cpRef.current.setCustomValidity("pass don't match")
    },[props.formFields.confirmPassword,passwordsMatch])

    const handleNext=(e)=>{
        e.preventDefault()
        props.incProgress()
    }
    

    
    return (
    <div className='font-body ' >
            <form className='grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-x-24 gap-y-12' action="" onSubmit={(e)=>handleNext(e)}>
                <div className='flex relative flex-col justify-center items-start md:col-span-2 mt-20 text-lg'>
                    <label className='ml-4 font-normal'>Civilité<span className=' text-orange-2'>*</span></label>
                    <Dropdown required name="civilite" value={props.formFields.civilite} onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-full h-14 w-80 pl-10 pr-6 focus:outline-none'  key='1' elements={el}></Dropdown>
                </div>
                <div className='flex relative flex-col justify-center items-start  text-lg'>
                    <label className='ml-4 font-normal'>Nom<span className=' text-orange-2'>*</span></label>
                    <input required type="text" name='lastName' value={props.formFields.lastName} onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-full h-14 w-80 px-10 focus:outline-none' />

                </div>
                <div className='flex relative flex-col justify-center items-start  text-lg'>
                    <label className='ml-4 font-normal'>Prénom<span className=' text-orange-2'>*</span></label>
                    <input required type="text" name='firstName' value={props.formFields.firstName} onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-full h-14 w-80 px-10 focus:outline-none' />

                </div>
                <div className='flex relative flex-col justify-center items-start  text-lg'>
                    <label className='ml-4 font-normal'>E-mail<span className=' text-orange-2'>*</span></label>
                    <input required type="email" name='email' value={props.formFields.email} onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-full h-14 w-80 px-10 focus:outline-none' />

                </div>
                <div className='flex relative flex-col justify-center items-start  text-lg'>
                    <label required className='ml-4 font-normal'>Numéro de téléphone<span className=' text-orange-2'>*</span></label>
                    <input type="tel" name='phone' value={props.formFields.phone} pattern="[0-9]{3}[0-9]{3}[0-9]{4}" onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-full h-14 w-80 px-10 focus:outline-none' />
                </div>
                <div className='flex flex-col justify-center items-start  text-lg'>
                    <label className='ml-4 font-normal' htmlFor="password">Mot de passe<span className=' text-orange-2'>*</span></label>
                    <input required type="password" name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters" value={props.formFields.password} onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-full h-14 w-80 px-10 focus:outline-none' />
                </div>
                <div className='flex flex-col relative justify-center items-start text-lg self-end'>
                    <label className='ml-4 font-normal' htmlFor="confirm-password">Confirmation mot de passe<span className=' text-orange-2'>*</span></label>
                    <input required ref={cpRef} type="password" name="confirmPassword" value={props.formFields.confirmPassword}  onChange={(e)=>props.handleInputChange(e)} onBlur={props.handleConfirmPasswordBlur} className='border-2 border-blue-primary rounded-full h-14 w-80 px-10 focus:outline-none' />
                </div>
                <p><span className='text-orange-2'> * </span>  champs obligatoires </p>
                <div className='flex space-x-4'>
                    <MyLink to='..'>
                        <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-white text-gray-500 font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' > <div></div> <p className='justify-self-center'>Retour</p> </button>
                    </MyLink>
                    <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-blue-primary text-white font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' type='submit'  > <div></div> <p className='justify-self-center'>Suivant</p> <img className='justify-self-center' src={expandRight} alt="" /></button>
                </div>

            </form>
            
        

    </div>
  )
}

export default GenInfo