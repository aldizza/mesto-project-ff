import {initialCards, createCard, deleteCard, likeHandler} from './cards.js';
import {openModal, closeModal} from './modal.js';

const placesList = document.querySelector('.places__list');

initialCards.forEach(function(dataCard) {
    const cardElement = createCard(dataCard, deleteCard, likeHandler, clickImageHandler);
     placesList.append(cardElement);
  });

//Попапы
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileAddbutton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

profileEditButton.addEventListener('click', () => {
    addEditProfile();
    openModal(popupTypeEdit);
    popupTypeEdit.classList.add('popup_is-animated');
});

profileAddbutton.addEventListener('click', () => {
    openModal(popupTypeNewCard);
    popupTypeNewCard.classList.add('popup_is-animated');
});


// Закрытие попапа
document.addEventListener('click', closeButtons);
document.addEventListener('click', overlayClick);

function closeButtons (evt) {
    const target = evt.target;
    if (target.classList.contains('popup__close')) {
        closeModal(target.closest('.popup'));
    }
}

//Закрытие попапа кликом на оверлей  
function overlayClick(evt) {
    const target = evt.target;
    if (target.classList.contains('popup_is-opened')) {
        closeModal(target);
    }
}

//  Редактирование профиля
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_description');
const formEditProfile = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function addEditProfile() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

function handleFormSubmit(evt) {
    evt.preventDefault(); 
      
    const jobValue = jobInput.value;
    const nameValue = nameInput.value;
    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;
    closeModal(formEditProfile.closest('.popup'));
}

popupTypeEdit.addEventListener('submit', handleFormSubmit);

const buttonSave = document.querySelector('.popup__button');

buttonSave.addEventListener('click', function(evt) {
    const jobValue = jobInput.value; 
    const nameValue = nameInput.value;

    if (!jobValue || !nameValue) { 
        return;
    }
});

 // Добавление карточки
const addNewCard = document.forms['new-place']; // получаем форму
const cardNameInput = addNewCard.querySelector('.popup__input_type_card-name');
const urlInput = addNewCard.querySelector('.popup__input_type_url');
const formNewPlace = document.forms['new-place'];
const cardsContainer = document.querySelector('.places__list');

function submitFormCard(evt) {
    evt.preventDefault();

    const placeName = cardNameInput.value;
    const imageUrl = urlInput.value;

    const dataCard = {
        name: placeName,
        link: imageUrl
    };

    if (imageUrl) { // Проверяем, что URL не пустой
        const newCard = createCard(dataCard, deleteCard, likeHandler, clickImageHandler);
        cardsContainer.prepend(newCard);

        cardNameInput.value = '';
        urlInput.value  = '';

        closeModal(formNewPlace.closest('.popup'));
    }
}

addNewCard.addEventListener('submit', submitFormCard);

// Открытие попапа с картинкой
const popupImg = document.querySelector('.popup_type_image');
const modalImage = popupImg.querySelector('.popup__image');
const caption = popupImg.querySelector('.popup__caption');
const cardImage = popupImg.querySelector('.card__image');

function openModalImg(imageUrl, imageAlt) {
    modalImage.src = imageUrl;
    modalImage.alt = imageAlt;
    caption.textContent = imageAlt;
    openModal(popupImg);
    popupImg.classList.add('popup_is-animated')
}

cardImage.addEventListener('click', () => {
    clickImageHandler(dataCard); 
    openModal(popupImg);
});

function clickImageHandler(dataCard) {
    const imageUrl = dataCard.link;
    const imageAlt = dataCard.name;
    openModalImg(imageUrl, imageAlt);
}






