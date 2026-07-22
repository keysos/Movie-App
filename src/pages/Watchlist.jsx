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
            <MediaList
                media={watchlist}
                onMediaClick={setSelectedMedia}

            />

            {selectedMedia && <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} />}
        </>
    )
}

export default Watchlist