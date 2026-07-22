import React, { useEffect, useState } from 'react'
import MediaList from '../components/MediaList'
import MediaModal from '../components/MediaModal'
import MediaSlider from '../components/MediaSlider'
import { fetchMedia, fetchPopularMedia, fetchTopRatedMedia, fetchTrendingMedia } from '../services/TMDBApi'
import SearchBar from '../components/SearchBar'
import { useDocumentTitle } from '../services/useDocumentTitle'

const MEDIA_TYPE = "tv";

const TVShows = ( { query, setQuery}) => {

    useDocumentTitle("TV Shows | CineSearch")

    const [queryMedia, setQueryMedia] = useState([])
    const [selectedMedia, setSelectedMedia] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [trending, setTrending] = useState([]);
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);


    const isSearching = query.length > 3;

    useEffect(() => {

        async function getMedia() {

            if (query.length < 3) {
                setQueryMedia([])
                setLoading(false)
                return
            }

            setError("")
            setLoading(true)

            try {

                const result = await fetchMedia(MEDIA_TYPE, query);


                if (result.length === 0) {
                    setError("No tv shows were found");
                } else {
                    setError("");
                }

                setQueryMedia(result);
            } catch (err) {
                console.error(err);
                setError("Error during fetching tv shows");
            } finally {
                const timeout = setTimeout(() => {
                    setLoading(false)
                }, 300)
            }
        }

        const timeout = setTimeout(() => {
            getMedia();
        }, 300);

        return () => clearTimeout(timeout);
    }, [query])

    useEffect(() => {

        async function loadShowspage() {

            try {
                const [trending, topRated, popular] = await Promise.all([
                    fetchTrendingMedia(MEDIA_TYPE),
                    fetchTopRatedMedia(MEDIA_TYPE),
                    fetchPopularMedia(MEDIA_TYPE)
                ])

                setTrending(trending);
                setPopular(popular);
                setTopRated(topRated);
            } catch (err) {
                console.error(err);
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 300)
            }          
        }

        loadShowspage()
    }, [])

    if (loading) {
        return (
            <>
                <h1 className="title">
                    <span> CineSearch </span>
                </h1>
                <SearchBar query={query} setQuery={setQuery} placeholder="Search a movie..." />
                <div className="page-loader">
                    <div className="loading-bar">
                        <div className="loading-progress"></div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div>
            <h1 className='title'>
                <span>CineSearch</span>
            </h1>


            <SearchBar query={query} setQuery={setQuery} placeholder={"Search a tv show..."} />

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

export default TVShows