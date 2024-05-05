import { deleteCard, addLike, removeLike } from "./api.js";
import { clickImageHandler } from "./index.js";

const cardTemplate = document.querySelector('#card-template').content;

function createCard(dataCard, myId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = dataCard.link;
  cardImage.alt = "Изображение памятного места" + dataCard.name;
  cardTitle.textContent = dataCard.name;

  const ownerId = dataCard.owner._id;
  const cardId = dataCard._id;

  if (myId === ownerId) {
    cardDeleteButton.addEventListener('click', () => {
          deleteCard(cardId)
            .then((res) => {
                cardElement.remove();
            })
            .catch((error) => {
                console.error('Ошибка при удалении карточки:', error);
            })
    });
  } else {
    cardDeleteButton.remove();
  }
 
  //лайки карточек
  const cardLikebutton = cardElement.querySelector('.card__like-button');
  const hasMyLike = dataCard.likes && Array.isArray(dataCard.likes) && dataCard.likes.some(element => element._id === myId);
  if (hasMyLike)
    cardLikebutton.classList.add('card__like-button_is-active');

  cardLikebutton.addEventListener('click', function() {
    if (cardLikebutton.classList.contains('card__like-button_is-active')) {
      removeLike(cardId)
        .then((counterLike) => {
          updateUI(counterLike); 
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      addLike(cardId)
        .then((counterLike) => {
          updateUI(counterLike, myId); 
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
  
  const counterElement = cardElement.querySelector('.counter__likes');

  // Функция для обновления интерфейса на основе обновленной карточки
  function updateUI(counterLike, myId) {
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    counterElement.textContent = counterLike;

    if (myId && counterLike > 0) {
        cardLikeButton.classList.add('card__like-button_is-active');
    } else {
        cardLikeButton.classList.remove('card__like-button_is-active');
    }
  
}
  
  //кол-во лайков с сервера
  counterElement.textContent = dataCard.likes && Array.isArray(dataCard.likes) ? dataCard.likes.length : 0;

  cardImage.addEventListener('click', function () {
    clickImageHandler(dataCard);
  });

  return cardElement;
};

export {createCard};
