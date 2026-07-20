import React, { useEffect, useState } from 'react'

import SearchBar from '../components/SearchBar'
import MovieList from '../components/MovieList'
import MovieModal from '../components/MovieModal'
import MovieSlider from '../components/MovieSlider'

import { fetchMovies, fetchNowPlayingMovies, fetchTopRatedMovies, fetchUpcomingMovies, fetchTrendingMovies } from '../services/movieApi'

const Home = () => {

    const [query, setQuery] = useState("");
    const [queryMovies, setQueryMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);

    const isSearching = query.length >= 3;

    useEffect(() => {

        async function getMovies() {

            if (query.length < 3) {
                setQueryMovies([]);
                setLoading(false);
                return;
            }

            setLoading(true);

            try {
                const result = await fetchMovies(query);

                if (!result) {
                    setError("Error during fetching movies")
                }

                setError("")

                if (result.length === 0 && query.length >= 1) setError("No movies were found");

                setQueryMovies(result);
            } catch (err) {
                console.error(err);
                setError("Error during fetching movies");
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 300)
            }
        }

        const timeout = setTimeout(() => {
            getMovies();
        }, 300);

        return () => clearTimeout(timeout);

    }, [query])

    useEffect(() => {

        try {
            async function loadHomepageMovies() {

                const [trending, topRated, nowPlaying, upcoming] = await Promise.all([
                    fetchTrendingMovies(),
                    fetchTopRatedMovies(),
                    fetchNowPlayingMovies(),
                    fetchUpcomingMovies(),
                ]);

                setTrending(trending);
                setTopRated(topRated);
                setNowPlaying(nowPlaying);
                setUpcoming(upcoming)
            }

            loadHomepageMovies();
        } catch (err) {
            console.error(err);
        }


    }, [])

    return (
        <div>
            <h1 className='title'>Movie Search</h1>

            <SearchBar query={query} setQuery={setQuery} placeholder="Search a movie..." />

            <div aria-live="polite">
                {loading && <p className='loading'>Loading...</p>}

                {error !== "" && <p className='error'>{error}</p>}

                {(!loading && queryMovies.length > 0) && <p className='result-count'>Found {queryMovies.length} result(s)</p>}
            </div>
            
            <MovieList
                movies={queryMovies}
                onMovieClick={setSelectedMovie}
                isSearching={isSearching}
            />

            {!isSearching && (
                <>
                    <MovieSlider
                        movies={trending}
                        onMovieClick={setSelectedMovie}
                        isSearching={isSearching}
                        name="Trending"
                    />

                    <MovieSlider
                        movies={topRated}
                        onMovieClick={setSelectedMovie}
                        isSearching={isSearching}
                        name="Top Rated"
                    />

                    <MovieSlider
                        movies={upcoming}
                        onMovieClick={setSelectedMovie}
                        isSearching={isSearching}
                        name="Upcoming"
                    />

                    <MovieSlider
                        movies={nowPlaying}
                        onMovieClick={setSelectedMovie}
                        isSearching={isSearching}
                        name="Now Playing"
                    />
                </>
            )}

            {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
        </div>
    )
}

export default Home
