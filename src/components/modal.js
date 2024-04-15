export {openModal, closeModal, addEscListener, removeEscListener, escListener};

function openModal(target) {
    target.classList.add('popup_is-opened');
    addEscListener();
}

function closeModal(target) {
    target.classList.remove('popup_is-opened');
    removeEscListener();
}

function addEscListener() {
    document.addEventListener('keydown', escListener);
}

function removeEscListener() {
    document.removeEventListener('keydown', escListener);
}

function escListener(evt) {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}