import React, { useState,useEffect } from 'react'
import axios from 'axios'
import GenInfo from '../Components/Signup/Parent/GenInfo';
import ProgressBar from '../Components/Signup/ProgressBar'
import Adress from '../Components/Signup/Parent/Adress';
import ProfilePic from '../Components/Signup/Parent/ProfilePic';
import Children from '../Components/Signup/Parent/Children';
import Map from '../Components/Signup/Parent/Map';

const SignupParent = () => {
    const [token,setToken]=useState(null)
    const [formFields, setFormFields] = useState({
        civilite:'',
        firstName:'',
        lastName:'',
        phone:'',
        email:'',
        password:'',
        confirmPassword:'',
        wilaya:{
            name:'',
            id:'',
        },
        commune:{
            name:'',
            id:'',

        },
        profilePic:'',
        children:[
           
        ],
        location:{
            longitude:null,
            latitude:null
        }
    });
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
    const [progress,setProgress]=useState(1);
    const incProgress=()=>{
        window.scrollTo(0, 0);
        setProgress(prev=>prev+1)
    }
    const decProgress=()=>{
        window.scrollTo(0, 0);
        setProgress(prev=>prev-1)
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormFields(prevFields=> ({
            ...prevFields,
            [name]: value,
          }));
          
    };
    const handleLocation=(lng,lat)=>{
        setFormFields(prevFields=>({
          ...prevFields,
          location:{
            longitude:lng,
            latitude:lat
          }
        })
          )
      }
    const handleChildInput=(event,index)=>{
            const { name, value } = event.target;
            const updatedChild = { ...formFields.children[index], [name]: value };
            const updatedChildren = [...formFields.children];
            updatedChildren[index] = updatedChild;
            setFormFields({ ...formFields, children: updatedChildren });

              
    }
    const pushChild=(child)=>{
        setFormFields(prevFields=>(
            {
                ...prevFields,
                children:[...prevFields.children,(child)]
            }
        ))
    }

    const popChild=()=>{
        setFormFields(prevFields=>({
            ...prevFields,
            children:[...formFields.children.slice(0,formFields.children.length-1)]
        }))
    }
    const handleWilayaInput=(name,id)=>{
        const updatedWilaya = { ...formFields.wilaya, name: name,id:id};
        console.log('Log : ',updatedWilaya)
        setFormFields(prevFields=>({ ...prevFields, wilaya: updatedWilaya }));  
    } 
    const handleCommuneInput=(name,id)=>{
        const updatedCommune= { ...formFields.commune, name: name,id:id };
        console.log('Log : ',updatedCommune)
        setFormFields(prevFields=>({ ...prevFields, commune:updatedCommune}));  
    }
 


    const handleConfirmPasswordBlur = () => {
        setConfirmPasswordTouched(true);
    };
    
    return (
    <div className='flex flex-col items-center mt-10 font-body'>
        <p className='uppercase font-bold text-blue-primary'>formulaire d’inscription</p>
        <p className='capitalize font-bold max-w-4xl text-center text-2xl md:text-5xl mt-2 md:mb-6'>créez un compte et rejoignez la communauté khatwa</p>
        <ProgressBar progress={progress}></ProgressBar>
            {progress===1 && <GenInfo  handleConfirmPasswordBlur={handleConfirmPasswordBlur} formFields={formFields} handleInputChange={handleInputChange} confirmPasswordTouched={confirmPasswordTouched} incProgress={incProgress}/>}
            {progress===2 && <Adress handleLocation={handleLocation} incProgress={incProgress} decProgress={decProgress} formFields={formFields} handleInputChange={handleInputChange} handleWilayaInput={handleWilayaInput} handleCommuneInput={handleCommuneInput} />}
            {progress===3 && <ProfilePic setToken={setToken} incProgress={incProgress} decProgress={decProgress} formFields={formFields} handleInputChange={handleInputChange}/>}
            {progress===4 && <Children token={token} incProgress={incProgress} decProgress={decProgress} formFields={formFields} pushChild={pushChild} popChild={popChild} handleChildInput={handleChildInput} />}
    </div>
  )
}

export default SignupParent