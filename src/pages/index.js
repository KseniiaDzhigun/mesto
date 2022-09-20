import '../index.css'
import { Api } from '../components/Api.js'
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { FormValidator } from '../components/formValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit';
import { UserInfo } from '../components/UserInfo.js';
import {
  configCard,
  configForm,
  configPopup,
  configUser,
  buttonEdit,
  buttonAdd,
  userAvatarButton
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

//Создаем экземпляр класса UserInfo
const userInfo = new UserInfo(configUser);

//Создаем экземпляр класса Api c личным токеном и индификатором группы
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
  headers: {
    authorization: 'a5a02e60-10c8-46a9-914b-480856b1458a',
    'Content-Type': 'application/json'
  }
});

let userId;

//Первый запрос api для первоначальной отрисовки приложения: уже добавленные карточки и заполненный профиль
api.getInitialData().then((initialData) => {
  const [initialUserInfo, initialCards] = initialData;

  userId = initialUserInfo._id;

  userInfo.setUserInfo(initialUserInfo);
  userInfo.setUserAvatar(initialUserInfo);

  cardsList.renderItems(initialCards);
}).catch((err) => {
  console.log(`Ошибка: ${err}`)
});


//Создаем экземпляр класса PopupWithSubmit для подтверждения удаления карточки
const popupDeleteSubmit = new PopupWithSubmit('.popup_type_submit', configPopup);
popupDeleteSubmit.setEventListeners()

//Для попапа с изображением создаем экземпляр класса PopupWithImage
const popupPic = new PopupWithImage('.popup_type_image', configPopup);
popupPic.setEventListeners()

//Функция создания новой карточки с местом
function createCard(cardData) {
  cardData.userId = userId;
  // Создадим экземпляр карточки класса Card
  const card = new Card({
    data: cardData,
    config: configCard,
    handleImageClick: () => {
      popupPic.open(cardData);
    },
    handleLikeClick: (id) => {
      if (!card.isLiked()) {
        api.likeCard(id).then((updatedCard) => {
          card.updateLikesCounter(updatedCard);
        }).catch((err) => {
          console.log(`Ошибка: ${err}`)
        });
      } else {
        api.removeLike(id).then((updatedCard) => {
          card.updateLikesCounter(updatedCard);
        }).catch((err) => {
          console.log(`Ошибка: ${err}`)
        });
      }
    },
    handleDeleteClick: (id) => {
      popupDeleteSubmit.open();
      popupDeleteSubmit.setSubmitAction(() => {
        //“Переопределяемое” действие - удаление карточки по её id
        api.deleteCard(id).then(() => {
          card.deleteCard();
          popupDeleteSubmit.close();
        }).catch((err) => {
          console.log(`Ошибка: ${err}`)
        });
      })
    }
  })

  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  return cardElement;
}


//Создаем список карточек - экземпляр класса Section
const cardsList = new Section(
  (item) => {
    cardsList.addItem(createCard(item), false);
  },
  '.cards__elements'
);





//Передаем введенные в форму Avatar значения в текстовые поля profile
const handleAvatarFormSubmit = (formData) => {
  const avatar = formData.avatar;

  //Перед началом асинхронной операции включаем индикатор загрузки
  popupAvatar.setSavingMode(true);
  api.changeAvatar({ avatar }).then((res) => {
    userInfo.setUserAvatar(res);
    popupAvatar.close();
  }).catch((err) => {
    console.log(`Ошибка: ${err}`)
  }).finally(() => {
    //Убираем индикатор загрузки вне зависимости от того, как завершилась операция
    popupAvatar.setSavingMode(false);
  });
}

//Для каждого попапа с формой создаем свой экземпляр класса PopupWithForm
const popupAvatar = new PopupWithForm('.popup_type_avatar', configPopup, handleAvatarFormSubmit);
popupAvatar.setEventListeners()


//Передаем введенные в форму Add значения в новую карточку и добавляем её
const handleAddFormSubmit = (formData) => {

  popupAdd.setSavingMode(true);

  //Данные новой карточки сохраняем на сервере
  //Берем данные новой карточки из ответа сервера и добавляем ее в начало контейнера
  api.addNewCard(formData).then((res) => {
    cardsList.addItem(createCard(res), true);
    popupAdd.close();
  }).catch((err) => {
    console.log(`Ошибка: ${err}`);
  }).finally(() => {
    popupAdd.setSavingMode(false);
  });
}

const popupAdd = new PopupWithForm('.popup_type_add', configPopup, handleAddFormSubmit);
popupAdd.setEventListeners()


//Передаем введенные в форму Edit значения в текстовые поля profile
const handleEditFormSubmit = (formData) => {
  const name = formData.name;
  const about = formData.about;

  //Отредактированные данные профиля сохраняем на сервере.
  //Берем обновлённые данные пользователя из ответа сервера и вставляем в текстовые поля profile
  popupEdit.setSavingMode(true);
  api.editUserInfo({ name, about }).then((res) => {
    userInfo.setUserInfo(res);
    //Закрываем форму редактирования профиля
    popupEdit.close();
  }).catch((err) => {
    console.log(`Ошибка: ${err}`)
  }).finally(() => {
    popupEdit.setSavingMode(false);
  });
}

const popupEdit = new PopupWithForm('.popup_type_edit', configPopup, handleEditFormSubmit);
popupEdit.setEventListeners()


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

// Обработчик на кнопку редактирования аватара: сбрасываем ошибки предыдущего заполнения и открываем форму
userAvatarButton.addEventListener('click', () => {
  formValidators['avatar-form'].resetFormValidator();
  formValidators['avatar-form'].disableButton();
  popupAvatar.open();
});

// Обработчик на кнопку добавления: сбрасываем ошибки предыдущего заполнения и открываем форму
buttonAdd.addEventListener('click', () => {
  //Вызываем публичный метод сброса формы класса FormValidator
  formValidators['card-form'].resetFormValidator();
  formValidators['card-form'].disableButton();
  popupAdd.open();
});


//Запуск валидации после получения ответа с сервера
enableValidation(configForm);
