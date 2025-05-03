import { React, useState,useEffect } from "react";
import Dropdown from "../../Components/Dropdown";
import CrecheCard from '../../Components/EspaceParent/CrecheCard';
import Creches from './Creches';
import location1 from "../../Assets/Parent Space/loca1.png";
import location2 from "../../Assets/Parent Space/loca2.png";
import { toggleSidebar } from "./../../Redux/Slices/sideBarSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Form from "../../Components/EspaceParent/Form";
import { toast,ToastContainer } from 'react-toastify';



const SearchPage = (props) => {
    const userToken=JSON.parse(localStorage.getItem('user'))
    const [formFields, setFormFields] = useState({
        days:[],
        endAge:1,
        typeEtab: '',
        pedagogie: '',
        languages: [],
        services: [],
        distance: 1,
        cout:1000,
        startHour:'',
        endHour:'',
        typeAccueil:'',
        capacite:5,
        rating:0,
    })

    const [etabName,setEtabName]=useState('')

    const isOpen = useSelector((state) => state.sidebar.isOpen);
   
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(formFields)
        setFormFields(prevFields => ({
            ...prevFields,
            [name]: value,
        }));

    };
    function handleCheckboxChange(arrayName,event) {
        const checkboxValue = event.target.value;
  
        if (event.target.checked) {
          setFormFields({ ...formFields, [arrayName]: [...formFields[arrayName], checkboxValue] });
        } else {
          setFormFields({ ...formFields, [arrayName]: formFields[arrayName].filter(value => value !== checkboxValue) });
        }
    }
    const [wilayaskindergartens,setWilayaskindergartens]=useState([])
    const [kindergartens,setKindergartens]=useState(null)


    useEffect(()=>{
        
        axios.get(`${process.env.REACT_APP_API_URL}/Parent/kindergarten`,  {
             headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${userToken.token}`
             }
           })
           .then((response) => {
             console.log(response.data); // log the response data (optional)
             setWilayaskindergartens(response.data.kindergartens)
           })
           .catch((error) => {
             toast(error);
           });
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault()
        const { etabName, days, endAge, typeEtab, pedagogie, languages, services, distance, cout, startHour, endHour, typeAccueil, capacite, rating } = formFields;
        const requestBody = {
            etabName,
            days,
            endAge,
            typeEtab,
            pedagogie,
            languages,
            services,
            distance,
            cout,
            startHour,
            endHour,
            typeAccueil,
            capacite,
            rating
          };
        axios.post(`${process.env.REACT_APP_API_URL}/Parent/search`, requestBody, {
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken.token}`
            }
        })
        .then((response) => {
            console.log(response.data); // log the response data (optional)
            setKindergartens(response.data.kindergartens)
        })
        .catch((error) => {
            toast(error);
        });
    }

    const handleEtabName=(e)=>{
        e.preventDefault()
        setEtabName(e.target.value)
    }

    const handleSearchName=async(e)=>{
        e.preventDefault()
        etabName!=''&&
        await axios.get(`${process.env.REACT_APP_API_URL}/Parent/kindergarten/name/${etabName}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken.token}`
            }
          })
          .then((response) => {
            console.log(response.data); // log the response data (optional)
            setKindergartens(response.data.kindergartens)
          })
          .catch((error) => {
            toast(error);
            setKindergartens([])

          });

    }
  
    return (
        <div className={` font-body duration-300 lg:pl-8 pt-8 ${isOpen ? 'lg:ml-[12rem]' : 'lg:ml-[6rem]'}`}>
            <div className='grid grid-col-1 gap-y-5 ml-8 mt-20 md:mt-0 md:ml-12 '>
                <h1 className='text-orange-2 text-2xl md:text-3xl font-bold '>Rechercher une Creche </h1>
                <div className='flex relative flex-col justify-center items-start w-fit text-lg ' >

                    <input
                        required
                        type="text"
                        name='etabName'
                        value={etabName}
                        onChange={handleEtabName}
                        placeholder=' Saisir le nom de la creche'
                        className='border-2 border-black border-opacity-60 rounded-full h-14  pl-10 pr-20 focus:outline-none relative'
                    />

                    <div onClick={handleSearchName} className="absolute top-0 right-3 bottom-0 flex items-center">
                        <img
                            src={location2}
                            alt=""
                            className='cursor-pointer hover:opacity-70 active:opacity-100'
                        />
                    </div>

                   

                </div>
            </div>

            <div className="flex flex-col md:grid md:grid-cols-3 md:items-start  mt-0  h-screen  ">
                
                <div className="md:col-span-2 px-5 ">

                {!kindergartens&& wilayaskindergartens&& wilayaskindergartens.map((Creche, index) => (
                        <CrecheCard key={index} creche={Creche} />
                    ))}
                {
                    kindergartens&& kindergartens.map((Creche, index) => (
                        <CrecheCard key={index} creche={Creche} />
                    ))
                }
                </div>

                <div className=" flex flex-col justify-center p-2   items-center ">
                    <button className='w-full bg-blue-primary hover:bg-blue-third h-fit py-2 rounded-full mb-2 font-bold text-white text-lg duration-300 active:bg-blue-primary' onClick={()=>props.setLocated(false)}>Page d'Accueil</button>
                    <Form handleSubmit={handleSubmit} handleCheckboxChange={handleCheckboxChange} formFields={formFields} handleInputChange={handleInputChange} />
                </div>

            </div>

        </div>
    )
}

export default SearchPage
/*
 <div className="absolute top-0 left-3 bottom-0 flex items-center">
                        <img
                            src={location1}
                            alt=""
                            className=' cursor-pointer hover:opacity-70 active:opacity-100'
                        />
                    </div>*/