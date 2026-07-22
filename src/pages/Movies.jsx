import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import MediaList from '../components/MediaList'
import MediaModal from '../components/MediaModal'
import MediaSlider from '../components/MediaSlider'
import Pagination from '../components/Pagination'
import { fetchMedia, fetchPopularMedia, fetchTopRatedMedia, fetchTrendingMedia } from '../services/TMDBApi'
import { useDocumentTitle } from '../services/useDocumentTitle'

const MEDIA_TYPE = "movie";

const Movies = ({ query, setQuery }) => {

    useDocumentTitle("Movies | CineSearch");

    const [queryMedia, setQueryMedia] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0)

    const [trending, setTrending] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [popular, setPopular] = useState([]);

    const [debouncedQuery, setDebouncedQuery] = useState(query);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 1000);

        return () => clearTimeout(timer);
    }, [query]);

    const isSearching = debouncedQuery.length >= 3;

    useEffect(() => {

        async function getMedia() {

            if (debouncedQuery.length < 3) {
                setQueryMedia([]);
                setLoading(false);
                return;
            }

            setError("")
            setLoading(true);

            try {
                const result = await fetchMedia(MEDIA_TYPE, debouncedQuery, page);

                if (result.results.length === 0) {
                    setError("No movies were found");
                } else {
                    setError("");
                }

                setQueryMedia(result.results);
                setTotalPages(result.totalPages)
                setTotalResults(result.totalResults)
            } catch (err) {
                console.error(err);
                setError("Error during fetching movies");
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 300)
            }
        }

        getMedia();

    }, [debouncedQuery, page])

    useEffect(() => {

        async function loadHomepageMovies() {

            try {
                const [trending, topRated, popular] = await Promise.all([
                    fetchTrendingMedia(MEDIA_TYPE),
                    fetchTopRatedMedia(MEDIA_TYPE),
                    fetchPopularMedia(MEDIA_TYPE)
                ]);

                setTrending(trending);
                setTopRated(topRated);
                setPopular(popular);
            } catch (err) {
                console.error(err)
            } finally {
                const timeout = setTimeout(() => {
                    setLoading(false)
                }, 300)
            }


        }
        loadHomepageMovies();
    }, [])

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
