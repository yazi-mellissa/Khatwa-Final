import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import Home from './Pages/Home'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import SharedLayout from './Pages/SharedLayout';
import SharedLayoutSign from './Pages/SharedLayoutSign';
import Choice from './Components/Signup/Choice';
import SignupParent from './Pages/SignupParent';
import SignupCreche from './Pages/SignupCreche';
import FAQ from './Pages/FAQ';
import ContactUs from './Pages/ContactUs';
import SharedLayoutContact from './Pages/SharedLayoutContact';
import SignIn from './Pages/SignIn';
import APropos from './Pages/APropos';
import Agenda from './Pages/Creche Space/Agenda'
import SharedLayoutSpaces from './Pages/SharedLayoutSpaces';
import CrecheHome from './Pages/Creche Space/CrecheHome';
import Notifications from './Pages/Parent Space/Notifications'
import Inscriptions from './Pages/Creche Space/Inscriptions'
import Messages from './Pages/Creche Space/Messages';
import CrecheProfile from './Pages/Creche Space/CrecheProfile';
import ParentProfil from './Pages/Parent Space/ParentProfil';
import ParentHome from './Pages/Parent Space/ParentHome';
import SearchPage from './Pages/Parent Space/SearchPage';
import CrecheConsultation from './Pages/Parent Space/CrecheConsultation';
import SharedLayoutSettings from './Pages/SharedLayoutSettings';
import Edit from './Pages/Parent Space/Parametres/Edit';
import Notif from './Pages/Parent Space/Parametres/Notif';
import Compte from './Pages/Parent Space/Parametres/Compte';
import Aide from './Pages/Parent Space/Parametres/Aide';
import Dashboard from './Pages/Admin Space/Dashboard';
import SignInAdmin from './Pages/Admin Space/SignInAdmin';
import GestionParent from './Pages/Admin Space/GestionParent';
import GestionAdmin from './Pages/Admin Space/GestionAdmin';
import GestionCreche from './Pages/Admin Space/GestionCreche';
import ParentConsultation from './Pages/Creche Space/ParentConsultation';
import  EditC from "./Pages/Creche Space/Parametres/EditC";
import  AideC from "./Pages/Creche Space/Parametres/AideC";
import  CompteC from "./Pages/Creche Space/Parametres/CompteC";
import  NotifC from "./Pages/Creche Space/Parametres/NotifC";
import SettingsAdmin from "./Pages/Admin Space/SettingsAdmin";
import ParentView from './Pages/Admin Space/ParentView';
import CrecheView from './Pages/Admin Space/CrecheView';
import GestionSignalement from './Pages/Admin Space/GestionSignalement';



const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [located,setLocated]=useState(false)
  const user=JSON.parse(localStorage.getItem('user'))
  const [parent,setParent]=useState(user&&user.role==='PARENT')
  const [admin,setAdmin]=useState((user&&user.role==='ADMIN')||(user&&user.role==='MODERATOR'))

  useEffect(()=>{
    setParent(user&&user.role==='PARENT')
    setAdmin((user&&user.role==='ADMIN')||(user&&user.role==='MODERATOR'))
  },[user])
  
  
  


  

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn&&<>
        <Route path='/' element={<SharedLayout/>}>
          <Route index element={<Home/>}>
          </Route>  
          <Route path="/about" element={<APropos/>}>
          </Route>
          <Route path='faq' element={<FAQ/>}></Route>
          </Route>
          <Route path='/' element={<SharedLayoutContact/>}>
            <Route path="/contact" element={<ContactUs/>}>
            </Route>
          </Route>
        <Route path="/signup" element={<SharedLayoutSign/>}>
          <Route index element={<Choice/>}></Route>
          <Route path='parent' element={<SignupParent></SignupParent>}></Route>
          <Route path='creche' element={<SignupCreche></SignupCreche>}></Route>
        </Route>
        <Route path="/" element={<SharedLayoutSign/>}>
          <Route path='/signin' element={<SignIn/>}></Route>
          <Route path='/admin' element={<SignInAdmin/>}></Route>
          <Route path="*" element={<Navigate to="/" />} />

        </Route>
        </>
        }
        { isLoggedIn&&!parent&&!admin&&
        <Route path='/' element={<SharedLayoutSpaces/>}>
          <Route index element={<CrecheHome/>}></Route>
          <Route path='agenda' element={<Agenda/>}></Route>
          <Route path='profile' element={<CrecheProfile/>}></Route>
          <Route path='messages' element={<Messages/>}></Route>
          <Route path='notifications' element={<Notifications />}></Route>
          <Route path='inscriptions' element={<Inscriptions/>}></Route>
          <Route path=':id' element={<ParentConsultation/>}></Route>
          <Route path='settings' element={<SharedLayoutSettings/>}>
              <Route index element={<EditC />}></Route>
              <Route path='edit' element={<EditC />}></Route>
              <Route path='notifications' element={<NotifC />}></Route>
              <Route path='profile' element={<CompteC />}></Route>
              <Route path='question' element={<AideC />}></Route>
            </Route>
          <Route path="signin" element={<Navigate to="/" />} />
      </Route>
        }

      {isLoggedIn && parent &&
          <Route path='/' element={<SharedLayoutSpaces />}>
            <Route path="signin" element={<Navigate to="/" />} />
            {located &&  <Route index element={<SearchPage setLocated={setLocated}  />}></Route>}
            {!located && <Route index element={<ParentHome setLocated={setLocated} />}></Route>}
            {located &&  <Route  path='home' element={<SearchPage setLocated={setLocated}  />}></Route>}
            {!located && <Route  path='home' element={<ParentHome setLocated={setLocated} />}></Route>}
            <Route path='profile' element={<ParentProfil />}></Route>
            <Route path=':id' element={<CrecheConsultation/>}></Route>
            <Route path='notifications' element={<Notifications />}></Route>
            <Route path='messages' element={<Messages/>}></Route>
            <Route path='settings' element={<SharedLayoutSettings/>}>
              <Route index element={<Navigate to="./edit" />} />
              <Route path='edit' element={<Edit />}></Route>
              <Route path='notifications' element={<Notif />}></Route>
              <Route path='profile' element={<Compte />}></Route>
              <Route path='question' element={<Aide />}></Route>
            </Route>
          </Route>
        }
        {
          isLoggedIn&&!parent&&admin&&
          <Route path='/' element={<SharedLayoutSpaces />}>
            <Route path="admin" element={<Navigate to="/" />} />
          <Route index element={<Dashboard/>}></Route>
          <Route path='admins' element={<GestionAdmin />}></Route>
          <Route path='parents' element={<GestionParent/>}></Route>
          <Route path='creches' element={<GestionCreche/>}></Route>
           <Route path="creches/:id" element={<CrecheView/>}></Route>
           <Route path="parents/:id" element={<ParentView/>}></Route>
           <Route path='settings' element={<SettingsAdmin/>}></Route>


          </Route>
        }
        
      </Routes>
    </BrowserRouter>

  )
}

export default App
/* <Route path='profile' element={<ParentProfil/>}></Route>*/