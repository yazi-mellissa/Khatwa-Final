import React, { useEffect, useRef } from 'react'
import { useState } from 'react'

import Wilayas from '../../Constants/Wilayas'
import Communes from '../../Constants/Communes'




const Modifypro = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [visible1,setVisible1]=useState(false)
  const [visible2,setVisible2]=useState(false)
  const [wilayas,setWilayas]=useState(null)
  const [communes,setCommunes]=useState(null)
  const [wilaya,setWilaya]=useState(props.formFields.wilaya.name)
  const [commune,setCommune]=useState(props.formFields.commune.name)

  const wilayaRef=useRef(null)
  const communeRef=useRef(null)


  function handleCheckboxChange(event) {
    setIsChecked(event.target.checked);
  }
  const handleClick1=(e)=>{
      setWilaya(e.target.textContent)
      setVisible1(false)
      console.log('rani hna')
      const c={
        name:'',
        id:'',
        longitude:'',
        latitude:''
      }
      setCommune('')

      props.handleCommuneInput(c.name,c.id,c.longitude,c.latitude)
      props.handleWilayaInput(e.target.textContent,Wilayas.find(w=>w.name===e.target.textContent).id)
  }
  const handleClick2=(e)=>{
    setCommune(e.target.textContent)
    setVisible2(false)
    const c=Communes.find(c=>c.name===e.target.textContent)
    props.handleCommuneInput(e.target.textContent,c.id,c.longitude,c.latitude)
}
   const handleChange1=(e)=>{
      setWilaya(e.target.value)
      setVisible1(true)
   }
   const handleChange2=(e)=>{
    setCommune(e.target.value)
    setVisible2(true)
 }
  useEffect(()=>{
    const tmp=Wilayas.filter(w=>w.name.toLowerCase().includes(wilaya.toLowerCase()))
    setWilayas(tmp.map((w)=>(
      {
        name:w.name,
        id:w.id
      })
    ))
    console.log(tmp)

  },[wilaya])

  useEffect(()=>{
    const tmp= Communes.filter(c=>
      (c.name.toLowerCase().includes(commune.toLowerCase()) && c.wilaya_id===props.formFields.wilaya.id))
    setCommunes(tmp.map((c)=>(
      {
        name:c.name,
        id:c.id,
        longitude:c.longitude,
        latitude:c.latitude
      })
    ))
    console.log(tmp)

  },[commune])


const handleNext=(e)=>{
    props.formFields.wilaya.name===""?
      wilayaRef.current.setCustomValidity("Choisissez votre wilaya"):
      wilayaRef.current.setCustomValidity("")
      props.formFields.commune.name===""?
      communeRef.current.setCustomValidity("Choisissez votre commune"):
      communeRef.current.setCustomValidity("")
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    props.incProgress()
  }
  

  return (
    <form onSubmit={handleSubmit} className='font-body grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-x-24 mt-6'>
      
      <div className='flex flex-col col-span-2 space-y-12 mb-6'>
          <div className='flex flex-col justify-center items-start text-lg'>
          <label className='items-start'>Wilaya</label>
              <input id='hh' required ref={wilayaRef} type="text" name='wilaya' value={wilaya} onChange={(e)=>handleChange1(e)} className='border-2 border-blue-primary rounded-lg h-14 w-80 px-10  focus:outline-none' />
              {wilaya!='' &&visible1 &&wilayas.length>0 && <ul className='flex flex-col col-span-2 space-y-2 mt-4 max-h-52 overflow-auto'>
                { wilayas.map((w)=>(
                  <li className='flex flex-col justify-center items-center text-lg'onClick={(e)=>handleClick1(e)}>
                    <div className='bg-blue-secondary flex items-center cursor-pointer hover:bg-blue-primary hover:text-white rounded-lg h-14 w-80 px-10  focus:outline-none duration-300' >{w.name}</div>
                  </li>
                ))}
              </ul>}
          </div>
          <div className='flex flex-col justify-center items-start text-lg'>
          <label className='items-start'>Commune</label>
              <input required ref={communeRef} type="text" name='commune' value={commune} onChange={(e)=>handleChange2(e)} className='border-2 border-blue-primary rounded-lg h-14 w-80 px-10  focus:outline-none' />
              {commune!='' &&visible2 &&<ul className='flex flex-col col-span-2 space-y-2 max-h-52 mt-4 overflow-auto'>
                { communes.map((c)=>(
                  <li className='flex flex-col justify-center items-center text-lg'onClick={(e)=>handleClick2(e)}>
                    <div className='bg-blue-secondary flex items-center cursor-pointer hover:bg-blue-primary hover:text-white rounded-lg h-14 w-80 px-10  focus:outline-none duration-300' >{c.name}</div>
                  </li>
                ))}
              </ul>}
          </div>
      </div>
     
    
     
    
    </form>
  )
}

export default Modifypro