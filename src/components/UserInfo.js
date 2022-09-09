//Класс UserInfo отвечает за управление отображением информации о пользователе на странице

export class UserInfo {
  constructor(userNameSelector, userAboutSelector, userAvatarSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
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
  }
}
