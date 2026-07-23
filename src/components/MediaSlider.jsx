import React, { useRef } from 'react'
import MediaCard from "./MediaCard";

const MediaSlider = ({ media, name, onMediaClick, compact = false }) => {

    const trackRef = useRef(null)

    const scroll = (direction) => {

        const track = trackRef.current;

        if (!track) return;

        const amount = track.clientWidth * 0.8;

        track.scrollBy({ left: direction === "left" ? -amount : +amount })
    }

    return (
        <div className={`movie-slider ${compact ? 'movie-slider--compact' : ''}`}>

            <h2>{name}</h2>

            <div className="movie-slider__wrapper">
                <button
                    className='movie-slider__btn movie-slider__btn--left'
                    onClick={() => scroll("left")}
                    aria-label={`Scroll ${name} left`}
                >
                    ‹
                </button>

                <div className="movie-slider__track" ref={trackRef}>
                    {
                        media.map((item) => (
                            <MediaCard
                                media={item}
                                key={item.id}
                                onMediaClick={onMediaClick}
                            />
                        ))
                    }
                </div>

                <button
                    className='movie-slider__btn movie-slider__btn--right'
                    onClick={() => scroll("right")}
                    aria-label={`Scroll ${name} right`}
                >
                    ›
                </button>
            </div>
        </div>
    )
}

export default MediaSlider