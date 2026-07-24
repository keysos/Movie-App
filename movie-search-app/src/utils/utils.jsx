import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from "react-icons/ti";

export function convertRatingToStars(rating) {
    const stars = rating / 2;

    return Array.from({ length: 5 }, (_, i) => {
        if (stars >= i + 1) {
            return <TiStarFullOutline key={i} />;
        }

        if (stars >= i + 0.5) {
            return <TiStarHalfOutline key={i} />;
        }

        return <TiStarOutline key={i} />;
    });
}

export function formatRuntime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        return `${hours}h ${mins.toString().padStart(2, "0")}min`;
}
