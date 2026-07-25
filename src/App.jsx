import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import React, { useState, lazy, Suspense } from 'react'
import Movies from './pages/Movies'

const Favorites = lazy(() => import('./pages/Favorites'))
const Watchlist = lazy(() => import('./pages/Watchlist'))
const TVShows = lazy(() => import('./pages/TVShows'))
const MediaDetail = lazy(() => import('./components/MediaDetail'))
const Discover = lazy(() => import('./pages/Discover'))

function App() {

  const [query, setQuery] = useState("");

  function resetSearch () {
    setQuery("")
  }

  return (
    <>
      <Navbar query={query} onClick={resetSearch} />

      <main className='page-content'>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Movies query={query} setQuery={setQuery}/>} />
            <Route path="/:mediaType/:id" element={<MediaDetail />} />
            <Route path="/tvshows" element={<TVShows query={query} setQuery={setQuery}/>} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path='/discover' element={<Discover />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  )
}

export default App