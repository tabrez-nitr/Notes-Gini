import { createContext, react, useContext} from 'react'


const NotesContext = createContext();

export const NotesContextProvider = ({ props}) => {
    const [notes , setNotes] = useState([
        {
            id : 1,
            title : "Note 1",
            content : "This is my first Note",
        }
    ]);
    

    return(
        <NotesContext.Provider >
            { props.children}
        </NotesContext.Provider>
    )

}