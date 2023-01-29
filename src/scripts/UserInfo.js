export class UserInfo {
  constructor({userNameSelector, userInfoSelector}) {
    this._name = document.querySelector(userNameSelector);
    this._info = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    console.log(this._info.textContent)
    return { name: this._name.textContent, info: this._info.textContent  }
  }

  setUserInfo(name, info) {
    this._name.textContent = name;
    this._info.textContent = info;
  }
}
