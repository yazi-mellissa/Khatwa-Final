import React, { useEffect, useRef, useState } from 'react'



const Info2 = (props) => {
    
    
  

    const handleNext=(e)=>{
        e.preventDefault()
        props.incProgress()
    }
    


    return (
    <div className='font-body ' >
            <form className='font-body grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-x-24 mt-6' action="" onSubmit={(e)=>handleNext(e)}>
               
                <div className='flex flex-col col-span-2 space-y-12 mb-6'>
                <div className='flex relative flex-col justify-center items-start  text-lg'>
                    <label className='ml-4 font-normal'>E-mail</label>
                    <input required type="email" name='email' value={props.formFields.email} onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-lg h-14 w-80 md:w-[30rem] px-10 focus:outline-none' />

                </div>
                <div className='flex relative flex-col justify-center items-start  text-lg'>
                    <label required className='ml-4 font-normal'>Numéro de téléphone</label>
                    <input type="tel" name='phone' value={props.formFields.phone} pattern="[0-9]{3}[0-9]{3}[0-9]{4}" onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-lg h-14 w-80 md:w-[30rem] px-10 focus:outline-none' />
                </div>
                </div>

            </form>
            
        

    </div>
  )
}

export default Info2