import React from "react";
import logo from '../Assets/Home/logo png.png'
import MAP from "../Assets/APropos/MAP.png";
import MyLink from "../Components/MyLink";
function APropos() {
    return (

        <div className="mt-40">

            <div className="text-center" >
                <p className="font-bold  mt-8 text-base md:text-lg leading-5 uppercase text-blue-primary" >A PROPOS</p>
                <div className=" font-bold text-3xl md:text-4xl leading-3/4 capitalize mb-15  text-black">A Propos De Khatwa</div>
            </div>

            <div className="flex justify-center items-center gap-4 mt-20 mb-20 py-8">

                <div class="w-2/5 text-center ml-5 md:ml-20 ">
                    <p class="text-orange-2 font-bold text-2xl md:text-3xl mb-4 leading-3/4 capitalize">
                        Bienvenue sur KHATWA,
                    </p>
                    <p class="font-normal ">
                        Le moteur de recherche de crèches pour les parents occupés. Notre objectif est de
                        faciliter la recherche de crèches pour les parents qui cherchent un endroit sûr et de
                        confiance pour leur enfant.
                    </p>

                </div>
                <div className="w-1/5 ml-20 md:ml-40 flex items-center justify-center">
                    <img src={logo} alt="logo" className="w-full md:w-2/3 mr-10" />
                </div>


            </div>



            <div class="flex justify-end mb-10 md:mb-20 w-full">
                <div class="w-full md:w-1/2 p-5">
                    <div class="text-center">
                        <p class="font-bold text-2xl md:text-3xl mb-4 leading-3/4 capitalize text-orange-2">
                            Qui sommes-nous?
                        </p>
                        <p class="font-normal">
                            Notre équipe se compose d’un groupe d’étudiants de l’école nationale superieure de
                            l’informatique passionnés, qui comprennent les défis que les parents rencontrent lorsqu'ils cherchent une crèche pour leur enfant donc nous avons créé ce moteur de recherche de crèches pour vous aider à trouver une crèche de qualité près de chez vous.
                        </p>
                    </div>
                </div>
            </div>



            <div className="flex flex-col bg-white p-5 text-center mb-20">
                <p className="font-bold text-2xl md:text-3xl mb-4 leading-3/4 capitalize text-orange-2 w-3/5 mx-auto">
                    Qu’est-ce que vous offre KHATWA?
                </p>
                <p className="w-full md:w-4/5 mx-auto mb-4 md:mb-8 font-normal">
                    Notre moteur de recherche de crèches vous permet de trouver des informations détaillées sur les crèches disponibles dans votre région. Nous incluons des informations sur les tarifs, les programmes, les heures d'ouverture, les services proposés, les avis et les évaluations des autres parents. Vous pouvez également contacter directement les crèches que vous trouvez sur notre site web pour organiser une visite.
                </p>
                <p className="w-full md:w-3/4 mx-auto font-normal">
                    KHATWA vous permet aussi, si vous êtes gestionnaire d’une crèche, d’ajouter votre établissement au site et offrir vos services aux parents. Nous donnons ainsi le choix de la prise des rendez-vous ou bien l’inscription d’un enfant via le site.
                </p>
            </div>


            <div className="flex flex-col justify-center items-center bg-white p-5 text-center mb-20">
                <p className="font-bold text-2xl md:text-3xl mb-10 leading-3/4 capitalize text-orange-2 w-11/12 md:w-3/5 mx-auto">
                    Où nous trouver?
                </p>
                <img src={MAP} alt="MAP" className="w-11/12 md:w-4/5 border-blue-primary border-2 rounded-xl" />
            </div>


            <div class="bg-blue-primary bg-opacity-10 h-auto md:h-[24rem] w-full flex flex-col justify-center items-center" style={{ clipPath: 'ellipse(100% 50% at 50% 50%)' }}>
                <p class="font-bold mt-3 text-3xl md:text-4xl mb-4 md:mb-10 leading-3/4 capitalize text-orange-2 w-3/5 text-center">
                    Merci d'avoir choisi KHATWA
                </p>
                <p class="w-5/6 md:w-3/5 font-normal text-center mb-6 ">
                    pour votre recherche de crèche. Nous sommes ravis de faire partie de votre parcours en tant que parent/gérant de crèches et nous espérons que notre moteur de recherche de crèches facilitera votre recherche de la crèche idéale pour votre enfant/ la promotion de votre crèche.
                </p>
                <div class="flex flex-col mt-2 md:flex-row justify-center items-center gap-4 md:gap-8 ">
                    <MyLink to="/">
                        <button class="w-40 md:w-55 bg-blue-primary bg-opacity-70 hover:bg-opacity-40 active:bg-blue-primary duration-[125ms] text-white font-bold py-2 px-6 md:py-2 md:px-4 rounded-2xl md:rounded-xl md:ml-4 mb-4 md:mb-0 truncate">
                            Accueil
                        </button>
                    </MyLink>
                    <MyLink to="/signin">
                        <button class="w-40 md:w-55 bg-blue-primary bg-opacity-70 hover:bg-opacity-40 active:bg-blue-primary duration-[125ms] text-white font-bold py-2 px-6 md:py-2 md:px-4 rounded-2xl md:rounded-xl md:ml-4 mb-4 md:mb-0 truncate">
                            Se Connecter
                        </button>
                    </MyLink>
                    <MyLink to="/signup">
                        <button class="w-40 md:w-55 bg-blue-primary bg-opacity-70 hover:bg-opacity-40 active:bg-blue-primary duration-[125ms] text-white font-bold py-2 px-6 md:py-2 md:px-4 rounded-2xl mb-4 md:ml-4 md:mb-0 truncate">
                            S'inscrire
                        </button>
                    </MyLink>
                </div>
            </div>

        </div>
    )
}
export default APropos
