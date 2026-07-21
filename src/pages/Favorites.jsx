import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard';
import { useFavorites } from '../context/FavoritesContext';
import MovieList from '../components/MovieList';
import MovieModal from '../components/MovieModal';

const Favorites = () => {

    const { favorites } = useFavorites();

    const [selectedMovie, setSelectedMovie] = useState(null);

    return (
        <>
            <MovieList
                movies={favorites}
                onMovieClick={setSelectedMovie}
            />

            {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
        </>
    )
}

export default Favorites