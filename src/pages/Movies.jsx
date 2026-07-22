import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import MediaList from '../components/MediaList'
import MediaModal from '../components/MediaModal'
import MediaSlider from '../components/MediaSlider'
import { fetchMedia, fetchPopularMedia, fetchTopRatedMedia, fetchTrendingMedia } from '../services/TMDBApi'
import { useDocumentTitle } from '../services/useDocumentTitle'

const MEDIA_TYPE = "movie";

const Movies = () => {

    useDocumentTitle("Movies | CineSearch");

    const [query, setQuery] = useState("");
    const [queryMedia, setQueryMedia] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [trending, setTrending] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [popular, setPopular] = useState([]);

    const isSearching = query.length >= 3;

    useEffect(() => {

        async function getMedia() {

            if (query.length < 3) {
                setQueryMedia([]);
                setLoading(false);
                return;
            }

            setError("")
            setLoading(true);

            try {
                const result = await fetchMedia(MEDIA_TYPE, query);

                if (result.length === 0) {
                    setError("No movies were found");
                } else {
                    setError("");
                }

                setQueryMedia(result);
            } catch (err) {
                console.error(err);
                setError("Error during fetching movies");
            } finally {

                setLoading(false);
            }
        }

        const timeout = setTimeout(() => {
            getMedia();
        }, 300);

        return () => clearTimeout(timeout);

    }, [query])

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
            }
        }
        loadHomepageMovies();
    }, [])

    return (
        <div>
            <h1 className="title">
                <span> CineSearch </span>
            </h1>

            <SearchBar query={query} setQuery={setQuery} placeholder="Search a movie..." />

            <div aria-live="polite">
                {loading && <p className='loading'>Loading...</p>}

                {error !== "" && <p className='error'>{error}</p>}

                {(!loading && queryMedia.length > 0) && <p className='result-count'>Found {queryMedia.length} result(s)</p>}
            </div>

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
                        isSearching={isSearching}
                        name="Trending"
                    />

                    <MediaSlider
                        media={topRated}
                        onMediaClick={setSelectedMedia}
                        isSearching={isSearching}
                        name="Top Rated"
                    />

                    <MediaSlider
                        media={popular}
                        onMediaClick={setSelectedMedia}
                        isSearching={isSearching}
                        name="Popular"
                    />
                </>
            )}

            {selectedMedia && <MediaModal media={selectedMedia} mediaType={MEDIA_TYPE} onClose={() => setSelectedMedia(null)} />}
        </div>
    )
}

export default Movies
