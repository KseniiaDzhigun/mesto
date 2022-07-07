//Функция показывает ошибку при вводе некорректных данных
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

//Функция скрывает ошибку при вводе корректных данных
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

//Функция проверки валидности поля
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

//Функция принимает массив полей формы и возвращает true, если хотя бы одно поле не валидно
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const disableButton = (buttonElement, config) => {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

const enableButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

//Функция переключения состояния кнопки в зависимости от валидности полей
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, config);
  } else {
    enableButton(buttonElement, config);
  }
}

// Функция добавляет обработчики сразу всем полям формы
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  //Проверяем состояние кнопки до ввода информации
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, config);
      //Проверяем состояние кнопки при изменении любого из полей
    });
  });
}

//Функция добавляет обработчики сразу всем формам
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const fieldsetList = Array.from(formElement.querySelectorAll(config.fieldsetSelector));
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset, config);
      //Валидация каждого отдельного филдсета
    });
  });
};


//Сброс текста и классов ошибок, некорректно веденных данных
const resetForm = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
    inputElement.value = '';
  });
}

