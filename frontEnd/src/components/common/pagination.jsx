import React from 'react';

const Pagination = ({ pageSize, currentPage, itemCount, paginate }) => {

    // itemCount comes from state.movies
    let pageSections = Math.ceil(itemCount / pageSize);
    let pagesArr = [];

    for (let i = pageSections; i > 0; i--) {
        pagesArr.unshift(i);
    };

    if (itemCount <= pageSize) return null;

    return (
        <ul className="pagination">
            {pagesArr.map(page =>
                <li
                    className={currentPage === page ? "active" : ''}
                    onClick={() => paginate(page)} key={page}>{page}
                </li>)}
        </ul>);
}

export default Pagination;