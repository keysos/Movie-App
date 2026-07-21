import React, { useState } from 'react'

import { useWatchlist } from '../context/WatchlistContext'
import MovieList from '../components/MovieList';
import MovieModal from '../components/MovieModal';

const Watchlist = () => {

    const { watchlist } = useWatchlist();

    const [selectedMovie, setSelectedMovie] = useState(null);

    return (
        <>
            <MovieList
                movies={watchlist}
                onMovieClick={setSelectedMovie}

            />

            {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
        </>
    )
}

export default Watchlist