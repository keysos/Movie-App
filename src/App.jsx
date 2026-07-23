import Movies from './pages/Movies'
import Navbar from './components/Navbar'
import Favorites from './pages/Favorites'
import Watchlist from './pages/Watchlist'
import TVShows from './pages/TVShows'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import React, {useState} from 'react'
import MediaDetail from './components/MediaDetail'

function App() {

  const [query, setQuery] = useState("");

  function resetSearch () {
    setQuery("")
  }

  return (
    <>
      <Navbar query={query} onClick={resetSearch} />

      <main className='page-content'>
      <Routes>
        <Route path="/" element={<Movies query={query} setQuery={setQuery}/>} />
        <Route path="/:mediaType/:id" element={<MediaDetail />} />
        <Route path="/tvshows" element={<TVShows query={query} setQuery={setQuery}/>} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
