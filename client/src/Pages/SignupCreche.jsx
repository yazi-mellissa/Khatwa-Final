import React, { useState } from 'react'
import ProgressBar from '../Components/Signup/ProgressBar';
import GenInfo from '../Components/Signup/Creche/GenInfo';
import EtabInfo from '../Components/Signup/Creche/EtabInfo';
import ProfilePic from '../Components/Signup/Creche/ProfilePic';
import Services from '../Components/Signup/Creche/Services';
const SignupCreche = () => {
  const [token,setToken]=useState(null)
  const [formFields,setFormFields]=useState({
    
    etabName:'',
    location:{
      longitude:null,
      latitude:null
    },
    wilaya:{
      name:'',
      id:'',
    },
    commune:{
        name:'',
        id:'',

    },
    email:'',
    phone:'',
    password:'',
    confirmPassword:'',
    description:'',
    profilePic:'',
    images:[],
    services:[],
    startHour:'8:00',
    endHour:'12:00',
    startAge:'0',
    endAge:'5',
    days:['Samedi', 'Dimanche', 'Lundi', 'Mardi', 'Mercredi','Jeudi','Vendredi'],
    capacite:10,
    cout:2000,
    pedagogie:'',
    typeEtab:'',
    typeAccueil:'',
    languages:['Arabe']
  })
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
    const [progress,setProgress]=useState(1);
    const handleConfirmPasswordBlur = () => {
      setConfirmPasswordTouched(true);
    };
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
          console.log(formFields)
          
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
  function handleCheckboxChange(arrayName,event) {
      const checkboxValue = event.target.value;

      if (event.target.checked) {
        setFormFields({ ...formFields, [arrayName]: [...formFields[arrayName], checkboxValue] });
      } else {
        setFormFields({ ...formFields, [arrayName]: formFields[arrayName].filter(value => value !== checkboxValue) });
      }
  }
  return (
    <div className='flex flex-col items-center mt-10 font-body'>
      <p className='uppercase font-bold text-blue-primary'>formulaire d’inscription</p>
      <p className='capitalize font-bold max-w-4xl text-center text-2xl md:text-5xl mt-2 md:mb-6'>créez un compte et rejoignez la communauté khatwa</p>
      <ProgressBar progress={progress}></ProgressBar>
      {progress===1&&<GenInfo confirmPasswordTouched={confirmPasswordTouched} handleConfirmPasswordBlur={handleConfirmPasswordBlur} formFields={formFields} handleInputChange={handleInputChange} incProgress={incProgress} handleLocation={handleLocation} decProgress={decProgress} handleWilayaInput={handleWilayaInput} handleCommuneInput={handleCommuneInput}></GenInfo>}
      {progress===2&&<EtabInfo handleCheckboxChange={handleCheckboxChange} formFields={formFields} handleInputChange={handleInputChange} incProgress={incProgress} decProgress={decProgress}></EtabInfo>}
      {progress===3&&<Services setToken={setToken} handleCheckboxChange={handleCheckboxChange} formFields={formFields} handleInputChange={handleInputChange} incProgress={incProgress} decProgress={decProgress}></Services>}
      {progress===4&&<ProfilePic token={token} formFields={formFields} handleInputChange={handleInputChange} incProgress={incProgress} decProgress={decProgress}></ProfilePic>}

    
    </div>
  )
}

export default SignupCreche