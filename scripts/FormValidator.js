export class FormValidator {
  // Класс принимает в конструктор объект настроек с селекторами и классами формы
  // Принимает вторым параметром элемент той формы, которая валидируется
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  //Приватный метод показывает ошибку при вводе некорректных данных
  _showInputError(inputElement, errorMessage) {
    this.errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    this.errorElement.textContent = errorMessage;
    this.errorElement.classList.add(this._config.errorClass);
  }

  //Приватный метод скрывает ошибку при вводе корректных данных
  _hideInputError(inputElement) {
    this.errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    this.errorElement.classList.remove(this._config.errorClass);
    this.errorElement.textContent = '';
  }

  // Приватный метод проверяет валидность поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //Приватный метод принимает массив полей формы и возвращает true, если хотя бы одно поле не валидно
  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }


  disableButton() {
    this.buttonElement.classList.add(this._config.inactiveButtonClass);
    this.buttonElement.setAttribute('disabled', true);
  }

  enableButton() {
    this.buttonElement.classList.remove(this._config.inactiveButtonClass);
    this.buttonElement.removeAttribute('disabled');
  }

  // Приватный метод изменяет состояние кнопки сабмита
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }

  // Приватный метод устанавливает обработчики сразу всем полям формы
  _setEventListeners() {
    this.inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this.buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    //Проверяем состояние кнопки до ввода информации
    this._toggleButtonState();
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
        //Проверяем состояние кнопки при изменении любого из полей
      });
    });
  }

  // Публичный метод добавляет обработчики сразу всем формам, включает валидацию формы
  enableValidation() {
    this.formList = Array.from(document.querySelectorAll(this._config.formSelector));
    this.formList.forEach(() => {
      this.fieldsetList = Array.from(this._formElement.querySelectorAll(this._config.fieldsetSelector));
      this.fieldsetList.forEach((fieldset) => {
        this._setEventListeners(fieldset);
        //Валидация каждого отдельного филдсета
      });
    });
  };

  //Публичный метод сброса текста и классов ошибок, некорректно веденных данных
  resetForm() {
    this.inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this.inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      inputElement.value = '';
    });
  }
}

//Валидация форм функциями до ПР7

//Функция показывает ошибку при вводе некорректных данных
// const showInputError = (formElement, inputElement, errorMessage, config) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(config.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(config.errorClass);
// }

//Функция скрывает ошибку при вводе корректных данных
// const hideInputError = (formElement, inputElement, config) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(config.inputErrorClass);
//   errorElement.classList.remove(config.errorClass);
//   errorElement.textContent = '';
// }

//Функция проверки валидности поля
// const checkInputValidity = (formElement, inputElement, config) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, config);
//   } else {
//     hideInputError(formElement, inputElement, config);
//   }
// }

//Функция принимает массив полей формы и возвращает true, если хотя бы одно поле не валидно
// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   })
// }

// const disableButton = (buttonElement, config) => {
//   buttonElement.classList.add(config.inactiveButtonClass);
//   buttonElement.setAttribute('disabled', true);
// }

// const enableButton = (buttonElement, config) => {
//   buttonElement.classList.remove(config.inactiveButtonClass);
//   buttonElement.removeAttribute('disabled');
// }

//Функция переключения состояния кнопки в зависимости от валидности полей
// const toggleButtonState = (inputList, buttonElement, config) => {
//   if (hasInvalidInput(inputList)) {
//     disableButton(buttonElement, config);
//   } else {
//     enableButton(buttonElement, config);
//   }
// }

// Функция добавляет обработчики сразу всем полям формы
// function setEventListeners(formElement, config) {
//   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
//   const buttonElement = formElement.querySelector(config.submitButtonSelector);
//   //Проверяем состояние кнопки до ввода информации
//   toggleButtonState(inputList, buttonElement, config);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement, config);
//       //Проверяем состояние кнопки при изменении любого из полей
//     });
//   });
// }

//Функция добавляет обработчики сразу всем формам
// const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((formElement) => {
//     const fieldsetList = Array.from(formElement.querySelectorAll(config.fieldsetSelector));
//     fieldsetList.forEach((fieldset) => {
//       setEventListeners(fieldset, config);
//       //Валидация каждого отдельного филдсета
//     });
//   });
// };


//Сброс текста и классов ошибок, некорректно веденных данных
// const resetForm = (formElement, config) => {
//   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
//   inputList.forEach((inputElement) => {
//     hideInputError(formElement, inputElement, config);
//     inputElement.value = '';
//   });
// }

