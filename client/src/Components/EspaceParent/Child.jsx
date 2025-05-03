import React from 'react'
import Dropdown from '../Dropdown';

const Child = (props) => {
    const el = ['male', 'female']
    const edit=['Modifier', 'Supprimer']
    
    return (
        <div className='font-body md:flex md:flex-row  gap-x-20 gap-y-4 duration-300 ease-in-out'>
            <div className=' font-bold md:text-lg ml-4'>ENFANT {props.num + 1}</div>
            <div className='border-2 border-blue-primary rounded-lg p-8 gap-y-3 pt-4 pb-4 w-f'>
            
                
                <div className='flex flex-raw items-start  gap-x-2 text-lg'>
                    <label className=' font-normal'>Nom :</label>
                    <input required type="text" name='lastName' placeholder='nom' value={props.formFields.children[props.num].lastName} onChange={(e) => props.handleChildInput(e, props.num)} className='focus:outline-none' />
                </div>
                <div className='flex flex-raw items-start gap-x-2 text-lg'>
                    <label className=' font-normal'>Prenom :</label>
                    <input required type="text" name='firstName' placeholder='prenom' value={props.formFields.children[props.num].firstName} onChange={(e) => props.handleChildInput(e, props.num)} className='focus:outline-none' />
                </div>
                <div className='flex flex-raw  items-start gap-x-2  text-lg'>
                    <label className='font-normal'>Genre :</label>
                    <Dropdown name='gender' value={props.formFields.children[props.num].gender} onChange={(e) => props.handleChildInput(e, props.num)} className=' focus:outline-none' elements={el}></Dropdown>
                </div>
                <div className='flex flex-raw items-start gap-x-2   text-lg'>
                    <label className='font-normal'>Date de naissance :</label>
                    <input required type="date" name='birthDate' value={props.formFields.children[props.num].birthDate} onChange={(e) => props.handleChildInput(e, props.num)} className='focus:outline-none' />
                </div>
            </div>



        </div>
    )
}

export default Child
