// RichTextEditor.jsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { useState } from 'react';
import { useNotes } from '../context/NotesContext';
import { showSuccessToast } from "../lib/toast"; 
import { GoogleGenAI } from "@google/genai";
import {Tooltip, Button,addToast, ToastProvider} from "@heroui/react";
import { ToastContainer, toast, Bounce} from 'react-toastify';





const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });


const RichTextEditor = ({ content, onChange }) => {

const [title , setTitle] = useState('');
const [ editorContent , setEditorContent] = useState('');
// gemini to rewrite 

const rewrite = async(editorContent) =>{
    console.log("rewrite function called")
    
    try{
    const result = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Rewrite and complete it in under 50 words : ${editorContent}`,
     });
     console.log(result.text)
     editor.commands.setContent(result.text); 
     setEditorContent(result.text);
     console.log(editorContent)
    }
    catch(error){
      console.log(error);
    }
}
  // success toast

  const successToast = () => {
  toast.success('Note Added!', {
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

//hook variable
  const notes = useNotes();
  const editor = useEditor({
    extensions: [
        StarterKit.configure({
            Underline  : false,
        }),
        Underline,
       Placeholder.configure({
        placeholder: 'Write Your Note',
      }), 
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      setEditorContent(html)

    },
  });

  if (!editor) return null;

  return (
    <div>
      {/* title input field */}
     <input type="text"
    placeholder='Title'
    className='text-3xl font-bold p-3 text-black/70   min-w-[37vw] ' 
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    />



    <div className=" p-2 rounded-md bg-transparent space-y-2 ">
      

      {/* ✏️ Editor */}
      <EditorContent editor={editor} className="max-h-[150px] p-2 min-h-[50px] max-w-[37vw] overflow-y-auto text-black/75 " />
      {/* ✨ Toolbar */}
      <div className='flex justify-between'>
      <div className="flex gap-2">
        <button type='button' onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'active-btn' : 'btn'}
            style={{
                // color : '#F5F5DC',
                background : editor.isActive('bold') ? '#91BFFF' : 'none',
                border:'none',
                borderRadius : '50%',
                padding : '0px 8px',
            }}
            >
          <Tooltip content="Bold" className='text-black' placement='bottom'><i className="ri-bold text-[20px] font-bold" 
           style={{color : editor.isActive('bold')? 'black' : 'black'}}
          ></i></Tooltip>
        </button>
        <button type='button'  onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'active-btn' : 'btn'}
             style={{
                color : '#F5F5DC',
                background : editor.isActive('italic') ? '#91BFFF' : 'none',
                border:'none',
                borderRadius : '50%',
                padding : '0px 8px',
            }}
            >
                   <Tooltip content="Italic" className='text-black' placement='bottom'><i className="ri-italic text-[20px] font-bold text-black"
                    > </i></Tooltip> 
        </button>
        <button type='button' onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'active-btn' : 'btn'}
            style={{
                color : '#F5F5DC',
                background : editor.isActive('strike') ? '#91BFFF' : 'none',
                border:'none',
                borderRadius : '50%',
                padding : '0px 8px',
            }}
            >
         <Tooltip content="Strike" className='text-black' placement='bottom'><i className="ri-strikethrough text-[20px] font-bold text-black"
      
          ></i></Tooltip> 
        </button>
       <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()}className={editor.isActive('underline') ? 'active-btn' : 'btn'}
         style={{
                color : '#F5F5DC',
                background : editor.isActive('underline') ? '#91BFFF' : 'none',
                border:'none',
                borderRadius : '50%',
                padding : '0px 8px',
            }}
        >
        <Tooltip content="Underline" className='text-black' placement='bottom'><i className="ri-underline text-[20px] font-bold text-black"
         
         ></i></Tooltip>
       </button>


       {/* rewrite with gemini */}
      <Tooltip content="Re-write" className='text-black' placement='bottom' background="white" color="secondary" >
       <Button
       type='button'
       onClick={()=>rewrite(editorContent)}
      
       ><i className="ri-gemini-fill text-[20px]  transition duration-300 hover:text-[#4796E3] ml-2"></i></Button>
      </Tooltip>

   
      </div>

      {/* notes addition button */}
      <button
         type='button'
          onClick={()=>{
            notes.addNote(title , editorContent)
            editor.commands.clearContent();
            setTitle('')
            setEditorContent('')
            successToast()
             }
            }
          > <Tooltip content="Add Note" className='text-black' placement='bottom'><i className="ri-add-large-fill  text-4xl  p-2 text-black"></i></Tooltip></button>
          {/* toast addition  */}
      </div>
    </div>

                

    </div>
  );
};

export default RichTextEditor;