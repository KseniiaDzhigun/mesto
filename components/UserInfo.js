export class UserInfo {
  constructor(userNameSelector, userInfoSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    const userData = {};

    userData.name = this._userName.textContent;
    userData.info = this._userInfo.textContent;

    return userData;
  }

  setUserInfo({name, info}) {
    this._userName.textContent = name;
    this._userInfo.textContent = info;
  }
}
