//Класс Card создаёт карточку с текстом и ссылкой на изображение

export class Card {
  //Класс принимает в конструктор данные карточки, конфиг
  // и колбэки, которые устанавливают поведение карточки на клики
  constructor({ data, config, handleImageClick, handleLikeClick, handleDeleteClick }) {
    this._title = data.name;
    this._alt = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = data.currentUser._id;
    this._ownerId = data.owner._id;

    this._config = config;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
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
    this._likeCounter = this._element.querySelector(this._config.likeCounterSelector);
    this._trashButton = this._element.querySelector(this._config.trashButtonSelector);

    this._removeTrashButton();

    this._changeLikeButtonState();

    this._setEventListeners();

    this._likeCounter.textContent = this._likes.length;
    this._element.querySelector(this._config.titleSelector).textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._alt;

    return this._element;
  }

  //Иконка удаления есть только на созданных нами карточках. Убираем иконку удаления на чужих карточках
  _removeTrashButton() {
    if (this._ownerId !== this._userId) {
      this._trashButton.remove();
    }
  }

  isLiked() {
    return this._likes.some((likeElement) => {
      return likeElement._id === this._userId;
    })
  }

  //Метод для переопределения данных по всем лайкам текущей карточки
  updateLikesCounter(updatedData) {
    this._likes = updatedData.likes;
    this._likeCounter.textContent = this._likes.length;
    this._changeLikeButtonState();
  }

  _changeLikeButtonState() {
    this._likeButton.classList.toggle(this._config.activeLikeButtonClass, this.isLiked());
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._id);
    });

    this._trashButton.addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });

    this._cardImage.addEventListener('click', this._handleImageClick);
  }

  deleteCard() {
    this._element.remove();
  }
}
