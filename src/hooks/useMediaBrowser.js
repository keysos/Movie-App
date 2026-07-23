import { useState, useEffect } from "react";
import { fetchMedia, fetchPopularMedia, fetchTopRatedMedia, fetchTrendingMedia } from '../services/TMDBApi'

export function useMediaBrowser(mediaType, query) {


    /* States used for media browsing */
    const [queryMedia, setQueryMedia] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0)

    const [trending, setTrending] = useState([]);
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);

    const [debouncedQuery, setDebouncedQuery] = useState(query);

    const isSearching = debouncedQuery.length >= 3;

    /* Debounce the query to avoid making too many API calls while the user is typing */

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 1000);

        return () => clearTimeout(timer);
    }, [query]);

    /* Fetch media based on the debounced query and page number */

    useEffect(() => {

        async function getMedia() {

            if (debouncedQuery.length < 3) {
                setQueryMedia([])
                setLoading(false)
                return
            }

            setError("")
            setLoading(true)

            try {

                const result = await fetchMedia(mediaType, debouncedQuery, page);


                if (result.results.length === 0) {
                    setError("No tv shows were found");
                } else {
                    setError("");
                }

                setQueryMedia(result.results);
                setTotalPages(result.totalPages)
                setTotalResults(result.totalResults)
            } catch (err) {
                console.error(err);
                setError("Error during fetching tv shows");
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 300)
            }
        }

        getMedia();

    }, [debouncedQuery, page])

    /* Fetch trending, popular and top rated media on initial load */

    useEffect(() => {

        async function loadShowspage() {

            try {
                const [trending, topRated, popular] = await Promise.all([
                    fetchTrendingMedia(mediaType),
                    fetchTopRatedMedia(mediaType),
                    fetchPopularMedia(mediaType)
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

    return {
        queryMedia,
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
    }
}

export default useMediaBrowser;