import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Header.css';
import LoginBlock from '../LoginBlock/LoginBlock';

const Header = ({ token, loggedIn, logOut }) => {
  return (
    <header className="header">
      <div className="header-text">
        <Link to={'/'}>
          <h1 className="header-title">Realworld Blog</h1>
        </Link>
      </div>
      <LoginBlock token={token} loggedIn={loggedIn} logOut={logOut} />
    </header>
  );
};

Header.defaultProps = {
  token: '',
  loggedIn: false,
  logOut: () => {},
};
Header.propTypes = {
  token: PropTypes.string,
  loggedIn: PropTypes.bool,
  logOut: PropTypes.func,
};

export default Header;
