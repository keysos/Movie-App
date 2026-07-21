import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { WatchlistProvider } from './context/WatchlistContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <WatchlistProvider>
          <App />
        </WatchlistProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>,
)
