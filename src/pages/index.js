import '../index.css'
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { FormValidator } from '../components/formValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  initialCards,
  configCard,
  configForm,
  configPopup,
  buttonEdit,
  buttonAdd,
} from '../utils/constants.js';

const formValidators = {}

// Функция включения валидации для всех форм
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(configForm, formElement)
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

    // в объект записываем экземпляр валидатора под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(configForm);


//Функция создания новой карточки с местом
const createCard = ({ name, link }) => {
  // Создадим экземпляр карточки класса Card
  const card = new Card({ name, link }, configCard, () => {
    //При нажатии на картинку, открываем попап, в который передаётся информация с карточки
    popupPic.open({ name, link });
  });
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  return cardElement;
}

//При загрузке на странице должно быть 6 карточек из готового массива initialCards
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const link = item.link;
      const name = item.name;

      cardsList.addItem(createCard({ name, link }), false);
    }
  },
  '.cards__elements'
);

//Для попапа с изображением создаем экземпляр класса PopupWithImage
const popupPic = new PopupWithImage('.popup_type_image', configPopup);


//Передаем введенные в форму Add значения в новую карточку и добавляем её в начало контейнера
//Закрываем форму и дезактивируем кнопку submit
const handleAddFormSubmit = (formData) => {
  const link = formData.link;
  const name = formData.name;

  cardsList.addItem(createCard({ name, link }), true);

  popupAdd.close();
}

//Для каждого попапа с формой создаем свой экземпляр класса PopupWithForm

const popupAdd = new PopupWithForm('.popup_type_add', configPopup, handleAddFormSubmit);


//Передаем введенные в форму Edit значения в текстовые поля profile и закрываем форму
const handleEditFormSubmit = (formData) => {
  const name = formData.name;
  const info = formData.info;
  userInfo.setUserInfo({ name, info })

  popupEdit.close();
}

const popupEdit = new PopupWithForm('.popup_type_edit', configPopup, handleEditFormSubmit);


const userInfo = new UserInfo('.profile__title', '.profile__subtitle');


//Форма редактирования открывается с полями, значения которых соответствуют текущей информации в profile
const openPopupEdit = () => {
  const userData = userInfo.getUserInfo();
  popupEdit.setInputValues(userData);
  popupEdit.open();
 // Используем валидатор из объекта по атрибуту name, который задан для формы
  formValidators['profile-form'].enableButton();
}


// Обработчик на кнопку редактирования: сбрасываем ошибки предыдущего заполнения и открываем форму

buttonEdit.addEventListener('click', () => {
  //Вызываем публичный метод сброса формы класса FormValidator
  formValidators['profile-form'].resetFormValidator();
  openPopupEdit();
});

// Обработчик на кнопку добавления: сбрасываем ошибки предыдущего заполнения и открываем форму

buttonAdd.addEventListener('click', () => {
  //Вызываем публичный метод сброса формы класса FormValidator
  formValidators['card-form'].resetFormValidator();
  formValidators['card-form'].disableButton();
  popupAdd.open();
});

cardsList.renderItems();
