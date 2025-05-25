import React from 'react'
import NoteEditor from './NoteEditor'
import DisplayNotes from './DisplayNotes'
import { ToastContainer, toast, Bounce} from 'react-toastify';


function NotePage() {
  return (
    <div>
    <h1 className='text-5xl text-center text-white/70 font-bold mb-3 mt-4'style={{
        fontFamily: "sans-serif"
      }}>Notes&nbsp;<span className='text-[90px]' style={{
        fontFamily :'Brush Script MT',
        color:'white'
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
