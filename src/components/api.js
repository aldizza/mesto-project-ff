const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-12',
    headers: {
      authorization: 'b6ab756a-d068-4063-b5bd-15deff8a109f',
      'Content-Type': 'application/json'
    }
  }

//проверка ответа от сервера после выполнения запроса
function checkRes(res) {
  if (res.ok) {
    return res.json();
  }
    return Promise.reject(`Ошибка: ${res.status}`);
}

//Загрузка информации о пользователе с сервера
function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    }).then((res) => checkRes(res));
}

// Загрузка карточек с сервера
function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    }).then((res) => checkRes(res));
}

//Редактирование профиля
function editProfileInfo(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => checkRes(res));
}

// Добавление новой карточки 
function addNewCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => checkRes(res));
}

function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    }).then((res) => checkRes(res));
}

function addLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: config.headers,
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json(); 
    })
    .then((updatedCard) => {
      return updatedCard.likes.length;
    });
  }

  function removeLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((updatedCard) => {
      return updatedCard.likes.length;
    });
  }

//Обновление аватара пользователя
function updateUserAvatar(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => checkRes(res));
}
  
export {getUserInfo, getInitialCards, editProfileInfo, addNewCard, deleteCard, addLike, removeLike, updateUserAvatar};