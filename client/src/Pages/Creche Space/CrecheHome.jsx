import React,{useState,useEffect} from 'react'
import { useSelector } from "react-redux";
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import axios from 'axios'
import Dropdown from '../../Components/Dropdown';
import MyLink from '../../Components/MyLink';
import chat from './../../Assets/Signup/chat.png'
import img from './../../Assets/Home/Arezki.png'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



const CrecheHome = () => {
  const userToken=JSON.parse(localStorage.getItem('user'))
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const [pastWeek, setPastWeek] = useState([]);

  function ParentCard(props){
    return(
      <MyLink to='messages'>
      <div className='flex items-center justify-between px-8 bg-light-orange-4 hover:bg-gradient-to-r from-light-orange-4 to-white border-2 hover:text-blue-primary border-light-orange-2 h-20 w-72 rounded-xl duration-300'>
        <img src={props.img} alt="" className='w-14 rounded-full aspect-square object-cover border-2 border-light-orange-2'/>
        <div className='font-medium'>{props.name}</div>
          <img src={chat} alt=""  />
      </div>
      </MyLink>
    )
  }

  const el=['cette semaine','ce mois-ci','cette année']
  const [view,setView]=useState(el[0])
  const [UserData,setUser]=useState([])
  const [all_insc,setAll_insc]=useState(0)
  const [current_month,setCurrent_month]=useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/kindergarten/accueil/w`,  {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken.token}`
          }
        });
        setUser(response.data)
        console.log(response.data)
        setUserData({
          labels: response.data.map((date)=>date.label),
          
          datasets: [
            {
              label: "Nouveaux Garcons",
              data: response.data.map((data) => data.newMale),
              backgroundColor: [
                "#008B8D"
                
              ],
            },
            {
              label: "Nouvelles Filles",
              data: response.data.map((data) => data.newFemale),
              backgroundColor: [
                "#E35936"
              ],
            },
          ],
        })
      } catch (error) {
        toast(error);
      }
    }
  
    fetchData();
  }, []);
  const [parents,setParents]=useState([])

  useEffect(() => {
    async function fetchData() {
      let mode=''
      if(view===el[0]){
        mode='w'
      }
      else if(view===el[1]){
        mode='m'
      }
      else{
        mode='y'
      }
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/kindergarten/accueil/`+mode,  {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken.token}`
          }
        });
        setUser(response.data)
        console.log(response.data)
        setUserData({
          labels: response.data.map((date)=>date.label),
          
          datasets: [
            {
              label: "Nouveaux Garcons",
              data: response.data.map((data) => data.newMale),
              backgroundColor: [
                "#008B8D"
                
              ],
            },
            {
              label: "Nouvelles Filles",
              data: response.data.map((data) => data.newFemale),
              backgroundColor: [
                "#E35936"
              ],
            },
          ],
        })
      } catch (error) {
        toast(error);
      }
    }
  
    fetchData();
  }, [view]);



  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/kindergarten/accueil`,  {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken.token}`
          }
        });
        console.log(response.data)
        setAll_insc(response.data.all_insc)
        setCurrent_month(response.data.current_month)
        setParents(response.data.parents)
        
      } catch (error) {
        toast(error);
      }
    }
  
    fetchData();
  }, []);

  const [userData, setUserData] = useState({
    labels: UserData.map((date)=>date.label),
    
    datasets: [
      {
        label: "Nouveaux Garcons",
        data: UserData.map((data) => data.newMale),
        backgroundColor: [
          "#008B8D"
          
        ],
      },
      {
        label: "Nouvelles Filles",
        data: UserData.map((data) => data.newFemale),
        backgroundColor: [
          "#E35936"
        ],
      },
    ],
  });
  return (
    <div className={`font-body duration-300 lg:pl-8 pt-8 ${isOpen?'lg:ml-[12rem]':'lg:ml-[6rem]'}`}>
        <h1 className='font-bold text-orange-2 lg:text-5xl text-3xl lg:mt-4 mt-24 mb-8 ml-8'>Bienvenue sur Khatwa</h1>
      <div className=' grid grid-cols-1 lg:grid-cols-5 duration-300 ' >
          <div className='lg:ml-12 col-span-1 lg:col-span-3 flex flex-col items-center lg:items-start'>
            <p className='uppercase text-blue-primary font-bold'>votre crèche en nombre</p>
            <p className='opacity-70 text-sm'>Découvrez l’activité de votre crèche sur Khatwa</p>
            <div className='flex space-x-12 mt-8'>
              <div className='rounded-full flex flex-col space-y-2 justify-center items-center aspect-square lg:w-60 w-32 bg-opacity-30 bg-blue-secondary'>
                <p className='lg:text-4xl text-2xl font-bold'>+{all_insc}</p>
                <p className='text-center lg:text-lg text-sm opacity-70 lg:px-12 px-2'>Enfants inscrits chez vous grace a Khatwa !</p>
              </div>
              <div className='rounded-full flex flex-col space-y-2 justify-center items-center lg:aspect-square lg:w-60 w-32 bg-opacity-30 bg-blue-secondary'>
                <p className='lg:text-4xl text-2xl font-bold'>+{current_month}</p>
                <p className='text-center lg:text-lg text-sm opacity-70 lg:px-12 px-2'>Nouvelles inscriptions ce mois-ci !</p>
              </div>
            </div>
            <p className='uppercase text-blue-primary font-bold w-96 mt-8 text-center lg:text-left'>comment se passent les inscriptions récemment ?</p>
            <Dropdown value={view} onChange={(e)=>setView(e.target.value)} className='mt-4 border-2 border-blue-primary rounded-full lg:h-14 lg:w-80 w-60 h-12 pl-10 pr-6 focus:outline-none capitalize' elements={el}></Dropdown>
            <div className='lg:w-[38rem] w-[20rem] mt-4 mb-12'>
              <Bar key={JSON.stringify(userData)} data={userData} ></Bar>
            </div>
          </div>
          <div className='lg:col-span-2 col-span-1 flex flex-col items-center'>
            <p className='uppercase text-blue-primary font-bold text-center lg:text-left w-72'>parents des enfants inscrits chez vous</p>
            <p className='opacity-70 text-sm w-60 lg:w-72'>Besoin de contacter les parents ou de consulter leurs profils?</p>
            <div className='flex flex-col space-y-2 mt-4 items-start lg:h-[44rem] max-h-96 mb-24 overflow-y-scroll lg:pl-0 pl-2 pr-2'>
              {
                UserData.length>0?
                parents.map((parent)=>(
                  <ParentCard name={parent.firstName+' '+parent.lastName} img={img}></ParentCard>
                )):''
              }
              {
                  UserData.length>0?parents.length===0&&
                  <div className='w-72 px-8 flex flex-col items-center'>
                    <p className='text-xl mt-20'>Aucun Parent</p>
                  </div>:''
              }
            </div>
          </div>
      </div>
    </div>
  )
}

export default CrecheHome