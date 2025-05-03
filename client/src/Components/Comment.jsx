import React from 'react'
import star from './../Assets/Creche Profile/star.svg'
import profilePic from './../Assets/Parent Space/profilepic.png'


const Comment = (props) => {
    const {comment}=props
  return (
    <div className='lg:w-full h-fit mx-4 lg:mx-0 rounded-2xl p-4 border-[1.5px] border-blue-primary'>
        <div className='flex justify-between'>
            <div className='flex items-center gap-x-4'>
                <img className='w-12 aspect-square' src={profilePic} alt="" />
                <p className='font-semibold text-blue-primary uppercase'>{comment.from.firstName} {comment.from.lastName}</p>
            </div>
            <div className='flex items-center justify-end gap-x-1'>
                <img src={star} alt="" />
                <p className='font-bold opacity-75'>{comment.rating}</p>
            </div>
        </div>
        <div className='ml-16 font-medium'>
            {comment.content}
        </div>
    </div>
  )
}

export default Comment