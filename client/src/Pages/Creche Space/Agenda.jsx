import React,{useState,useRef,useEffect,useLayoutEffect} from 'react'
import { toggleSidebar } from "../../Redux/Slices/sideBarSlice";
import { useDispatch, useSelector } from "react-redux";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import Dropdown from './../../Components/Dropdown'
import right from './../../Assets/Agenda/right.svg'
import left from './../../Assets/Agenda/left.svg'
import ajout from './../../Assets/Signup/add_green.png'
import supp from './../../Assets/Signup/sup_green.png'
import check from './../../Assets/Signup/check.png'
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';
import MyLink from '../../Components/MyLink';




const Agenda = () => {
  const user=JSON.parse(localStorage.getItem('user'))
  const localizer = momentLocalizer(moment);
  const [time, setTime] = useState('12:00');
  const handleTimeChange = (selectedTime) => {
    setTime(selectedTime);
  };

  const [parents,setParents]=useState([])
  const [events,setEvents] = useState([])

  useEffect(()=>{

    axios.get(`${process.env.REACT_APP_API_URL}/kindergarten/events/`,  {
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${user.token}`
         }
       })
       .then((response) => {
         console.log(response.data); // log the response data (optional)
         setEvents(response.data.events)
         setParents(response.data.parents)
       })
       .catch((error) => {
         toast(error);
       });
   
 },[])

 useEffect(()=>{
  setAllEvents(events)
 },[events])
 
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" ,description:""});
    const [allEvents, setAllEvents] = useState(events);
    const [add,setAdd]=useState(false)
    const [type,setType]=useState('privé')
    const [scroll,setScroll]=useState(0)
    const [selected,setSelected]=useState([])
    const containerRef = useRef(null);
    const handleMessage=(e)=>{
      e.preventDefault()
      axios.post(`${process.env.REACT_APP_API_URL}/kindergarten/chats`, {
        },
         {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        })
        .then((response) => {
          console.log(response.data); // log the response data (optional)
        })
        .catch((error) => {
          toast(error);
        });
    }
    function handleAddEvent() {
      console.log('handle')
        
        for (let i=0; i<allEvents.length; i++){

            const d1 = new Date (allEvents[i].start);
            const d2 = new Date(newEvent.start);
            const d3 = new Date(allEvents[i].end);
            const d4 = new Date(newEvent.end);
            console.log(allEvents[i])
      /*
          console.log(d1 <= d2);
          console.log(d2 <= d3);
          console.log(d1 <= d4);
          console.log(d4 <= d3);
            */

             if (
              ( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&
                (d4 <= d3) )
              )
            {   
                alert("CLASH"); 
                break;
             }
    
        }
        const {description,title,start,end}=newEvent
        axios.post(`${process.env.REACT_APP_API_URL}/kindergarten/events`, {
          type:type,
          persons:selected.map((user)=>(user.id)),
          description,
          title,
          start,
          end
        },
         {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        })
        .then((response) => {
          console.log(response.data); // log the response data (optional)
          setAllEvents([...allEvents, newEvent]);
          setNewEvent({ title: "", start: "", end: "" ,description:""})
        })
        .catch((error) => {
          toast(error);
        });
        
        
    }
    const CustomToolbar = (props) => {
      const { label, onNavigate, onView, view } = props;
    
      const isMonthView = view === 'month'; // Check if the current view is 'month'
    
      return (
        <div className="bg-blue-secondary bg-opacity-50 rounded-t-xl p-2">
          <span className=" flex lg:flex-row flex-col space-y-4 lg:space-y-0 justify-between items-center px-4 py-2 ">
          <span className='flex justify-between items-center space-x-2 w-full lg:w-[30%]'>
            <span className="font-semibold text-xl">{label}</span>
            <span className='flex items-center lg:space-x-2 justify-between'>
              <button type="button" className='text-2xl lg:w-auto w-12 hover:opacity-50' onClick={() => onNavigate('PREV')}> <img src={left} alt="" /> </button>
              <button type="button" className='text-2xl lg:w-auto w-12 hover:opacity-50' onClick={() => onNavigate('NEXT')}><img src={right} alt=""/></button>
            </span>
          </span>
          <button type="button" className='h-10 w-25 text-blue-primary bg-white border-2 rounded-lg border-blue-primary font-medium text-sm px-2 hover:bg-blue-primary hover:text-white duration-300 uppercase'  onClick={() => onNavigate('TODAY')}>aujourd'hui</button>
          <span>
            <button
              type="button"
              className={view==='month' ? 'h-10 w-20 rounded-l-lg bg-blue-primary text-white text-sm font-medium border-2 border-r-0 border-blue-primary duration-300' : 'h-10 w-20 rounded-l-lg text-blue-primary bg-white border-2 border-r-0 border-blue-primary text-sm font-medium duration-300'}
              onClick={() => onView('month')}
              >
              MOIS
            </button>
            
            <button
              type="button"
              className={view==='agenda' ? 'h-10 w-20 bg-blue-primary rounded-r-lg text-white font-medium border-2 border-l-0 border-blue-primary text-sm duration-300' : 'h-10 w-20 text-blue-primary text-sm rounded-r-lg bg-white border-2 border-l-0 border-blue-primary font-medium duration-300'}
              onClick={() => onView('agenda')}
              >
              AGENDA
            </button>
            </span>
          </span>
        </div>
      );
    };
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventClick = (event) => {
      console.log('event',event)
      if (selectedEvent === event) {
        setSelectedEvent(null);
      } else {
        setSelectedEvent(event);
      }
      console.log(selectedEvent)
    };
    
    
    function Selector(props){
      const {persons}=props
      return(
        <div className='w-full'>
          <div className='font-semibold capitalize mb-2 w-full '>parents concernés :</div>
          <div className='text-black w-full flex flex-wrap'>{
            selected.map((p)=>(<p onClick={()=>setSelected(selected.filter((selected) => selected.id !== p.id))} className='mr-2 text-white mb-2 px-2 py-1 bg-blue-third hover:bg-blue-primary cursor-pointer rounded-full'>{p.name}</p>))
            }</div>
          <div ref={containerRef} className='flex flex-col bg-white h-44 my-4 p-2 overflow-scroll w-full rounded-lg'>
            {
              persons.map((p)=>(
                <label key={p.id} className='flex py-2 px-2 hover:bg-opacity-20 hover:bg-blue-secondary w-full justify-between relative'>
                  <p>{p.name}</p>
                  <input  type="checkbox" className='appearance-none' id={p.id} value={p.name}  checked={selected.some((selectedItem) => selectedItem.id === p.id)} onChange={(e)=>handleCheckboxChange(e)} />

                </label>
              ))
            }
          </div>
        </div>
      )
    }
 
    const handleCheckboxChange = (event) => {
      const item = {
        id: event.target.id,
        name: event.target.value
      };
      if (event.target.checked) {
        setSelected([...selected, item]);
      } else {
        setSelected(selected.filter((selected) => selected.id !== item.id));
      }
      event.preventDefault()
      console.log(selected)
    };
    useLayoutEffect(() => {
      const scrollContainer = containerRef.current;
      if (scrollContainer) {
        scrollContainer.scrollTop =20;
      }
    }, [selected]);

    const eventStyleGetter = (event, start, end, isSelected) => {
      return {
        style: {
          backgroundColor: "#008B8D",
          color: 'white',
          borderRadius: '4px',
          border: 'solid',
          cursor: 'pointer',
        },
      };
    };
    const [currentView, setCurrentView] = useState('month'); // State to track the current view

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className={`font-body duration-300 pt-8 lg:pt-2 ${isOpen?'lg:ml-[12rem]':'lg:ml-[6rem]'}`}>
      
         <h1 className='font-bold lg:text-5xl text-3xl capitalize lg:mt-4 mt-24 mb-8 ml-8'>mon calendrier</h1>
            <div className=' lg:grid flex flex-col lg:grid-cols-4  space-x-4 mb-8'>
              <div className='bg-light-orange-4 rounded-lg ml-4 lg:mb-0 mb-4 flex flex-col items-center'>
              {selectedEvent && 
                  <div
                    className=" bg-white p-2 mx-2 flex flex-col rounded-md border border-blue-primary mt-4"
                    style={{ top: selectedEvent.clientY, left: selectedEvent.clientX }}
                    
                  >
                    <p className="text-lg font-semibold mb-2">{selectedEvent.title}</p>
                    
                    <p className='flex text-sm space-x-2'><p className='capitalize font-semibold'>De</p><p>{selectedEvent.start.toLocaleString().split("T")[0]} : {selectedEvent.start.toLocaleString().split("T")[1].slice(0, 5)}</p></p>
                    <p className='flex text-sm space-x-2'><p className='uppercase font-semibold'>à</p> <p>{selectedEvent.end.toLocaleString().split("T")[0]} : {selectedEvent.end.toLocaleString().split("T")[1].slice(0, 5)}</p> </p>
                    <div className='text-sm mt-2 opacity-70 w-60 overflow-hidden pr-4'>
                      <p>{selectedEvent.description}</p>
                    </div>
                    <div>
                      {selectedEvent.persons&&selectedEvent.persons.map((person)=>(
                         <MyLink to={`../${person._id}`}>
                            <div className=' hover:underline duration-300'>{person.firstName} {person.lastName}</div>
                         </MyLink>
                      ))}
                    </div>
                  </div>
                }
                <div className='flex items-center w-full px-6 justify-between lg:py-0 py-2 lg:mt-4'>
                  <p className='font-semibold mb-2 mt-2 capitalize text-blue-primary'>Ajouter un événement</p>
                  <button className='ml-4 rounded-full hover:bg-slate-200 duration-100 w-6 aspect-square' onClick={()=>setAdd(prev=>!prev)}> <img src={add?supp:ajout} alt="" /> </button>
                </div>
                
                {
                add&&
                <div className='flex flex-col px-4 mb-4 mx-2 rounded-xl border-2 border-blue-primary py-4 items-center space-y-2'>
                    <span className='px-1 flex items-start w-full justify-between'>
                      <p className='mt-2'>Type : </p>
                      <Dropdown className='border-2 border-blue-primary rounded-full capitalize w-40 h-10 px-4 outline-none' value={type} onChange={(e)=>setType(e.target.value)} elements={['privé','public']}></Dropdown>
                    </span>
                    <input type="text" placeholder="Titre" className='border-2 border-blue-primary w-full rounded-md h-10 px-2 outline-none' value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                    <DatePicker placeholderText="Date de Début" className='border-2 border-blue-primary w-full rounded-md h-10 px-2 outline-none' selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} showTimeSelect timeFormat="HH:mm" timeIntervals={30} dateFormat="dd/MM/yyyy HH:mm"/>
                    <DatePicker placeholderText="Date de Fin" className='border-2 border-blue-primary w-full rounded-md h-10 px-2 outline-none' selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} showTimeSelect timeFormat="HH:mm" timeIntervals={30} dateFormat="dd/MM/yyyy HH:mm" />
                    <textarea type="text" placeholder="Description" className='border-2 border-blue-primary rounded-md h-20 px-2 w-full outline-none resize-none' value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
                    { type==='public' && <Selector persons={parents}/>}
                    <button className='h-10 w-25 text-blue-primary bg-white border-2 rounded-lg border-blue-primary font-medium text-sm px-2 hover:bg-blue-third active:bg-blue-primary hover:text-white duration-300 uppercase' onClick={handleAddEvent}>
                      Ajouter événement
                    </button>
                </div>
                }
                
              </div>
              <div className=' lg:col-span-3 relative '>
                <Calendar
                className='bg-white pr-4 rounded-xl' 
                components={{
                toolbar: CustomToolbar,
                
                }}
                eventPropGetter={eventStyleGetter}
                localizer={localizer} events={allEvents} 
                startAccessor="start" endAccessor="end" style={{ height: 500 }}
                selectable
                onSelectEvent={handleEventClick}
                view={currentView} onView={handleViewChange}
                />
                
              </div>
            </div>
    </div>
  )
}

export default Agenda