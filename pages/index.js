import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/formValidator.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import {
  initialCards,
  configPopup
} from '../utils/constants.js';

// Все переменные задаём как const, так как мы не меняем сами элементы, которые находим, а меняем их значения

const popups = document.querySelectorAll('.popup');

// const popupPic = document.querySelector('.popup_type_image');
// const popupImage = popupPic.querySelector('.popup__image');
// const popupCaption = popupPic.querySelector('.popup__caption');

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



//Для каждой проверяемой формы создаем экземпляр класса FormValidator
const formEditValidator = new FormValidator(configPopup, formEdit);
const formAddValidator = new FormValidator(configPopup, formAdd);

//Вызываем публичный метод валидации форм класса FormValidator
formEditValidator.enableValidation();
formAddValidator.enableValidation();

const popupPic = new PopupWithImage('.popup_type_image', '.popup__image', '.popup__caption');

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

//Форма редактирования открывается с полями, значения которых соответствуют текущей информации в profile
const openPopupEdit = () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupEdit);
  formEditValidator.enableButton();
}

// //При нажатии на картинку, открываем попап, в который передаётся информация с карточки
// const openPopupPic = ({ name, link }) => {
//   popupImage.src = link;
//   popupImage.alt = name;
//   popupCaption.textContent = name;
//   openPopup(popupPic);
// }

//Передаем введенные в форму Edit значения в текстовые поля profile и закрываем форму
const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEdit);
}

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const link = item.link;
      const name = item.name;
      const card = new Card({ name, link }, '.item_template', () => {
        popupPic.open({ name, link });
      });

      const cardElement = card.generateCard();

      cardsList.addItem(cardElement);
    }
  },
  '.cards__elements'
  );

cardsList.renderItems();

// //Функция создания новой карточки с местом
// const createCard = ({name, link}) => {
// // Создадим экземпляр карточки класса Card
//   const card = new Card({name, link}, '.item_template', () => {
//     openPopupPic({name, link});
//   });
// // Создаём карточку и возвращаем наружу
//   const cardElement = card.generateCard();
//   return cardElement;
// }

//Передаем введенные в форму Add значения в новую карточку и добавляем её в начало контейнера
//Закрываем форму и дезактивируем кнопку submit
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const link = linkInput.value;
  const name = placeInput.value;
  cardsContainer.prepend(createCard({ name, link }));
  closePopup(popupAdd);
  formAddValidator.disableButton();
}

//Обработчик событий submit
formEdit.addEventListener('submit', handleEditFormSubmit);

formAdd.addEventListener('submit', handleAddFormSubmit);

// //При загрузке на странице должно быть 6 карточек из готового массива initialCards
// initialCards.forEach(initialCard => {
//   const link = initialCard.link;
//   const name = initialCard.name;
//   cardsContainer.append(createCard({name, link}));
// })

// Обработчик на кнопку редактирования: сбрасываем ошибки предыдущего заполнения и открываем форму
buttonEdit.addEventListener('click', () => {
  //Вызываем публичный метод сброса формы класса FormValidator
  formEditValidator.resetForm();
  openPopupEdit();
});

// Обработчик на кнопку добавления: сбрасываем ошибки предыдущего заполнения и открываем форму
buttonAdd.addEventListener('click', () => {
  //Вызываем публичный метод сброса формы класса FormValidator
  formAddValidator.resetForm();
  openPopup(popupAdd);
});


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
