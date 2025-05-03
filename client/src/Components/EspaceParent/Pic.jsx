import React, { useState } from 'react'
import axios from 'axios'


import imgpic from'../../Assets/Signup/Img.png'
import cam from'../../Assets/Signup/camera.png'

import profilpic from '../../Assets/Parent Space/Parenticon.png'
import Gallerie from "../../Assets/Parent Space/Gallerie.png";
import Remove from "../../Assets/Parent Space/Remove.png";


const ProfilePic = (props) => {
    const [pic,setPic]=useState(1)
    const [file, setFile] = useState(null);
    
    const handleFileSelect = (event) => {
        setFile(event.target.files[0]);
        console.log(event.target.files[0])
      };
      const handleFileUpload = () => {
        const formData = new FormData();
        formData.append('image', file);
      
        axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
      };
    const handlePic=(e)=>{
        switch (e.target.id) {
            case 'creche':
                setPic(1)
                break;
            default:
                setPic(2)
                break;
        }
    }
  return (
    <div className='font-body grid grid-cols-1 mt-5 md:mt-0 '>
       
            <p className='font-bold md:text-lg place-self-center mb-2 capitalize'>voici votre photo de profil </p>
            <div className='col-span-2 flex place-self-center space-x-4 mx-4 md:space-x-2'>
                <div onClick={(e)=>handlePic(e)} >
                    <img id='creche' src={profilpic} alt="" className={`rounded-full `}/>
                </div>
            </div>
            <form className='grid col-span-2 justify-self-center space-y-2 text-lg my-2'>
                <button className='w-60 relative h-16 px-8 bg-light-orange-1 bg-opacity-100 flex justify-between items-center rounded-xl duration-300' onClick={handlePic} > <input type="file" onChange={handleFileSelect} className='absolute opacity-0 cursor-pointer right-0 top-0 h-full w-full' /> <img src={Gallerie} alt="" /><p className='text-white '>Changer de photo</p><div></div></button>
                {file?<p>{file.name}</p>:null}
                <button className='w-60 h-16 px-8 bg-light-orange-1 bg-opacity-100  flex justify-between items-center rounded-xl duration-300' onClick={handlePic}><img src={Remove} alt="" /><p className='text-white '>Supprimer la photo</p><div></div></button>
            </form>
            
        
       
    </div>
  )
}

export default ProfilePic