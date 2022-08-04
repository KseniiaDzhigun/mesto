
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { FormValidator } from '../components/formValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  initialCards,
  configForm,
  nameInput,
  jobInput
} from '../utils/constants.js';


const buttonEdit = document.querySelector('.profile__button_type_edit');

const buttonAdd = document.querySelector('.profile__button_type_add');

//Для каждой проверяемой формы создаем экземпляр класса FormValidator
const formEditValidator = new FormValidator(configForm, '.popup__form_type_edit');
const formAddValidator = new FormValidator(configForm, '.popup__form_type_add');

//Вызываем публичный метод валидации форм класса FormValidator
formEditValidator.enableValidation();
formAddValidator.enableValidation();

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

      cardsList.addItem(cardElement, false);
    }
  },
  '.cards__elements'
);

const popupPic = new PopupWithImage('.popup_type_image', '.popup__image', '.popup__caption');

const handleAddFormSubmit = (formData) => {
  const link = formData.link;
  const name = formData.name;
  const card = new Card({ name, link }, '.item_template', () => {
    popupPic.open({ name, link });
  });

  const cardElement = card.generateCard();

  cardsList.addItem(cardElement, true);

  formAddValidator.disableButton();

  popupAdd.close();
}

const popupAdd = new PopupWithForm('.popup_type_add', '.popup__form_type_add', handleAddFormSubmit);

const handleEditFormSubmit = (formData) => {
  const name = formData.name;
  const info = formData.about;
  userInfo.setUserInfo({name, info})

  popupEdit.close();
}

const popupEdit = new PopupWithForm('.popup_type_edit', '.popup__form_type_edit', handleEditFormSubmit);

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

//Форма редактирования открывается с полями, значения которых соответствуют текущей информации в profile
const openPopupEdit = () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.info;
  popupEdit.open();
  formEditValidator.enableButton();
}

// Обработчик на кнопку редактирования: сбрасываем ошибки предыдущего заполнения и открываем форму
buttonEdit.addEventListener('click', () => {
  //Вызываем публичный метод сброса формы класса FormValidator
  formEditValidator.resetFormValidator();
  openPopupEdit();
});

// Обработчик на кнопку добавления: сбрасываем ошибки предыдущего заполнения и открываем форму
buttonAdd.addEventListener('click', () => {
  //Вызываем публичный метод сброса формы класса FormValidator
  formAddValidator.resetFormValidator();
  popupAdd.open();
});

cardsList.renderItems();
