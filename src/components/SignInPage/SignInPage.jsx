import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './SignInPage.css';

const SignInPage = ({ saveToken, logIn }) => {
  const [isSignInSuccess, setIsSignInSuccess] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <section className="articles-list-container">
      {isSignInSuccess && <Navigate to="/" />}
      <div className="sign-up-container">
        <form
          className="authorization-form"
          onSubmit={handleSubmit((data, event) => {
            event.preventDefault();
            const requestOptions = {
              method: 'POST',
              headers: {
                accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
              },
              body: `{"user": {
                "email": "${data.email}",
                "password": "${data.password}"
              }}`,
            };
            fetch('https://blog.kata.academy/api/users/login', requestOptions)
              .then((res) => {
                return res.json();
              })
              .then((res) => {
                if (res.user) {
                  localStorage.setItem('token', res.user.token);
                  saveToken();
                  logIn();
                  setIsSignInSuccess(true);
                }
                if (res.errors) {
                  setSignInError(true);
                }
              });
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
                  <p className="input-error-message">Password is required</p>
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
            <button type="submit" className="sign-up-submit">
              <span>Login</span>
            </button>
            <div className="sign-in-block">
              <p className="sign-in-hint">
                Don't have an account?{' '}
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

export default SignInPage;
