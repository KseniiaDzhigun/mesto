//Класс Popup отвечает за открытие и закрытие попапа

export class Popup {
  constructor(popupSelector, config) {
    this._popupElement = document.querySelector(popupSelector);
    this._config = config;

    //Создаем постоянную ссылку на функцию закрытия попапа по нажатию на Esc
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //Слушатель событий, закрывающий модальное окно по нажатию на Esc , добавляется при открытии модального окна и удаляется при его закрытии
  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popupElement.classList.add(this._config.popupOpenedClass);
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupElement.classList.remove(this._config.popupOpenedClass);
  }

  //Если popup открыт, то при нажатии на клавишу Escape, он закрывается
  _handleEscClose(evt) {
    if (evt.key === 'Escape' && this._popupElement.classList.contains(this._config.popupOpenedClass)) {
      this.close();
    }
  }

  setEventListeners() {
    //Каждая форма попапа закрывается при нажатии на пустое место экрана = popup и при нажатии на крестик
    //Совмещаем две проверки
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget || evt.target.classList.contains(this._config.closeButtonClass)) {
        this.close();
      }
    });
  }
}
//Используем mousedown, а не click, чтобы не закрыть случайно попап по оверлею, если нажать мышкой внутри попапа,
//а потом, не разжимая, передвинуть курсор на оверлей



//Функция закрытия попапа, в параметр будем вставлять нужный попап
//Слушатель событий, закрывающий модальное окно по нажатию на Esc , добавляется при открытии модального окна и удаляется при его закрытии
// const closePopup = (popup) => {
//   document.removeEventListener('keydown', closePopupByKey);
//   popup.classList.remove('popup_opened');
// }

//Функция закрытия модальных окон по нажатию на Esc
// const closePopupByKey = (evt) => {
//   if (evt.key === 'Escape') {
//     const popup = document.querySelector('.popup_opened');
//     closePopup(popup);
//   }
// }

// Функция открытия попапа, в параметр будем вставлять нужный попап
// const openPopup = (popup) => {
//   document.addEventListener('keydown', closePopupByKey);
//   popup.classList.add('popup_opened');
// }

//Каждая форма попапа закрывается при нажатии на пустое место экрана = popup и при нажатии на крестик
//Совмещаем две проверки

//Используем mousedown, а не click, чтобы не закрыть случайно попап по оверлею, если нажать мышкой внутри попапа,
//а потом, не разжимая, передвинуть курсор на оверлей

// popups.forEach(popup => {
//   popup.addEventListener('mousedown', evt => {
//     if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
//       closePopup(popup);
//     }
//   });
// })
