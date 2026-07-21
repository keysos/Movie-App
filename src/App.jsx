import Home from './pages/Home'
import Navbar from './components/Navbar'
import Favorites from './pages/Favorites'
import Watchlist from './pages/Watchlist'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />

      <main className='page-content'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
