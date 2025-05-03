import React, { useRef, useState } from 'react'
import vid from '../../Assets/Home/herovid.mp4'
import { heroPage } from '../../Constants'

const Hero = () => {
    const vidRef=useRef(null)
    const [video,setVideo]=useState(true)
    const vidController=()=>{
        video?vidRef.current.pause():vidRef.current.play()
        setVideo(prev=>!prev)
    }
    return (
    <div className='font-body relative flex items-center justify-center'>
        <div className='bg-blue-primary bg-opacity-70 h-[42rem] w-full' style={{ clipPath: 'ellipse(100% 50% at 40% 50%)'}}> 
            <video autoPlay loop muted playsinline ref={vidRef} className='opacity-30 h-full w-full object-cover overflow-hidden' src={vid} ></video>
        </div>
        <div className='absolute flex flex-col items-center'>
            {
                heroPage.map((ligne)=>
                    <p id={ligne.id} className='font-bold text-2xl md:text-5xl text-hite text-white'>{ligne.title}</p>
                )
            }
        </div>
        <button className='absolute uppercase bg-orange-1 px-2 py-1 rounded-lg text-white text-sm bottom-10 left-8 md:text-base md:bottom-20 md:left-10' onClick={vidController}>
            {video?'arrêter':'lancer'}
        </button>
    </div>
  )
}
export default Hero