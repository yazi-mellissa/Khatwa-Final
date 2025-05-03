import { useState } from "react";
import Profilpic from "../../Assets/Parent Space/Profilpic.png";
import drop from "../../Assets/Admin Space/drop.png";
import settings from "../../Assets/Admin Space/settings.png";
import out from "../../Assets/Admin Space/out.png";
import MyLink from "../MyLink";
function AdminDropdown({ name }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const [isRotated, setIsRotated] = useState(false);

    const handleRotate = () => {
        setIsRotated(!isRotated);
    };
    return (
        <div className="relative">
            <button
                className="  w-80 h-fit text-black bg-white rounded-xl  border-2 border-black border-opacity-50 "
                onClick={handleToggle}
            >
                <div className=" p-2 flex  flex-row items-center justify-between gap-x-3">
                    <img
                        className={`w-7 m-2  ${isOpen? "transform rotate-180" : ""}`}
                        onClick={handleRotate}
                        src={drop}
                        alt=""
                    />
                    <p className="">{name}</p>
                    <img className='w-10 aspect-square ' src={Profilpic} alt="" /></div>
               
            </button>

            {isOpen && (
                <div className="absolute right-0 w-80 mt-2 origin-top-right border-2 border-black border-opacity-50 bg-white rounded-xl shadow-lg">
                    <div
                        className="py-1 px-4 rounded-xl  cursor-pointer"
                        onClick={() => console.log("Settings clicked")}
                    >
                        <MyLink to="../settings">
                            <div className=" flex  flex-row items-center justify-between gap-x-1">

                                <img className='w-8 mt-2 self-start' src={settings} alt="" />
                                <p className=" mt-2 self-center">Parametres</p>
                                <div></div>
                            </div>
                        </MyLink>
                        <div className=' mt-2 mb-2 opacity-50 h-[1.5px] bg-black w-full '></div>
                    </div>
                    <div
                        className="py-1 px-4 rounded-xl cursor-pointer"
                        onClick={() => console.log("Logout clicked")}
                    >
                        <MyLink to="../logout">
                            <div className=" flex  flex-row items-center justify-between gap-x-1">

                                <img className='w-8  mb-1 self-start' src={out} alt="" />
                                <p className="  mb-1 self-center">Se Deconnecter</p>
                                <div></div>
                            </div>
                        </MyLink>

                    </div>
                </div>
            )}
        </div>
    );
}
export default AdminDropdown