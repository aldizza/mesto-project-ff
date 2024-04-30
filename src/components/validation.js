const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

//показывает элемент ошибки
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
  };

//скрывает элемент ошибки
const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
  };


 //Пусть она проверяет formInput на корректность введённых данных и вызывает hideError и showError. 
const checkInputValidity = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.patternMismatch) {
        // встроенный метод setCustomValidity принимает на вход строку
        // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
        // если передать пустую строку, то будут доступны
        // стандартные браузерные сообщения
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    // теперь, если ошибка вызвана регулярным выражением,
        // переменная validationMessage хранит наше кастомное сообщение
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}; 


const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    // Если есть хотя бы одно невалидное поле, делаем кнопку неактивной
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        // Если все поля валидны, делаем кнопку активной
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
};

  //Функция hasInvalidInput только проверяет наличие невалидного поля и сигнализирует, можно ли разблокировать кнопку сабмита.
const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
          // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  
      return !inputElement.validity.valid;
    })
};

const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
};

//функция, которая найдёт и переберёт все формы на странице (включаем валидацию) !!!!!  отличается от теории
const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach(formElement => {
        setEventListeners(formElement, validationConfig);
    })
};

function clearValidation(formElement, validationConfig) {
    const inputs = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    inputs.forEach(input => {
        hideInputError(formElement, input, validationConfig);
        input.setCustomValidity(''); // Очистка кастомных сообщений об ошибках
    });
    toggleButtonState(inputs, buttonElement, validationConfig);
}

export { clearValidation, enableValidation, validationConfig };


