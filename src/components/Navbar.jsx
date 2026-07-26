import { NavLink } from 'react-router-dom'
import SettingsDropdown from './SettingsDropdown';
import LanguageDropdown from './LanguageDropdown';
import { useTranslation } from '../hooks/useTranslation'
import { useState } from 'react';
import useDropdown from '../hooks/useDropdown';
import { HiMenu } from "react-icons/hi";

const Navbar = ({ query, resetSearch }) => {

    const [openDropdown, setOpenDropdown] = useState(null);

    const t = useTranslation();

    const { dropdownRef, toggleDropdown } = useDropdown(
        "nav",
        openDropdown === "nav",
        setOpenDropdown
    );

    const links = [
        { to: "/", label: t.movies, reset: true },
        { to: "/tvshows", label: t.series, reset: true },
        { to: "/discover", label: t.discover },
        { to: "/favorites", label: t.favorites },
        { to: "/watchlist", label: t.watchlist },
    ];

    return (
        <nav className='navbar'>

            <div className='ghost-nav' style={{ width: "64px" }}>

            </div>

            <div className="navbar-tabs">
                {links.map(link => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) => isActive ? "active" : ""}
                        onClick={link.reset ? resetSearch : undefined}
                    >
                        {link.label}
                    </NavLink>
                ))}
            </div>

            <div className="navbar-mobile" ref={dropdownRef}>
                <button
                    className="settings-button"
                    onClick={() =>
                        setOpenDropdown(
                            openDropdown === "nav" ? null : "nav"
                        )
                    }
                >
                    <HiMenu />
                </button>

                <h1 className='navbar-mobile-title'>CineSearch</h1>

                {openDropdown === "nav" && (
                    <div className="navbar-mobile-menu">
                        {links.map(link => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                                onClick={() => {
                                    if (link.reset) resetSearch();
                                    setOpenDropdown(null);
                                }}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>

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