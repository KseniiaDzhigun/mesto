import '../index.css'
import { Api } from '../components/Api.js'
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { FormValidator } from '../components/formValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import {
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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
  headers: {
    authorization: 'a5a02e60-10c8-46a9-914b-480856b1458a',
    'Content-Type': 'application/json'
  }
});

//Информация о пользователе подгружается с сервера
api.getUserInfo().then((res) => {
  userInfo.setUserInfo(res);
  userInfo.setUserAvatar(res);
}).catch((err) => {
  console.log(`Ошибка: ${err}`)
});


const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

//Функция создания новой карточки с местом
function createCard({ name, link }) {
  // Создадим экземпляр карточки класса Card
  const card = new Card({ name, link }, configCard, () => {
    //При нажатии на картинку, открываем попап, в который передаётся информация с карточки
    popupPic.open({ name, link });
  });
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  return cardElement;
}

//Создаем список карточек - экземпляр класса Section
const cardsList = new Section(
    (item) => {
      const link = item.link;
      const name = item.name;

      cardsList.addItem(createCard({ name, link }), false);
    },
  '.cards__elements'
);

//При загрузке на странице подгружаются карточки с сервера.
api.getInitialCards().then((res) => {
cardsList.renderItems(res);

}).catch((err) => {
  console.log(`Ошибка: ${err}`)
});

//Для попапа с изображением создаем экземпляр класса PopupWithImage
const popupPic = new PopupWithImage('.popup_type_image', configPopup);


//Передаем введенные в форму Add значения в новую карточку и добавляем её
const handleAddFormSubmit = (formData) => {
  const link = formData.link;
  const name = formData.name;

  //Данные новой карточки сохраняем на сервере
  //Берем данные новой карточки из ответа сервера и добавляем ее в начало контейнера
  api.addNewCard({ name, link, like }).then((res) => {
    cardsList.addItem(createCard(res), true);
  })

  popupAdd.close();
}

//Для каждого попапа с формой создаем свой экземпляр класса PopupWithForm

const popupAdd = new PopupWithForm('.popup_type_add', configPopup, handleAddFormSubmit);


//Передаем введенные в форму Edit значения в текстовые поля profile
const handleEditFormSubmit = (formData) => {
  const name = formData.name;
  const about = formData.about;

  //Отредактированные данные профиля сохраняем на сервере.
  //Берем обновлённые данные пользователя из ответа сервера и вставляем в текстовые поля profile
  api.editUserInfo({ name, about }).then((res) => {
    userInfo.setUserInfo(res);
  }).catch((err) => {
    console.log(`Ошибка: ${err}`)
  });
  //Закрываем форму редактирования профиля
  popupEdit.close();
}

const popupEdit = new PopupWithForm('.popup_type_edit', configPopup, handleEditFormSubmit);


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


