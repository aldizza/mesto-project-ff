const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  };

  //показывает элемент ошибки
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(validationConfig.errorClass);
};

//скрывает элемент ошибки
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(validationConfig.inputErrorClass);
  inputElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

//проверяет валидность отдельного поля, внутри вызывает showInputError или hideInputError.
const checkInputValidity = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.patternMismatch) {
        // встроенный метод setCustomValidity принимает на вход строку
        // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
        // если передать пустую строку, то будут доступны
        // стандартные браузерные сообщения
    inputElement.setCustomValidity(''); //это метод объекта HTMLInputElement, который позволяет устанавливать пользовательское сообщение об ошибке для элемента ввода (input)
  }

  if (!inputElement.validity.valid) {
    // теперь, если ошибка вызвана регулярным выражением,
        // переменная validationMessage хранит наше кастомное сообщение
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

//Функция hasInvalidInput только проверяет наличие невалидного поля и сигнализирует, можно ли разблокировать кнопку сабмита.
const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
          // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      if(!inputElement.validity.valid){
        console.log(inputElement);
      }
  
      return !inputElement.validity.valid;
    })
  };

// функция, которая отвечает за блокировку кнопки. Для стилизации нужна функция toggleButtonState. Именно она отключает и включает кнопку. Для этого функция hasInvalidInput проверяет валидность полей и возвращает true или false. На их основе toggleButtonState меняет состояние кнопки:
function toggleButtonState(inputList, buttonElement, validationConfig) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
}

//слушатель событий добавится всем полям ввода внутри формы. Для этого создадим функцию setEventListeners, которая примет параметром элемент формы и добавит её полям нужные обработчики:
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

//функция, которая найдёт и переберёт все формы на странице (включаем валидацию)
const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  
      setEventListeners(formElement, validationConfig);
  }); 
}

// Функция для проверки валидности всей формы
function isValid(form, validationConfig) {
    const elements = Array.from(form.elements);
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.name) {
            checkInputValidity(form, element, validationConfig);
            if (!element.validity.valid) {
                return false;
            }
        }
    }
    return true;
}

function clearValidation(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) =>
        hideInputError(formElement, inputElement, validationConfig));

    // Проверка на валидность формы после очистки валидации
    if (isValid(formElement, validationConfig)) {
        activateButton(buttonElement, validationConfig);
    }
}

// Функция для активации кнопки
function activateButton(buttonElement, validationConfig) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
}

export { clearValidation, enableValidation, validationConfig };


