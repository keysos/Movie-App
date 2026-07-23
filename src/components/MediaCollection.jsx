import React, { useState } from 'react'
import { useFavorites } from '../context/FavoritesContext';
import { useWatchlist } from '../context/WatchlistContext';
import MediaList from '../components/MediaList';
import MediaModal from '../components/MediaModal';
import { useDocumentTitle } from '../services/useDocumentTitle'

const MediaCollection = ({ collectionType }) => {

  // Set the document title based on the collection type

  useDocumentTitle(collectionType === "favorites" ? "Favorites | CineSearch" : "Watchlist | CineSearch");

  const { favorites, removeFavorite } = useFavorites();

  const { watchlist } = useWatchlist();

  const [selectedMedia, setSelectedMedia] = useState(null);

  const result = collectionType === "favorites" ? favorites : watchlist

  return (
    <>
      <h2 className={`${collectionType}-title`}>Movies</h2>
      <MediaList
        media={result.filter((item) => item.title)}
        onMediaClick={setSelectedMedia}
        onRemoveFavorite={
          collectionType === "favorites"
            ? (id) => {
              if (window.confirm("Remove this movie from your favorites?")) {
                removeFavorite(id);
              }
            }
            : undefined
        }
      />

      <h2 className={`${collectionType}-title`}>TV Shows</h2>
      <MediaList
        media={result.filter((item) => item.name)}
        onMediaClick={setSelectedMedia}
        onRemoveFavorite={
          collectionType === "favorites"
            ? (id) => {
              if (window.confirm("Remove this movie from your favorites?")) {
                removeFavorite(id);
              }
            }
            : undefined
        }
      />

      {selectedMedia && <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} mediaType={selectedMedia.title ? "movie" : "tv"} />}
    </>
  )
}

export default MediaCollection