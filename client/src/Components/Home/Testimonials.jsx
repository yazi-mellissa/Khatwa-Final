import React, { useState } from 'react'
import { testmon } from '../../Constants'
import TestmCard from '../TestmCard'
import arrowActive from '../../Assets/Home/circle-arrow-right.png'
import arrowDisabled from '../../Assets/Home/circle-arrow-left.png'
import bulletActive from '../../Assets/Home/bullet-active.png'
import bulletInactive from '../../Assets/Home/bullet-inactive.png'


const Testimonials = () => {
    const [active,setActive]=useState(0)
    const incrementActive=(e)=>{
        e.stopPropagation()

        if (active===testmon.length-1){
            setActive(0)
        }
        else {
            setActive(prev=>prev+1)
        }
    }

    const decrementActive=(e)=>{
        e.stopPropagation()
        if (active===0){
            setActive(testmon.length-1)
        }
        else {
            setActive(prev=>prev-1)
        }
    }
    return (
    <div className=''>
        <div className='flex flex-col justify-center items-center font-body duration-500' >
            <p className='uppercase text-blue-primary font-bold'>ils nous font confiance</p>
            <p className='capitalize font-bold text-2xl md:text-5xl md:w-[40rem] text-center mb-10 mx-8'>lisez ce que les utilisateurs pensent de nous</p>
            <div className='flex justify-center items-center'>

                <div onClick={decrementActive} className='opacity-40 hover:opacity-100 duration-300'>
                    <img className='cursor-pointer' src={arrowDisabled} alt="" />
                </div>
                {testmon.map((element,index)=>(
                    <div>
                        
                        {active===index?<TestmCard className='' img={element.img} description={element.description} person={element.person} rating={element.rating}></TestmCard>:<></>}
                    </div>
                ))}
                <div  onClick={incrementActive} className='opacity-40 hover:opacity-100 duration-300'>
                <img className='cursor-pointer' src={arrowActive} alt=""/>
                </div>
            </div>
            <div className='grid w-full grid-cols-3 grid-rows-1 items-center'>
                <div></div>
                <div className='flex place-self-center space-x-2 '>
                
                {
                    testmon.map((element,index)=>(
                            <button className='cursor-pointer' onClick={()=>(setActive(index))}><div className='w-3 h-3 rounded-full border-orange-2 border-[1.5px] ease-in-out duration-300' style={index===active?{backgroundColor:'#E35936', width:'48px'}:{}}></div></button>
                    ))
                }
                </div>
                    
            </div>
        </div>
    </div>
  )
}

export default Testimonials