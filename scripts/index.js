const cardTemplate = document.querySelector('#card-template');
const placesList = document.querySelector('.places__list');

function createCard(dataCard, deleteCard) {
    const cloneCard = cardTemplate.content.cloneNode(true).querySelector('.places__item');

    cloneCard.querySelector('.card__title').textContent = dataCard.name;

    const imageCard = cloneCard.querySelector('.card__image');
    imageCard.src = dataCard.link;
    imageCard.alt = dataCard.name;

    const deleteButton = cloneCard.querySelector('.card__delete-button');

    deleteButton.addEventListener('click', function () {
        deleteCard(cloneCard);
    });

    return cloneCard;
}

function deleteCard(cardElement) {
    cardElement.remove();
}

initialCards.forEach(function(cardItem) {
    const cardElement = createCard(cardItem, deleteCard);
     placesList.appendChild(cardElement);
});