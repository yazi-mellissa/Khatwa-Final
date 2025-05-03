import React, { useState } from 'react';
import ReactDOM from 'react-dom';



function PopUpCmp(props) {
    // Etat local pour le contrôle de l'affichage de la pop-up
    const [afficher, setAfficher] = useState(false);

    // Fonction pour fermer la pop-up
    const fermerPopUp = () => {
        setAfficher(false);
    }

    return (
        <div>

            <button onClick={() => setAfficher(true)}>

            <p className='block hover:underline text-gray-600 '> Voir plus de detail</p>
            </button>

            {/* Contenu de la pop-up */}
            {afficher &&
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white  p-6 overflow-y-scroll rounded-md w-3/4 ">
                        <button className="float-right" onClick={fermerPopUp}>X</button>
                        <h2 className="text-xl self-center font-bold text-blue-primary mb-4">Compte Signales</h2>
                        <p className="mb-2">Details du Signalement</p>
                        <div className='flex flex-col items-center'>
                        <p className="text-lg font-bold text-orange-2 mb-2">Description</p>
                            <p className="mb-2 h-fit p-2 border-2 border-blue-primary border-opacity-70 rounded-lg w-3/4">{props.texte}</p>
                            <p className="text-lg font-bold text-orange-2 mb-2">Objet du Signalement</p>
                            <p className="mb-2 border-2 h-fit p-2 border-blue-primary border-opacity-70 rounded-lg w-3/4">{props.texte1}</p>
                          
                        </div>
                       
                   
                </div>
                </div>
            }
        </div >
    );
}
export default PopUpCmp