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
        <div className={`media-slider ${compact ? 'media-slider--compact' : ''}`}>

            <h2>{name}</h2>

            <div className="media-slider__wrapper">
                <button
                    className='media-slider__btn media-slider__btn--left'
                    onClick={() => scroll("left")}
                    aria-label={`Scroll ${name} left`}
                >
                    ‹
                </button>

                <div className="media-slider__track" ref={trackRef}>
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
                    className='media-slider__btn media-slider__btn--right'
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