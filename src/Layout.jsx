import React from 'react'
import NotePage from './components/Notepage'
import HomePage from './components/HomePage'
import { Outlet } from "react-router";
import NavBar from './components/NavBar';
import { useAuth } from './context/AuthContext';




function Layout() {
      const { loading } = useAuth();
     
       if(loading)
      {
        return <div className='flex justify-center items-center w-full h-screen'><span className="loading loading-spinner w-16 h-16 text-info"></span></div>
      } 
  return (
    <div>
     <NavBar/>
     <Outlet/>
    </div>
  )
}

export default Layout
