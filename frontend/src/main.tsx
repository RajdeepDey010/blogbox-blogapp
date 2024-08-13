import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './globals.css'
import { Toaster } from './components/ui/toaster.tsx'

createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Toaster />
    <App />
  </>
)
