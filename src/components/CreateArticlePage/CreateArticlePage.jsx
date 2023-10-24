import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import './CreateArticlePage.css';
import { createArticle, getOwnArticle, updateArticle } from '../../api/api';

const CreateArticlePage = ({ token, loggedIn }) => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [createArticleSuccess, setCreateArticleSuccess] = useState(false);
  const [createArticleError, setCreateArticleError] = useState(false);
  const [editArticleSuccess, setEditArticleSuccess] = useState(false);
  const [editArticleError, setEditArticleError] = useState(false);
  const [tagList, setTaglist] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const isButtonDisabled = isButtonClicked;
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
    if (slug) {
      getOwnArticle(slug, setArticle, setTaglist);
    }
  }, [slug]);

  const spaceRemove = (event) => {
    if (event.target.value === ' ') {
      event.target.value = '';
    }
  };
  const addTag = (event) => {
    const tagArray = tagList.slice();
    const target = event.target.previousElementSibling.value;
    if (target && !tagArray.includes(target)) {
      tagArray.push(event.target.previousElementSibling.value);
    }
    event.target.previousElementSibling.value = '';
    setTaglist(tagArray);
  };
  const removeTag = (event) => {
    const element = event.target.previousElementSibling.innerText;
    const index = tagList.indexOf(element);
    const tagArray = [...tagList.slice(0, index), ...tagList.slice(index + 1)];
    setTaglist(tagArray);
  };
  const newTagArray = tagList.map((element) => {
    return (
      <li key={element} className="tags-list-element">
        <div className="field-input tag-input">{element}</div>
        {!slug && (
          <button type="button" className="tag-button delete-tag-button" onClick={removeTag}>
            Delete
          </button>
        )}
      </li>
    );
  });
  const articleTitle = !slug ? 'Create new article' : 'Edit article';

  return (
    <section className="articles-list-container">
      {!loggedIn && <Navigate to="/sign-in" />}
      {createArticleSuccess && <Navigate to="/" />}
      {editArticleSuccess && <Navigate to={`/articles/${slug}`} />}
      <div className="article-editor-page">
        <form
          className="create-article-form"
          onSubmit={handleSubmit((data, event) => {
            event.preventDefault();
            setIsButtonClicked(true);
            if (!slug) {
              createArticle(token, data, tagList, setCreateArticleSuccess, setCreateArticleError, setIsButtonClicked);
            } else {
              updateArticle(token, data, slug, setEditArticleSuccess, setEditArticleError, setIsButtonClicked);
            }
          })}
        >
          <h3>{articleTitle}</h3>
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
            {!slug && (
              <div className="add-tag-container">
                <input
                  {...register('tag', {
                    pattern: /[^\s]+/,
                  })}
                  type="text"
                  className="field-input tag-input"
                  placeholder="Tag"
                  onChange={spaceRemove}
                />
                <button type="button" className="tag-button add-tag-button" onClick={addTag}>
                  Add tag
                </button>
              </div>
            )}
            {errors.tag && (
              <div className="input-error-message-container">
                <div className="warning-input tag-warning-input"></div>
                <p className="input-error-message">Cannot contain only spaces</p>
              </div>
            )}
          </div>
          <div className="form-footer">
            {(createArticleError || editArticleError) && (
              <div className="sign-up-error-container">
                <p className="sign-up-error-message">Error! Try to refresh page and create article again!</p>
              </div>
            )}
            <button type="submit" className="sign-up-submit send-article-button" disabled={isButtonDisabled}>
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

CreateArticlePage.defaultProps = {
  token: '',
  loggedIn: false,
};
CreateArticlePage.propTypes = {
  token: PropTypes.string,
  loggedIn: PropTypes.bool,
};

export default CreateArticlePage;
