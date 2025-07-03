import React, { useEffect } from 'react'
import NotePage from './components/NotePage'
import HomePage from './components/HomePage'
import { Outlet } from "react-router";
import NavBar from './components/NavBar';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoaderButton from './lib/LoaderButton';





function Layout() {

  const {user} = useAuth();
  const navigate = useNavigate();
  useEffect(()=>{
       if(user !== null)
       {
        navigate("/note")
       }
  },[user])
      const { loading } = useAuth();
     
       if(loading)
      {
        return <LoaderButton/>
      } 
  return (
    <div>
     <NavBar/>
     <Outlet/>
    </div>
  )
}

export default Layout
