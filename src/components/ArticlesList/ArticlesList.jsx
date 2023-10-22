import React from 'react';
import { Spin, Space } from 'antd';
import PropTypes from 'prop-types';

import './ArticlesList.css';
import ArticlePreview from '../ArticlePreview/ArticlePreview';

const ArticlesList = ({ articles, pageNumber, loggedIn, token }) => {
  const visibleArticles = [];
  if (articles.length) {
    for (let i = (pageNumber - 1) * 5; i < pageNumber * 5; i++) {
      visibleArticles.push(articles[i]);
    }
  }
  const articleList = visibleArticles.map((element) => {
    return <ArticlePreview key={element.slug} articleProps={element} loggedIn={loggedIn} token={token} />;
  });
  if (articles.length) {
    return <ul className="articles-list">{articleList}</ul>;
  }
  return (
    <Space size="middle">
      <Spin size="large" />
    </Space>
  );
};

ArticlesList.defaultProps = {
  token: '',
  loggedIn: false,
  articles: [],
  pageNumber: null,
};
ArticlesList.propTypes = {
  token: PropTypes.string,
  loggedIn: PropTypes.bool,
  articles: PropTypes.arrayOf(PropTypes.object),
  pageNumber: PropTypes.number,
};

export default ArticlesList;
