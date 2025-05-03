import React from 'react'
import icon from '../Assets/Home/ourson.png'

const DykCard = (props) => {
  return (
    <div className='flex flex-col flex-nowrap items-center justify-center font-body rounded-xl h-[22rem] w-[19rem] outline outline-2 outline-orange-1 relative'>
        <img src={icon} className='absolute top-[-2rem] left-[-2rem]'/>
        <div className='uppercase font-bold text-orange-2 text-center mx-[1rem] mt-4 '>{props.title}</div>
        <div className='flex justify-center items-center text-center rounded-2xl content-center h-72 w-[17rem] bg-light-orange-3 mx-[1rem] mt-4 mb-4'>
            <p className='my-4 mx-3 opacity-80 font-medium text-[15px]'>{props.description}</p>
        </div>
    </div>
  )
}

export default DykCard