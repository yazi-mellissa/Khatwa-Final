import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from './../Redux/Slices/authSlice'



function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role,setRole]=useState('Parent')
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
                <div class=" font-bold text-3xl md:text-4xl leading-3/4   text-black">Votre Compte</div>
            </div>
            
            <form onSubmit={handleSubmit} class="mt-10 mx-auto max-w-sm sm:max-w-md bg-white p-8 border-2 border-blue-primary rounded-lg shadow-lg">
                
                <h2 class="text-center text-5xl font-bold mb-9 capitalize text-light-orange-2 font-sans leading-7 ">KHATWA</h2>
                <div className="grid grid-cols-2 place-items-center text-xl border-t-2 border-blue-primary mb-4">
                    <div className={`border-b-2 ${role==='Parent' ?' border-blue-primary':'border-white'} cursor-pointer hover:bg-gray-100 w-full text-center py-2 duration-300`} onClick={()=>setRole('Parent')}>Parent</div>
                    <div className={`border-b-2 ${role==='kindergarten' ?' border-blue-primary':'border-white'} cursor-pointer hover:bg-gray-100 w-full text-center py-2 duration-300`} onClick={()=>setRole('kindergarten')}>Creche</div>
                </div>
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


                <div class="w-full flex items-center justify-center gap-30 text-rgba(0, 0, 0, 0.77) ">
                    <hr class=" block w-full border-1 border-black" />
                    <span class="ml-4 mr-4 text-base md:text-lg">OU</span>
                    <hr class=" block w-full border-1 border-black" />

                </div>
                <p class="text-center mt-2 mb-1 text-base md:text-lg">Se connecter avec:</p>
                <ul class="flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-row border border-gray-400 rounded-lg w-300 p-2 mt-2 md:mt-0 md:border-none">
                        <li class="border border-gray-400 p-2 inline-block rounded-lg ">



                            <button title="Sign In" type="submit" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#888888" class="bi bi-google" viewBox="0 0 16 16 ">
                                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                </svg>
                            </button>

                        </li>
                        <li>
                            <span class="cursor-pointer text-base ml-1 md:text-lg ">compte google</span>
                        </li>
                    </div>

                    <div className="flex flex-row border border-gray-400 rounded-lg w-300 p-2 mt-2 md:mt-0 md:border-none">

                    <li class="border border-gray-400 p-2 inline-block rounded-lg ">
                        <button title="Sign In" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#888888" class="bi bi-apple" viewBox="0 0 16 16">
                                <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                                <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                            </svg>
                        </button>
                    </li>
                    <li>
                        <span class="cursor-pointer text-base ml-1 md:text-lg">compte apple</span>
                    </li>
                    </div>
                  
                </ul>


                <p class="text-blue-primary hover:underline mt-1 text-center text-base md:text-lg" ><a href="#">J'ai oublie mon mot de passe</a></p>

            </form>

            <div class="mt-3 mb-3  mx-auto max-w-sm sm:max-w-md bg-white p-8 border-2 border-blue-primary rounded-lg shadow-lg">
                <p class="text-center text-base md:text-lg">Vous n'avez pas de compte? <a href="/signup" class="text-blue-primary hover:underline text-base md:text-lg">Inscrivez-vous</a></p>
            </div>
        </div>

    );
}
export default SignIn;