import { FaSun, FaMoon } from "react-icons/fa";

import { useThemeToggle } from "../context/ThemeToggleContext";



const ThemeSwitcher = () => {

    const { isDark, toggleTheme} = useThemeToggle();

    return (
        <label className="theme-switch">
            <input 
            type="checkbox"
            checked={isDark}
            onChange={toggleTheme}
            />

            <span className="slider">
                <span className="icon">
                    {isDark ? <FaMoon /> : <FaSun />}
                </span>
            </span>
        </label>
    );
};

export default ThemeSwitcher;