import React, { useState } from 'react'
import RichTextEditor from './RichTextEditor'
import { useNotes} from '../context/NotesContext.jsx'

function NoteEditor() {

    const [content , setContent] = useState('')
    const notes = useNotes().notes;
    
  return (
    <div>
        {/* main div  */}

    <div className='flex justify-center'>
        <form  className='flex justify-center m-4 border-2 rounded-md shadow-[0_0_4px_1px_rgba(255,255,255,0.3)]' >
            <RichTextEditor content={content} onChange={setContent}/>
        </form>
    </div>

         <div>

         </div>
    </div>
  )
}

export default NoteEditor
