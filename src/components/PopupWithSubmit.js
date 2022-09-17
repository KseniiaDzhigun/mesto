//Попап для подтверждения каких-либо действий

import { Popup } from './Popup.js'

export class PopupWithSubmit extends Popup {
  constructor(popupSelector, config) {
    super(popupSelector, config);
    this._formElement = this._popupElement.querySelector(this._config.popupFormSelector);
    this.setEventListeners();
  }

  //Метод динамически меняет функцию, которая вызывается при нажатии на кнопку сабмита
  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    })
    super.setEventListeners();
  }
}
