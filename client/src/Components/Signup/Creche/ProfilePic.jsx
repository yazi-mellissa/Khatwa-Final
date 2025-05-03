import React, { useState } from 'react'
import axios from 'axios'
import creche from '../../../Assets/Signup/creche_img.png'
import upload from '../../../Assets/Signup/upload.png'
import imgpic from'../../../Assets/Signup/Img.png'
import cam from'../../../Assets/Signup/camera.png'
import expandRight from '../../../Assets/Signup/expand_right.png'
import { setLoggedIn } from './../../../Redux/Slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { toast,ToastContainer } from 'react-toastify'




const ProfilePic = (props) => {
    const [pic,setPic]=useState(1)
    const [file, setFile] = useState(null);
    const [img,setImg]=useState(null)
    function UploadButton(){
      return(
          <button className='w-60 relative h-60 px-8 border-solid border-2 border-orange-1 hover:border-orange-2 hover:bg-gray-50 flex items-center justify-center rounded-xl duration-300' > <input type="file" onChange={handleFileSelect} className='absolute opacity-0 cursor-pointer right-0 top-0 h-full w-full' /> <img src={upload} alt="" /><div></div></button>
      )
  }
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

    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', name);
    formData.append('description', description);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/kindergarten/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      setImg(res.data.imageData)
    } catch (err) {
      console.error(err);
    }
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
    const navigate= useNavigate()
    const dispatch=useDispatch()

   

    const handleSubmit=async(e)=>{
      e.preventDefault()
      await axios.patch(`${process.env.REACT_APP_API_URL}/kindergarten/profile`,{
          profilePic:file?file.name:''
      }  ,{
           headers: {
             'Content-Type': 'application/json',
             Authorization: `Bearer ${props.token.token}`
           }
         })
         .then((response) => {
           console.log(response.data); // log the response data (optional)
            localStorage.setItem('user', JSON.stringify(props.token))
            dispatch(setLoggedIn());
            navigate('/')
           })
         .catch((error) => {
           toast(error);
         });
      

      
  }
  return (
    <div className='font-body grid grid-cols-1 md:grid-cols-2 mt-14'>
        <div className='grid grid-cols-1 md:grid-cols-2 grid-flow-row'>
            <p className='font-bold md:text-lg col-span-2 place-self-center mb-2 capitalize'>voici votre photo de profil </p>
            <div className='col-span-2 flex place-self-center space-x-4 mx-4 md:space-x-2'>
                <div onClick={(e)=>handlePic(e)} >
                    <img id='creche' src={creche} alt="" className={`rounded-full border-solid border-4 ${pic===1?'border-orange-2 border-8':'border-blue-primary'} hover:border-orange-1 hover:opacity-70 active:opacity-100 active:border-orange-2 duration-300`}/>
                </div>
            </div>
            <div onSubmit={handleFileUpload}  className='grid col-span-2 justify-self-center space-y-2 text-lg my-10'>
            <p className='place-self-center'>Ou ajoutez votre photo</p>
            <button className='w-72 relative h-16 px-8 bg-blue-secondary bg-opacity-50 hover:bg-opacity-100 active:bg-blue-primary flex justify-between items-center rounded-xl duration-300' onClick={handlePic} > <input type="file" onChange={handleFileSelect} className='absolute opacity-0 cursor-pointer right-0 top-0 h-full w-full' /> <img src={imgpic} alt="" /><p>importer une photo</p><div></div></button>
            {file?<p>{file.name}</p>:null}
            <button className='w-72 h-16 px-8 bg-blue-secondary bg-opacity-50 hover:bg-opacity-100 active:bg-blue-primary flex justify-between items-center rounded-xl duration-300' onClick={handlePic}><img src={cam} alt="" /><p>prendre une photo</p><div></div></button>
            <button type='submit' onClick={handleFileUpload} disabled={loading}>submit</button>
        </div>
        <div></div>
        {
          img&&<img src={img.imageURL} alt="" />
        }
            <div></div>
        </div>
        <div className='mt-8'>
            <p className='w-[30rem] text-center mb-4 capitalize'>associez vos enfants à votre compte dés maintenant ou  passez cette étape et faites le plus tard </p>
            <form className='grid grid-cols-2 gap-4 mt-8' action="">
                <UploadButton></UploadButton>
                <UploadButton></UploadButton>
                <UploadButton></UploadButton>
            <div className='flex place-self-center col-span-2 justify-start space-x-4 mt-8'>
                <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-white text-gray-500 font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' onClick={props.decProgress}> <div></div> <p className='justify-self-center'>Retour</p> </button>
                <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-blue-primary text-white font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' onClick={handleSubmit}> <div></div> <p className='justify-self-center'>Suivant</p> <img className='justify-self-center' src={expandRight} alt="" /></button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default ProfilePic