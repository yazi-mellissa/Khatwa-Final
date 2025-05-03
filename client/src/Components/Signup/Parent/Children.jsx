import React, { useEffect, useState } from 'react'
import Child from './Child'
import expandRight from '../../../Assets/Signup/expand_right.png'
import add from '../../../Assets/Signup/add_green.png'
import sup from '../../../Assets/Signup/sup_green.png'
import MyLink from '../../MyLink'
import { useDispatch } from 'react-redux'
import { setLoggedIn } from './../../../Redux/Slices/authSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';



const Children = (props) => {
  const child={
    gender:'',
    firstName:'',
    lastName:'',
    birthDate:''
  }

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/Parent/children`, {
      children:props.formFields.children.map((child)=>{
        return({
          firstName:child.firstName,
          lastName:child.lastName,
          birthDate:child.birthDate,
          gender:child.gender==='male'?'m':'f'
        })
      })
    }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.token.token}`
        }
      })
      .then((response) => {
        console.log(response.data); // log the response data (optional)
        localStorage.setItem('user', JSON.stringify(props.token))
        dispatch(setLoggedIn());
        navigate('/')
      })
      .catch((error) => {
        toast(error);
      });


    
  }


  return (
    <form onSubmit={handleSubmit} className='font-body grid grid-cols-1 items-center md:grid-cols-2 grid-flow-row gap-x-24 gap-y-12'>
      <div className='md:text-lg place-self-center text-center flex flex-col col-span-2 items-center w-80 md:w-auto mt-12'>
        <p>Associez vos enfants à votre compte dés maintenant <br /> Ou  passez cette étape et faites le plus tard en cliquant sur passer</p>
      </div>
        {props.formFields.children.map((e,index)=>(
          <div className='col-span-2'>
            <Child {...props} num={index} /> 
          </div>
        ))}
            <div className='space-y-4 col-span-2 md:col-span-1'>
              <div className='flex space-x-1 items-center font-semibold hover:opacity-75 cursor-pointer' onClick={()=>props.pushChild(child)}> <img src={add} alt=""   /> <p>{`Ajouter un ${props.formFields.children.length>0?'autre':''} enfant`}</p> </div>
              {props.formFields.children.length>0 && <div className='flex space-x-1 items-center font-semibold hover:opacity-75 cursor-pointer' onClick={()=>props.popChild()}> <img src={sup} alt=""   /> <p>Supprimer l'enfant</p> </div>}
            </div>
            <div className='flex md:col-span-1 col-span-2 place-self-center md:place-self-auto justify-start space-x-4'>
                <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-white text-gray-500 font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' onClick={props.decProgress}> <div></div> <p className='justify-self-center'>Retour</p> </button>
              <div className='md:flex space-y-4'>
                {props.formFields.children.length<=0?
                  <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-white text-gray-500 font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' type='submit'> <div></div> <p className='justify-self-center'>Passer</p> </button>
                  :<button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-blue-primary text-white font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' type='submit' > <div></div> <p className='justify-self-center'>Suivant</p> <img className='justify-self-center' src={expandRight} alt="" /></button>
                }
              </div>
            </div>

    </form>
  )
}

export default Children