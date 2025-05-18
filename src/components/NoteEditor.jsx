import React, { useEffect, useRef, useState } from 'react'
import RichTextEditor from './RichTextEditor'
import { useNotes} from '../context/NotesContext.jsx'
import {app} from '../context/Firebase.jsx'
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";


function NoteEditor() {

    const db = getFirestore(app)
    const {notes,setNotes} = useNotes();
    const [content , setContent] = useState('') 
    const [hasFetched , setHasFetched] = useState(false)
    
    


    //get notes from firestore database 
    useEffect(()=>{
    const getNotes = async() =>{
      try{
      const docRef = doc(db,'notes','204')
      const docSnap = await getDoc(docRef);

      if(docSnap.exists())
      {
        setNotes(docSnap.data().notes || '');
        setHasFetched(true)
      }
      }
      catch(error){
       console.log(error.message)
      }
        
    }
    getNotes();
  },[])

    // add notes to firestore database 
    useEffect(()=>{
    
      if(!hasFetched)
        return

      console.log("notes changed")
      const updateNote = async()=> {
      console.log("inside async function")
      try{
          console.log('connecting to firebase')
          const docRef = doc(db,'notes','204')
          await setDoc(docRef,{ notes })
      }
      catch(error){
        console.error(error.message)
      }
      

    }
    updateNote();
  },[notes])


  
  

    
    
    
    
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
