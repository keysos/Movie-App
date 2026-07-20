import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './home.css'
import './favorites.css'
import './navbar.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
