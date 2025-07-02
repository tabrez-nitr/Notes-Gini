import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import homeimage from"../assets/homeimage.png"
import NotePage from './NotePage'; 

function HomePage() {

 const {signIn , signOutUser , user} = useAuth();

  



  return (
    <div className="bg-white  min-h-screen w-full   text-black">
      <div className='sm:px-60 p-3'>

     <div className=' flex justify-center '>

     <div
     className=" sm:h-[60vh] sm:w-[70vw] h-[55vh] w-[100vw] bg-cover bg-center p-3 rounded-2xl sm:mt-10 mt-5 flex items-center justify-center"
     style={{ backgroundImage: `url(${homeimage})` }}
      >
       <div className='text-center'>
       <h1 className='sm:text-[60px] text-[200%] text-white font-bold'>Your Smart Note-Taking Companion</h1>
       <h2 className='sm:text-[22px] text-[100%] text-white/75'>Enhance your note taking with AI powered features. Rewrite, summarize, and organize your thoughts effortlessly.</h2>
       <button className='mt-8 text-[18px] cursor-pointer  text-black py-3 font-medium px-6 rounded-[12px] bg-[#DDE7F2] hover:bg-[#afcbe6]'>Start Taking Notes</button>
       </div>
     </div>

     </div>
       <h1 className="text-4xl font-bold text-black mt-15">Key Features</h1>
       <h2 className='mt-3'>Explore the powerful capabilities of Notes Gini designed to boost your productivity and creativity.</h2>
          {/* cards  */}
       <div className='mt-10 mb-20 flex flex-wrap gap-4'>
              {/* //card 1  */}
              <div className='border-1 border-black/40 p-4 sm:w-[22vw]  rounded-2xl hover:shadow-lg transition-shadow duration-300 hover:border-black/70'>
                <h1><i className="ri-quill-pen-ai-fill text-2xl"></i></h1>
                <h1 className='mt-2 mb-2 font-bold'>AI Rewriting</h1>
                <div><p className='text-black/50 '>Enhance the quality of your notes effortlessly using advanced AI-powered rewriting tools. These tools help you improve clarity, correct grammatical issues, and elevate the overall tone and structure of your content—making your writing more impactful and easier to understand.</p></div>
              </div>

              {/* card 2 */}

               <div className='border-1 border-black/40 p-4 sm:w-[22vw]  rounded-2xl hover:shadow-lg transition-shadow duration-300 hover:border-black/70'>
                <h1><i class="ri-sticky-note-line text-2xl"></i></h1>
                <h1 className='mt-2 mb-2 font-bold'>Smart Summaries</h1>
                <div><p className='text-black/50 '>Quickly generate clear and concise summaries from your notes using intelligent AI tools. These summaries emphasize the most important information, highlight key takeaways, and extract actionable items—helping you focus on what truly matters and stay organized.</p></div>
              </div>


              {/* card 3 */}
               <div className='border-1 border-black/40 p-4 sm:w-[20vw] rounded-2xl hover:shadow-lg transition-shadow duration-300 hover:border-black/70' >
                <h1><i class="ri-book-shelf-line text-2xl"></i></h1>
                <h1 className='mt-2 mb-2 font-bold'>Organized Notes</h1>
                <div><p className='text-black/50 '>Effortlessly maintain a well-structured and organized note system using user-friendly notebooks, customizable tags, and powerful search capabilities. These features make it easy to categorize your content, quickly locate specific information, and manage your notes efficiently, no matter how much you’ve written.</p></div>
              </div>

       </div>

       
     </div>
       <footer className='border-t-1 border-black/20 p-4 text-center '>
         <div className='flex justify-evenly mt-10 mb-8'>
          <h2>Privacy Policy</h2>
          <h2>Terms of Service</h2>
          <h2>Contact Us</h2>
         </div>
         <h2 className='mb-10'><i className="ri-copyright-line"></i>2025 Notes Gini. All rights reserved.</h2>
       </footer>
       </div>
  )
}

export default HomePage
