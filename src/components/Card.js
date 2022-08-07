//Класс Card создаёт карточку с текстом и ссылкой на изображение

export class Card {
  //Класс принимает в конструктор данные карточки, конфиг
  // и колбэк, который устанавливает поведение карточки на клик по изображению
  constructor({name, link}, config, handleImageClick) {
    this._title = name;
    this._alt = name;
    this._image = link;
    this._config = config;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
  //Забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._config.cardTemplateSelector)
      .content
      .querySelector(this._config.cardSelector)
      .cloneNode(true);
  //Возвращаем DOM-элемент карточки
    return cardElement;
  }

  //Публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
  generateCard() {
  // Записываем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(this._config.imageSelector);
    this._likeButton = this._element.querySelector(this._config.likeButtonSelector);

    this._setEventListeners();

    this._element.querySelector(this._config.titleSelector).textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._alt;

    return this._element;
  }

  //Добавляем в приватный метод все слушатели событий
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButtonClick();
    });

    this._element.querySelector(this._config.trashButtonSelector).addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });

    this._cardImage.addEventListener('click', this._handleImageClick);
  }

  _handleLikeButtonClick() {
    this._likeButton.classList.toggle(this._config.activeLikeButtonClass);
  };

  _handleDeleteButtonClick() {
    this._element.remove();
  };
}
