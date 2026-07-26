import React from 'react'
import { useTranslation } from '../hooks/useTranslation';

const Pagination = ({ page, setPage, totalPages }) => {

    const maxVisible = 5;

    // Calculate the start and end page numbers for the visible pagination buttons based on the current page and total pages

    const startPage = Math.max(
        1,
        Math.min(page - Math.floor(maxVisible / 2), totalPages - maxVisible + 1)
    );

    const endPage = Math.min(totalPages, startPage + maxVisible - 1);


    // Create an array of visible page numbers based on the calculated start and end pages

    const visiblePages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
    );

    const t = useTranslation();

    return (
        <div className='pagination'>
            <button className='pagination__nav-btn' onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
                {t.previous}
            </button>

            <div className='pagination__pages'>
                {visiblePages.map((item) => (
                    <button
                        key={item}
                        onClick={() => setPage(item)}
                        className={`pagination__page-btn${page === item ? " is-active" : ""}`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <button className='pagination__nav-btn' onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>
                {t.next}
            </button>
        </div>
    )
}

export default Pagination