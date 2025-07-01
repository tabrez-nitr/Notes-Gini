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
    console.log("user",user)
     if(user == null)
      return;

    const getNotes = async() =>{
      try{
      console.log("inside try")
      const docRef = doc(db,'notes',user.uid)
      console.log("docRef inistailized")
      const docSnap = await getDoc(docRef);
      console.log("docSnap inistailized")

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
       console.log("not inside try")
      }
        
    }
    getNotes();
  },[user])

    // add notes to firestore database 
  useEffect(()=>{
       
     console.log("Inside add function")
      if(!hasFetched || user == null){
        console.log("Returned")
        return
      }

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
        <form  className='flex justify-center m-4 relative border border-black/50 rounded-[4px]   hover:border-black backdrop-blur-md shadow-lg transition-all duration-300 transform  hover:shadow-xl ' >
            <RichTextEditor content={content} onChange={setContent}/>
        </form>
    </div>

    </div>
  )
}

export default NoteEditor
