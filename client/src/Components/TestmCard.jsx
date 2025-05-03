import React from 'react'
import star from '../Assets/Home/star outline.png'

const TestmCard = (props) => {
  return (
    <div className='flex flex-col lg:flex-row font-body lg:justify-center items-center mx-8 lg:space-x-20 min-h-[400px] ease-out scale-up-center'>
                <img src={props.img} alt="" className='rounded-t-full rounded-b-full overflow-hidden max-w-[15rem] md:max-w-[275rem]' />
                <div className='flex flex-col justify-start my-8 md:m-0 max-w-[32rem]'>
                    <div className='flex items-center'>
                        <img src={star} alt="" />
                        <p className='md:text-xl opacity-75 ml-2'>{props.rating}</p>
                    </div>
                    <p className='md:text-xl opacity-75 my-4'>{props.description}</p>
                    <p className='uppercase text-xs md:text-base font-bold text-blue-primary md:ml-5'>{props.person}</p>
                </div>
    </div>
  )
}

export default TestmCard