import React from 'react'

const ProgressBar = ({progress}) => {
  const itemsList = [];
  for (let index = 1; index < 5; index++) {
    itemsList.push(
      <div className={`md:h-[50px] h-[40px] flex font-bold text-white md:text-xl justify-center items-center aspect-square rounded-full ${index<=progress?'bg-orange-2':'bg-light-orange-2'} ease-linear duration-500`}> {index} </div>
    );

  }
  return (
    <div className='flex relative mt-10 md:w-[36rem] w-[20rem] font-body '>
      <div className='flex w-full justify-between'>
        {
         itemsList
        }
      </div>
      <div className='absolute -translate-y-[50%] top-[50%] -z-10 h-2 rounded-full bg-orange-2 ease-in duration-500' style={{width:`${(progress-1)*33}%`}}></div>
      <div className='absolute -translate-y-[50%] top-[50%] -z-20 h-2 w-full rounded-full bg-light-orange-2'></div>
    </div>
  )
}

export default ProgressBar