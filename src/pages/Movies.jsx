import React, { useState, useCallback } from 'react'
import SearchBar from '../components/SearchBar'
import MediaList from '../components/MediaList'
import MediaModal from '../components/MediaModal'
import MediaSlider from '../components/MediaSlider'
import Pagination from '../components/Pagination'
import { useDocumentTitle } from '../services/useDocumentTitle'
import useMediaBrowser from '../hooks/useMediaBrowser'

const MEDIA_TYPE = "movie";

const Movies = ({ query, setQuery }) => {

    useDocumentTitle("Movies | CineSearch");

    const [selectedMedia, setSelectedMedia] = useState(null);

    const { queryMedia,
        loading,
        error,
        page,
        setPage,
        totalPages,
        totalResults,
        trending,
        popular,
        topRated,
        isSearching
    } = useMediaBrowser(MEDIA_TYPE, query);

    return (
        <div>
            <h1 className="title">
                <span> CineSearch </span>
            </h1>

            <SearchBar query={query} setQuery={(value) => {
                setPage(1);
                setQuery(value);
            }} placeholder="Search a movie..." />

            {loading &&

                <div className="page-loader">
                    <div className="loading-bar">
                        <div className="loading-progress"></div>
                    </div>
                </div>}

            <div aria-live="polite">

                {error !== "" && <p className='error'>{error}</p>}

                {(!loading && queryMedia.length > 0) && <p className='result-count'>Found {totalResults} result(s)</p>}
            </div>

            {isSearching && !loading && totalPages !== 0 && <Pagination page={page} setPage={setPage} totalPages={totalPages} />}

            <MediaList
                media={queryMedia}
                onMediaClick={setSelectedMedia}
                isSearching={isSearching}
            />

            {!isSearching && (
                <>
                    <MediaSlider
                        media={trending}
                        onMediaClick={setSelectedMedia}
                        name="Trending"
                    />

                    <MediaSlider
                        media={topRated}
                        onMediaClick={setSelectedMedia}
                        name="Top Rated"
                    />

                    <MediaSlider
                        media={popular}
                        onMediaClick={setSelectedMedia}
                        name="Popular"
                    />
                </>
            )}

            {selectedMedia && <MediaModal media={selectedMedia} mediaType={MEDIA_TYPE} onClose={() => setSelectedMedia(null)} />}
        </div>
    )
}

export default Movies
