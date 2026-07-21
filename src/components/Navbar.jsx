import { NavLink } from 'react-router-dom'

const Navbar = () => {

    return (
        <nav className='navbar'>
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
            <NavLink to="/favorites" className={({ isActive }) => isActive ? "active" : ""}>Favorites</NavLink>
            <NavLink to="/watchlist" className={({ isActive }) => isActive ? "active" : ""}>Watchlist</NavLink>
        </nav>
    )
}

export default Navbar