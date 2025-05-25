import React from 'react'
import NotePage from './components/Notepage'
import HomePage from './components/HomePage'
import { Outlet } from "react-router";
import NavBar from './components/NavBar';



function Layout() {
  return (
    <div>
     <NavBar/>
     <Outlet/>
    </div>
  )
}

export default Layout
