import React from 'react'
import star from '../../Assets/Parent Space/star.png'


const Comment = (props) => {
    const {comment}=props
  return (
    <div className='lg:w-[25rem] mx-4 lg:mx-0 rounded-md p-4 border-2 border-blue-primary'>
        <div className='flex justify-between'>
            <div className='flex items-center gap-x-1'>
                <p className='font-semibold'>{comment.user}</p>
            
                <img src={star} alt="" />
                <p className='font-bold opacity-75'>{comment.rating}</p>
            </div>
        </div>
        <div>
            {comment.content}
        </div>
    </div>
  )
}

export default Comment