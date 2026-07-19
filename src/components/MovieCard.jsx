import React, { useState } from 'react'

const MovieCard = ({ movie }) => {

    const [hidden, setHidden] = useState(false);

    if (hidden) return null

    return (
        <div className='movie-card'>

            <img
                src={movie.Poster ? movie.Poster : noPoster}
                alt={movie.title}
                onError={() => setHidden(true)}
            >
            </img>

            <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p className='year'>{movie.Year}</p>

            </div>
        </div>
    )
}

export default MovieCard