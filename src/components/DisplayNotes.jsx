import React, { useState } from 'react';
import { useNotes } from '../context/NotesContext';
import { GoogleGenAI } from "@google/genai";
import {Tooltip, Button} from "@heroui/react";
import {addToast} from "@heroui/react";
import { ToastContainer, toast, Bounce} from 'react-toastify';


const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

function DisplayNotes() {
  
  const [summaryId , setSummaryId] = useState(null);
  const [summary , setSummary ] = useState("");

  const { deleteNotes, notes, updateNote } = useNotes();
  const [isEditableId, setIsEditableId] = useState(null); // currently editing note ID
  const [editTitle, setEditTitle] = useState(""); // editing title
  const [editContent, setEditContent] = useState(""); // editing content
  
  const summarizeNote = async(content, noteId) => {
       // if statment is for toggle 
       if(noteId === summaryId)
       {
          setSummaryId(null);
          setSummary("");
          return;
       }
    try{
    const result = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Summarize this note : ${content}`,
    
  });
     const summaryContent = await result.text;
     console.log(summary);
     setSummary(summaryContent)
     setSummaryId(noteId);
    }
    catch(error){
       console.error(error);
    }
  }

  const deleteNote = (id) => {
    deleteNotes(id);
  };


  // delete toast

  const deleteToast = () => {
  toast.error('Note Deleted!', {
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

  // 🔧 Utility to strip HTML tags for editing plain text
  const stripHtmlTags = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (
    <div className='sm:px-26 '>
    <div className=' p-2 text-[0px] w-full h-screen bg-white'>
      {notes.length !== 0 && <h2 className='mt-2 mb-4 text-black text-2xl'>Your Notes</h2>}
      <div className="flex sm:gap-5 gap-1 flex-wrap">
        {notes.length !== 0 && notes.map((note) => {
          const isEdit = isEditableId === note.id;
          return (
            <div
              key={note.id}
              className="text-black border-1  border-black/40 sm:w-[20vw] w-[49%] hover:border-black/80 flex flex-col  rounded-xl sm:p-4 p-2 backdrop-blur-md shadow-lg transition-all duration-300 transform hover:shadow-xl"
            >
              {/* display edit and non edit notes  */}
              {isEdit ? (
                //  Edit mode
                <div>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className='text-black font-semibold text-[20px] tracking-wide mb-2 border-b-2 border-black/40 bg-transparent w-full outline-none'
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="text-black/80 text-sm leading-relaxed min-h-32 overflow-y-auto bg-transparent w-full outline-none resize-none"
                    style={{ height: 'auto', minHeight: '128px' }}
                  ></textarea>
                </div>
              ) : (
                //  Display mode
                <div>
                  <h2 className=" font-semibold text-lg tracking-wide mb-2 border-b-2 border-black/35">
                    {note.title}
                  </h2>
                  <div
                    className="text-black/80 text-sm leading-snug sm:leading-relaxed overflow-y-auto"
                    style={{ wordWrap: 'break-word' }}
                    dangerouslySetInnerHTML={{ __html: note.content }}
                  />
                </div>
              )}

              {/*  Buttons */}
              <br />

              {summaryId === note.id && summary && (
                <div className='pb-4'>

                  <h2 className='border-t-1 border-black/20 pt-2 pb-2  text-[18px] '>Summary</h2>
                  
                  <p className=' text-[15px]  bg-[#e3e0e0] rounded-l p-2.5'>{summary}</p>
                </div>
              )}
              <div className='flex gap-2 mt-auto justify-between'>
                {/* edit button  */}


                 <div className='flex gap-3'>
                <button
                  type="button"
                  className=' p-1  hover:opacity-50'
                  onClick={() => {
                    if (isEdit) {
                      updateNote(note.id, editTitle, editContent);
                      setIsEditableId(null);
                    } else {
                      setIsEditableId(note.id);
                      setEditTitle(note.title);
                      setEditContent(stripHtmlTags(note.content)); 
                    }
                  }}
                >
                  {isEdit ?<Tooltip content="Save" className='text-black' placement='bottom' background="black" ><i className="ri-save-line text-[20px] sm:text-2xl"></i></Tooltip>
                  : <Tooltip content="Edit" className='text-black' placement='bottom' background="white" ><i className="ri-edit-2-line text-[20px] sm:text-2xl text-[#4796E3]"></i></Tooltip>}
                </button>

     

                {/* summary button */}
                <button className=' p-1 hover:opacity-50'
                 onClick={() => summarizeNote(stripHtmlTags(note.content),note.id)} >
                  {summaryId === note.id ?  <Tooltip content="Hide Summary" className='text-black' placement='bottom'><i className="ri-gemini-line text-[20px] sm:text-2xl text-[#9177C7]" ></i></Tooltip>: <Tooltip content="Summary" className='text-black' placement='bottom'><i class="ri-gemini-line text-[20px] sm:text-2xl" ></i></Tooltip> }
                 </button>

                </div>

                   {/* delete button */}
                  <button
                  type='button'
                  className='  hover:opacity-50'
                  onClick={() => {
                    deleteNote(note.id) 
                    deleteToast()}}
                   >
                  <Tooltip content="Delete" className='text-black' placement='bottom'><i className="ri-delete-bin-7-line text-[20px] sm:text-2xl text-red-400 "></i></Tooltip>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
    </div>
  );
}

export default DisplayNotes;