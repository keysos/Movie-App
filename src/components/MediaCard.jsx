import React from 'react'
import { IMAGE_BASE_URL } from '../services/TMDBApi'
import { useFavorites } from '../context/FavoritesContext';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from "react-icons/ti";

const MediaCard = ({ media, onMediaClick, onRemoveFavorite }) => {

    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    const favorite = isFavorite(media.id);

    function convertRatingToStars(rating) {
        const stars = rating / 2;

        return Array.from({ length: 5 }, (_, i) => {
            if (stars >= i + 1) {
                return <TiStarFullOutline key={i} />;
            }

            if (stars >= i + 0.5) {
                return <TiStarHalfOutline key={i} />;
            }

            return <TiStarOutline key={i} />;
        });
    }

    function handleKeyDown(e) {

        // Mirror native <button> behavior: activate on Enter or Space.
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onMediaClick(media);
        }
    }

    function handleFavorites(e) {
        e.stopPropagation();

        if (favorite) {
            if (onRemoveFavorite) {
                onRemoveFavorite(media.id);
            } else {
                removeFavorite(media.id);
            }
        } else {
            addFavorite(media);
        }
    }

    return (
        <div
            className='movie-card'
            onClick={() => onMediaClick(media)}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${media.title ?? media.name}`}
        >

            <img
                src={`${IMAGE_BASE_URL}${media.poster_path}`}
                alt={media.title ?? media.name}
                className='movie-poster'
            />

            <div className="movie-info">
                <h3>{media.title ?? media.name}</h3>

                <div className="movie-details">
                    <p className='year'>{media.release_date?.slice(0, 4) ?? media.first_air_date?.slice(0, 4)}</p>

                    <p className='rating'>{
                    convertRatingToStars(media.vote_average?.toFixed(1) ?? 0)
                    }</p>

                    <button className={`favorite-button-home ${favorite ?
                        'active' : ''}`} onClick={handleFavorites}>
                        {favorite ? <FaHeart /> : <FaRegHeart />}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default MediaCard
