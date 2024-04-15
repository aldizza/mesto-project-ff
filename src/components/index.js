import {initialCards} from './cards.js';
import {createCard, deleteCard, likeHandler} from './card.js';
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
    fillInEditProfileFormInputs();
    openModal(popupTypeEdit);
});

profileAddbutton.addEventListener('click', () => {
    openModal(popupTypeNewCard);
    formAddCard.reset();
});

//  Редактирование профиля
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_description');
const formEditProfile = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function fillInEditProfileFormInputs() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

const editProfilePopup = document.querySelector('.popup_type_edit');

function submitEditProfileForm(evt) {
    evt.preventDefault(); 
    const jobValue = jobInput.value;
    const nameValue = nameInput.value;
    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;
    closeModal(editProfilePopup);
}

formEditProfile.addEventListener('submit', submitEditProfileForm);

 // Добавление карточки
const formAddCard = document.forms['new-place']; // получаем форму
const cardNameInput = formAddCard.querySelector('.popup__input_type_card-name');
const urlInput = formAddCard.querySelector('.popup__input_type_url');
const cardsContainer = document.querySelector('.places__list');

function submitFormCard(evt) {
    evt.preventDefault();

    const placeName = cardNameInput.value;
    const imageUrl = urlInput.value;
    const dataCard = {
        name: placeName,
        link: imageUrl
    };
    if (imageUrl) {
        const newCard = createCard(dataCard, deleteCard, likeHandler, clickImageHandler);
        cardsContainer.prepend(newCard);
        evt.target.reset(); 
        closeModal(popupTypeNewCard);
    }
}

formAddCard.addEventListener('submit', submitFormCard);

// Открытие попапа с картинкой
const popupImg = document.querySelector('.popup_type_image');
const modalImage = popupImg.querySelector('.popup__image');
const caption = popupImg.querySelector('.popup__caption');

function clickImageHandler(dataCard) { 
    const imageUrl = dataCard.link; 
    const imageAlt = dataCard.name; 
    openModalImg(imageUrl, imageAlt); 
}

function openModalImg(imageUrl, imageAlt) { 
    modalImage.src = imageUrl; 
    modalImage.alt = imageAlt; 
    caption.textContent = imageAlt;  
    openModal(popupImg);
}