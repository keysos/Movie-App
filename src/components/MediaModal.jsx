import React, { useEffect, useRef, useState } from 'react'
import { fetchMediaDetail, IMAGE_BASE_URL } from '../services/TMDBApi';
import IMDBIcon from "../assets/icons/330px-IMDB_Logo_2016.svg.webp";
import { useFavorites } from '../context/FavoritesContext';
import { useWatchlist } from '../context/WatchlistContext';
import { FaPlus, FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const MediaModal = ({ media, onClose, mediaType }) => {

    function formatRuntime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        return `${hours}h ${mins.toString().padStart(2, "0")}min`;
    }

    function handleFavorites(e) {
        e.stopPropagation();

        if (favorite) {
            removeFavorite(media.id)
        } else {
            addFavorite(media);
        }
    }

    const [mediaDetails, setMediaDetails] = useState(null)
    const closeButtonRef = useRef(null);

    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const { addToWatchlist, removeFromWatchlist, isOnWatchlist } = useWatchlist();

    const favorite = isFavorite(media.id);
    const watchlist = isOnWatchlist(media.id);

    function handleWatchlist() {
        if (watchlist) {
            removeFromWatchlist(media.id)
        } else {
            addToWatchlist(media)
        }
    }


    useEffect(() => {
        async function getMedia() {
            try {
                const result = await fetchMediaDetail(mediaType, media.id);
                setMediaDetails(result);
            } catch (err) {
                console.error(err)
            }
        }

        getMedia()
    }, [media.id])


    useEffect(() => {
        closeButtonRef.current?.focus();

        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [onClose])


    const details = mediaDetails || media;


    return (
        <div className="overlay" onClick={onClose}>

            <div
                className="movie-modal"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="movie-modal-title"
            >

                <div className="modal-header">

                    <h2 id="movie-modal-title">
                        {details.title ?? details.name} ({details.release_date?.slice(0, 4) ?? details.first_air_date.slice(0, 4)})
                    </h2>


                    <div className="modal-actions">

                        <button
                            className="watchlist-button"
                            onClick={handleWatchlist}
                        >
                            {watchlist ? (
                                <>
                                    Remove from Watchlist <FaCheck />
                                </>
                            ) : (
                                <>
                                    Add to Watchlist <FaPlus />
                                </>
                            )}
                        </button>


                        <button
                            className={`favorite-button ${favorite ? "active" : ""}`}
                            onClick={handleFavorites}
                        >
                            Add to Favorites {favorite ? <FaHeart /> : <FaRegHeart />}
                        </button>

                    </div>


                    <button
                        className="close-button"
                        ref={closeButtonRef}
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <IoClose />
                    </button>

                </div>


                <div className="modal-content">

                    <div className="overview">

                        <img
                            src={`${IMAGE_BASE_URL}${details.poster_path}`}
                            alt={details.title ?? details.name}
                            className="movie-modal-poster"
                        />


                        <div className="movie-modal-details">

                            <p className="sinopsis">
                                {details.overview}
                            </p>


                            <p className="modal-genres">
                                {details.genres?.map((genre) => (
                                    <span key={genre.id}>
                                        {genre.name}
                                    </span>
                                ))}
                            </p>


                            <p className="director">
                                {details?.created_by?.length ? "Creator:" : "Director:"}{" "}
                                <span>
                                    {details?.credits?.crew.find(
                                        (person) => person.job === "Director"
                                    )?.name || details?.created_by?.[0]?.name}
                                </span>
                            </p>


                            <p className="actors">
                                Main Cast:{" "}
                                {
                                    details.credits?.cast
                                        .slice(0, 3)
                                        .map((actor) => (
                                            <span key={actor.name}>
                                                {actor.name}
                                            </span>
                                        ))
                                }
                            </p>


                            <div className="modal-score">

                                <div className="runtime">
                                    {details.runtime
                                        ? formatRuntime(details.runtime)
                                        : `${details.number_of_seasons} Seasons`
                                    }
                                </div>

                                <div className="popularity">
                                    Popularity: {details.popularity.toFixed(2)}
                                </div>

                                <div className="score">
                                    Rating: {details.vote_average.toFixed(1) ?? 0} ⭐
                                </div>

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

        </div>
    )
}

export default MediaModal