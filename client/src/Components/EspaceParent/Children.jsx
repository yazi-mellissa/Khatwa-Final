import React, { useEffect, useState } from 'react'
import Child from './Child'
import expandRight from '../../Assets/Signup/expand_right.png'
import Add from '../../Assets/Parent Space/Add.png'
import sup from '../../Assets/Signup/sup_green.png'
import MyLink from '../MyLink';

const Children = (props) => {
  const child = {
    gender: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    edit: {
      Modifier: '',
      Suuprimer: '',
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }



  return (
    <form onSubmit={handleSubmit} className='font-body grid grid-cols-1 items-center md:grid-cols-2 grid-flow-row gap-x-24 gap-y-12'>
      <div className='md:text-lg place-self-center text-center flex flex-col col-span-2 items-center w-80 md:w-auto mt-12'>

      </div>
      {props.formFields.children.map((e, index) => (
        <div className='col-span-2'>
          <Child {...props} num={index} />
        </div>
      ))}
      <div className='space-y-4 col-span-2 md:col-span-1'>
        <div className='flex space-x-1 items-center font-semibold hover:opacity-75 cursor-pointer' onClick={() => props.pushChild(child)}> <img src={Add} alt="" /> <p>{`Ajouter un ${props.formFields.children.length > 0 ? 'autre' : ''} enfant`}</p> </div>

      </div>


    </form>
  )
}

export default Children