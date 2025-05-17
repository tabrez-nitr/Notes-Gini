import React, { useState } from 'react'
import RichTextEditor from './RichTextEditor'

function NoteEditor() {

    const [content , setContent] = useState('')
  return (
    <div>
        <form  className='m-4 border-2 rounded-md border-white/50 p-3 w-[40vw] h-[35vh]' >
            <input type="text"
            placeholder='Title'
            className='text-3xl font-bold p-3 text-white/70   min-w-[37vw]' />
            <br />
            <RichTextEditor content={content} onChange={setContent}/>
        </form>
    </div>
  )
}

export default NoteEditor
