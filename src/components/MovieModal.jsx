import React, { useEffect, useState } from 'react'
import { fetchMovieDetail } from '../services/movieApi';

const MovieModal = ({ movie, onClose }) => {

    function formatRuntime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        return `${hours}h ${mins.toString().padStart(2, "0")}min`;
    }

    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

    const [movieDetails, setMoviesDetail] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        async function getMovie() {

            try {
                const result = await fetchMovieDetail(movie.id);

                setMoviesDetail(result);

            } catch (err) {
                console.error(err)
            }

            setTimeout(() => {
                setDetails(data);
                setLoading(false);
            }, 300);

        }

        getMovie()
    }, [movie.id])

    const details = movieDetails || movie;

    return (
        <div className='overlay' onClick={onClose}>

            <div className="movie-modal" onClick={(e) => e.stopPropagation()}>


                <div className="modal-header">
                    <h1>{details.title} ({movie.release_date?.slice(0, 4)})</h1>

                    <button onClick={onClose}>✖</button>
                </div>

                <div className="overview">
                    <img
                        src={`${IMAGE_BASE_URL}${details.poster_path}`}
                        alt={details.title}
                        className='movie-modal-poster'
                    >
                    </img>

                    <div className="movie-modal-details">

                        <p className='sinopsis'>
                            {details.overview}
                        </p>

                        <p className="modal-genres">
                            {details.genres?.map((genre) => (
                                <span key={genre.id}>
                                    {genre.name}
                                </span>
                            ))}
                        </p>

                        <p className='modal-misc'>
                            <span>{(details.original_language).toUpperCase()}</span>
                            <span>{details.status}</span>
                            <span>{formatRuntime(details.runtime)}</span>
                        </p>

                        <div className="modal-score">
                            <div className='populatiry'>Popularity: {details.popularity.toFixed(2)}</div>
                            <div className='vote-count'>Votes: {details.vote_count}</div>
                            <div className='score'>Rating: {details.vote_average.toFixed(1)} ⭐</div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default MovieModal