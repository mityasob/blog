import React from 'react';
import { Spin, Space } from 'antd';

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

export default ArticlesList;
