import React, { useEffect, useState } from "react";
import "./LoginBlock.css";
import { Link } from "react-router-dom";

const LoginBlock = ({ token, loggedIn, logOut }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    if (localStorage.length) {
      fetch("https://blog.kata.academy/api/user", requestOptions)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.user) {
            setUserData(res.user);
          }
        });
    }
  }, [token]);

  if (loggedIn) {
    return (
      <div className='login-block'>
        <Link to='/new-article'>
          <button type='button' className='create-article-button'>
            Create article
          </button>
        </Link>
        <Link to='/edit-profile'>
          <div className='header-profile'>
            <div className='profile-name'>
              <h6>{userData?.username ?? "Username"}</h6>
            </div>
            <div className='profile-image'>
              <img
                src={
                  userData?.image ||
                  "https://static.productionready.io/images/smiley-cyrus.jpg"
                }
                alt='Author Profile'
                width={46}
                height={46}
              />
            </div>
          </div>
        </Link>
        <button type='button' className='log-out-button' onClick={logOut}>
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className='login-block'>
      <Link to={`/sign-in`}>
        <button className='sign-in'>
          <h6 className='login-text sign-in-text'>Sign In</h6>
        </button>
      </Link>
      <Link to={`/sign-up`}>
        <button className='sign-up'>
          <h6 className='login-text sign-up-text'>Sign Up</h6>
        </button>
      </Link>
    </div>
  );
};

export default LoginBlock;