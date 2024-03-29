//Объект со всеми нужными классами и селекторами элементов для FormValidator.js
export const configForm = {
  formSelector: '.popup__form',
  fieldsetSelector: '.popup__form-set',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//Объект со всеми нужными классами и селекторами элементов для Card.js
export const configCard = {
  cardTemplateSelector: '.item_template',
  cardSelector: '.cards__element',
  imageSelector: '.cards__image',
  likeButtonSelector: '.cards__like-button',
  likeCounterSelector: '.cards__like-counter',
  titleSelector: '.cards__title',
  trashButtonSelector: '.cards__trash-button',
  activeLikeButtonClass: 'cards__like-button_active'
}

//Объект со всеми нужными классами и селекторами элементов для Popup.js и его наследуемых классов
export const configPopup = {
  closeButtonClass: 'popup__close-button',
  popupOpenedClass: 'popup_opened',
  popupImageSelector: '.popup__image',
  popupCaptionSelector: '.popup__caption',
  inputSelector: '.popup__input',
  popupFormSelector: '.popup__form',
  submitButtonSelector: '.popup__button-submit',
}

//Объект со всеми нужными классами и селекторами элементов для UserInfo.js и его наследуемых классов
export const configUser = {
  userNameSelector: '.profile__title',
  userAboutSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__avatar'
}

export const buttonEdit = document.querySelector('.profile__button_type_edit');
export const buttonAdd = document.querySelector('.profile__button_type_add');
export const userAvatarButton = document.querySelector('.profile__avatar');
