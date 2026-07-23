import React, { useEffect, useState } from 'react'
import MediaCard from '../components/MediaCard';
import { useFavorites } from '../context/FavoritesContext';
import MediaList from '../components/MediaList';
import MediaModal from '../components/MediaModal';
import { useDocumentTitle } from '../services/useDocumentTitle'

const Favorites = () => {

    useDocumentTitle("Favorites | CineSearch");

    const { favorites, removeFavorite } = useFavorites();

    const [selectedMedia, setSelectedMedia] = useState(null);

    return (
        <>

            <h2 className='favorites-title'>Movies</h2>
            <MediaList
                media={favorites.filter((item) => item.title)}
                onMediaClick={setSelectedMedia}
                onRemoveFavorite={(id) => {
                    if (window.confirm("Remove this movie from your favorites?")) {
                        removeFavorite(id);
                    }
                }}
            />

            <h2 className='favorites-title'>TV Shows</h2>
            <MediaList
                media={favorites.filter((item) => item.name)}
                onMediaClick={setSelectedMedia}
                onRemoveFavorite={(id) => {
                    if (window.confirm("Remove this movie from your favorites?")) {
                        removeFavorite(id);
                    }
                }}
            />

            {selectedMedia && <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} mediaType={selectedMedia.title ? "movie" : "tv"}/>}
        </>
    )
}

export default Favorites