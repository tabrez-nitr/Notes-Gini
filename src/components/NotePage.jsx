import React from 'react'
import NoteEditor from './NoteEditor'
import DisplayNotes from './DisplayNotes'
import { ToastContainer, toast, Bounce} from 'react-toastify';
import { useAuth } from '../context/AuthContext';


function NotePage() {
  const {user} =useAuth();
  if(user == null)
  {
    return <div className='flex justify-center items-center w-full h-screen'>
      <h1 className='text-3xl'> Please Login and try again </h1>
    </div>
  }
  return (
    <div>
    <h1 className='text-5xl text-center text-black/70 font-bold mb-3 mt-4'style={{
        fontFamily: "sans-serif"
      }}>Notes&nbsp;<span className='text-[90px]' style={{
        fontFamily :'Brush Script MT',
        color:'black'
      }}>Gini</span></h1>
      <NoteEditor />
      <DisplayNotes/>
         {/* </div> */}
          <ToastContainer
                   position="bottom-right"
                   autoClose={2000}
                   hideProgressBar={false}
                   newestOnTop={false}
                   closeOnClick={false}
                   rtl={false}
                   pauseOnFocusLoss
                   draggable
                   pauseOnHover
                   theme="dark"
     transition={Bounce}
            />

    </div>
  )
}

export default NotePage;
