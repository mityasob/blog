import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import './EditArticlePage.css';

const EditArticlePage = ({ token, loggedIn }) => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [tagList, setTaglist] = useState([]);
  const [editArticleSuccess, setEditArticleSuccess] = useState(false);
  const [editArticleError, setEditArticleError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      title: article?.title,
      description: article?.description,
      text: article?.body,
    },
  });

  useEffect(() => {
    fetch(`https://blog.kata.academy/api/articles/${slug}`)
      .then((res) => {
        const reader = res.json();
        return reader;
      })
      .then((res) => {
        setArticle(res.article);
        setTaglist(res.article.tagList);
      });
  }, [slug]);

  const newTagArray = tagList?.map((element) => {
    return (
      <li key={element} className="tags-list-element">
        <div className="field-input tag-input">{element}</div>
      </li>
    );
  });

  return (
    <section className="articles-list-container">
      {!loggedIn && <Navigate to="/sign-in" />}
      {editArticleSuccess && <Navigate to={`/articles/${slug}`} />}
      <div className="article-editor-page">
        <form
          className="create-article-form"
          onSubmit={handleSubmit((data, event) => {
            event.preventDefault();
            const requestOptions = {
              method: 'PUT',
              headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json;charset=utf-8',
              },
              body: `{
              "article": {
                "title": "${data.title}",
                "description": "${data.description}",
                "body": "${data.text}"
              }
          }`,
            };
            fetch(`https://blog.kata.academy/api/articles/${slug}`, requestOptions)
              .then((res) => {
                return res.json();
              })
              .then((res) => {
                if (res.article) {
                  setEditArticleSuccess(true);
                }
                if (res.errors) {
                  setEditArticleError(true);
                }
              });
          })}
        >
          <h3>Edit article</h3>
          <label>
            <p className="create-article-field-label">Title</p>
            <input
              {...register('title', {
                required: true,
                maxLength: 60,
                pattern: /[^\s]+/,
              })}
              type="text"
              className="field-input"
              placeholder="Title"
            />
            {errors.title && (
              <div className="input-error-message-container">
                <div className="warning-input"></div>
                <p className="input-error-message">Title is required</p>
              </div>
            )}
          </label>
          <label>
            <p className="create-article-field-label">Short description</p>
            <input
              {...register('description', {
                required: true,
                pattern: /[^\s]+/,
              })}
              type="text"
              className="field-input"
              placeholder="Short description"
            />
            {errors.description && (
              <div className="input-error-message-container">
                <div className="warning-input"></div>
                <p className="input-error-message">Short description is required</p>
              </div>
            )}
          </label>
          <label>
            <p className="create-article-field-label">Text</p>
            <textarea
              {...register('text', {
                required: true,
                pattern: /[^\s]+/,
              })}
              type="textarea"
              className="field-input textarea-input"
              placeholder="Text"
              rows="7"
            ></textarea>
            {errors.text && (
              <div className="input-error-message-container">
                <div className="warning-input textarea-warning-input"></div>
                <p className="input-error-message">Text is required</p>
              </div>
            )}
          </label>
          <div className="create-article-form-tags-container">
            <p className="create-article-field-label">Tags</p>
            <ul className="form-tags-list">{newTagArray}</ul>
          </div>
          <div className="form-footer">
            {editArticleError && (
              <div className="sign-up-error-container">
                <p className="sign-up-error-message">Error! Try to refresh page and create article again!</p>
              </div>
            )}
            <button type="submit" className="sign-up-submit send-article-button">
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

EditArticlePage.defaultProps = {
  token: '',
  loggedIn: false,
};
EditArticlePage.propTypes = {
  token: PropTypes.string,
  loggedIn: PropTypes.bool,
};

export default EditArticlePage;
