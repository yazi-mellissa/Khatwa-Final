import React from 'react'
import parent from '../../Assets/Signup/parents.png'
import creche from '../../Assets/Signup/creche.png'
import MyLink from '../MyLink'
const Choice = () => {
  return (
    <div className='font-body flex flex-col justify-center items-center mt-12 md:mt-20 mx-2 mb-40'>
        <p className='uppercase font-bold text-blue-primary'>Inscription</p>
        <p className='capitalize font-bold text-2xl md:text-5xl mt-2 mb-6'>inscrivez vous en tant que</p>
        <p className='text-opacity-75 text-sm md:text-base capitalize text-center w-[90%] md:w-[40rem]'>choisissez le type d'utilisateur sous lequel vous souhaitez vous inscrire, pour vous assurer que vous pouvez avoir un accès complet à votre espace approprié</p>
        <p></p>
        <div className='flex items-center space-x-2 md:space-x-12 mt-12 md:mt-24'>
            <div className=''>
                <MyLink to='parent' className='flex flex-col items-center hover:bg-light-orange-3  hover:opacity-80 active:opacity-100 space-y-4 p-2 md:p-8 rounded-3xl duration-200 hover:text-orange-1 active:text-blue-primary'>
                    <p className='capitalize md:text-xl font-semibold'>Parent</p>
                    <img src={parent} alt="" className=' border-solid border-4 md:border-8 rounded-3xl border-orange-2 hover:border-light-orange-2 active:opacity-100 active:border-blue-primary  duration-200' /> 
                </MyLink>
            </div>
            <div className=''>
                <MyLink to='creche' className='flex flex-col items-center hover:bg-light-orange-3  hover:opacity-80 active:opacity-100 space-y-4 p-2 md:p-8 rounded-3xl duration-200 hover:text-orange-1 active:text-blue-primary'>
                    <p className='capitalize md:text-xl font-semibold text-center'>gestionnaire</p>
                    <img src={creche} alt="" className=' border-solid border-4 md:border-8 rounded-3xl border-orange-2 hover:border-light-orange-2 active:opacity-100 active:border-blue-primary  duration-200' /> 
                </MyLink>
            </div>
        </div>
    </div>
  )
}

export default Choice