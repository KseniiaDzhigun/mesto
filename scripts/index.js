const buttonEdit = document.querySelector('.profile__button_type_edit');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

// Все переменные задаём как const, так как мы не меняем сами элементы, которые находим, а меняем их значения

const formElement = popup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_text');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');


function closePopup() {
  popup.classList.remove('popup_opened');
}

function openPopup() {
  popup.classList.add('popup_opened');
}

//Форма открывается с полями, значения которых соответствуют текущей информации в profile
function popupOpenForm() {
  if (popup.classList.contains('popup_opened') === false) {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
  }
  openPopup();
}

//Передаем введенные в форму значения в текстовые поля profile и закрываем форму
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

buttonEdit.addEventListener('click', function () {
  popupOpenForm();
});

popupCloseButton.addEventListener('click', function () {
  closePopup();
});

//Форма закрывается при нажатии на пустое место экрана = popup
popup.addEventListener('click', function (e) {
  if (e.target === e.currentTarget) {
    closePopup();
  }
});
