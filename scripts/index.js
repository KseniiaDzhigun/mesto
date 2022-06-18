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

const itemTemplate = document.querySelector(".item_template").content;
const list = document.querySelector(".cards__elements");

const buttonEdit = document.querySelector('.profile__button_type_edit');
const buttonAdd = document.querySelector('.profile__button_type_add');
const likeButtons = document.querySelectorAll('.cards__like-button');

const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');
const popupAdd = document.querySelector('.popup_type_add');
const popupPic = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

// Все переменные задаём как const, так как мы не меняем сами элементы, которые находим, а меняем их значения

const formEdit = popup.querySelector('.popup__form');
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_text');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

const formAdd = popupAdd.querySelector('.popup__form_type_add');
const placeInput = formAdd.querySelector('.popup__input_type_place');
const linkInput = formAdd.querySelector('.popup__input_type_link');

// Функция закрытия попапа, ближайшего родителя кнопки
function closePopup(e) {
  e.target.closest('.popup').classList.remove('popup_opened');
}

// Функция открытия попапа, в параметр будем вставлять нужный попап
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

//Форма редактирования открывается с полями, значения которых соответствуют текущей информации в profile
function openPopupForm() {
  if (popup.classList.contains('popup_opened') === false) {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
  }
  openPopup(popup);
}

//При нажатии на картинку, открываем попап, в который передаётся информация с карточки
function openPopupPic({name, link}) {
  if (popup.classList.contains('popup_opened') === false) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
  }
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

  // Определяем на каком элементе событие сработало (кнопка лайка), переключаем для него класс
  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('cards__like-button_active');
  });

  // Удаляем по кнопке весь элемент списка, находя ближайшего родителя
  deleteButton.addEventListener('click', () => {
    deleteButton.closest('.cards__element').remove();
  });

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
  closePopup(evt);
}

//Передаем введенные в форму Add значения в новую карточку и добавляем её в начало контейнера
function formAddSubmitHandler(evt) {
  evt.preventDefault();
  const link = linkInput.value;
  const name = placeInput.value;
  list.prepend(renderCard({name, link}));
  closePopup(evt);
}

formEdit.addEventListener('submit', formSubmitHandler);

formAdd.addEventListener('submit', formAddSubmitHandler);

//При загрузке на странице должно быть 6 карточек из готового массива initialCards
initialCards.forEach(card => {
  const link = card.link;
  const name = card.name;
  list.append(renderCard({name, link}));
})

// Обработчик на кнопку редактирования
buttonEdit.addEventListener('click', () => {
  openPopupForm();
});

// Обработчик на кнопку добавления
buttonAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});

// Обработчик на все кнопки закрытия
popupCloseButtons.forEach(closeButton => {
  closeButton.addEventListener('click', closePopup)
});

//Каждая форма попапа закрывается при нажатии на пустое место экрана = popup
popups.forEach(popupElement => {
  popupElement.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      closePopup(e);
    }
  });
})


