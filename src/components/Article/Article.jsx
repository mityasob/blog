import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import './Article.css';
import Likes from '../Likes/Likes';

const Article = ({ token, loggedIn }) => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDeleteButtonClicked, setIsDeleteButtonClicked] = useState(false);
  const [isArticleDeleted, setIsArticleDeleted] = useState(false);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    fetch(`https://blog.kata.academy/api/articles/${slug}`, requestOptions)
      .then((res) => {
        const reader = res.json();
        return reader;
      })
      .then((res) => {
        setArticle(res);
      });
  }, [slug, token]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    if (loggedIn) {
      fetch('https://blog.kata.academy/api/user', requestOptions)
        .then((res) => {
          const reader = res.json();
          return reader;
        })
        .then((res) => {
          setCurrentUser(res.user);
        });
    }
  }, [loggedIn, token]);

  const getTags = () => {
    const newTagList = article.article.tagList.map((element) => {
      return (
        <li key={element}>
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
    const date = new Date(article.article.updatedAt);
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const deleteButtonHandler = () => {
    setIsDeleteButtonClicked(true);
  };
  const noButtonHandler = () => {
    setIsDeleteButtonClicked(false);
  };
  const yesButtonHandler = () => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    fetch(`https://blog.kata.academy/api/articles/${slug}`, requestOptions).then(() => {
      setIsArticleDeleted(true);
    });
  };

  return (
    <div className="article-container">
      {isArticleDeleted && <Navigate to="/" />}
      {article && (
        <div className="article article-page-article">
          <div className="article-header">
            <h5 className="article-title">{article.article.title}</h5>
            <Likes article={article.article} loggedIn={loggedIn} token={token} />
          </div>
          <div className="tags-container article-page-tags-container">
            <ul className="tags-list">{getTags()}</ul>
          </div>
          <div className="article-description">
            <p>{article.article.description}</p>
            {loggedIn && article.article.author.username === currentUser?.username && (
              <div className="edit-article-buttons-container">
                <button
                  type="button"
                  className="article-page-button delete-article-button"
                  onClick={deleteButtonHandler}
                >
                  Delete
                </button>
                {isDeleteButtonClicked && (
                  <div className="delete-article-modal-window">
                    <div className="modal-window-content">
                      <div className="modal-window-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M8 1C4.13438 1 1 4.13438 1 8C1 11.8656 4.13438 15 8 15C11.8656 15 15 11.8656 15 8C15 4.13438 11.8656 1 8 1ZM7.5 4.625C7.5 4.55625 7.55625 4.5 7.625 4.5H8.375C8.44375 4.5 8.5 4.55625 8.5 4.625V8.875C8.5 8.94375 8.44375 9 8.375 9H7.625C7.55625 9 7.5 8.94375 7.5 8.875V4.625ZM8 11.5C7.80374 11.496 7.61687 11.4152 7.47948 11.275C7.3421 11.1348 7.26515 10.9463 7.26515 10.75C7.26515 10.5537 7.3421 10.3652 7.47948 10.225C7.61687 10.0848 7.80374 10.004 8 10C8.19626 10.004 8.38313 10.0848 8.52052 10.225C8.6579 10.3652 8.73485 10.5537 8.73485 10.75C8.73485 10.9463 8.6579 11.1348 8.52052 11.275C8.38313 11.4152 8.19626 11.496 8 11.5Z"
                            fill="#FAAD14"
                          />
                        </svg>
                      </div>
                      <p className="modal-window-text">Are you sure to delete this article?</p>
                    </div>
                    <div className="modal-window-footer">
                      <button type="button" className="modal-window-no-button" onClick={noButtonHandler}>
                        No
                      </button>
                      <button type="button" className="modal-window-yes-button" onClick={yesButtonHandler}>
                        Yes
                      </button>
                    </div>
                  </div>
                )}
                <Link to={`/articles/${article.article.slug}/edit`}>
                  <button type="button" className="article-page-button edit-article-button">
                    Edit
                  </button>
                </Link>
              </div>
            )}
          </div>
          <article className="article-content">
            <Markdown remarkPlugins={[remarkGfm]}>{article.article.body}</Markdown>
          </article>
          <div className="profile article-page-profile">
            <div className="profile-info">
              <div className="profile-name">
                <h6>{article.article.author.username}</h6>
              </div>
              <div className="post-date">{getDate()}</div>
            </div>
            <div className="profile-image">
              <img src={article.article.author.image} alt="Author Profile" width={46} height={46} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Article;
