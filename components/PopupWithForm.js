import { Popup } from './Popup.js'

//Класс PopupWithForm наследует от Popup и перезаписывает родительские методы setEventListeners, close

export class PopupWithForm extends Popup {
  constructor(popupSelector, config, formSelector, handleFormSubmit) {
    super(popupSelector, config);
    this._formElement = document.querySelector(formSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputlist = this._formElement.querySelectorAll(this._config.inputSelector);
    this.setEventListeners = this.setEventListeners();
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._formElement.reset();
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

  close() {
    super.close();
    this._formElement.reset();
  }
}
