import { Popup } from './Popup.js'

//Класс PopupWithForm наследует от Popup и перезаписывает родительские методы setEventListeners, close

export class PopupWithForm extends Popup {
  constructor(popupSelector, config, handleFormSubmit) {
    super(popupSelector, config);
    this._formElement = this._popupElement.querySelector(this._config.popupFormSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputlist = this._formElement.querySelectorAll(this._config.inputSelector);
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    this._submitButtonText = this._submitButton.textContent;
    this.setEventListeners();
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }

  //Приватный метод собирает данные всех полей формы
  _getInputValues() {
    this._formValues = {};

    this._inputlist.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(data) {
    this._inputlist.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  setSavingMode(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
