

import NoteEditor from './components/NoteEditor'
import DisplayNotes from './components/DisplayNotes.jsx'

function App() {
  

  return (
    <div>
      <h1 className='text-5xl text-center text-[#8aede5] font-bold mb-3'style={{
        fontFamily: "sans-serif"
      }}>Notes&nbsp;<span className='text-[90px]' style={{
        fontFamily :'Brush Script MT',
        color:'white'
      }}>Gini</span></h1>
      <NoteEditor />
      <DisplayNotes/>
    </div>
  )
}

export default App
