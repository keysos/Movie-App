import React, { memo } from 'react'
import MediaCard from './MediaCard';

const MediaList = ({ media, onMediaClick, onRemoveFavorite}) => {

    return (
        <div className='movie-list'>
            {
                media.map((item) => (
                    <MediaCard 
                        key={item.id} 
                        media={item} 
                        onMediaClick={onMediaClick} 
                        onRemoveFavorite={onRemoveFavorite}
                    />
                ))
            }
        </div>
    );
}

export default memo(MediaList)