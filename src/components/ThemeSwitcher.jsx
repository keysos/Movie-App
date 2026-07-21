import { FaSun, FaMoon } from "react-icons/fa";

const ThemeSwitcher = () => {

    const dark = false;

    return (
        <label className="theme-switch">
            <input type="checkbox" />

            <span className="slider">
                <span className="icon">
                    {dark ? <FaMoon /> : <FaSun />}
                </span>
            </span>
        </label>
    );
};

export default ThemeSwitcher;