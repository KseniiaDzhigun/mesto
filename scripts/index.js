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
const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');
const popupAdd = document.querySelector('.popup_type_add');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

// Все переменные задаём как const, так как мы не меняем сами элементы, которые находим, а меняем их значения

const formElement = popup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_text');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

//При загрузке на странице должно быть 6 карточек из готового массива initialCards

initialCards.forEach(card => {
  const newCard = itemTemplate.querySelector('.cards__element').cloneNode(true);
  newCard.querySelector('.cards__image').src = card.link;
  newCard.querySelector('.cards__image').alt = card.name;
	newCard.querySelector('.cards__title').textContent = card.name;

  list.append(newCard);
})

// Функция закрытия ближайшего к кнопке попапа
function closePopup(e) {
  e.target.closest('.popup').classList.remove('popup_opened');
}

// function openPopup() {
//   popup.classList.add('popup_opened');
// }

// Функция открытия попапа, в параметр будем вставлять нужный попап
function openPopup(popupElement) {
popupElement.classList.add('popup_opened');
}


//Форма открывается с полями, значения которых соответствуют текущей информации в profile
function popupOpenForm() {
  if (popup.classList.contains('popup_opened') === false) {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
  }
  openPopup(popup);
}

//Передаем введенные в форму значения в текстовые поля profile и закрываем форму
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

// Обработчик на кнопку редактирования
buttonEdit.addEventListener('click', () => {
  popupOpenForm();
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
  popupElement.addEventListener('click', function (e) {
    if (e.target === e.currentTarget) {
      closePopup(e);
    }
  });
})

