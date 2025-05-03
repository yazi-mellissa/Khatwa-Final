import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from './../../Redux/Slices/authSlice'



function SignInAdmin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role,setRole]=useState('admin')
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      )
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
      
        if (isSuccess) {
            console.log('isSuccess')

          navigate('/messages')
        }
      
        dispatch(reset())
      }, [user,isSuccess, isError, message, navigate, dispatch])
    

    const handleSubmit =(event) => {
        event.preventDefault();
        const userData = {
            email,
            password,
        }
        dispatch(login(
            {userData,role}))
        
    };
    
    console.log(message)
    return (
        <div className="font-body relative">
            {
                isLoading&&
                <div className="fixed top-0">
                    <div className=" w-screen h-screen grid place-items-center bg-black bg-opacity-50">
                        <span class="loader"></span>
                    </div>
                </div>

            }
            <ToastContainer></ToastContainer>
            <div class=" text-center" >
                <p class="font-bold mb-1 mt-8 text-lg leading-5 uppercase text-blue-primary" >CONNEXION</p>
                <span class=" font-bold text-3xl md:text-4xl leading-3/4  text-black">Connectez-Vous Pour Consulter</span>
                <div class=" font-bold text-3xl md:text-4xl leading-3/4   text-black">Votre Compte Admin</div>
            </div>
            
            <form onSubmit={handleSubmit} class="mt-10 mx-auto max-w-sm sm:max-w-md bg-white p-8 border-2 border-blue-primary rounded-lg shadow-lg">
                
                <h2 class="text-center text-5xl font-bold mb-9 capitalize text-light-orange-2 font-sans leading-7 ">KHATWA</h2>
                
                <div class="mb-4">
                    <label class="text-base md:text-lg leading-6 capitalize mb-2 text-black" for="email_field">
                        Email
                    </label>
                    <input
                        class="appearance-none w-full py-5 px-3 text-gray-700 leading-tight focus:outline-none border-blue-primary border border-1 rounded-xl"
                        autocomplete="on"
                        name="Email"
                        id="email"
                        type="email"
                        placeholder="Entrer votre email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}


                    />
                </div>
                <div class="mb-4">
                    <label class="text-base md:text-lg leading-6 capitalize mb-2 text-black" for="password">
                        Mot De Passe
                    </label>
                    <input
                        class="appearance-none   w-full py-5 px-3 text-gray-700 leading-tight focus:outline-none
            border-blue-primary  border border-1  rounded-xl"
                        autocomplete="off"
                        name="password"
                        id="password_field"
                        type="password"
                        placeholder="Entrer votre mot de passe"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div class="flex items-center justify-center">
                    <button class=" gap-10 bg-blue-primary text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2  hover:tracking-wider  hover:shadow-lg" type="submit">
                        <span className='text-base md:text-lg'>Se connecter</span>
                    </button>
                </div>


               
            </form>

            
        </div>

    );
}
export default SignInAdmin;