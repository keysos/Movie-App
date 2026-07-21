import Home from './pages/Home'
import Navbar from './components/Navbar'
import Favorites from './pages/Favorites'
import Watchlist from './pages/Watchlist'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </>
  )
}

export default App
