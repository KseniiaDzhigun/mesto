export class FormValidator {
  // Класс принимает в конструктор объект настроек с селекторами и классами формы
  // Принимает вторым параметром элемент той формы, которая валидируется
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  //Приватный метод показывает ошибку при вводе некорректных данных
  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._config.errorClass);
  }

  //Приватный метод скрывает ошибку при вводе корректных данных
  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    this._errorElement.classList.remove(this._config.errorClass);
    this._errorElement.textContent = '';
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
  _haveInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }


  disableButton() {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  enableButton() {
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

  // Приватный метод изменяет состояние кнопки сабмита
  _toggleButtonState() {
    if (this._haveInvalidInput()) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }

  // Приватный метод устанавливает обработчики сразу всем полям формы
  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    //Проверяем состояние кнопки до ввода информации
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
        //Проверяем состояние кнопки при изменении любого из полей
      });
    });
  }

  // Публичный метод добавляет обработчики сразу всем формам, включает валидацию формы
  enableValidation() {
    this._setEventListeners();
  };

  //Публичный метод сброса текста и классов ошибок, некорректно веденных данных
  resetFormValidator() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
