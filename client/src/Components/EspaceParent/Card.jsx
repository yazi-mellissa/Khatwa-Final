import React from 'react';
import MyLink from '../MyLink';
import profilPic from "../../Assets/Parent Space/Crecheicon.png";

function Card({ notif }) {
  const userToken=JSON.parse(localStorage.getItem('user'))
  const user=userToken.role==="PARENT"?notif.kindergarten:notif.parent.length>0?notif.parent[0]:{}
  return (
    <div className={`flex md:px-12 justify-between mx-auto px-3 w-full hover:bg-gray-100 border-l-[25px] ${!notif.is_read?'border-l-blue-primary':'border-l-gray-200'} duration-300`}>

      <div className="flex justify-between items-center m-3 ">
  
        <div className="flex items-center mt-1">
          <img className="mx-auto w-20 aspect-square rounded-xl  " src={profilPic} alt="Pic" />

        </div>
       
        <div className="flex flex-col md:w-full ml-5">

          <div className="flex items-center text-xl mt-1 ">
            <MyLink to={`../${user._id}`}>
              <p className=" upperload hover:text-blue-primary duration-300"> {userToken.role==="PARENT"?user.etabName:user.firstName+' '+user.lastName} </p>
            </MyLink>
          </div>
          <div className='flex md:flex-raw gap-x-7'>
            <div className="flex items-center mt-1">
              <p className="text-gray-600 text-base pr-12">{notif.message}</p>

            </div>
          </div>

        </div>
      </div>
            <div className="flex items-center mt-1">
              <p className="text-gray-600 text-base">{notif.time_since_created}</p>
            </div>

    </div>
  );
}

export default Card;
