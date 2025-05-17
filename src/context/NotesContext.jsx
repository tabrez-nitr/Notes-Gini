import { useContext, useState } from "react";
import { createContext } from "react";



// context creation
const NotesContext = createContext();

// hook creation 
export const useNotes = () => {
    return useContext(NotesContext)
}
// context provider 
export const NotesContextProvider = ({ children }) => {
    const [notes , setNotes] = useState([]);
    const addNote = (title,note) => {
      setNotes((prevState)=>(
        [{
            id:Date.now(),
            title : title,
            content : note
        },
        ...prevState
    ] ))
    console.log(notes)
   }
    

    return(
        <NotesContext.Provider value={{addNote,notes}} >
            {children}
        </NotesContext.Provider>
    )

}