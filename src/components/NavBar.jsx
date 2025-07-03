import { Link } from 'react-router'
import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react';
import DarkMode from './DarkMode';


function NavBar() {

  const {user , signOutUser , signIn} = useAuth();
  const [dropDown , setDropDown] = useState(false);

  return (
    <div className='bg-white h-[7vh] flex justify-between p-4 border-b-1 text-black border-black/30'>
        
         <ul className='flex items-center'><Link className='font-medium text-2xl'>Notes <span className='text-3xl'
          style={{
            fontFamily :'Brush Script MT',
          }}
         >Gini</span></Link></ul>

         <div className='hidden md:flex gap-10  mr-10'>
         <ul className='flex items-center'><Link to="" className='  hover:text-[#4796E3]'>Home</Link></ul>
          <ul className='flex items-center'><Link  className=' hover:text-[#4796E3]'>Features</Link></ul>
         <ul className='flex items-center'><Link to="note" className=' hover:text-[#4796E3]'>Note</Link></ul>

          </div>

          {/* Hamburger icon for drop down */}
          <div className='md:hidden absolute top-3 right-5'>
            
            <button className='text-2xl ' 
            onClick={()=> setDropDown(!dropDown)}>
            ☰
            </button>
           
          </div>

          {/* navbar for mobiles */}
          {dropDown && (
            <div>
              <div className="absolute top-16 right-4 flex flex-col items-center bg-white  box-shadow-lg rounded-lg shadow-md z-50 w-48 p-4 space-y-2 md:hidden">
            <Link to="/" onClick={() => setDropDown(false)}>Home</Link>
             <Link to="/features" onClick={() => setDropDown(false)}>Features</Link>
             <Link to="/note" onClick={() => setDropDown(false)}>Note</Link>

             
             {user === null ? (<ul className='flex items-center'><button type='button'  className='font-medium cursor-pointer bg-[#DDE7F2] p-2  px-5 rounded-[8px] hover:bg-[#afcbe6]' onClick={()=>{ signIn(); setDropDown(false)}}>Get Started</button></ul>):
             (<button className="bg-red-400 text-white w-full py-1 rounded" onClick={() => {setDropDown(false) ; signOutUser()}}>Sign Out</button>)}

           </div> 
            </div>
          )}
          <div className='flex gap-5  md:block hidden'>


          {/* <DarkMode/> */}
          {user !== null &&  
            <div className='absolute top-3 right-4'><button className='flex justify-center items-center w-[100px] h-[30px]  bg-[red]/70 text-white p-4 rounded hover:bg-[red]/100 p-2 cursor-pointer ' 
            onClick={()=> signOutUser()}
           >Sign Out</button></div>
           }
          
         
           {user === null &&  <ul className='flex items-center absolute top-1 right-4'>
           <button onClick={()=> signIn()}
             className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
           <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
           <span className="inline-flex h-full w-full  cursor-pointer items-center justify-center rounded-full bg-white text-black px-3 py-1 text-sm font-medium backdrop-blur-3xl">
           Sign Up or Sign In
        </span>
      </button></ul>}
         </div>    
    </div>
  )
}

export default NavBar
