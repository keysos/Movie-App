import { createContext, useContext, useState, useEffect } from 'react';

const ThemeToggleContext = createContext();

export const ThemeToggleProvider = ( { children }) => {

    const [isDark, setIsDark] = useState(() => {
        const data = localStorage.getItem('theme-toggle');
        return data ? JSON.parse(data) : false;
    })

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