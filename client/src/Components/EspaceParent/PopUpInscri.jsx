import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import annuler from "../../Assets/Parent Space/annuler.png";
import Enfantsel from './Enfantsel';
import MyLink from '../MyLink';
import Checkbox from './CheckBox';
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';
function PopUpInscri(props) {
    const {servicesEnum,kindergartenId}=props
    // Etat local pour le contrôle de l'affichage de la pop-up
    const [afficher, setAfficher] = useState(false);
    const [child,setChild]=useState(null)
    const [enfants,setEnfants] = useState([])
    const [services,setServices]=useState([])

    // Fonction pour fermer la pop-up
    const fermerPopUp = () => {
        setAfficher(false);
    }
    const userToken=JSON.parse(localStorage.getItem('user'))

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/Parent/children/`,  {
             headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${userToken.token}`
             }
           })
           .then((response) => {
             console.log(response.data); // log the response data (optional)
             setEnfants(response.data.children)
           })
           .catch((error) => {
             toast(error);
           });
    },[])
    
    const handleRadioChange=(e)=>{
        setChild(e.target.value)
        console.log(e.target.value)
    }
    function handleCheckboxChange(event) {
        const checkboxValue = event.target.value;
  
        if (event.target.checked) {
            setServices([...services,checkboxValue])
        } else {
          setServices(services.filter(value => value !== checkboxValue));
        }
    }

    const handlePreinscription=async(e)=>{
        e.preventDefault()
        await axios.post(`${process.env.REACT_APP_API_URL}/Parent/preinscription`, {
        childId:enfants[child]._id,
        services:services,
        kindergarten:kindergartenId,
        cout:props.cout
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken.token}`
        }
      })
      .then((response) => {
        console.log(response.data); // log the response data (optional)
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    }
    return (
        <div className='z-[1000000000] relative'>
            <ToastContainer></ToastContainer>
            <button onClick={() => setAfficher(true)}>

                <button onClick={() => setAfficher(true)}>
                <button className=" w-[18rem] mb-2  self-center h-11 mt-2 bg-blue-primary text-white font-bold rounded-full outline outline-2 outline-blue-primary hover:outline-blue-primary hover:bg-opacity-40 active:bg-blue-primary duration-125ms" type="submit">
                  <div></div>
                  <p className="justify-self-center">Formulaire de Preinscription</p>
                </button>
                </button>
            </button>

            {/* Contenu de la pop-up */}
            {afficher &&
                <div className="fixed inset-0  bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-6 overflow-y-scroll w-4/5 h-4/5 rounded-md">
                        <button className="float-right" onClick={fermerPopUp}>X</button>
                        <h2 className="text-lg font-bold text-blue-primary mb-4">Formulaire de préinscription</h2>
                        <p className="mb-2"> Veuillez séléctionner l'enfant concerné</p>
                        {enfants&& 
                            <div className="items-start  flex flex-wrap mx-2">
                            <div className=' mb-8  gap-2  grid grid-cols-1 lg:grid-cols-3'>
                                {enfants.map((c,index) => <div class="px-2 mb-4">
                                    <Enfantsel index={index} handleRadioChange={handleRadioChange} child={child} setChild={setChild} enfant={c} />
                                </div>)}
                            </div>
                            </div>
                        }
                        
                        {!enfants&&
                        <div className='flex flex-col  items-center'>
                            <p className="mb-2">Vous n’avez pas encore associé vos enfants a votre compte, associez les des maintenant avec les informations des enfants concernés par l’inscription</p>
                            <MyLink to="/">
                                <button className=" w-[15rem] mb-2  self-center h-11 mt-2 bg-blue-primary text-white font-bold rounded-full outline outline-2 outline-blue-primary hover:outline-blue-primary hover:bg-opacity-40 active:bg-blue-primary duration-125ms" type="submit">
                                    <div></div>
                                    <p className="justify-self-center ">Ajout Enfant</p>
                                </button>
                            </MyLink>
                        </div>
                        }
                        <div className='flex flex-col md:flex-row items-center mt-10'>
                            <div className='flex flex-col'>
                                <p className="text-lg font-bold text-orange-2 mb-2">L’estimation de cout </p>
                                <p className="mb-2">Voici l’estimation approximative des frais que vous aurez a payer en inscrivant vos enfants dans cette creche</p>
                            </div>
                            <div className="mb-2 border-2 border-blue-primary border-opacity-70 rounded-lg w-fit p-2">Cout Moyen: {props.cout}DA/mois</div>

                        </div>
                        <div className='flex flex-col items-start mt-10'>
                            <p className="text-lg font-bold text-orange-2 mb-2">Services</p>
                            <p className="mb-2">Parmi les services offerts par cette creche , cochez ceux dont vous souhaitez beneficier</p>
                            <div className='flex flex-col self-center mb-2  text-lg'>

                                <div className="container mx-auto">
                                    {servicesEnum.map(checkboxValue => (
                                    <label key={checkboxValue}>
                                    <div className='flex items-center space-x-2 space-y-2'>

                                        <input
                                            type="checkbox"
                                            value={checkboxValue}
                                            checked={services.includes(checkboxValue)} 
                                            onChange={(e)=>handleCheckboxChange(e)}
                                            className="h-6 w-6 rounded border-blue-primary outline-blue-primary "
                                        />
                                        <p>{checkboxValue}</p>
                                    </div>
                                    </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button onClick={handlePreinscription} className=" w-[8rem] mb-2 self-end float-right mt-5 h-11  bg-blue-primary text-white font-bold rounded-full outline outline-2 outline-blue-primary hover:outline-blue-primary hover:bg-opacity-40 active:bg-blue-primary duration-125ms" type="submit">
                            
                            <p className="justify-self-center"onClick={fermerPopUp}>S'inscrire</p>
                        </button>
                    </div>
                </div>
            }
        </div >
    );
}
export default PopUpInscri



