import React from 'react'
import { useAuth } from '../context/AuthContext'

function HomePage() {

 const {signIn , signOutUser , user} = useAuth();
  return (
    <div>
<section className="min-h-screen bg-[#0e0e13] text-white flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden">
      <div className="max-w-4xl z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight ">
          Organize your thoughts with</h1>
             <h1 className='text-6xl text-center  font-bold mb-3 mt-4'style={{
        fontFamily: "sans-serif"
      }}>Notes&nbsp;<span className='text-[110px]' style={{
        fontFamily :'Brush Script MT',
        color:'#4796E3'
      }}>Gini</span></h1>
       
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Create, edit, re-write and summarize notes instantly with the power of AI. Your smart note companion—fast, minimal, and magical.
        </p>
        <div className="flex justify-center gap-4">


          { user==null ? <button type='button' className='border-[#4796E3] cursor-pointer border-2 px-10 py-3 text-[#4796E3] transition duration-300 rounded-[5px] text-2xl hover:bg-[#4796E3] hover:text-white'
          onClick={()=>{signIn()}}>Sign Up</button> : ""}


        
          
        </div>




      </div>

      {/* Glow effect */}
      {/* <div className="absolute inset-0 bg-gradient-to-tr from-[#00C6FF]/10 via-[#0072FF]/5 to-[#00C6FF]/10 blur-3xl opacity-20"></div> */}
    </section>

    </div>
  )
}

export default HomePage
