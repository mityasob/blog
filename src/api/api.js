export function getArticle(token, slug, cb) {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  fetch(`https://blog.kata.academy/api/articles/${slug}`, requestOptions)
    .then((res) => {
      const reader = res.json();
      return reader;
    })
    .then((res) => {
      cb(res);
    });
}

export function getCurrentUser(token, loggedIn, cb) {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  if (loggedIn) {
    fetch('https://blog.kata.academy/api/user', requestOptions)
      .then((res) => {
        const reader = res.json();
        return reader;
      })
      .then((res) => {
        cb(res.user);
      });
  }
}

export function deleteArticle(token, slug, isArticleDeleted, isButtonClicked) {
  isButtonClicked(true);
  const requestOptions = {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  fetch(`https://blog.kata.academy/api/articles/${slug}`, requestOptions).then(() => {
    isArticleDeleted(true);
  });
}

export function getArticlesArray(token, getArticles, getCount, isError, resetArticles) {
  const requestOptions = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  fetch('https://blog.kata.academy/api/articles', requestOptions)
    .then((res) => {
      const reader = res.json();
      return reader;
    })
    .then((res) => {
      getArticles(res.articles);
      getCount(res.articles.length);
    })
    .catch(() => {
      isError(true);
    });
  return resetArticles();
}

export function createArticle(token, data, tagList, isSuccess, isError, isButtonClicked) {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: `{"article": {
      "title": "${data.title}",
      "description": "${data.description}",
      "body": "${data.text}",
      "tagList": [
        "${tagList.join('", "')}"
      ]
    }}`,
  };
  fetch('https://blog.kata.academy/api/articles', requestOptions)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.article) {
        isSuccess(true);
      } else {
        isError(true);
        isButtonClicked(false);
      }
    });
}

export function getOwnArticle(slug, setArticle, setTaglist) {
  fetch(`https://blog.kata.academy/api/articles/${slug}`)
    .then((res) => {
      const reader = res.json();
      return reader;
    })
    .then((res) => {
      setArticle(res.article);
      setTaglist(res.article.tagList);
    });
}

export function updateArticle(token, data, slug, isSuccess, isError, isButtonClicked) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: `{
      "article": {
        "title": "${data.title}",
        "description": "${data.description}",
        "body": "${data.text}"
      }
    }`,
  };
  fetch(`https://blog.kata.academy/api/articles/${slug}`, requestOptions)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.article) {
        isSuccess(true);
      }
      if (res.errors) {
        isError(true);
        isButtonClicked(false);
      }
    });
}

export function getProfile(token, currentUser, userIsLoad = null) {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  fetch('https://blog.kata.academy/api/user', requestOptions)
    .then((res) => {
      const reader = res.json();
      return reader;
    })
    .then((res) => {
      if (userIsLoad) {
        userIsLoad(true);
      }
      currentUser(res.user);
    });
}

export function updateProfile(token, data, saveToken, isUpdateSuccess, isUpdateError, isButtonClicked) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: `{
      "user": {
        "email": "${data.email}",
        "username": "${data.username}",
        "bio": "",
        "image": "${data.avatar}"
      }
  }`,
  };
  fetch('https://blog.kata.academy/api/user', requestOptions)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.user) {
        localStorage.setItem('token', res.user.token);
        saveToken();
        isUpdateSuccess(true);
      }
      if (res.errors) {
        isUpdateError(true);
        isButtonClicked(false);
      }
    });
}

export function updateLikes(isLiked, token, article, changeLikes, changeCount, isError) {
  const requestMethod = isLiked ? 'DELETE' : 'POST';
  const requestOptions = {
    method: requestMethod,
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  fetch(`https://blog.kata.academy/api/articles/${article.slug}/favorite`, requestOptions)
    .then((res) => {
      const reader = res.json();
      return reader;
    })
    .then((res) => {
      if (res.article) {
        changeLikes(!isLiked);
        changeCount(res.article.favoritesCount);
      }
      if (res.errors) {
        isError(true);
      }
    });
}

export function loginUser(data, saveToken, logIn, isLoginSuccess, isLoginError, isButtonClicked) {
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
        isLoginSuccess(true);
      }
      if (res.errors) {
        isLoginError(true);
        isButtonClicked(false);
      }
    });
}

export function createUser(data, saveToken, logIn, isCreateSuccess, isCreateError, isButtonClicked) {
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
        isCreateSuccess(true);
      }
      if (res.errors) {
        isCreateError(true);
        isButtonClicked(false);
      }
    });
}
