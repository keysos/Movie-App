import React, { useState } from 'react'
import MediaCollection from '../components/MediaCollection'

const Favorites = () => {

    return (
        <>
            <MediaCollection 
                collectionType="favorites"
            />
        </>
    )
}

export default Favorites