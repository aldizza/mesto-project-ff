export {initialCards, createCard, deleteCard, likeHandler};

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const cardTemplate = document.querySelector('#card-template').content;

function createCard(dataCard, deleteCard, likeHandler, clickImageHandler) {
  const cloneCard = cardTemplate.querySelector('.places__item').cloneNode(true);

  cloneCard.querySelector('.card__title').textContent = dataCard.name;

  const imageCard = cloneCard.querySelector('.card__image');
  imageCard.src = dataCard.link;
  imageCard.alt = dataCard.name;

  const deleteButton = cloneCard.querySelector('.card__delete-button');
  const likeButton = cloneCard.querySelector('.card__like-button');

  deleteButton.addEventListener('click', function () {
      deleteCard(cloneCard);
  });
  

  likeButton.addEventListener('click', likeHandler);

  imageCard.addEventListener('click', ()=> {
      clickImageHandler(dataCard) });

  return cloneCard;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

const likeButtons = document.querySelectorAll('.card__like-button');

likeButtons.forEach(button => {
  button.addEventListener('click', likeHandler);
});

function likeHandler(evt) {
  const likeButton = evt.target; 

  if (likeButton.classList.contains('card__like-button_is-active')) {
      likeButton.classList.remove('card__like-button_is-active');
  } else {
      likeButton.classList.add('card__like-button_is-active');
  }
}




