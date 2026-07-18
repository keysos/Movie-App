import React from 'react'

const MovieCard = ({ movie }) => {

    if (movie.Type !== 'movie' || !movie.Poster || movie.Poster === 'N/A') {
        return null;
    }

    return (
        <div className='movie-card'>
            {movie.Poster && movie.Poster !== 'N/A' && (
                <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className='movie-poster'
                />
            )}
            <div className='movie-info'>
                <h3>{movie.Title}</h3>
                <p className='year'>{movie.Year}</p>
            </div>
        </div>
    )
}

export default MovieCard