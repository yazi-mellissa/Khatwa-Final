import React, { useEffect, useRef, useState } from 'react'
import expand from "../../Assets/Parent Space/Points.png"

const Drop2 = (props) => {
    const [open,setOpen]=useState(false)
    const ref=useRef(null)
    const handleClick=()=>{
        const el=ref.current.children[1]
        open?el.classList.add('hidden'):el.classList.remove('hidden')
        setOpen(prev=>!prev)
    }
    useEffect(()=>{
        ref.current.children[0].children[1].textContent=props.value
        console.log(props.value)
            
    },[])

    const handleElement=(e)=>{
        ref.current.children[0].children[1].textContent=e
        handleClick()
        props.onChange({target:{

            name:props.name,
            value: e,
        }
          });
    }
    return (
    <div ref={ref} className='' onClick={props.onClick}>
        <div  className={`${props.className} flex relative items-center justify-between cursor-pointer`} onClick={handleClick}>
            <input disabled type="text" className='absolute outline-0 opacity-0 cursor-pointer' required value={props.value} />
            <div></div>
            <img src={expand} alt="" className='hover:opacity-80'/>
        </div>
        <div className='hidden'>
            {
                props.elements.map((element,index)=>(
                        <div className={` flex items-center cursor-pointer mt-[4px] hover:bg-light-orange-2 hover:text-orange-2  h-8 w-10 px-10 focus:outline-none duration-300 ${props.className}`} onClick={()=>handleElement(element)}>
                            {element}
                        </div>
                ))
            }
        </div>
     </div>
  )
}

export default Drop2