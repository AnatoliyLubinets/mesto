import { Popup } from "./Popup";

export class UserInfo {
  constructor({userNameSelector, userInfoSelector, avatarSelector}) {
    this._name = document.querySelector(userNameSelector);
    this._info = document.querySelector(userInfoSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._profile = null;
  }

  getUserInfo() {
    return { name: this._name.textContent, info: this._info.textContent,
      avatar: this._avatar.src }
  }

  setUserInfo(user) {
    this._name.textContent = user.name;
    this._info.textContent = user.about;
    this._avatar.src = user.avatar;
    this._profile = user;

  }

  getProfile (){
    return this._profile;
  }
}
