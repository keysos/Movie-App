import React from 'react'
import MovieCard from './MovieCard';

const MovieList = ({ movies, onMovieClick, onRemoveFavorite}) => {

    return (
        <div className='movie-list'>
            {
                movies.map((movie) => (
                    <MovieCard 
                        key={movie.id} 
                        movie={movie} 
                        onMovieClick={onMovieClick} 
                        onRemoveFavorite={onRemoveFavorite}
                    />
                ))
            }
        </div>
    );
}

export default MovieList