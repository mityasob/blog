import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Pagination.css';

const Pagination = ({ articlesCount, pageNumber, switchPage, useLeftArrow, useRightArrow }) => {
  const pagesCount = Math.floor(articlesCount / 5);
  const isSelected = (liNumber) => {
    if (liNumber === pageNumber) {
      return 'page-selected';
    } else {
      return 'page-non-selected';
    }
  };
  const leftArrowIsActive = pageNumber > 1 ? '' : 'left-arrow-non-active';
  const rightArrowIsActive = pageNumber < Math.ceil(articlesCount / 5) ? '' : 'right-arrow-non-active';
  const pageNumbers = [];
  for (let i = 1; i <= pagesCount; i++) {
    pageNumbers.push(
      <li key={`page${i}`}>
        <Link to={`/${i}`}>
          <div className={`page-number ${isSelected(i)}`} onClick={switchPage}>
            {i}
          </div>
        </Link>
      </li>
    );
  }
  const pageNumberDecrease = (number) => {
    if (number > 1) {
      return number - 1;
    }
    return 1;
  };
  const pageNumberIncrease = (number) => {
    if (number < Math.ceil(articlesCount / 5)) {
      return number + 1;
    }
    return Math.ceil(articlesCount / 5);
  };

  return (
    <ul className="pagination">
      <li>
        <Link to={`/${pageNumberDecrease(pageNumber)}`}>
          <div className={`arrow arrow-left ${leftArrowIsActive}`} onClick={useLeftArrow}></div>
        </Link>
      </li>
      {pageNumbers}
      <li>
        <Link to={`/${pageNumberIncrease(pageNumber)}`}>
          <div className={`arrow arrow-right ${rightArrowIsActive}`} onClick={useRightArrow}></div>
        </Link>
      </li>
    </ul>
  );
};

Pagination.defaultProps = {
  pageNumber: null,
  articlesCount: null,
  switchPage: () => {},
  useLeftArrow: () => {},
  useRightArrow: () => {},
};
Pagination.PropTypes = {
  pageNumber: PropTypes.number,
  articlesCount: PropTypes.number,
  switchPage: PropTypes.func,
  useLeftArrow: PropTypes.func,
  useRightArrow: PropTypes.func,
};

export default Pagination;
