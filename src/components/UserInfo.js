//Класс UserInfo отвечает за управление отображения информации о пользователе на странице

export class UserInfo {
  constructor(config, handleAvatarClick) {
    this._config = config;
    this._userName = document.querySelector(this._config.userNameSelector);
    this._userAbout = document.querySelector(this._config.userAboutSelector);
    this._userAvatar = document.querySelector(this._config.userAvatarSelector);
    this._handleAvatarClick = handleAvatarClick;
  }

  //Публичный метод возвращает объект с данными пользователя, используется при открытии попапа
  getUserInfo() {
    const userData = {};

    userData.name = this._userName.textContent;
    userData.about = this._userAbout.textContent;

    return userData;
  }

  //Публичный метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userAbout.textContent = data.about;
  }

  setUserAvatar(data) {
    this._userAvatar.src = data.avatar;
    this._setEventListeners();
  }

  _setEventListeners() {
    this._userAvatar.addEventListener('click', this._handleAvatarClick);
  }
}
