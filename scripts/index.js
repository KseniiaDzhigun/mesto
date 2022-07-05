const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Все переменные задаём как const, так как мы не меняем сами элементы, которые находим, а меняем их значения

const itemTemplate = document.querySelector(".item_template").content;
const cardsContainer = document.querySelector(".cards__elements");

const popups = document.querySelectorAll('.popup');

const popupPic = document.querySelector('.popup_type_image');
const popupImage = popupPic.querySelector('.popup__image');
const popupCaption = popupPic.querySelector('.popup__caption');

const buttonEdit = document.querySelector('.profile__button_type_edit');
const popupEdit = document.querySelector('.popup_type_edit');
const formEdit = popupEdit.querySelector('.popup__form_type_edit');
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_text');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

const buttonAdd = document.querySelector('.profile__button_type_add');
const popupAdd = document.querySelector('.popup_type_add');
const formAdd = popupAdd.querySelector('.popup__form_type_add');
const placeInput = formAdd.querySelector('.popup__input_type_place');
const linkInput = formAdd.querySelector('.popup__input_type_link');

//Объект со всеми нужными классами и селекторами элементов для указанных в validate.js функций
const config = {
  formSelector: '.popup__form',
  fieldsetSelector: '.popup__form-set',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(config);

// Функция закрытия попапа, в параметр будем вставлять нужный попап

//Слушатель событий, закрывающий модальное окно по нажатию на Esc , добавляется при открытии модального
//окна и удаляется при его закрытии
function closePopup(popup) {
  document.removeEventListener('keydown', closePopupByKey);
  popup.classList.remove('popup_opened');
}

//Функция закрытия модальных окон по нажатию на Esc
const closePopupByKey = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// Функция открытия попапа, в параметр будем вставлять нужный попап
function openPopup(popup) {
  document.addEventListener('keydown', closePopupByKey);
  popup.classList.add('popup_opened');
}

//Форма редактирования открывается с полями, значения которых соответствуют текущей информации в profile
function openPopupEdit() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupEdit);
}

//При нажатии на картинку, открываем попап, в который передаётся информация с карточки
function openPopupPic({name, link}) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopup(popupPic);
}

//Функция создания карточки
function renderCard({name, link}) {
  const newCard = itemTemplate.querySelector('.cards__element').cloneNode(true);
  const cardImage = newCard.querySelector('.cards__image');
  const cardTitle = newCard.querySelector('.cards__title');
  const likeButton = newCard.querySelector('.cards__like-button');
  const deleteButton = newCard.querySelector('.cards__trash-button');
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  // По клику переключаем класс на кнопке лайка
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('cards__like-button_active');
  });

  // Удаляем по кнопке весь элемент списка
  deleteButton.addEventListener('click', () => {
    newCard.remove();
  });

  //По клику на изображение открывается попап с картинкой
  cardImage.addEventListener('click', () => {
    openPopupPic({name, link})
  });

  return newCard;
}

//Передаем введенные в форму Edit значения в текстовые поля profile и закрываем форму
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEdit);
}

//Передаем введенные в форму Add значения в новую карточку и добавляем её в начало контейнера
//Очищаем инпуты после успешного добавления карточки
function formAddSubmitHandler(evt) {
  evt.preventDefault();
  const link = linkInput.value;
  const name = placeInput.value;
  cardsContainer.prepend(renderCard({name, link}));
  closePopup(popupAdd);
  linkInput.value = '';
  placeInput.value = '';

}

//Обработчик событий submit
formEdit.addEventListener('submit', formSubmitHandler);

formAdd.addEventListener('submit', formAddSubmitHandler);

//При загрузке на странице должно быть 6 карточек из готового массива initialCards
initialCards.forEach(card => {
  const link = card.link;
  const name = card.name;
  cardsContainer.append(renderCard({name, link}));
})

// Обработчик на кнопку редактирования
buttonEdit.addEventListener('click', () => {
  openPopupEdit();
});

// Обработчик на кнопку добавления
buttonAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});


//Каждая форма попапа закрывается при нажатии на пустое место экрана = popup и при нажатии на крестик
//Совмещаем две проверки

//Используем mousedown, а не click, чтобы не закрыть случайно попап по оверлею, если нажать мышкой внутри попапа,
//а потом, не разжимая, передвинуть курсор на оверлей

popups.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
})
