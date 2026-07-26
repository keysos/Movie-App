import React, { useState } from 'react'
import { useFavorites } from '../context/FavoritesContext';
import { useWatchlist } from '../context/WatchlistContext';
import MediaList from '../components/MediaList';
import MediaModal from '../components/MediaModal';
import { useDocumentTitle } from '../services/useDocumentTitle'
import { useTranslation } from '../hooks/useTranslation';

const MediaCollection = ({ collectionType }) => {

  const t = useTranslation();

  useDocumentTitle(collectionType === "favorites" ? t.favorites + " | CineSearch" :  t.watchlist + " | CineSearch");

  const { favorites, removeFavorite } = useFavorites();

  const { watchlist } = useWatchlist();

  const [selectedMedia, setSelectedMedia] = useState(null);

  const result = collectionType === "favorites" ? favorites : watchlist

  const movies = result.filter((media) => media.title);
  const tvshows = result.filter((media) => media.name)

  return (
    <>
      <h2 className={`${collectionType}-title`}>{t.movies}</h2>

      {
        movies.length === 0 &&
        <div className="collection-error-message">
          <p>{collectionType === "favorites" ? t.noMoviesFavorites : t.noMoviesWatchlist}</p>
        </div>
      }

      <MediaList
        media={result.filter((item) => item.title)}
        onMediaClick={setSelectedMedia}
        onRemoveFavorite={
          collectionType === "favorites"
            ? (id) => {
              if (window.confirm(t.removeConfirm)) {
                removeFavorite(id);
              }
            }
            : undefined
        }
      />

      <h2 className={`${collectionType}-title`}>{t.tvShows}</h2>

      {
        tvshows.length === 0 &&
        <div className="collection-error-message">
          <p>{collectionType === "favorites" ? t.noTvshowsFavorites : t.noTvshowsWatchlist}</p>
        </div>
      }

      <MediaList
        media={result.filter((item) => item.name)}
        onMediaClick={setSelectedMedia}
        onRemoveFavorite={
          collectionType === "favorites"
            ? (id) => {
              if (window.confirm(t.removeConfirm)) {
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