import MediaSlider from './MediaSlider'
import MediaModal from './MediaModal'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMediaDetail, fetchMediaRecommendations, IMAGE_BASE_URL } from '../services/TMDBApi'
import { convertRatingToStars } from '../utils/utils'
import { useLanguage } from '../context/LanguageContext'
import { useTranslation } from '../hooks/useTranslation'

const MediaDetail = () => {

    const { mediaType, id } = useParams();

    const { language } = useLanguage();
    const t = useTranslation();

    const [mediaDetail, setMediaDetail] = useState([])
    const [mediaRecommendation, setMediaRecommendation] = useState([]);

    const [selectedMedia, setSelectedMedia] = useState(null)


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [mediaType, id]);


    useEffect(() => {

        async function loadDetails() {

            try {
                const [detail, recommendations] = await Promise.all([
                    fetchMediaDetail(mediaType, id, language),
                    fetchMediaRecommendations(mediaType, id, language)
                ])

                setMediaDetail(detail);
                setMediaRecommendation(recommendations);

            } catch (err) {
                console.error(err);
            }
        }

        loadDetails();

    }, [mediaType, id, language])


    return (
        <div className='media-detail'>


            <div className="media-detail__overview-row">


                <div className='media-detail__header'>

                    <h2 className='media-detail__title'>
                        {mediaDetail.title ?? mediaDetail.name}
                    </h2>


                    <img
                        src={`${IMAGE_BASE_URL}${mediaDetail.poster_path}`}
                        alt={mediaDetail.title ?? mediaDetail.name}
                        className="media-detail__poster"
                        decoding="async"
                        width={334}
                        height={500}
                    />


                    <p className='media-detail__rating'>
                        {convertRatingToStars(
                            mediaDetail.vote_average?.toFixed(1) ?? 0
                        )}
                    </p>

                </div>



                <div className="media-detail-info">


                    {mediaDetail.tagline && (
                        <p className="media-detail__tagline">
                            "{mediaDetail.tagline}"
                        </p>
                    )}


                    <p className="media-detail__overview-text">
                        {mediaDetail.overview}
                    </p>



                    <div className="media-detail__meta">


                        <p>
                            <strong>{t.genres}:</strong>{" "}
                            {mediaDetail.genres
                                ?.map((genre) => genre.name)
                                .join(", ")}
                        </p>



                        <p>
                            <strong>{t.release}:</strong>{" "}
                            {mediaDetail.release_date ?? mediaDetail.first_air_date}
                        </p>



                        {mediaDetail.runtime && (
                            <p>
                                <strong>{t.runtime}:</strong>{" "}
                                {Math.floor(mediaDetail.runtime / 60)}h{" "}
                                {mediaDetail.runtime % 60}min
                            </p>
                        )}



                        {mediaDetail.number_of_seasons && (
                            <p>
                                <strong>{t.seasons}:</strong>{" "}
                                {mediaDetail.number_of_seasons}
                            </p>
                        )}



                        {mediaDetail.number_of_episodes && (
                            <p>
                                <strong>{t.episodes}:</strong>{" "}
                                {mediaDetail.number_of_episodes}
                            </p>
                        )}



                        <p>
                            <strong>{t.status}:</strong>{" "}
                            {mediaDetail.status}
                        </p>



                        <p>
                            <strong>{t.popularity}:</strong>{" "}
                            {mediaDetail.popularity?.toFixed(0)}
                        </p>



                        {mediaDetail.original_language && (
                            <p>
                                <strong>{t.language}:</strong>{" "}
                                {mediaDetail.original_language.toUpperCase()}
                            </p>
                        )}



                        {mediaDetail.budget > 0 && (
                            <p>
                                <strong>{t.budget}:</strong>{" "}
                                ${mediaDetail.budget.toLocaleString()}
                            </p>
                        )}



                        {mediaDetail.revenue > 0 && (
                            <p>
                                <strong>{t.revenue}:</strong>{" "}
                                ${mediaDetail.revenue.toLocaleString()}
                            </p>
                        )}



                        {mediaDetail.created_by?.length > 0 && (
                            <p>
                                <strong>{t.creator}:</strong>{" "}
                                {mediaDetail.created_by
                                    .map(person => person.name)
                                    .join(", ")}
                            </p>
                        )}



                        {mediaDetail.credits?.crew?.find(
                            person => person.job === "Director"
                        ) && (
                            <p>
                                <strong>{t.director}:</strong>{" "}
                                {
                                    mediaDetail.credits.crew.find(
                                        person => person.job === "Director"
                                    ).name
                                }
                            </p>
                        )}



                        {mediaDetail.production_companies?.length > 0 && (
                            <p>
                                <strong>{t.production}:</strong>{" "}
                                {mediaDetail.production_companies
                                    .map(company => company.name)
                                    .join(", ")}
                            </p>
                        )}



                        {mediaDetail.networks?.length > 0 && (
                            <p>
                                <strong>{t.networks}:</strong>{" "}
                                {mediaDetail.networks
                                    .map(network => network.name)
                                    .join(", ")}
                            </p>
                        )}


                    </div>



                    <div className="media-detail__cast">


                        <h3>{t.cast}</h3>


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



            <MediaSlider
                media={mediaRecommendation}
                name={t.recommendations ?? "Recommendations"}
                onMediaClick={setSelectedMedia}
                compact
            />



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