import React, { useEffect, useRef, useState } from 'react'
import RichTextEditor from './RichTextEditor'
import { useNotes} from '../context/NotesContext.jsx'
import {app} from '../context/Firebase.jsx'
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import {addToast , Button ,cn} from "@heroui/react";
import { useAuth } from '../context/AuthContext.jsx';


function NoteEditor() {

    const db = getFirestore(app)
    const {notes,setNotes} = useNotes();
    const [content , setContent] = useState('') 
    const [hasFetched , setHasFetched] = useState(false)
    const { user , setUser } = useAuth();
    
    


    //get notes from firestore database 
  useEffect(()=>{
    if(user == null)
      return;

    const getNotes = async() =>{
      try{
      const docRef = doc(db,'notes',user.uid)
      const docSnap = await getDoc(docRef);

      if(docSnap.exists())
      {
        setNotes(docSnap.data().notes || '');
        setHasFetched(true)
      }
      else{
        await setDoc(docRef,{notes: []});
        setNotes([]);
        setHasFetched(true);
      }
      }
      catch(error){
       console.log(error.message)
      }
        
    }
    getNotes();
  },[user])

    // add notes to firestore database 
  useEffect(()=>{
    
      if(!hasFetched || user == null)
        return

      console.log("notes changed")
      const updateNote = async()=> {
      console.log("inside async function")
      try{
          console.log('connecting to firebase')
          const docRef = doc(db,'notes',user.uid)
          await setDoc(docRef,{ notes })
      }
      catch(error){
        console.error(error.message)
      }
      

    }
    updateNote();
  },[notes,user])


  return (
    <div>
        {/* main div  */}

   <div className='flex justify-center'>
        <form  className='flex justify-center m-4 relative border border-white/20 rounded-[4px] bg-transparent backdrop-blur-md shadow-[inset_0_0_0.5px_rgba(255,255,255,0.2)] hover:border-white/50' >
            <RichTextEditor content={content} onChange={setContent}/>
        </form>
    </div>

         <div>
     


     





         </div>
    </div>
  )
}

export default NoteEditor
