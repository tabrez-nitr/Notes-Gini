
import { ToastContainer, toast, Bounce} from 'react-toastify';

import NoteEditor from './components/NoteEditor'
import DisplayNotes from './components/DisplayNotes.jsx'

function App() {
  

   const notify = () => {
  toast.success('🚨 Wow so easy!', {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
};


  return (
    <div>
      <h1 className='text-5xl text-center text-white/70 font-bold mb-3'style={{
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

export default App
