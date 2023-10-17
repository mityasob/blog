import React from 'react';
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

export default ArticlesListContainer;
