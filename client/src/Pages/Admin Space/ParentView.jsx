import React, { useState } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios';
import Modifypro from '../../Components/EspaceParent/Modifypro';
import Info1 from '../../Components/EspaceParent/Info1';
import Info2 from '../../Components/EspaceParent/Info2';
import Pic from '../../Components/EspaceParent/Pic';
import Children from '../../Components/EspaceParent/Children';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import L from 'leaflet'
import "leaflet/dist/leaflet.css";
import marker from '../../Assets/Signup/marker.png'
import AdminDropdown from '../../Components/Admin Space/AdminDropdown';

const ParentView = (props) => {
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const [tab, setTab] = useState(1)
  
    const [formFields, setFormFields] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',

        wilaya: {
            name: '',
            id: '',
        },
        commune: {
            name: '',
            id: '',
            longitude: '',
            latitude: ''
        },
        profilePic: '',
        children: [

        ]
    })
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormFields(prevFields => ({
            ...prevFields,
            [name]: value,
        }));

    };
    const handleChildInput = (event, index) => {
        const { name, value } = event.target;
        const updatedChild = { ...formFields.children[index], [name]: value };
        const updatedChildren = [...formFields.children];
        updatedChildren[index] = updatedChild;
        setFormFields({ ...formFields, children: updatedChildren });


    }
    const pushChild = (child) => {
        setFormFields(prevFields => (
            {
                ...prevFields,
                children: [...prevFields.children, (child)]
            }
        ))
    }

    const popChild = () => {
        setFormFields(prevFields => ({
            ...prevFields,
            children: [...formFields.children.slice(0, formFields.children.length - 1)]
        }))
        console.log(formFields.children)
    }
    const handleWilayaInput = (name, id) => {
        const updatedWilaya = { ...formFields.wilaya, name: name, id: id };
        console.log('Log : ', updatedWilaya)
        setFormFields(prevFields => ({ ...prevFields, wilaya: updatedWilaya }));
    }
    const handleCommuneInput = (name, id, lg, lt) => {
        const updatedCommune = { ...formFields.commune, name: name, id: id, longitude: lg, latitude: lt };
        console.log('Log : ', updatedCommune)
        setFormFields(prevFields => ({ ...prevFields, commune: updatedCommune }));
    }
    const submit = async (e) => {
        console.log('submit')
        try {
            await axios.post("http://localhost:8000/", formFields)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className={`font-body duration-300 lg:pl-8 pt-8 ${isOpen ? 'lg:ml-[12rem]' : 'lg:ml-[6rem]'}`}>
            

                <div className='lg:ml-10'>
                    <h1 className="font-bold text-2xl capitalize lg:text-3xl mt-[8rem] lg:mt-4 mb-8 ml-3 lg:ml-8 text-orange-2">
                        Gestion Des Parents
                    </h1>
                    <div className="fixed top-20  lg:top-2 right-0 z-50">
                        <AdminDropdown name="Mellissa Yazi" />
                    </div>
                    <div className='ml-3 lg:ml-8 flex space-x-4 mt-2'>
                        <button className={`uppercase lg:text-base text-sm font-bold ${tab === 1 ? 'text-orange-2' : 'text-black opacity-75'} duration-300`} onClick={() => setTab(1)}>a propos</button>
                        <p>|</p>
                        <button className={`uppercase lg:text-base text-sm font-bold ${tab === 2 ? 'text-orange-2' : 'text-black opacity-75'} duration-300`} onClick={() => setTab(2)}>enfants</button>
                    </div>
                    {
                        tab === 1 &&
                        <div>
                            <div className='ml-3 lg:ml-8 grid grid-cols-1  md:grid-cols-2 grid-flow-row'>
                                <div className='flex relative flex-col  justify-center items-start'>
                                    <Info1 formFields={formFields} handleInputChange={handleInputChange} />
                                    <Modifypro formFields={formFields} handleInputChange={handleInputChange} handleWilayaInput={handleWilayaInput} handleCommuneInput={handleCommuneInput} />

                                </div>
                                <div className='flex relative md:flex-row flex-col justify-center items-center md:items-start'>
                                    <Pic formFields={formFields} handleInputChange={handleInputChange} />
                                </div>

                            </div>
                            <div className='flex items-center justify-center md:justify-end mt-10 mb-5 md:mr-2'>
                                <div className='flex space-x-4'>
                                    <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-white text-gray-500 font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]'>
                                        <div></div>
                                        <p className='justify-self-center'>Annuler</p>
                                    </button>

                                    <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-blue-primary text-white font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' type='submit'>
                                        <div></div>
                                        <p className='justify-self-center'>Enregistrer</p>
                                    </button>
                                </div>
                            </div>

                        </div>

                    }
                    {
                        tab === 2 &&
                        <div>

                            <div className='ml-1 mr-1 lg:ml-8  grid grid-cols-1  grid-flow-row'>
                                <Children submit={submit} formFields={formFields} pushChild={pushChild} popChild={popChild} handleChildInput={handleChildInput} />

                            </div>


                            <div className='flex items-center justify-center md:justify-end mt-10 mb-5 md:mr-2'>
                                <div className='flex space-x-4'>
                                    <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-white text-gray-500 font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]'>
                                        <div></div>
                                        <p className='justify-self-center'>Annuler</p>
                                    </button>

                                    <button className='grid grid-cols-3 items-center outline outline-2 outline-blue-primary bg-blue-primary text-white font-bold w-36 h-11 rounded-full hover:bg-blue-primary hover:outline-blue-primary hover:text-white hover:bg-opacity-40 active:bg-blue-primary duration-[125ms]' type='submit'>
                                        <div></div>
                                        <p className='justify-self-center'>Enregistrer</p>
                                    </button>
                                </div>
                            </div>
                        </div>

                    }

                </div>
           


        </div>
    )

}
export default ParentView