import React from 'react';



const Mdp1 = (props) => {
   
    const handleNext = (e) => {
        e.preventDefault()
        props.incProgress()
    }
    return (
        <div className='font-body'>
            <form className='grid grid-cols-1  grid-flow-row gap-x-24 gap-y-3' action="" onSubmit={(e) => handleNext(e)}>
                <div className='flex flex-col justify-center items-center  text-lg'>
                    <label className='ml-4 font-normal opacity-60'>Entrez votre mot de passe</label>
                    <input required type="password" name='password' value={props.formFields.oldpassword} onChange={(e) => props.handleInputChange(e)} className='border-2 border-blue-primary rounded-lg h-10 w-70  px-10 focus:outline-none' />
                    
                    <button className=' mt-4 w-fit  pl-2 pr-2 items-center outline outline-2 outline-blue-primary bg-blue-primary text-white font-bold  h-10 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]'> <div></div> <p className='justify-self-center'>Suprimer mon compte</p> </button>

                </div>

            </form>
        </div>
    )
}

export default Mdp1