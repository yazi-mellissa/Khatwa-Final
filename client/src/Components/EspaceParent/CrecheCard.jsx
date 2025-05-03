import React from 'react';
import logo from "../../Assets/Parent Space/Crecheicon.png";
import loca from "../../Assets/Parent Space/loca.png";
import time from "../../Assets/Parent Space/time.png";
import distance from "../../Assets/Parent Space/distance.png";
import MyLink from '../MyLink';

function CrecheCard({ creche}) {
    return (
        <div className="flex justify-center border-2 border-black border-opacity-20 rounded-xl mt-3 space-x-5">

          
                
                <div className="flex m-3 pl-4 pr-4 flex-col md:w-full">
                  
                    <div className="flex items-center text-blue-primary text-xl mt-1 ">
                        <p className="text-blue-primary upperload"> {creche.etabName}</p>
                    </div>
                    <div className="flex items-center mt-1">
                        <img className="h-5 w-auto mr-3" src={loca} alt="Ma Petite Crèche" />
                        <p className="text-gray-600 text-base ">{creche.commune} , {creche.wilaya}</p>
                    </div>
                    <div className="flex items-center mt-1">
                        <img className="h-5 w-auto mr-3" src={time} alt="Ma Petite Crèche" />
                        <div className='flex-col items-baseline'>
                            <p className="text-gray-600 text-base">
                                {creche.startHour} - {creche.endHour}
                            </p>
                            <p className='flex text-xs space-x-2'>
                                {creche.days&&creche.days.map((day)=>(
                                    <p>{day}</p>
                                ))}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center mt-1">
                        <img className="h-5 w-auto mr-3" src={distance} alt="Ma Petite Crèche" />
                        <p className="text-gray-600 text-base">{creche.distance} Km</p>
                    </div>
                    {
                        creche.State&&
                        <div className='flex space-x-2 items-center'>
                            <p className="text-gray-600 font-normal">
                                    Etat de l'inscription :
                            </p>
                            <p className={
                            ` font-medium
                             ${creche.State==='En attente'&&'text-blue-third'}
                             ${creche.State==='Acceptée'&&' text-green-400'}
                             ${creche.State==='Annulée'&&' text-orange-1'}
                             ${creche.State==='Refusée'&&' text-orange-2'}`}>
                                {creche.State}
                            </p>
                        </div>
                    }
                    <MyLink to={`${creche._id}`}> 
                    <div className="flex items-center mt-1">
                        <a href="/" className="hover:underline text-gray-600">Voir plus d'informations</a>
                    </div>
                    </MyLink>
                </div>
        
            <div className="px-6 py-4 flex-shrink-0 ml-2 ">
                <img className="mx-auto h-20 w-20 mt-6" src={logo} alt="Ma Petite Crèche" />
            </div>
        </div>
    );
}

export default CrecheCard;
