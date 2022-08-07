import { Popup } from './Popup.js'

//класс PopupWithImage наследует от Popup и перезаписывает родительский метод open

export class PopupWithImage extends Popup {
  constructor(popupSelector, config) {
    super(popupSelector, config);
    this._popupImage = document.querySelector(this._config.popupImageSelector);
    this._popupCaption = document.querySelector(this._config.popupCaptionSelector);
    this.setEventListeners();
  }

  //При нажатии на картинку, открываем попап, в который передаётся информация с карточки
  open({name, link}) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
    super.open();
  }
}
