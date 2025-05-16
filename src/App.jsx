

import NoteEditor from './components/NoteEditor'

function App() {
  

  return (
    <div>
      <h1 className='text-4xl text-center'style={{
        fontFamily: "sans-serif"
      }}>Notes&nbsp;<span className='text-[90px]' style={{
        fontFamily :'Brush Script MT'
      }}>Gini</span></h1>
      <NoteEditor />
    </div>
  )
}

export default App
