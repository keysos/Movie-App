import { NavLink } from 'react-router-dom'
import SettingsDropdown from './SettingsDropdown';
import LanguageDropdown from './LanguageDropdown';
import { useTranslation } from '../hooks/useTranslation'
import { useState } from 'react';

const Navbar = ({ query, resetSearch }) => {

    const [openDropdown, setOpenDropdown] = useState(null);

    const t = useTranslation();

    return (
        <nav className='navbar'>
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} onClick={() => resetSearch()}>{t.movies}</NavLink>
            <NavLink to="/tvshows" className={({ isActive }) => isActive ? "active" : ""} onClick={() => resetSearch()}>{t.series}</NavLink>
            <NavLink to="/discover" className={({ isActive }) => isActive ? "active" : ""}>{t.discover}</NavLink>
            <NavLink to="/favorites" className={({ isActive }) => isActive ? "active" : ""}>{t.favorites}</NavLink>
            <NavLink to="/watchlist" className={({ isActive }) => isActive ? "active" : ""}>{t.watchlist}</NavLink>

            <div className='navbar-options'>

                <LanguageDropdown
                    open={openDropdown === "language"}
                    setOpenDropdown={setOpenDropdown}
                />

                <SettingsDropdown
                    open={openDropdown === "settings"}
                    setOpenDropdown={setOpenDropdown}
                />

            </div>


        </nav>
    )
}

export default Navbar