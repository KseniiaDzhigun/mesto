import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector, popupImageSelector, popupCaptionSelector) {
    super(popupSelector);
    this._popupImage = document.querySelector(popupImageSelector);
    this._popupCaption = document.querySelector(popupCaptionSelector);
    this.setEventListeners = super.setEventListeners();
  }

  open({name, link}) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
    super.open();
  }
}

// const openPopupPic = ({ name, link }) => {
//   popupImage.src = link;
//   popupImage.alt = name;
//   popupCaption.textContent = name;
//   openPopup(popupPic);
// }
