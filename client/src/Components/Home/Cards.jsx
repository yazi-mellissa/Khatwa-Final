import React from 'react'
import DykCard from '../DykCard'
import { dykCard } from '../../Constants'

const Cards = () => {
  return (
    <div className='mt-16 mb-10'>
      <div className='font-body flex flex-col items-center justify-center'>
        <p className='uppercase font-bold text-blue-primary'>Bon a savoir</p>
        <p className='capitalize font-bold text-2xl md:text-5xl'>Le-saviez-vous?</p>
      </div>
      <div className='grid grid-flow-col place space-x-20 overflow-auto px-8 md:justify-center scroll-auto snap-both snap-mandatory pt-20 pb-4 w-full'>
          {dykCard.map((item)=>
              <DykCard className='place-self-center col-span-1 snap-center snap-always' title={item.title} description={item.description}/>
          )}
      </div>
    </div>
  )
}

export default Cards