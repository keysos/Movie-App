import React from 'react'
import { IMAGE_BASE_URL } from '../services/TMDBApi'
import { useFavorites } from '../context/FavoritesContext';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { convertRatingToStars, formatRuntime } from '../utils/utils';

const MediaCard = ({ media, onMediaClick, onRemoveFavorite }) => {

    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    const favorite = isFavorite(media.id);

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
            className='media-card'
            onClick={() => onMediaClick(media)}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${media.title ?? media.name}`}
        >

            <img
                src={`${IMAGE_BASE_URL}${media.poster_path}`}
                alt={media.title ?? media.name}
                className='media-card__poster'
            />

            <div className="media-card__body">
                <h3 className="media-card__title">{media.title ?? media.name}</h3>

                <div className="media-card__meta">
                    <p className='media-card__year'>{media.release_date?.slice(0, 4) ?? media.first_air_date?.slice(0, 4)}</p>

                    <p className='media-card__rating'>{
                    convertRatingToStars(media.vote_average?.toFixed(1) ?? 0)
                    }</p>

                    <button className={`media-card__favorite-btn ${favorite ?
                        'is-active' : ''}`} onClick={handleFavorites}>
                        {favorite ? <FaHeart /> : <FaRegHeart />}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default MediaCard
