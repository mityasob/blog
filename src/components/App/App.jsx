import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Header from '../Header';
import ArticlesListContainer from '../ArticlesListContainer';
import Article from '../Article/Article';
import SignUpPage from '../SignUpPage/SignUpPage';
import SignInPage from '../SignInPage/SignInPage';
import EditProfilePage from '../EditProfilePage';
import CreateArticlePage from '../CreateArticlePage/CreateArticlePage';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loggedIn, setLoggedIn] = useState(Boolean(token));
  const [list, setList] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [isError, setIsError] = useState(false);
  const getArticlesList = (articlesArray) => {
    setList(articlesArray);
  };
  const getArticlesCount = (articlesArrayLength) => {
    setArticlesCount(articlesArrayLength);
  };
  const articlesListReset = () => {
    setList([]);
    setArticlesCount(0);
  };
  const articlesLoadError = () => {
    setIsError(true);
  };
  const switchPage = (chosenPage) => {
    setPageNumber(Number(chosenPage.target.innerText));
  };
  const useLeftArrow = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  const useRightArrow = () => {
    if (pageNumber < Math.ceil(articlesCount / 5)) {
      setPageNumber(pageNumber + 1);
    }
  };
  const logIn = () => {
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.clear();
    setToken(localStorage.getItem('token'));
    setLoggedIn(false);
  };
  const saveToken = () => {
    setToken(localStorage.getItem('token'));
  };

  return (
    <section className="articles-list-page">
      <Header token={token} loggedIn={loggedIn} logOut={logOut} />
      <Routes>
        <Route
          path="/articles?"
          element={
            <ArticlesListContainer
              articles={list}
              articlesCount={articlesCount}
              pageNumber={pageNumber}
              switchPage={switchPage}
              useLeftArrow={useLeftArrow}
              useRightArrow={useRightArrow}
              isError={isError}
              loggedIn={loggedIn}
              token={token}
              getArticlesList={getArticlesList}
              getArticlesCount={getArticlesCount}
              articlesLoadError={articlesLoadError}
              articlesListReset={articlesListReset}
            />
          }
        />
        <Route
          path={`/${String(pageNumber)}`}
          element={
            <ArticlesListContainer
              articles={list}
              articlesCount={articlesCount}
              pageNumber={pageNumber}
              switchPage={switchPage}
              useLeftArrow={useLeftArrow}
              useRightArrow={useRightArrow}
              isError={isError}
              loggedIn={loggedIn}
              token={token}
              getArticlesList={getArticlesList}
              getArticlesCount={getArticlesCount}
              articlesLoadError={articlesLoadError}
              articlesListReset={articlesListReset}
            />
          }
        />
        <Route path="/articles/:slug" element={<Article token={token} loggedIn={loggedIn} />} />
        <Route path="/sign-up" element={<SignUpPage saveToken={saveToken} logIn={logIn} loggedIn={loggedIn} />} />
        <Route path="/sign-in" element={<SignInPage saveToken={saveToken} logIn={logIn} loggedIn={loggedIn} />} />
        <Route
          path="/edit-profile"
          element={<EditProfilePage token={token} saveToken={saveToken} loggedIn={loggedIn} />}
        />
        <Route path="/new-article" element={<CreateArticlePage token={token} loggedIn={loggedIn} />} />
        <Route path="/articles/:slug/edit" element={<CreateArticlePage token={token} loggedIn={loggedIn} />} />
      </Routes>
    </section>
  );
};

export default App;
