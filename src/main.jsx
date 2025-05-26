import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NotesContextProvider } from './context/NotesContext.jsx'
import './index.css'
import App from './App.jsx'
import  UiProvider  from './context/UiProvider.jsx'
import { AuthProvider } from './context/AuthContext.jsx'



createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <NotesContextProvider>
       <UiProvider>
        <AuthProvider>
          <App />  
         </AuthProvider>
       </UiProvider>
    </NotesContextProvider>
  // </StrictMode>
)
