import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './LoginBlock.css';
import { getProfile } from '../../api/api';

const LoginBlock = ({ token, loggedIn, logOut }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (loggedIn) {
      getProfile(token, setUserData);
    }
  }, [token]);

  if (loggedIn) {
    return (
      <div className="login-block">
        <Link to="/new-article">
          <button type="button" className="create-article-button">
            Create article
          </button>
        </Link>
        <Link to="/edit-profile">
          <div className="header-profile">
            <div className="profile-name">
              <h6>{userData?.username ?? 'Username'}</h6>
            </div>
            <div className="profile-image">
              <img
                src={userData?.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
                alt="Author Profile"
                width={46}
                height={46}
              />
            </div>
          </div>
        </Link>
        <button type="button" className="log-out-button" onClick={logOut}>
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className="login-block">
      <Link to={'/sign-in'}>
        <button className="sign-in">
          <h6 className="login-text sign-in-text">Sign In</h6>
        </button>
      </Link>
      <Link to={'/sign-up'}>
        <button className="sign-up">
          <h6 className="login-text sign-up-text">Sign Up</h6>
        </button>
      </Link>
    </div>
  );
};

LoginBlock.defaultProps = {
  token: '',
  loggedIn: false,
  logOut: () => {},
};
LoginBlock.propTypes = {
  token: PropTypes.string,
  loggedIn: PropTypes.bool,
  logOut: PropTypes.func,
};

export default LoginBlock;
