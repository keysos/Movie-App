import React from 'react'

const Pagination = ({ page, setPage, totalPages }) => {

    const maxVisible = 5;

    const startPage = Math.max(
        1,
        Math.min(page - Math.floor(maxVisible / 2), totalPages - maxVisible + 1)
    );

    const endPage = Math.min(totalPages, startPage + maxVisible - 1);

    const visiblePages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
    );

    return (
        <div className='pagination'>
            <button className='page-button previous' onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
                Previous
            </button>

            <div className='pages-container'>
                {visiblePages.map((item) => (
                    <button
                        key={item}
                        onClick={() => setPage(item)}
                        className={page === item ? "active" : ""}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <button className='page-button next' onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>
                Next
            </button>
        </div>
    )
}

export default Pagination