//Класс UserInfo отвечает за управление отображением информации о пользователе на странице

export class UserInfo {
  constructor(userNameSelector, userInfoSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
  }

  //Публичный метод возвращает объект с данными пользователя, используется при открытии попапа
  getUserInfo() {
    const userData = {};

    userData.name = this._userName.textContent;
    userData.info = this._userInfo.textContent;

    return userData;
  }

  //Публичный метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({name, info}) {
    this._userName.textContent = name;
    this._userInfo.textContent = info;
  }
}
