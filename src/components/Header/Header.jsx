import React from 'react';
import { Link } from 'react-router-dom';

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

export default Header;
