import React from 'react'
import { IMAGE_BASE_URL } from '../services/movieApi'
import { useFavorites } from '../context/FavoritesContext';
import { useWatchlist } from '../context/WatchlistContext';

const MovieCard = ({ movie, onMovieClick, onRemoveFavorite }) => {

    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    const favorite = isFavorite(movie.id);

    function handleKeyDown(e) {

        // Mirror native <button> behavior: activate on Enter or Space.
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onMovieClick(movie);
        }
    }

    function handleFavorites(e) {
        e.stopPropagation();

        if (favorite) {
            if (onRemoveFavorite) {
                onRemoveFavorite(movie.id);
            } else {
                removeFavorite(movie.id);
            }
        } else {
            addFavorite(movie);
        }
    }

    return (
        <div
            className='movie-card'
            onClick={() => onMovieClick(movie)}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${movie.title}`}
        >

            <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className='movie-poster'
            />

            <div className="movie-info">
                <h3>{movie.title}</h3>

                <div className="movie-details">
                    <p className='year'>{movie.release_date?.slice(0, 4)}</p>
                    <p className='rating'>{movie.vote_average.toFixed(1)} ⭐</p>
                    <button className={`favorite-button-home ${favorite ?
                        'active' : ''}`} onClick={handleFavorites}>
                        {favorite ? '❤️' : '🤍'}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default MovieCard
