
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
  nameInput,
  jobInput
} from '../utils/constants.js';


//Для каждой проверяемой формы создаем экземпляр класса FormValidator
const formEditValidator = new FormValidator(configForm, '.popup__form_type_edit');
const formAddValidator = new FormValidator(configForm, '.popup__form_type_add');

//Вызываем публичный метод валидации форм класса FormValidator
formEditValidator.enableValidation();
formAddValidator.enableValidation();


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

  formAddValidator.disableButton();

  popupAdd.close();
}

//Для каждого попапа с формой создаем свой экземпляр класса PopupWithForm

const popupAdd = new PopupWithForm('.popup_type_add', configPopup, '.popup__form_type_add', handleAddFormSubmit);


//Передаем введенные в форму Edit значения в текстовые поля profile и закрываем форму
const handleEditFormSubmit = (formData) => {
  const name = formData.name;
  const info = formData.about;
  userInfo.setUserInfo({ name, info })

  popupEdit.close();
}

const popupEdit = new PopupWithForm('.popup_type_edit', configPopup, '.popup__form_type_edit', handleEditFormSubmit);


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
