import { Link } from 'react-router'
import React from 'react'
import logo from "../assets/logo.png"
import { useAuth } from '../context/AuthContext'

function NavBar() {

  const {user , signOutUser , signIn} = useAuth();

  return (
    <div className='bg-white h-[7vh] flex justify-between p-4 border-b-1 text-black border-black/30'>
      
         <ul className='flex items-center'><Link className='font-medium text-2xl'>Notes <span className='text-3xl'
          style={{
            fontFamily :'Brush Script MT',
          }}
         >Gini</span></Link></ul>
         <div className='flex gap-10  mr-10'>
         <ul className='flex items-center'><Link to="" className='  hover:text-[#4796E3]'>Home</Link></ul>
          <ul className='flex items-center'><Link  className=' hover:text-[#4796E3]'>Features</Link></ul>
         <ul className='flex items-center'><Link to="note" className=' hover:text-[#4796E3]'>Note</Link></ul>
         <ul className='flex items-center'><button type='button'  className='font-medium cursor-pointer bg-[#DDE7F2] p-2  px-5 rounded-[8px] hover:bg-[#afcbe6]' onClick={()=> signIn()}>Get Started</button></ul>
         </div>
           
        {user !== null ?  <button className='text-[20px]  hover:text-red-400 p-2 cursor-pointer ' 
        onClick={()=> signOutUser()}
        >Sign Out</button>: ""}
               
    </div>
  )
}

export default NavBar
