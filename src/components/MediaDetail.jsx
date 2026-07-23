import MediaSlider from './MediaSlider'
import MediaModal from './MediaModal'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMediaDetail, fetchMediaRecommendations, IMAGE_BASE_URL } from '../services/TMDBApi'

const MediaDetail = () => {

    // Get the media type and ID from the URL parameters

    const { mediaType, id } = useParams();

    const [mediaDetail, setMediaDetail] = useState([])
    const [mediaRecommendation, setMediaRecommendation] = useState([]);

    const [selectedMedia, setSelectedMedia] = useState(null)


    // useEffect to fetch media details and recommendations when the component mounts or when mediaType or id changes
    
    useEffect(() => {

        async function loadDetails() {

            try {
                const [detail, recommendations] = await Promise.all([
                    fetchMediaDetail(mediaType, id),
                    fetchMediaRecommendations(mediaType, id)
                ])

                setMediaDetail(detail);
                setMediaRecommendation(recommendations);
            } catch (err) {
                console.error(err);
            }
        }

        loadDetails();

    }, [mediaType, id])

    console.log(mediaDetail)

    return (
        <div className='media-details-page'>


            <div className="media-detail-overview">

                <div className='media-detail-header'>
                    <h2 className='media-detail-title'>{mediaDetail.title ?? mediaDetail.name}</h2>

                    <img
                        src={`${IMAGE_BASE_URL}${mediaDetail.poster_path}`}
                        alt={mediaDetail.title ?? mediaDetail.name}
                        className="media-detail-poster"
                    />

                    <p className='rating'>
                        {
                            convertRatingToStars(mediaDetail.vote_average?.toFixed(1) ?? 0)
                        }</p>
                </div>


                <div className="media-detail-info">

                    {mediaDetail.tagline && (
                        <p className="tagline">
                            "{mediaDetail.tagline}"
                        </p>
                    )}

                    <p className="overview">
                        {mediaDetail.overview}
                    </p>

                    <div className="media-meta">

                        <p>
                            <strong>Genres:</strong>{" "}
                            {mediaDetail.genres?.map((genre) => genre.name).join(", ")}
                        </p>

                        <p>
                            <strong>Release:</strong>{" "}
                            {mediaDetail.release_date ?? mediaDetail.first_air_date}
                        </p>

                        {mediaDetail.runtime && (
                            <p>
                                <strong>Runtime:</strong>{" "}
                                {Math.floor(mediaDetail.runtime / 60)}h {mediaDetail.runtime % 60}min
                            </p>
                        )}

                        {mediaDetail.number_of_seasons && (
                            <p>
                                <strong>Seasons:</strong>{" "}
                                {mediaDetail.number_of_seasons}
                            </p>
                        )}

                        {mediaDetail.number_of_episodes && (
                            <p>
                                <strong>Episodes:</strong>{" "}
                                {mediaDetail.number_of_episodes}
                            </p>
                        )}

                        <p>
                            <strong>Status:</strong>{" "}
                            {mediaDetail.status}
                        </p>

                        <p>
                            <strong>Popularity:</strong>{" "}
                            {mediaDetail.popularity?.toFixed(0)}
                        </p>

                        {mediaDetail.original_language && (
                            <p>
                                <strong>Language:</strong>{" "}
                                {mediaDetail.original_language.toUpperCase()}
                            </p>
                        )}

                        {mediaDetail.budget > 0 && (
                            <p>
                                <strong>Budget:</strong>{" "}
                                ${mediaDetail.budget.toLocaleString()}
                            </p>
                        )}

                        {mediaDetail.revenue > 0 && (
                            <p>
                                <strong>Revenue:</strong>{" "}
                                ${mediaDetail.revenue.toLocaleString()}
                            </p>
                        )}

                        {mediaDetail.created_by?.length > 0 && (
                            <p>
                                <strong>Created by:</strong>{" "}
                                {mediaDetail.created_by.map(person => person.name).join(", ")}
                            </p>
                        )}

                        {mediaDetail.credits?.crew?.find(
                            person => person.job === "Director"
                        ) && (
                                <p>
                                    <strong>Director:</strong>{" "}
                                    {
                                        mediaDetail.credits.crew.find(
                                            person => person.job === "Director"
                                        ).name
                                    }
                                </p>
                            )}

                        {mediaDetail.production_companies?.length > 0 && (
                            <p>
                                <strong>Production:</strong>{" "}
                                {mediaDetail.production_companies
                                    .map(company => company.name)
                                    .join(", ")}
                            </p>
                        )}

                        {mediaDetail.networks?.length > 0 && (
                            <p>
                                <strong>Networks:</strong>{" "}
                                {mediaDetail.networks
                                    .map(network => network.name)
                                    .join(", ")}
                            </p>
                        )}

                    </div>


                    <div className="cast">

                        <h3>Cast</h3>

                        {mediaDetail.credits?.cast
                            ?.slice(0, 8)
                            .map(actor => (
                                <span key={actor.id}>
                                    {actor.name}
                                </span>
                            ))
                        }

                    </div>
                </div>
            </div>


            <MediaSlider media={mediaRecommendation} name="Recommendations" onMediaClick={setSelectedMedia} />

            {selectedMedia && (
                <MediaModal
                    media={selectedMedia}
                    mediaType={mediaType}
                    onClose={() => setSelectedMedia(null)}
                />
            )}

        </div>
    )
}

export default MediaDetail