import React from 'react'



const Enfant = (props) => {
    const { enfant } = props
    return (
        <div className='md:w-[13rem] mx-4 lg:mx-0 rounded-md p-4 bg-blue-secondary bg-opacity-70 gap-y-7 '>
            <div className='flex-col '>
                <p className='font-semibold'>{enfant.firstName} {enfant.lastName}</p>
                <p >Genre: {enfant.gender==='m'?'Garcon':'Fille'}</p>
                <p >Date de Naissance: { enfant.birthDate}</p>
            </div>
        </div>
    )
}

export default Enfant