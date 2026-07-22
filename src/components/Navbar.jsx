import { NavLink } from 'react-router-dom'
import ThemeSwitcher from './ThemeSwitcher'

const Navbar = () => {

    return (
        <nav className='navbar'>
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Movies</NavLink>
            <NavLink to="/tvshows" className={({ isActive }) => isActive ? "active" : ""}>Tv Shows</NavLink>
            <NavLink to="/favorites" className={({ isActive }) => isActive ? "active" : ""}>Favorites</NavLink>
            <NavLink to="/watchlist" className={({ isActive }) => isActive ? "active" : ""}>Watchlist</NavLink>

            <ThemeSwitcher />
        </nav>
    )
}

export default Navbar