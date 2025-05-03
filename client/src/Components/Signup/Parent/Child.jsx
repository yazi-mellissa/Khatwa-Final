import React from 'react'
import Dropdown from '../../Dropdown'
const Child = (props) => {
  const el=['male','female']
  return (
    <div className='font-body grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-x-24 gap-y-12 duration-300 ease-in-out'>
        <div className='h-[2px] col-span-1 md:col-span-2 w-full bg-orange-2'></div>
        <div className='col-span-1 md:col-span-2 font-bold md:text-lg text-blue-primary ml-4'>Enfant {props.num+1}</div>
        <div className='flex flex-col justify-center items-start md:col-span-2 text-lg'>
            <label className='ml-4 font-normal'>Genre<span className=' text-orange-2'>*</span></label>
            <Dropdown name='gender' value={props.formFields.children[props.num].gender} onChange={(e)=>props.handleChildInput(e,props.num)} className='border-2 border-blue-primary rounded-full h-14 w-80 pl-10 pr-6 focus:outline-none' elements={el}></Dropdown>
        </div>
        <div className='flex flex-col justify-center items-start  text-lg'>
            <label className='ml-4 font-normal'>Nom<span className=' text-orange-2'>*</span></label>
            <input required type="text" name='lastName' value={props.formFields.children[props.num].lastName} onChange={(e)=>props.handleChildInput(e,props.num)} className='border-2 border-blue-primary rounded-full h-14 w-80 px-10 focus:outline-none' />
        </div>
        <div className='flex flex-col justify-center items-start  text-lg'>
            <label className='ml-4 font-normal'>Prénom<span className=' text-orange-2'>*</span></label>
            <input required type="text" name='firstName' value={props.formFields.children[props.num].firstName} onChange={(e)=>props.handleChildInput(e,props.num)} className='border-2 border-blue-primary rounded-full h-14 w-80 px-10 focus:outline-none' />
        </div>
        <div className='flex flex-col justify-center items-start  text-lg'>
            <label className='ml-4 font-normal'>Date de naissance<span className=' text-orange-2'>*</span></label>
            <input required type="date" name='birthDate' value={props.formFields.children[props.num].birthDate} onChange={(e)=>props.handleChildInput(e,props.num)} className='border-2 border-blue-primary rounded-full h-14 w-80 px-10 focus:outline-none' />
        </div>
    </div>
  )
}

export default Child