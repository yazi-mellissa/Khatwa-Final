import React, { useEffect, useRef, useState } from 'react'



const Info1 = (props) => {
    
    
  

    const handleNext=(e)=>{
        e.preventDefault()
        props.incProgress()
    }
    


    return (
    <div className='font-body ' >
            <form className='font-body grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-x-24 mt-6' action="" onSubmit={(e)=>handleNext(e)}>
               <div className='flex flex-col col-span-2 space-y-12 mb-6'>
                <div className='flex relative flex-col justify-center items-start  text-lg'>
                    <label className='ml-4 font-normal'>Nom</label>
                    <input required type="text" name='lastName' value={props.formFields.lastName} onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-lg h-14 w-80 px-10 focus:outline-none' />

                </div>
                <div className='flex relative flex-col justify-center items-start  text-lg'>
                    <label className='ml-4 font-normal'>Prénom</label>
                    <input required type="text" name='firstName' value={props.formFields.firstName} onChange={(e)=>props.handleInputChange(e)} className='border-2 border-blue-primary rounded-lg h-14 w-80 px-10  focus:outline-none' />

                </div>
                </div>
              

            </form>
            
        

    </div>
  )
}

export default Info1