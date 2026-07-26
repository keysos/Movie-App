import React, { useEffect, useState } from 'react'
import { fetchDiscoverMedia } from '../services/TMDBApi';
import { useFavorites } from '../context/FavoritesContext';
import MediaList from '../components/MediaList';
import MediaModal from '../components/MediaModal'
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

const Discover = () => {

    const { favorites, removeFavorite, isFavorite } = useFavorites();
    const { language } = useLanguage();


    const [similar, setSimilar] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [filter, setFilter] = useState("all");

    const movies = favorites.filter((media) => media.title);
    const tvshows = favorites.filter((media) => media.name)
    const t = useTranslation()

    useEffect(() => {

        async function loadSimilar() {

            if (favorites.length === 0) {
                setSimilar([])
                return;
            }

            try {

                let filteredFavorites = favorites;

                if (filter === "movie") {
                    filteredFavorites = favorites.filter(
                        (media) => media.title
                    );
                }

                if (filter === "tv") {
                    filteredFavorites = favorites.filter(
                        (media) => media.name
                    );
                }

                let result = await fetchDiscoverMedia(filteredFavorites, language);

                result = result.filter(
                    (media) =>
                        !isFavorite(media) &&
                        media.vote_average > 6 &&
                        media.poster_path
                ).sort((a, b) => b.popularity - a.popularity);

                setSimilar(result)
            } catch (err) {
                console.error(err);
            } finally {
                setTimeout(() => {

                }, 300)
            }
        }
        loadSimilar();
    }, [favorites, filter, language])

    if (favorites.length === 0) {
        return (
            <div className="discover-page">
                <div className="discover-error-message">
                    <h1 className='discover-error'>{t.discoverHelp}</h1>
                    <p>{t.discoverWarning}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="discover-page">

            <h2 className='discover-title'>{t.discoverHeading}</h2>

            <div className="discover-filter">
                <button className={filter === "movie" ? "active" : ""} onClick={() => setFilter("movie")}>
                    {t.movies}
                </button>

                <button className={filter === "tv" ? "active" : ""} onClick={() => setFilter("tv")}>
                    {t.tvShows}
                </button>

                <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
                    {t.all}
                </button>
            </div>

            {
                movies.length === 0 && filter === "movie" &&
                <div className="discover-error-message">
                    <h1 className='discover-error'>{t.discoverHelp}</h1>
                    <p>{t.discoverWarning}</p>
                </div>
            }

            {
                tvshows.length === 0 && filter === "tv" &&
                <div className="discover-error-message">
                    <h1 className='discover-error'>{t.discoverHelp}</h1>
                    <p>{t.discoverWarning}</p>
                </div>
            }


            <MediaList
                media={similar}
                onMediaClick={setSelectedMedia}
                onRemoveFavorite={removeFavorite}
            />

            {selectedMedia && <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} mediaType={selectedMedia.title ? "movie" : "tv"} />}
        </div>
    )
}

export default Discover