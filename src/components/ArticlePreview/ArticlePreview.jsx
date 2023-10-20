import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './ArticlePreview.css';
import Likes from '../Likes/Likes';

const ArticlePreview = ({ articleProps, loggedIn, token }) => {
  const getTags = () => {
    const newTagList = articleProps.tagList.map((element, index) => {
      return (
        <li key={`${element}${index}`}>
          <div className="tag">
            <span className="tag-text">{element}</span>
          </div>
        </li>
      );
    });
    return newTagList;
  };
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const getDate = () => {
    const date = new Date(articleProps.updatedAt);
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };
  return (
    <li>
      <div className="article">
        <div className="article-header">
          <Link to={`/articles/${articleProps.slug}`}>
            <h5 className="article-title">{articleProps.title}</h5>
          </Link>
          <Likes article={articleProps} loggedIn={loggedIn} token={token} />
        </div>
        <div className="tags-container">
          <ul className="tags-list">{getTags()}</ul>
        </div>
        <div className="article-description">
          <p>{articleProps.description}</p>
        </div>
        <div className="profile">
          <div className="profile-info">
            <div className="profile-name">
              <h6>{articleProps.author.username}</h6>
            </div>
            <div className="post-date">{getDate()}</div>
          </div>
          <div className="profile-image">
            <img src={articleProps.author.image} alt="Author Profile" width={46} height={46} />
          </div>
        </div>
      </div>
    </li>
  );
};

ArticlePreview.defaultProps = {
  token: '',
  loggedIn: false,
  articleProps: {},
};
ArticlePreview.PropTypes = {
  token: PropTypes.string,
  loggedIn: PropTypes.bool,
  articleProps: PropTypes.object,
};

export default ArticlePreview;
