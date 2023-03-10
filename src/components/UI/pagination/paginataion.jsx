import React from 'react';
import { getPagesArray } from '../../../utils/pages';
const Paginataion = ({totalPages, page, changePage}) => {
    let pagesArray = getPagesArray(totalPages)
    return (
        <div className="page__wrapper">
        {pagesArray.map(p =>
          <span
          onClick={() => changePage(p)}
          key={p}
          className={page === p ?
             'page page__curent' 
             : 'page'}>
              {p}
              </span>
        )}
        </div>
    );
}

export default Paginataion;
