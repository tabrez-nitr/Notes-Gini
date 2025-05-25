import { Link } from 'react-router'
import React from 'react'
import logo from "../assets/logo.png"

function NavBar() {
  return (
    <div className='bg-[#021526] h-[9vh] flex justify-between p-4'>
      
          <Link to=""><img src={logo} alt="" className='w-[55px] h-[55px] ml-4 rounded-4xl' /></Link>
       
       <div className='flex gap-10 pt-2 mr-10'>
        <Link to="" className='text-2xl text-white hover:text-[#4796E3]'>Home</Link>
        <Link to="note" className='text-2xl text-white hover:text-[#4796E3]'>Note</Link>
       </div>
    </div>
  )
}

export default NavBar
