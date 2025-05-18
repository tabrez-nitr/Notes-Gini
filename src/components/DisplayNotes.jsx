
import React from 'react'
import {useNotes} from '../context/NotesContext.jsx'


function DisplayNotes() {

    const notes = useNotes().notes;
  return (
    <div className='m-5 ml-20 mr-20 '>
      <h2 className='mt-2 mb-4 text-[#8aede5] text-2xl'>Your Notes</h2>
    <div className=' flex flex-wrap gap-4'>
      
      {notes.map((note)=> (
      <div key={note.id} className="relative border border-white/20 rounded-xl p-4 min-w-[20vw] min-h-[35vh] max-h-[40vh]
                bg-gradient-to-br from-white/10 via-white/5 to-white/10 
                backdrop-blur-md shadow-[inset_0_0_0.5px_rgba(255,255,255,0.2)] 
                transition-transform duration-300 transform hover:scale-105 
                ">

  <div>
    <h2 className="text-white font-semibold text-lg tracking-wide mb-2">{note.title}</h2>
    <div className="text-white/80 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: note.content }} />
  </div>
</div>
       ))}
    </div>
    </div>
  )
}

export default DisplayNotes
