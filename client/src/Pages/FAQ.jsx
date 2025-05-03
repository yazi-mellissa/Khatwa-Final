import React from "react";
import FaqPage from "../Components/FaqPage";
import FAQ1 from "../Assets/FAQ/FAQ1.png";
import FAQ2 from "../Assets/FAQ/FAQ2.png";
import FAQ3 from "../Assets/FAQ/FAQ3.png";
import FAQ4 from "../Assets/FAQ/FAQ4.png";
import MyLink from "../Components/MyLink";
function FAQ() {
    return (
        <div>

            <header>
                <div class="text-center mt-40" >
                    <p class=" font-bold mb-1 mt-8 text-base md:text-lg leading-5 uppercase text-blue-primary" >FAQ</p>
                    <span class=" font-bold text-3xl md:text-4xl leading-3/4  text-black">Frequently Asked Questions</span>
                    <div class="mt-2 text-gray-700 text-xs leading-tight">Vous Avez Des Questions ? Nous Sommes Là Pour Vous Aider.</div>
                    <div className="uppercase font-bold leading-5 mt-7 "><span className="hover:text-orange-2 cursor-pointer">parent   </span>|<span className="hover:text-orange-2 cursor-pointer">  gestionnaire de crèche</span> </div>
                </div>
            </header>

            <main>
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mt-10 md:mr-10 ">
                        <FaqPage title="Comment fonctionne khatwa?" text="Answer 1" />
                        <FaqPage title="Comment puis-je m’inscrire sur le site?" text="Answer 2" />
                        <FaqPage title="Comment puis-je trouver des crèches près de chez moi?" text="Answer 3" />
                    </div>
                    <img src={FAQ1} alt="FAQ1" style={{ width: "309px", height: "309px", marginTop: 50, marginRight: 50 }} />
                </div>



                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="order-2 md:order-1">
                        <img src={FAQ2} alt="FAQ2" style={{ width: "320px", height: "320px", marginTop: 50, marginLeft: 50 }} />
                    </div>
                    <div className="order-1 md:order-2 mt-10 md:ml-10 ">
                        <FaqPage title="Comment puis-je filtrer les résultats de recherche?" text="Answer 1" />
                        <FaqPage title="Comment puis-je voir les avis et les évaluations des autres parents?" text="Answer 2" />
                        <FaqPage title="Comment puis-je prendre rendez-vous pour visiter une crèche?" text="Answer 3" />
                    </div>
                </div>


                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mt-10 md:mr-10 ">
                        <FaqPage title="Comment puis-je contacter directement une crèche ?" text="Answer 1" />
                        <FaqPage title="Comment puis-je enregistrer mes préférences pour faciliter mes recherches futures ?" text="Answer 2" />
                        <FaqPage title="Comment puis-je recevoir des notifications lorsque de nouvelles crèches sont ajoutées ?" text="Answer 3" />
                    </div>
                    <img src={FAQ3} alt="FAQ3" className="sm:w-1/2 sm:mt-0" style={{ width: "329px", height: "251px", marginTop: 50, marginRight: 50 }} />
                </div>

                <div className="flex flex-col mt-10 md:flex-row justify-between items-start">
                    <img src={FAQ4} alt="FAQ4" className="rounded-md self-center md:mr-16 order-2 md:order-1" style={{ width: "435px", height: "435px", marginTop: 50 }} />
                    <div className="mt-10 flex-1 md:ml-10 ml-3 mr-3 order-1 md:order-2">
                        <p className=" font-bold mb-5 text-lg leading-5 uppercase text-blue-primary text-center md:text-start">encore des questions ?</p>
                        <h2 className="font-bold text-3xl md:text-4xl leading-tight mb-3 uppercase text-black">Vous ne trouvez toujours pas de réponses à vos questions ?</h2>
                        <p className="mt-4 text-gray-700 text-base leading-4">Veuillez contacter notre équipe et un consultant se chargera de vous fournir des réponses.</p>
                        <div class="flex items-center justify-center">
                            <MyLink to="/contact">
                                <button class="bg-light-orange-2 bg-opacity-98 text-black font-normal w-32 h-10 border-2 border-orange-2 rounded-2xl hover:bg-blue-primary hover:outline-blue-primary hover:border-blue-secondary hover:text-white hover:bg-opacity-40 active:bg-blue-primary active:border-none duration-[125ms] md:self-end md:absolute md:right-12 mt-5">
                                    Se connecter
                                </button>
                            </MyLink>
                        </div>
                    </div>
                </div>


            </main>
        </div>

    );

}
export default FAQ
