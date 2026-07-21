import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard';
import { useFavorites } from '../context/FavoritesContext';
import MovieList from '../components/MovieList';
import MovieModal from '../components/MovieModal';
import Footer from '../components/Footer';

const Favorites = () => {

    const { favorites, removeFavorite } = useFavorites();

    const [selectedMovie, setSelectedMovie] = useState(null);

    return (
        <>
            <MovieList
                movies={favorites}
                onMovieClick={setSelectedMovie}
                onRemoveFavorite={(id) => {
                    if (window.confirm("Remove this movie from your favorites?")) {
                        removeFavorite(id);
                    }
                }}
            />

            <Footer />

            {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
        </>
    )
}

export default Favorites