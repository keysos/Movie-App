import React, { useEffect, useState } from 'react'
import { fetchDiscoverMedia } from '../services/TMDBApi';
import { useFavorites } from '../context/FavoritesContext';
import MediaList from '../components/MediaList';
import MediaModal from '../components/MediaModal'

const Discover = () => {

    const { favorites, removeFavorite, isFavorite } = useFavorites();


    const [similar, setSimilar] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [filter, setFilter] = useState("all");

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

                let result = await fetchDiscoverMedia(filteredFavorites);

                result = result.filter(
                    (media) =>
                        !isFavorite(media) &&
                        media.vote_average > 7.5 &&
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
    }, [favorites, filter])

    if (favorites.length === 0) {
        return (
            <div className="discover-page">
                <div className="discover-error-message">
                    <h1 className='discover-error'> Try adding some favorites </h1>
                    <p>The Discover page fetchs data based on your favorites movies and tv shows</p>
                </div>
            </div>
        )
    }

    return (
        <div className="discover-page">

            <h2 className='discover-title'>Discover new things to watch</h2>

            <div className="discover-filter">
                <button className={filter === "movie" ? "active" : ""} onClick={() => setFilter("movie")}>
                    Movies
                </button>

                <button className={filter === "tv" ? "active" : ""} onClick={() => setFilter("tv")}>
                    TV Shows
                </button>

                <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
                    All
                </button>
            </div>


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