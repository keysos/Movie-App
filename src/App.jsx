import Movies from './pages/Movies'
import Navbar from './components/Navbar'
import Favorites from './pages/Favorites'
import Watchlist from './pages/Watchlist'
import TVShows from './pages/TVShows'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />

      <main className='page-content'>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/tvshows" element={<TVShows />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
