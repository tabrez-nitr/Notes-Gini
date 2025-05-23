import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NotesContextProvider } from './context/NotesContext.jsx'
import './index.css'
import App from './App.jsx'
import  UiProvider  from './context/UiProvider.jsx'
import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';



createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <NotesContextProvider>
       <UiProvider>
      

        <App />
      
       </UiProvider>
    </NotesContextProvider>
  // </StrictMode>
)
