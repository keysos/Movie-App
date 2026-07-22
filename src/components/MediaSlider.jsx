import React, { useRef } from 'react'
import MediaCard from "./MediaCard";

const MediaSlider = ({ media, name, onMediaClick }) => {

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

export default MediaSlider