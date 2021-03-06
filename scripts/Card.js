//Класс Card создаёт карточку с текстом и ссылкой на изображение

export class Card {
  //Класс принимает в конструктор данные карточки, селектор её template-элемента
  // и колбэк, который устанавливает поведение карточки на клик по изображению
  constructor({name, link}, cardSelector, handleImageClick) {
    this._title = name;
    this._alt = name;
    this._image = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
  //Забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.cards__element')
      .cloneNode(true);
  //Возвращаем DOM-элемент карточки
    return cardElement;
  }

  //Публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
  generateCard() {
  // Записываем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.cards__image');
    this._likeButton = this._element.querySelector('.cards__like-button');

    this._setEventListeners();

    this._element.querySelector('.cards__title').textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._alt;

    return this._element;
  }

  //Добавляем в приватный метод все слушатели событий
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButtonClick();
    });

    this._element.querySelector('.cards__trash-button').addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });

    this._cardImage.addEventListener('click', this._handleImageClick);
  }

  _handleLikeButtonClick() {
    this._likeButton.classList.toggle('cards__like-button_active');
  };

  _handleDeleteButtonClick() {
    this._element.remove();
  };
}

//Функция создания карточки до ПР7
// function renderCard({name, link}) {
//   const newCard = itemTemplate.querySelector('.cards__element').cloneNode(true);
//   const cardImage = newCard.querySelector('.cards__image');
//   const cardTitle = newCard.querySelector('.cards__title');
//   const likeButton = newCard.querySelector('.cards__like-button');
//   const deleteButton = newCard.querySelector('.cards__trash-button');
//   cardImage.src = link;
//   cardImage.alt = name;
//   cardTitle.textContent = name;

//   // По клику переключаем класс на кнопке лайка
//   likeButton.addEventListener('click', () => {
//     likeButton.classList.toggle('cards__like-button_active');
//   });

//   // Удаляем по кнопке весь элемент списка
//   deleteButton.addEventListener('click', () => {
//     newCard.remove();
//   });

//   //По клику на изображение открывается попап с картинкой
//   cardImage.addEventListener('click', () => {
//     openPopupPic({name, link})
//   });

//   return newCard;

