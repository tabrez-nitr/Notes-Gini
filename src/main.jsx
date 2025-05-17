import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NotesContextProvider } from './context/NotesContext.jsx'
import './index.css'
import App from './App.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotesContextProvider>
    <App />
    </NotesContextProvider>
  </StrictMode>
)
