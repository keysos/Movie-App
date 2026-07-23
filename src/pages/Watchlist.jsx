import React, { useState } from 'react'
import { useWatchlist } from '../context/WatchlistContext'
import MediaList from '../components/MediaList';
import MediaModal from '../components/MediaModal';
import { useDocumentTitle } from '../services/useDocumentTitle'


const Watchlist = () => {

    useDocumentTitle("Watchlist | CineSearch");

    const { watchlist } = useWatchlist();

    const [selectedMedia, setSelectedMedia] = useState(null);

    return (
        <>

            <h2 className='watchlist-title'>Movies</h2>
            <MediaList
                media={watchlist.filter((item) => item.title)}
                onMediaClick={setSelectedMedia}

            />

            <h2 className='watchlist-title'>TV Shows</h2>
            <MediaList
                media={watchlist.filter((item) => item.name)}
                onMediaClick={setSelectedMedia}

            />

            {selectedMedia && <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} mediaType={selectedMedia.title ? "movie" : "tv"}/>}
        </>
    )
}

export default Watchlist