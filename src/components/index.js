// import {initialCards} from './card.js';
import {createCard} from './card.js';
import {openModal, closeModal} from './modal.js';
import { clearValidation, enableValidation, validationConfig } from './validation.js';
import { getUserInfo, getInitialCards, editProfileInfo, addNewCard, updateUserAvatar } from './api.js';

//Попапы
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileAddbutton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

profileEditButton.addEventListener('click', () => {
    fillInEditProfileFormInputs();
    clearValidation(formEditProfile, validationConfig);
    openModal(popupTypeEdit);
});

profileAddbutton.addEventListener('click', () => {
    formAddCard.reset();
    clearValidation(formAddCard, validationConfig);
    openModal(popupTypeNewCard);
});

const profileImageType = document.querySelector('.profile__image');
const popupAvatar = document.querySelector('.popup__content-profile-edit');

profileImageType.addEventListener('click', () => {
    formAddprofileAvatar.reset();
    clearValidation(formAddprofileAvatar, validationConfig);
    openModal(popupAvatar);
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

function submitEditProfileForm(evt) {
    evt.preventDefault(); 
    const jobValue = jobInput.value;
    const nameValue = nameInput.value;

    submitButton.textContent = 'Сохранение...';

    editProfileInfo(nameValue, jobValue)
        .then(() => {
            profileTitle.textContent = nameValue;
            profileDescription.textContent = jobValue;
            closeModal(popupTypeEdit);
        })
        .catch(error => {
            console.error('Ошибка при обновлении данных профиля:', error);
        })
        .finally(() => {
            submitButton.textContent = 'Сохранить';
        });
}

formEditProfile.addEventListener('submit', submitEditProfileForm);

 // Добавление карточки
const formAddCard = document.forms['new-place']; // получаем форму
const cardNameInput = formAddCard.querySelector('.popup__input_type_card-name');
const urlInput = formAddCard.querySelector('.popup__input_type_url');
const placesList = document.querySelector('.places__list');

function submitFormCard(evt) {
    evt.preventDefault();

    const submitButton = evt.target.querySelector('button[type="submit"]');
    submitButton.textContent = 'Сохранение...';

    const placeName = cardNameInput.value;
    const imageUrl = urlInput.value;
    
    if (imageUrl) {
        
        addNewCard(placeName, imageUrl)
            .then((res) => {
                const dataCard = {
                    name: placeName,
                    link: imageUrl,
                    owner: {"_id": res.owner._id},
                    _id: res._id
                };
                const newCard = createCard(dataCard, res.owner._id);
                placesList.prepend(newCard);
                evt.target.reset(); 
                closeModal(popupTypeNewCard);
            })
            .catch(error => {
                console.error('Ошибка при добавлении новой карточки:', error);
            })
            .finally(() => {
                submitButton.textContent = 'Сохранить';
            });
    }
}

formAddCard.addEventListener('submit', submitFormCard);

// Открытие попапа с картинкой
const popupImg = document.querySelector('.popup_type_image');
const modalImage = popupImg.querySelector('.popup__image');
const caption = popupImg.querySelector('.popup__caption');

export function clickImageHandler(dataCard) { 
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

//Обновление аватара
const formAddprofileAvatar = document.forms['new-avatar'];
const urlInputAvatar = formAddprofileAvatar.querySelector('.popup__input_type_url_avatar');
const profileImage = document.querySelector('.profile__image');


function submitFormAvatar(evt) {
    evt.preventDefault();

    const imageUrl = urlInputAvatar.value;
    if (imageUrl) {

        evt.target.querySelector('button[type="submit"]').textContent = 'Сохранение...';

        profileImage.style.backgroundImage = `url('${imageUrl}')`;
        updateUserAvatar(imageUrl)
            .then(() => {
                console.log('Аватар успешно обновлен');
            })
            .catch((error) => {
                console.error('Ошибка при добавлении аватара:', error);
            })
            .finally(() => {
                // Восстанавливаем исходный текст кнопки после завершения загрузки
                evt.target.querySelector('button[type="submit"]').textContent = 'Сохранить';
                evt.target.reset();
                closeModal(popupAvatar);
            });
    }
}

formAddprofileAvatar.addEventListener('submit', submitFormAvatar);

//Валидация 
enableValidation(validationConfig);

//Выводим инфо о пользователе и карточках на страницу
Promise.all([getUserInfo(), getInitialCards()])
  .then(([profileData, cardsData]) => {
    // Получаем ID пользователя
    const myId = profileData._id;

    // Отображаем информацию о пользователе
    profileImage.style.backgroundImage = `url(${profileData.avatar})`;
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;

    // Отображаем карточки на странице
    cardsData.forEach((cardData) => {
      const cardElement = createCard(cardData, myId, clickImageHandler); 
      placesList.append(cardElement);
    });
  })
  .catch((err) => {
    console.error('Ошибка при загрузке данных:', err);
  });


  







  









 
  




