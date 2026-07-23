import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {

    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);


    const addFavorite = useCallback((movie) => {
        setFavorites((prev) => [...prev, movie]);
    }, []);


    const removeFavorite = useCallback((id) => {
        setFavorites((prev) =>
            prev.filter((movie) => movie.id !== id)
        );
    }, []);


    const isFavorite = useCallback((id) => {
        return favorites.some((movie) => movie.id === id);
    }, [favorites]);


    const value = useMemo(() => ({
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite
    }), [
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite
    ]);


    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};


export function useFavorites() {
    return useContext(FavoritesContext);
}