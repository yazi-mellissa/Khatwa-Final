import React from 'react'
import CheckBox from './CheckBox'


const Enfantsel = (props) => {
    const { enfant,index } = props
    return (
        <div className='relative md:w-[13rem] mx-4 lg:mx-0 rounded-md p-4 border-orange-2 border-2 gap-y-7 '>
            
            <div className='flex-col '>
                <div className='flex flex-row gap-x-2'>
                <p className='font-semibold'>{enfant.firstName} {enfant.lastName}</p>
                <input name='child' type='radio' className="absolute top-4 right-6" onChange={(e)=>props.handleRadioChange(e,props.child)} value={index} />
                
                </div>
              
                <p >Genre: {enfant.gender==='m'?'Garcon':'Fille'}</p>
                <p >Date de Naissance: {enfant.birth_date}</p>
            </div>
        </div>
    )
}

export default Enfantsel