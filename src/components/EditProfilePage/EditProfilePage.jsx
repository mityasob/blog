import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import './EditProfilePage.css';
import { getProfile, updateProfile } from '../../api/api';

const EditProfilePage = ({ token, saveToken, loggedIn }) => {
  const [isEditProfileSuccess, setIsEditProfileSuccess] = useState(false);
  const [editProfileError, setEditProfileError] = useState(false);
  const [currentUserIsLoad, setCurrentUserIsLoad] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const isButtonDisabled = isButtonClicked;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      username: currentUser?.username,
      email: currentUser?.email,
      avatar: currentUser?.image,
    },
  });

  useEffect(() => {
    getProfile(token, setCurrentUser, setCurrentUserIsLoad);
  }, [token, currentUserIsLoad]);

  return (
    <section className="articles-list-container">
      {!loggedIn && <Navigate to="/sign-in" />}
      {isEditProfileSuccess && <Navigate to="/" />}
      <div className="sign-up-container">
        <form
          className="authorization-form"
          onSubmit={handleSubmit((data, event) => {
            event.preventDefault();
            setIsButtonClicked(true);
            updateProfile(token, data, saveToken, setIsEditProfileSuccess, setEditProfileError, setIsButtonClicked);
          })}
        >
          <p className="form-header">Edit Profile</p>
          <div className="form-fields">
            <label>
              <p className="field-label">Username</p>
              <input
                {...register('username', {
                  required: true,
                  pattern: /[^\s]+/,
                  minLength: 3,
                  maxLength: 20,
                })}
                type="text"
                className="field-input"
                placeholder="Username"
              ></input>
              {errors.username && (
                <div className="input-error-message-container">
                  <div className="warning-input"></div>
                  <p className="input-error-message">Username length must be from 3 to 20 symbols</p>
                </div>
              )}
            </label>
            <label>
              <p className="field-label">Email</p>
              <input
                {...register('email', {
                  pattern: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
                  required: true,
                })}
                type="email"
                className="field-input"
                placeholder="Email adress"
              ></input>
              {errors.email && (
                <div className="input-error-message-container">
                  <div className="warning-input"></div>
                  <p className="input-error-message">Needs correct email address</p>
                </div>
              )}
            </label>
            <label>
              <p className="field-label">New password</p>
              <input
                {...register('password', {
                  pattern: /[^\s]+/,
                  minLength: 6,
                  maxLength: 40,
                })}
                type="password"
                className="field-input"
                placeholder="New password"
              ></input>
              {errors.password && (
                <div className="input-error-message-container">
                  <div className="warning-input"></div>
                  <p className="input-error-message">Password length must be from 6 to 40 symbols</p>
                </div>
              )}
            </label>
            <label>
              <p className="field-label">Avatar image (url)</p>
              <input
                {...register('avatar', {
                  pattern: /^(https?|ftp|file):\/\/[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]/,
                })}
                type="text"
                className="field-input"
                placeholder="Avatar image"
              ></input>
              {errors.avatar && (
                <div className="input-error-message-container">
                  <div className="warning-input"></div>
                  <p className="input-error-message">Needs correct url</p>
                </div>
              )}
            </label>
          </div>
          <div className="form-footer save-form-footer">
            {editProfileError && (
              <div className="sign-up-error-container">
                <p className="sign-up-error-message">Error! Try to refresh page and edit profile again!</p>
              </div>
            )}
            <button type="submit" className="sign-up-submit" disabled={isButtonDisabled}>
              <span>Save</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

EditProfilePage.defaultProps = {
  token: '',
  loggedIn: false,
  saveToken: () => {},
};
EditProfilePage.propTypes = {
  token: PropTypes.string,
  loggedIn: PropTypes.bool,
  saveToken: PropTypes.func,
};

export default EditProfilePage;
