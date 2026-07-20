import React, { useState } from 'react'

const MovieCard = ({ movie, onMovieClick }) => {
    
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
    
    return (
        <div className='movie-card' onClick={() => onMovieClick(movie)}>

            <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                onError={() => setHidden(true)}
                className='movie-poster'
            >
            </img>

            <div className="movie-info">
                <h3>{movie.title}</h3>
                <div className="movie-details">
                    <p className='year'>{movie.release_date?.slice(0, 4)}</p>
                    <p className='rating'>{movie.vote_average.toFixed(1)} ⭐</p>
                </div>
                

            </div>
        </div>
    )
}

export default MovieCard