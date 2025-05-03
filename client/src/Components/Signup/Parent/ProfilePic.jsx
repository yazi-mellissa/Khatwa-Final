import React, { useEffect, useState } from 'react'
import axios from 'axios'
import pere from '../../../Assets/Signup/pere.png'
import mere from '../../../Assets/Signup/mere.png'
import imgpic from'../../../Assets/Signup/Img.png'
import cam from'../../../Assets/Signup/camera.png'
import expandRight from '../../../Assets/Signup/expand_right.png'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ProfilePic = (props) => {
    const [pic,setPic]=useState(props.formFields.civilite==='Mr'?1:2)
    const [file, setFile] = useState(null);
    const [img,setImg]=useState(null)

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', name);
    formData.append('description', description);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/Parent/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      setImg(res.data.imageData)
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
      
    const handlePic=(e)=>{
        switch (e.target.id) {
            case 'pere':
                setPic(1)
                break;
            case 'mere':
                setPic(2)
                break;
            default:
                setPic(3)
                break;
        }
    }
    const handleNext=async(e)=>{
      e.preventDefault()
      const reqData={
          civilite:props.formFields.civilite,
          email:props.formFields.email,
          password:props.formFields.password,
          phone:props.formFields.phone,
          location:{
              wilaya:props.formFields.wilaya.name,
              commune:props.formFields.commune.name
          },
          lng:props.formFields.location.longitude,
          lat:props.formFields.location.latitude,
          firstName:props.formFields.firstName,
          lastName:props.formFields.lastName,
          profilePic:file.name
      }
      console.log(reqData)
      await axios.post(`${process.env.REACT_APP_API_URL}/Parent/register`,reqData).then((response) => {
          console.log(response.data); // log the response data (optional)
          props.setToken(response.data)
          props.incProgress()
        })
        .catch((error) => {
          toast.error(error.response.data.error)
        });
  }
  return (
    <form onSubmit={(e)=>handleNext(e)} className='font-body grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-x-24 mt-6'>
      <ToastContainer></ToastContainer>
        <p className='font-bold md:text-lg col-span-2 place-self-center my-8'>Choisissez votre photo de profil </p>
        <div className='col-span-2 flex place-self-center space-x-4 mx-4 md:space-x-8'>
            <div onClick={(e)=>handlePic(e)} >
                <img id='pere' src={pere} alt="" className={`rounded-full border-solid border-4 ${pic===1?'border-orange-2 border-8':'border-blue-primary'} hover:border-orange-1 hover:opacity-70 active:opacity-100 active:border-orange-2 duration-300`}/>
            </div>
            <div onClick={(e)=>handlePic(e)}>
                <img id='mere' src={mere} alt="" className={`rounded-full border-solid border-4 ${pic===2?'border-orange-2 border-8':'border-blue-primary'} hover:border-orange-1 hover:opacity-70 active:opacity-100 active:border-orange-2 duration-300`}/>
            </div>
        </div>
        <div onSubmit={handleFileUpload}  className='grid col-span-2 justify-self-center space-y-2 text-lg my-10'>
            <p className='place-self-center'>Ou ajoutez votre photo</p>
            <button className='w-72 relative h-16 px-8 bg-blue-secondary bg-opacity-50 hover:bg-opacity-100 active:bg-blue-primary flex justify-between items-center rounded-xl duration-300' onClick={handlePic} > <input type="file" onChange={handleFileSelect} className='absolute opacity-0 cursor-pointer right-0 top-0 h-full w-full' /> <img src={imgpic} alt="" /><p>importer une photo</p><div></div></button>
            {file?<p>{file.name}</p>:null}
            <button className='flex ml-16 justify-center items-center outline outline-2 outline-blue-primary bg-white text-gray-500 font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' type='submit' onClick={handleFileUpload} disabled={loading}><p>Ajouter</p></button>
        </div>
        <div></div>
        <div className='w-full col-span-2 flex items-center justify-center'>
          {
            img&&<img className=' w-72 rounded-full mb-12 aspect-square' src={img.imageURL} alt="" />
          }
        </div>
        <div></div>
        <div className='flex md:col-span-1 col-span-2 place-self-center md:place-self-auto justify-start space-x-4'>
            <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-white text-gray-500 font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' onClick={props.decProgress}> <div></div> <p className='justify-self-center'>Retour</p> </button>
            <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-blue-primary text-white font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' type='submit'  > <div></div> <p className='justify-self-center'>Suivant</p> <img className='justify-self-center' src={expandRight} alt="" /></button>
      </div>
    </form>
  )
}

export default ProfilePic