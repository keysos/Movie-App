import React, { useEffect, useRef, useState } from 'react'
import { fetchMovieDetail, IMAGE_BASE_URL } from '../services/movieApi';
import RottenTomatoesIcon from "../assets/icons/Rotten_Tomatoes.svg.webp";
import IMDBIcon from "../assets/icons/330px-IMDB_Logo_2016.svg.webp";
import { useFavorites } from '../context/FavoritesContext';

const MovieModal = ({ movie, onClose }) => {

    function formatRuntime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        return `${hours}h ${mins.toString().padStart(2, "0")}min`;
    }

    function handleFavorites(e) {
        e.stopPropagation();

        if (favorite) {
            removeFavorite(movie.id)
        } else {
            addFavorite(movie);
        }

    }

    const [movieDetails, setMovieDetails] = useState(null)
    const closeButtonRef = useRef(null);

    const { isFavorite, addFavorite, removeFavorite } = useFavorites();

    const favorite = isFavorite(movie.id);

    useEffect(() => {

        async function getMovie() {
            try {
                const result = await fetchMovieDetail(movie.id);
                setMovieDetails(result);
            } catch (err) {
                console.error(err)
            }
        }

        getMovie()
    }, [movie.id])

    useEffect(() => {
        closeButtonRef.current?.focus();

        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose])

    const details = movieDetails || movie;

    return (
        <div className='overlay' onClick={onClose}>

            <div
                className="movie-modal"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="movie-modal-title"
            >


                <div className="modal-header">
                    <h2 id="movie-modal-title">{details.title} ({movie.release_date?.slice(0, 4)})</h2>

                    <div className="modal-actions">
                        <button className="watchlist-button">
                            Add to Watchlist 🔖
                        </button>

                        <button
                            className={`favorite-button ${favorite ? 'active' : ''}`}
                            onClick={handleFavorites}
                        >
                            Add to Favorites {favorite ? '❤️' : '🤍'}
                        </button>

                        <button
                            className="close-button"
                            ref={closeButtonRef}
                            onClick={onClose}
                            aria-label="Close"
                        >
                            ✖
                        </button>
                    </div>
                </div>

                <div className="overview">
                    <img
                        src={`${IMAGE_BASE_URL}${details.poster_path}`}
                        alt={details.title}
                        className='movie-modal-poster'
                    />

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

                        <p className='director'>Director:
                            <span> {details.credits?.crew.find((person) => person.job === "Director")?.name || "Unknown"}</span>
                        </p>

                        <p className='actors'>Main Actors:
                            {
                                details.credits?.cast.slice(0, 3).map((actor) => (
                                    <span key={actor.name}> {actor.name}</span>
                                ))
                            }
                        </p>

                        <div className="modal-score">
                            <div className="runtime">{formatRuntime(details.runtime)}</div>
                            <div className='popularity'>Popularity: {details.popularity.toFixed(2)}</div>
                            <div className='score'>Rating: {details.vote_average.toFixed(1)} ⭐</div>
                            <a
                                className="rotten-tomatoes"
                                href={`https://www.rottentomatoes.com/search?search=${encodeURIComponent(details.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={RottenTomatoesIcon}
                                    alt="Rotten Tomatoes"
                                    width="24"
                                    height="24"
                                />
                            </a>
                            <a
                                className="imdb"
                                href={`https://www.imdb.com/title/${details.external_ids?.imdb_id}/`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={IMDBIcon}
                                    alt="IMDB"
                                    width="30"
                                />
                            </a>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default MovieModal
