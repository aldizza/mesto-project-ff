export {openModal, closeModal};

function openModal(target) {
    target.classList.add('popup_is-opened');
    addEscapeListener();
    document.addEventListener('click', closePopupByCrossButton);
    document.addEventListener('click', overlayClick); 
}

function closeModal(target) {
    target.classList.remove('popup_is-opened');
    removeEscapeListener();
    document.removeEventListener('click', closePopupByCrossButton); // Удаляем обработчик клика на document
    document.removeEventListener('click', overlayClick);
}

function addEscapeListener() {
    document.addEventListener('keydown', handleEscape);
}

function removeEscapeListener() {
    document.removeEventListener('keydown', handleEscape);
}

function handleEscape(event) {
    if (event.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
}

function overlayClick(evt) {
    const target = evt.target;
    if (target.classList.contains('popup_is-opened')) {
        closeModal(target);
    }
}

function closePopupByCrossButton(evt) {
    const target = evt.target;
    if (target.classList.contains('popup__close')) {
        closeModal(target.closest('.popup'));
    }
}