import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children}) => {

    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    })

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    function addFavorite(movie) {
        setFavorites((prev) => [...prev, movie]);
    }

    function removeFavorite(id) {
        setFavorites((prev) => prev.filter((movie) => movie.id !== id))
    }

    function isFavorite(id) {
        return favorites.some((movie) => movie.id === id)
    }

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                addFavorite,
                removeFavorite,
                isFavorite
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}