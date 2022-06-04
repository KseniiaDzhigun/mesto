const buttonEdit = document.querySelector('.profile__button_type_edit');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_text');

let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

function popupOpenForm() {
  if (popup.classList.contains('popup_opened') === false) {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
  }
  togglePopup();
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  togglePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

buttonEdit.addEventListener('click', function () {
  popupOpenForm();
});

popupCloseButton.addEventListener('click', function () {
  togglePopup();
});

popup.addEventListener('click', function (e) {
  if (e.target === e.currentTarget) {
    togglePopup();
  }
});
