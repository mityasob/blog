import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import './SignUpPage.css';

const SignUpPage = ({ saveToken, logIn, loggedIn }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const nonCheckStatus = {
    display: isChecked ? 'none' : 'flex',
  };
  const checkStatus = {
    display: isChecked ? 'flex' : 'none',
  };
  const changeHandler = () => {
    setIsChecked(!isChecked);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <section className="articles-list-container">
      {(isSignUpSuccess || loggedIn) && <Navigate to="/" />}
      <div className="sign-up-container">
        <form
          className="authorization-form sign-up-form"
          onSubmit={handleSubmit((data, event) => {
            event.preventDefault();
            const requestOptions = {
              method: 'POST',
              headers: {
                accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
              },
              body: `{"user": {
                "username": "${data.username}",
                "email": "${data.email}",
                "password": "${data.password}"
              }}`,
            };
            fetch('https://blog.kata.academy/api/users', requestOptions)
              .then((res) => {
                return res.json();
              })
              .then((res) => {
                if (res.user) {
                  localStorage.setItem('token', res.user.token);
                  saveToken();
                  logIn();
                  setIsSignUpSuccess(true);
                }
                if (res.errors) {
                  setSignUpError(true);
                }
              });
          })}
        >
          <p className="form-header">Create new account</p>
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
              <p className="field-label">Password</p>
              <input
                {...register('password', {
                  required: true,
                  pattern: /[^\s]+/,
                  minLength: 6,
                  maxLength: 40,
                })}
                type="password"
                className="field-input"
                placeholder="Password"
              ></input>
              {errors.password && (
                <div className="input-error-message-container">
                  <div className="warning-input"></div>
                  <p className="input-error-message">Password length must be from 6 to 40 symbols</p>
                </div>
              )}
            </label>
            <label>
              <p className="field-label">Repeat Password</p>
              <input
                {...register('repeat', {
                  required: true,
                  validate: (value) => value === watch('password'),
                })}
                type="password"
                className="field-input"
                placeholder="Password"
              ></input>
              {errors.repeat && (
                <div className="input-error-message-container">
                  <div className="warning-input"></div>
                  <p className="input-error-message">Needs to match password</p>
                </div>
              )}
            </label>
          </div>
          <div className="lisence-agreement">
            <label>
              <div className="checkbox-container">
                <input
                  {...register('agreement', {
                    onChange: changeHandler,
                    required: true,
                  })}
                  type="checkbox"
                />
                <div className="checkbox-clone-non-checked" style={nonCheckStatus}></div>
                <div className="checkbox-clone-checked" style={checkStatus}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" fill="#1890FF" stroke="#1890FF" />
                    <path
                      d="M3.91308 7.03516H3.91326C3.99256 7.03525 4.07081 7.05331 4.14213 7.08798C4.21341 7.12262 4.27591 7.17295 4.32497 7.2352L3.91308 7.03516ZM3.91308 7.03516H3.09394C2.89031 7.03516 2.7766 7.26975 2.90232 7.4292L2.90237 7.42927L6.11214 11.4957L6.11218 11.4957C6.32247 11.7619 6.72568 11.7611 6.93667 11.4962L6.93708 11.4957L12.6597 4.24398C12.6598 4.24378 12.66 4.24358 12.6602 4.24338C12.7884 4.08295 12.6699 3.85 12.4689 3.85H11.6498C11.4894 3.85 11.3367 3.9235 11.2376 4.05044C11.2375 4.05055 11.2374 4.05066 11.2373 4.05077L6.52403 10.0216M3.91308 7.03516L6.52403 10.0216M6.52403 10.0216L4.32506 7.23531L6.52403 10.0216Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="0.3"
                    />
                  </svg>
                </div>
              </div>
              <div className="checkbox-description">
                <span>I agree to the processing of my personal information</span>
              </div>
            </label>
            {errors.agreement && (
              <div className="checkbox-error-message-container">
                <div className="checkbox-warning-input"></div>
                <p className="input-error-message">Agreement needs to be accepted</p>
              </div>
            )}
          </div>
          <div className="form-footer">
            {signUpError && (
              <div className="sign-up-error-container">
                <p className="sign-up-error-message">Error! Try to refresh page and create account again!</p>
              </div>
            )}
            <button type="submit" className="sign-up-submit">
              <span>Create</span>
            </button>
            <div className="sign-in-block">
              <p className="sign-in-hint">
                Already have an account?{' '}
                <Link to={'/sign-in'}>
                  <span className="link-style">Sign in</span>
                </Link>
                .
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

SignUpPage.defaultProps = {
  logIn: () => {},
  saveToken: () => {},
};
SignUpPage.propTypes = {
  logIn: PropTypes.func,
  saveToken: PropTypes.func,
};

export default SignUpPage;
