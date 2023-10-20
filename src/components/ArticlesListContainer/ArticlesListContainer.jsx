import React from 'react';
import PropTypes from 'prop-types';

import './ArticlesListContainer.css';
import ArticlesList from '../ArticlesList';
import Pagination from '../Pagination/Pagination';

const ArticlesListContainer = ({
  articles,
  articlesCount,
  pageNumber,
  switchPage,
  useLeftArrow,
  useRightArrow,
  isError,
  loggedIn,
  token,
}) => {
  if (isError) {
    return (
      <section className="articles-list-container">
        <div className="error-container">
          <p className="error-message">Error! Try to refresh page!</p>
        </div>
      </section>
    );
  }
  return (
    <section className="articles-list-container">
      <ArticlesList articles={articles} pageNumber={pageNumber} loggedIn={loggedIn} token={token} />
      <Pagination
        articlesCount={articlesCount}
        pageNumber={pageNumber}
        switchPage={switchPage}
        useLeftArrow={useLeftArrow}
        useRightArrow={useRightArrow}
      />
    </section>
  );
};

ArticlesListContainer.defaultProps = {
  token: '',
  loggedIn: false,
  articles: [],
  pageNumber: null,
  articlesCount: null,
  switchPage: () => {},
  useLeftArrow: () => {},
  useRightArrow: () => {},
  isError: false,
};
ArticlesListContainer.PropTypes = {
  token: PropTypes.string,
  loggedIn: PropTypes.bool,
  articles: PropTypes.arrayOf(PropTypes.object),
  pageNumber: PropTypes.number,
  articlesCount: PropTypes.number,
  switchPage: PropTypes.func,
  useLeftArrow: PropTypes.func,
  useRightArrow: PropTypes.func,
  isError: PropTypes.bool,
};

export default ArticlesListContainer;
