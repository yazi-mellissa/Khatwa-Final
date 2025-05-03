import React,{useState,useEffect} from 'react'
import { useSelector } from "react-redux";
import {Bar} from 'react-chartjs-2'
import { Pie } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import axios from 'axios'
import Dropdown from '../../Components/Dropdown';
import MyLink from '../../Components/MyLink';
import chat from './../../Assets/Signup/chat.png'
import img from './../../Assets/Home/Arezki.png'
import { toast,ToastContainer } from 'react-toastify'
import randomColor from 'randomcolor';
import 'react-toastify/dist/ReactToastify.css';



const Dashboard = () => {
  const userToken=JSON.parse(localStorage.getItem('user'))
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const [pastWeek, setPastWeek] = useState([]);

  

  const el=['cette semaine','ce mois-ci','cette année']
  const [view,setView]=useState(el[0])
  const [UserData,setUser]=useState([])
  const [childNumber,setChildNumber]=useState(0)
  const [parentNumber,setParentNumber]=useState(0)
  const [crecheNumber,setCrecheNumber]=useState(0)


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/admin/accueil/y',  {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken.token}`
          }
        });
        console.log(response.data)
        setUser(response.data)
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
  const [creches,setCreches]=useState([])


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
        const response = await axios.get('http://localhost:3001/admin/accueil/'+mode,  {
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
        const response = await axios.get('http://localhost:3001/admin/accueil',  {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken.token}`
          }
        });
        console.log(response.data)
        setChildNumber(response.data.childrenNumber)
        setCrecheNumber(response.data.kindergartenNumber)
        setParentNumber(response.data.parentNumber)
        
      } catch (error) {
        toast(error);
      }
    }
  
    fetchData();
  }, []);
  useEffect(()=>{

    axios.get(`http://localhost:3001/admin/parents/`,  {
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${userToken.token}`
         }
       })
       .then((response) => {
         console.log(response.data); // log the response data (optional)
         setParents(response.data);
       })
       .catch((error) => {
         toast(error);
       });
   
 },[])

 useEffect(()=>{

  axios.get(`http://localhost:3001/admin/kindergartens/`,  {
       headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${userToken.token}`
       }
     })
     .then((response) => {
       console.log(response.data); // log the response data (optional)
       setCreches(response.data.kindergartens);
     })
     .catch((error) => {
       toast(error);
     });
 
},[])



  const generateChartData = (users) => {
    // Group parents by the "Wilaya" field
    const groupedUsers = users.reduce((result, user) => {
      const wilaya = user.location.wilaya;
      if (!result[wilaya]) {
        result[wilaya] = 1;
      } else {
        result[wilaya]++;
      }
      return result;
    }, {});
  
    // Extract labels and data from the grouped parents
    const labels = Object.keys(groupedUsers);
    const data = Object.values(groupedUsers);
    const colors = randomColor({
      count: labels.length,
      luminosity: 'bright',
      format: 'rgba',
      alpha: 0.6,
    });
  
    // Return the chart data
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
        },
      ],
    };
  };
  

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

  const parentWilayaData = generateChartData(parents);
  const crecheWilayaData = generateChartData(creches);



  return (
    <div className={`font-body duration-300 lg:pl-8 pt-8 ${isOpen?'lg:ml-[12rem]':'lg:ml-[6rem]'}`}>
        <h1 className='font-bold text-orange-2 lg:text-5xl text-3xl lg:mt-4 mt-24 mb-8 ml-8'>Bienvenue sur Khatwa</h1>
      <div className=' grid grid-cols-1 lg:grid-cols-5 duration-300 ' >
          <div className='lg:ml-12 col-span-1 lg:col-span-3 flex flex-col items-center lg:items-start'>
            <p className='uppercase text-blue-primary font-bold'>votre crèche en nombre</p>
            <p className='opacity-70 text-sm'>Découvrez l’activité de votre crèche sur Khatwa</p>
            <div className='flex space-x-12 mt-8'>
              <div className='rounded-full flex flex-col space-y-2 justify-center items-center aspect-square lg:w-60 w-32 bg-opacity-30 bg-blue-secondary'>
                <p className='lg:text-4xl text-2xl font-bold'>+{parentNumber}</p>
                <p className='text-center lg:text-lg text-sm opacity-70 lg:px-12 px-2'>Parents font confiance a Khatwa !</p>
              </div>
              <div className='rounded-full flex flex-col space-y-2 justify-center items-center aspect-square lg:w-60 w-32 bg-opacity-30 bg-blue-secondary'>
                <p className='lg:text-4xl text-2xl font-bold'>+{crecheNumber}</p>
                <p className='text-center lg:text-lg text-sm opacity-70 lg:px-12 px-2'>Creches partenaires dans differentes wilayas !</p>
              </div>
              <div className='rounded-full flex flex-col space-y-2 justify-center items-center lg:aspect-square lg:w-60 w-32 bg-opacity-30 bg-blue-secondary'>
                <p className='lg:text-4xl text-2xl font-bold'>+{childNumber}</p>
                <p className='text-center lg:text-lg text-sm opacity-70 lg:px-12 px-2'>Enfants inscrits a une creche grace a Khatwa !</p>
              </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-72 w-full '>
              <div className='lg:w-[25rem] w-[12rem] mt-4 mb-12'>
                <p className='uppercase text-blue-primary font-bold w-96 mt-8 text-center lg:text-left'>comment sont répartis vos parents selon leurs wilayas</p>
                <Pie key={1} data={parentWilayaData} ></Pie>
              </div>
              <div className='lg:w-[25rem] w-[12rem] mt-4 mb-12'>
              <p className='uppercase text-blue-primary font-bold w-96 mt-8 text-center lg:text-left'>comment sont répartis vos creches selon leurs wilayas</p>

                <Pie key={2} data={crecheWilayaData} ></Pie>
              </div>
            </div>
            <p className='uppercase text-blue-primary font-bold w-96 mt-8 text-center lg:text-left'>comment se passent les inscriptions récemment ?</p>
            <Dropdown value={view} onChange={(e)=>setView(e.target.value)} className='mt-4 border-2 border-blue-primary rounded-full lg:h-14 lg:w-80 w-60 h-12 pl-10 pr-6 focus:outline-none capitalize' elements={el}></Dropdown>
            <div className='lg:w-[38rem] w-[20rem] mt-4 mb-12'>
              <Bar key={JSON.stringify(userData)} data={userData} ></Bar>
            </div>
          </div>
          
      </div>
    </div>
  )
}

export default Dashboard