import React from 'react'
import img from '../../Assets/Home/questions.png'

const Question = () => {
  return (
    <div className='flex justify-center font-body overflow-hidden'>
        <div className='grid grid-cols-5 grid-flow-row-dense rounded-[3rem] bg-gradient-to-b from-light-orange-1 to-light-orange-3 bg-opacity-75 mt-10 mx-4 md:mx-32'>
            <div className='flex flex-col md:items-start justify-center md:ml-16 mt-8 md:mt-16 col-span-5 mx-8 md:mx-0 md:col-span-3 row-span-1'>
                <p className='uppercase font-bold text-blue-primary mb-2'>question?</p>
                <p className='capitalize font-bold text-2xl md:text-5xl'>Vous vous posez encore des questions ?</p>
            </div>
            <p className='text-opacity-75 text-sm md:text-base mx-8 md:ml-16 capitalize mt-4 mb-8 md:my-8 col-span-5 md:col-span-3 order-3 md:order-none'>Vous avez encore des questions en tete ? Consultez les questions fréquemment posées et leurs réponses en cliquant sur le bouton .</p>
            <button className=' text-gray-1 md:col-span-3 text-sm md:text-base col-span-5 row-span-1 md:mb-16 place-self-center justify-self-center order-last md:order-none mb-8 md:justify-self-start md:ml-16 font-semibold md:w-80 py-4 px-8 md:px-0 mx-4 md:mx-0 rounded-full bg-light-orange-1 outline outline-[1.5px] outline-orange-1 bg-opacity-50 hover:bg-blue-primary hover:bg-opacity-40 hover:outline-blue-primary hover:text-white active:bg-blue-primary duration-[125ms]'>obtenir des réponses à mes questions</button>
            <div className='col-span-5 md:col-span-2 place-self-center mx-12 mb-4 mt-4 md:my-0 md:row-span-3 md:order-none'>
                <img src={img} alt="" />
            </div>
        </div>
    </div> 
  )
}

export default Question