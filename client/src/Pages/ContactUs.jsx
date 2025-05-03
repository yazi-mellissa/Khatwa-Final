import React, { useState } from "react";
import Nouscontacter from "../Assets/Contact/Nouscontacter.png"

function ContactUs() {
    const [nomdutilisateur, setNomdutilisateur] = useState('');
    const [objet, setObjet] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Nomdutilisatuer: ${nomdutilisateur} Objet: ${objet} Message: ${message}`);
    };

    return (
        <div className="mt-40 flex justify-between items-center w-full">
            <form className="w-full md:w-2/5 mx-auto flex flex-col bg-white p-10 rounded-lg">
            <p className="text-3xl md:text-4xl mt-5 mb-20 font-bold text-center">Nous Contacter</p>
                <img
                    src={Nouscontacter}
                    alt="contactus"
                    className="block md:hidden w-full"
                    style={{ height: "auto" }}
                />
          
                <input
                    className="rounded-2xl mb-5  bg-blue-primary bg-opacity-40 outline-none py-2 px-4 transition duration-400 ease-in-out hover:box-shadow-xl hover:scale-105 focus:box-shadow-inner focus:ring-2 focus:ring-blue-secondary "
                    type="text"
                    placeholder="nom d'utilisateur"
                    autoComplete="off"
                    name="Nomdutilisateur"
                    id="nomdutilisateur"
                    required
                    value={nomdutilisateur}
                    onChange={(event) => setNomdutilisateur(event.target.value)}
                />



                <input
                    className="rounded-2xl mb-6  bg-blue-primary bg-opacity-40 outline-none py-2 px-4 transition duration-400 ease-in-out hover:box-shadow-xl hover:scale-105 focus:box-shadow-inner focus:ring-2 focus:ring-blue-secondary "
                    type="text"
                    autoComplete="off"
                    name="Objet"
                    id="objet"
                    required
                    placeholder="objet"
                    value={objet}
                    onChange={(event) => setObjet(event.target.value)}
                />

                <textarea
                    className="block rounded-2xl mb-6 bg-blue-primary bg-opacity-40 outline-none py-2 px-4 transition duration-400 ease-in-out hover:box-shadow-xl hover:scale-105 focus:box-shadow-inner focus:ring-2 focus:ring-blue-secondary text-top"
                    autoComplete="off"
                    name="Message"
                    id="message"
                    required
                    placeholder="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                ></textarea>




                <div className="flex flex-col items-center">
                    <button
                        type="submit"
                        className=" py-2 px-6 rounded-xl bg-blue-third text-black font-medium transition duration-400 ease-in-out shadow-md hover:box-shadow-xl hover:scale-105 active:translate-x-0 active:translate-y-0 active:shadow-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        commencer la discussion
                    </button>
                    <p className=" text capitalize mt-10 mb-10">ou bien contactez-nous via:</p>
                </div>

                <div className=" flex flex-col items-center  ">

                    <a className="  flex items-center my-2" href="mailto:khatwa.equipe24@esi.dz">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F0AB99" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                        </svg>
                        <span className="ml-2 text-black text-opacity-40 transition-colors duration-200 hover:text-opacity-100 hover:underline">khatwa.equipe24@esi.dz</span>
                    </a>
                    <div className=" flex items-center my-2">

                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F0AB99" class="bi bi-telephone-plus-fill " viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM12.5 1a.5.5 0 0 1 .5.5V3h1.5a.5.5 0 0 1 0 1H13v1.5a.5.5 0 0 1-1 0V4h-1.5a.5.5 0 0 1 0-1H12V1.5a.5.5 0 0 1 .5-.5z" />
                        </svg>
                        <a className="ml-2 text-black text-opacity-40 transition-colors duration-200 hover:text-opacity-100 hover:underline" href="tel:025179865">025179865 </a>
                        <span className="ml-2 text-black text-opacity-40">/ </span>
                        <a className="ml-2 text-black text-opacity-40 transition-colors duration-200 hover:text-opacity-100 hover:underline" href="tel:023991428">023991428 </a>
                    </div>
                </div>

            </form>
            <img
                src={Nouscontacter}
                alt="contactus"
                className="hidden md:block w-3/5"
                style={{ height: "auto" }}
            />

        </div>

    )
}

export default ContactUs;
