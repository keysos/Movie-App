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
            <MediaList
                media={favorites}
                onMediaClick={setSelectedMedia}
                onRemoveFavorite={(id) => {
                    if (window.confirm("Remove this movie from your favorites?")) {
                        removeFavorite(id);
                    }
                }}
            />

            {selectedMedia && <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} />}
        </>
    )
}

export default Favorites