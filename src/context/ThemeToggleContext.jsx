import { createContext, useContext, useState, useEffect } from 'react';

const ThemeToggleContext = createContext();

export const ThemeToggleProvider = ( { children }) => {

    // Initialize the theme state from localStorage or default to false (light mode) if not present
    const [isDark, setIsDark] = useState(() => {
        const data = localStorage.getItem('theme-toggle');
        return data ? JSON.parse(data) : false;
    })

    // useEffect to update localStorage and the document's data-theme attribute whenever the theme state changes

    useEffect(() => {
        
        localStorage.setItem('theme-toggle', JSON.stringify(isDark));

        document.documentElement.setAttribute(
            "data-theme",
            isDark ? "dark" : "light"
        );

    }, [isDark])

    function toggleTheme() {
        setIsDark(prev => !prev)
    }

    return (
        <ThemeToggleContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeToggleContext.Provider>
    );
};

export const useThemeToggle = () => {
    return useContext(ThemeToggleContext);
}