import React, { useState } from 'react'
import MediaList from '../components/MediaList'
import MediaModal from '../components/MediaModal'
import MediaSlider from '../components/MediaSlider'
import SearchBar from '../components/SearchBar'
import { useDocumentTitle } from '../services/useDocumentTitle'
import Pagination from '../components/Pagination'
import useMediaBrowser from '../hooks/useMediaBrowser'
import { useTranslation } from '../hooks/useTranslation'
import { useLanguage } from '../context/LanguageContext'

const MEDIA_TYPE = "tv";

const TVShows = ({ query, setQuery }) => {

    useDocumentTitle("TV Shows | CineSearch")

    const [selectedMedia, setSelectedMedia] = useState(null)

    const { language } = useLanguage();

    const t = useTranslation();

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
    } = useMediaBrowser(MEDIA_TYPE, query, language);

    return (
        <div>
            <h1 className='title'>
                <span>CineSearch</span>
            </h1>

            <SearchBar query={query} setQuery={(value) => {
                setPage(1);
                setQuery(value);
            }} placeholder={t.searchTvshowPlaceholder} />

            {loading &&
                <div className="page-loader">
                    <div className="loading-bar">
                        <div className="loading-progress"></div>
                    </div>
                </div>}

            <div aria-live="polite">
                {loading && <p className='loading'>Loading...</p>}

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
                        name={t.trending}
                    />

                    <MediaSlider
                        media={topRated}
                        onMediaClick={setSelectedMedia}
                        name={t.topRated}
                    />

                    <MediaSlider
                        media={popular}
                        onMediaClick={setSelectedMedia}
                        name={t.popular}
                    />
                </>
            )}

            {selectedMedia && <MediaModal media={selectedMedia} mediaType={MEDIA_TYPE} onClose={() => setSelectedMedia(null)} />}
        </div>
    )
}

export default TVShows