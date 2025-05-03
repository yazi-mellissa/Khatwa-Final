import React, { useEffect } from 'react'
import { useState, useRef } from 'react'



const Mdp = (props) => {
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const cpRef = useRef(null)

    useEffect(() => {
        const tmp = props.formFields.password === props.formFields.confirmPassword
        setPasswordsMatch(tmp)
        console.log(props.formFields.password, props.formFields.confirmPassword, passwordsMatch)
        passwordsMatch ?
            cpRef.current.setCustomValidity("")
            : cpRef.current.setCustomValidity("pass don't match")
    }, [props.formFields.confirmPassword, passwordsMatch])
    const handleNext = (e) => {
        e.preventDefault()
        props.incProgress()
    }
    return (
        <div className='font-body'>
            <form className='grid grid-cols-1  grid-flow-row gap-x-24 gap-y-3' action="" onSubmit={(e) => handleNext(e)}>
                <div className='flex relative flex-col justify-center items-start  text-lg'>
                    <label className='ml-4 font-normal opacity-60'>Ancien mot de passe</label>
                    <input required type="password" name='password' value={props.formFields.oldpassword} onChange={(e) => props.handleInputChange(e)} className='border-2 border-blue-primary rounded-lg h-10 w-70  px-10 focus:outline-none' />

                </div>
                <div className='flex relative flex-col justify-center items-start  text-lg'>
                    <label className='ml-4 font-normal opacity-60 '>Mot de passe</label>
                    <input required type="password" name='password' value={props.formFields.password} onChange={(e) => props.handleInputChange(e)} className='border-2 border-blue-primary rounded-lg h-10 w-70  px-10 focus:outline-none' />

                </div>
                <div className='flex relative flex-col justify-center items-start  text-lg'>
                    <label className='ml-4 font-normal opacity-60'>Confirmation mot de passe</label>
                    <input ref={cpRef} required type="password" name='confirmPassword' value={props.formFields.confirmPassword} onChange={(e) => props.handleInputChange(e)} onBlur={props.handleConfirmPasswordBlur} className=' border-2 border-blue-primary rounded-lg h-10 w-70 px-10 focus:outline-none' />
                </div>



                <div className='flex place-self-center justify-center md:place-self-end  space-x-4'>
                    <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-blue-primary text-white font-bold w-36 h-10 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]'> <div></div> <p className='justify-self-center'>Enregistrer</p> </button>

                </div>

            </form>
        </div>
    )
}

export default Mdp