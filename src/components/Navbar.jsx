import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <nav className='navbar'>
            <Link to="/">Home</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/watchlist">Watchlist</Link>
        </nav>
    )
}

export default Navbar