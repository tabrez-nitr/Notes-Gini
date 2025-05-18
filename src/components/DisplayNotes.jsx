
import React from 'react'
import {useNotes} from '../context/NotesContext.jsx'



function DisplayNotes() {

    
    const {deleteNotes ,notes} = useNotes();

    const deleteNote = (id) =>{
      deleteNotes(id);
    }
    
  return (
    <div className='m-5 ml-20 mr-20 '>
      <h2 className='mt-2 mb-4 text-[#8aede5] text-2xl'>Your Notes</h2>
    <div className=' flex flex-wrap gap-4'>
      
      {notes.length !== 0 && notes.map((note)=> (
      <div key={note.id} className="relative border flex flex-col border-white/20 rounded-xl p-4 min-w-[20vw] max-w-[20vw] min-h-[40vh] 
                bg-gradient-to-br from-white/10 via-white/5 to-white/10 
                backdrop-blur-md shadow-[inset_0_0_0.5px_rgba(255,255,255,0.2)] 
                transition-transform duration-300 transform hover:scale-105 
                ">

     <div>
    <h2 className="text-white font-semibold text-lg tracking-wide mb-2 border-b-2 border-white/40 ">{note.title}</h2>
    <div className="text-white/80 text-sm leading-relaxed max-h-[30vh] overflow-y-auto" dangerouslySetInnerHTML={{ __html: note.content }} />
     </div>
      {/* all function related to notes  */}
      <br />
     <div className='flex gap-2 mt-auto'>
           <button className='border-1 p-1 border-white/50'>Edit</button>
           <button  type='button'  className='border-1 p-1 border-white/50 hover:opacity-50' onClick={()=>deleteNote(note.id)}>Delete</button>
           
     </div>
   </div>
       ))}
    </div>
    </div>
  )
}

export default DisplayNotes
