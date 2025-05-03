import React from 'react'
import logo from '../Assets/Home/logo png.png'
import { Link } from 'react-router-dom'
import facebook from '../Assets/Home/facebook.png'
import twitter from '../Assets/Home/twitter.png'
import linkedin from '../Assets/Home/linkedin.png'
import instagram from '../Assets/Home/instagram.png'
import copyright from '../Assets/Home/copyright.png'
import { Informations,Services,Contact } from '../Constants'


const Footer = () => {
  return (
    <div className='mt-16 bg-light-orange-3 text-sm md:text-base'>
        <div className='font-body grid grid-cols-2 md:grid-cols-3 pt-10'>
            <div className='col-span-1 my-20 mx-4 md:mx-10'>
                <img src={logo} alt="" className='w-[30%] md:h-auto md:w-auto' />
                <p className='opacity-50 md:w-72'>accompagne vos enfants dans leurs premiers pas d’apprentissage.</p>
            </div>
            <div className='col-span-1 md:col-span-2 flex flex-wrap justify-center items-center md:space-x-12 mr-10 md:mr-0 mt-16'>
                <div>
                    <p className='font-semibold mb-4 md:mt-0 mt-4'>Informations</p>
                    {
                        Informations.map((element)=>(
                            <div className='opacity-50  mt-1'>
                                <Link to={element.link}>{element.title}</Link>
                            </div>
                            
                        ))
                    }
                </div>
                <div>
                    <p className='font-semibold mb-4 md:mt-0 mt-4'>Nos Services</p>
                    {
                        Services.map((element)=>(
                            <div className='opacity-50 mt-1'>
                                <Link to={element.link}>{element.title}</Link>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <p className='font-semibold mb-4 capitalize md:mt-0 mt-4'>nous contacter</p>
                    {
                        Contact.map((element)=>(
                            <div className='flex items-center  mt-1'>
                                <img className='mr-2' src={element.img} alt="" />
                                <p className='opacity-50'>{element.title}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            
        </div>
        <div className='mx-10 h-[1px] bg-black opacity-20 mt-8 md:mt-0'></div>
        <div className='grid grid-cols-5 grid-rows-1 mx-4 text-xs items-center p-2'>
            <p className='opacity-40'><Link>Politique de confidentialité</Link></p>
            <p className='opacity-40'><Link>Termes et conditions</Link></p>
            <div className='flex space-x-1'> <img className='h-[16px]' src={copyright} alt="" /> <p className='opacity-40'> 2023 Tous droits réservés</p></div>
            <div className='col-span-2 flex space-x-3 justify-self-end md:justify-self-auto md:place-self-end h-[16px]'>
                    <img src={facebook} alt="" />
                    <img src={instagram} alt="" />
                    <img src={twitter} alt="" />
                    <img src={linkedin} alt="" />
            </div>
        </div>
        <div className='h-[10px] bg-orange-2'></div>

    </div>
  )
}

export default Footer