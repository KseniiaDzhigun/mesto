import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, handleFormSubmit) {
    super(popupSelector);
    this._formElement = document.querySelector(formSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputlist = this._formElement.querySelectorAll('.popup__input');
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
