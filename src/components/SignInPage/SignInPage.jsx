import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import './SignInPage.css';
import { loginUser } from '../../api/api';

const SignInPage = ({ saveToken, logIn, loggedIn }) => {
  const [isSignInSuccess, setIsSignInSuccess] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const isButtonDisabled = isButtonClicked;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <section className="articles-list-container">
      {(isSignInSuccess || loggedIn) && <Navigate to="/" />}
      <div className="sign-up-container">
        <form
          className="authorization-form"
          onSubmit={handleSubmit((data, event) => {
            event.preventDefault();
            setIsButtonClicked(true);
            loginUser(data, saveToken, logIn, setIsSignInSuccess, setSignInError, setIsButtonClicked);
          })}
        >
          <p className="form-header">Sign In</p>
          <div className="form-fields">
            <label>
              <p className="field-label">Email address</p>
              <input
                {...register('email', { required: true })}
                type="email"
                className="field-input"
                placeholder="Email adress"
              ></input>
              {errors.email && (
                <div className="input-error-message-container">
                  <div className="warning-input"></div>
                  <p className="input-error-message">Email address is required</p>
                </div>
              )}
            </label>
            <label>
              <p className="field-label">Password</p>
              <input
                {...register('password', {
                  required: true,
                })}
                type="password"
                className="field-input"
                placeholder="Password"
              ></input>
              {errors.password && (
                <div className="input-error-message-container">
                  <div className="warning-input"></div>
                  <p className="input-error-message">Wrong Password</p>
                </div>
              )}
            </label>
          </div>
          <div className="form-footer">
            {signInError && (
              <div className="sign-up-error-container">
                <p className="sign-up-error-message">Wrong email or password</p>
              </div>
            )}
            <button type="submit" className="sign-up-submit" disabled={isButtonDisabled}>
              <span>Login</span>
            </button>
            <div className="sign-in-block">
              <p className="sign-in-hint">
                Don&apos;t have an account?
                <Link to={'/sign-up'}>
                  <span className="link-style">Sign up</span>
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

SignInPage.defaultProps = {
  logIn: () => {},
  saveToken: () => {},
  loggedIn: false,
};
SignInPage.propTypes = {
  logIn: PropTypes.func,
  saveToken: PropTypes.func,
  loggedIn: PropTypes.bool,
};

export default SignInPage;
