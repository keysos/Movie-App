import { createContext, useContext, useState, useEffect } from 'react';

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {

    const [watchlist, setWatchlist] = useState(() => {
        const saved = localStorage.getItem('watchlist');
        return saved ? JSON.parse(saved) : [];
    })

    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
    }, [watchlist])

    function addToWatchlist(movie) {
        setWatchlist((prev) => [...prev, movie])
    }

    function removeFromWatchlist(id) {
        setWatchlist((prev) => prev.filter((movie) => movie.id !== id))
    }

    function isOnWatchlist(id) {
        return watchlist.some((movie) => movie.id === id);
    }

    return (
        <WatchlistContext.Provider
            value={{
                watchlist,
                addToWatchlist,
                removeFromWatchlist,
                isOnWatchlist
            }}
        >
            {children}
        </WatchlistContext.Provider>
    )
}

export function useWatchlist() {
    return useContext(WatchlistContext);
}