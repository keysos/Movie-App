import React, { useRef } from 'react'
import MovieCard from "./MovieCard";

const MovieSlider = ({ movies, name, onMovieClick, isSearching }) => {

    const trackRef = useRef(null)

    const scroll = (direction) => {

        const track = trackRef.current;

        if (!track) return;

        const amount = track.clientWidth * 0.8;

        track.scrollBy({ left: direction === "left" ? -amount : +amount })
    }

    return (
        <div className='movie-slider'>

            <h2>{name}</h2>

            <div className="slider-wrapper">
                <button
                    className='slider-btn slider-btn-left'
                    onClick={() => scroll("left")}
                    aria-label={`Scroll ${name} left`}
                >
                    ‹
                </button>

                <div className="slider-track" ref={trackRef}>
                    {
                        movies.map((movie) => (
                            <MovieCard
                                movie={movie}
                                key={movie.id}
                                onMovieClick={onMovieClick}
                            />
                        ))
                    }
                </div>

                <button
                    className='slider-btn slider-btn-right'
                    onClick={() => scroll("right")}
                    aria-label={`Scroll ${name} right`}
                >
                    ›
                </button>
            </div>
        </div>
    )
}

export default MovieSlider