import './../pages/index.css';
import photoCards from "./../utils/data.js";
import { FormValidator } from "./../components/FormValidator";
import { Card } from "./../components/Сard.js";
import { PopupWithForm } from "./../components/PopupWithForm.js";
import { PopupWithImage } from "./../components/PopupWithImage.js";
import { UserInfo } from './../components/UserInfo.js';
import { Section } from './../components/Section.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirmation } from './../components/PopupWithConfirmation.js'
import { validationConfig } from './../utils/constants.js'
import { elementsTemplate, buttonOpenEditAvatarPopup,
  formEditProfile, formAddCard, buttonOpenAddCardPopup,
  buttonOpenEditProfilePopup, formEditAvatar,
} from './../utils/constants.js';

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "af4e66a2-1aaf-46fc-b7c6-0a00a307bcb9",
    "Content-Type": "application/json",
  },
});

 Promise.all([api.getInitialCards(), api.getProfileInfo()])
  .then(([cards, user]) => {
    userInfo.setUserInfo(user);
    cardList.renderItems(cards, user._id);
    console.log(cards)
    console.log(user)
  })
  .catch((err) =>  {
    console.log(err)
  })

//Обьявление экземпляров валидации
const addCardFormValidator = new FormValidator(validationConfig, formAddCard)
const profileFormValidator = new FormValidator(validationConfig, formEditProfile)
const avatarFormPopupValidator = new FormValidator(validationConfig, formEditAvatar)

//обращение к экземплярам валидации форм
profileFormValidator.enableValidation()
addCardFormValidator.enableValidation()
avatarFormPopupValidator.enableValidation()


//Экземпляр попапа с картинкой
const popupWithImage = new PopupWithImage ('.image-popup');
popupWithImage.setEventListeners();


const userInfo = new UserInfo({
  userNameSelector: '.profile__name', userInfoSelector: '.profile__about-me',
  avatarSelector: '.profile__avatar'
});

const toggleLikeCard = (_id, isDelete) => {
  if(isDelete) {
    return api.handleDeleteLikeClick(_id);
  }
    return api.handleLikeClick(_id);
}

const createCard = (item) => {
  const userProfile = userInfo.getProfile();
  const cardElement = new Card(
      item, userProfile._id, elementsTemplate,
     (src, link) => {popupWithImage.open(src, link)},
     (_id, isDelete) => toggleLikeCard(_id, isDelete),
    //  (_id) => api.handleDeleteCard(_id),
     (evt, _id) => {confirmationPopup.open(evt, _id)},
    )
    return cardElement.createElement();
}

const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
},
'#elements-list'
);


//Отправка формы и создание карточки

const handleAddSubmitForm = function (evt, values) {
  evt.preventDefault();
  addCardPopup.setSubmitButtonText("Создание...");
  api.createNewCard(values).then((res) => {
    cardList.addItem(createCard(res));
    addCardPopup.close();
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => addCardPopup.setSubmitButtonText("Создать"));
};


//отправка формы профиля
const handleProfileFormSubmit = function (evt, values) {
  evt.preventDefault();
  profileFormPopup.setSubmitButtonText("Сохранение...");
  api.profileEdit(values).then((res) => {
    userInfo.setUserInfo(res);
    profileFormPopup.close();
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => profileFormPopup.setSubmitButtonText("Сохранить"))
};

//отправка формы редактирования аватара
const handleAvatarFormSubmit = function (evt, user) {
  evt.preventDefault();
  avatarFormPopup.setSubmitButtonText("Сохранение...");
  api.handleChangeAvatar(user).then((res) => {
    userInfo.setUserInfo(res);
    avatarFormPopup.close()
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => avatarFormPopup.setSubmitButtonText("Сохранить"));
};

//отправка формы подтвержденя
const handleConfirmFormSubmit = function(evt, _id, _elm) {
  evt.preventDefault();
  api.handleDeleteCard(_id).then(() => {
    _elm.target.closest(".elements__item").remove();
    confirmationPopup.close();
  })
  .catch((err) => {
    console.log(err)
  })
};

//"Экземпляр попапа подтверждения"
const confirmationPopup = new PopupWithConfirmation('.confirmation-popup', handleConfirmFormSubmit);
confirmationPopup.setEventListeners();

//Экземпляр попапа редактирования аватара
const avatarFormPopup = new PopupWithForm('.avatar-popup', handleAvatarFormSubmit);
avatarFormPopup.setEventListeners();

//Экземпляр попапа добавления карточки
const addCardPopup = new PopupWithForm ('.add-popup', handleAddSubmitForm);
addCardPopup.setEventListeners();


//Экземпляр попапа с формай редактирования профиля
const profileFormPopup = new PopupWithForm ('.profile-popup', handleProfileFormSubmit);
profileFormPopup.setEventListeners();

//Слушатели событий


//слушатель клика для отключени кнопки сабмита и сброс ошибок при открытии модалки карточки
buttonOpenAddCardPopup.addEventListener("click", () => {
  addCardPopup.open();
  addCardFormValidator.toggleButtonState();
  addCardFormValidator.resetInputError();
});

//слушатель клика для отключения кнопки сабмита и сброс ошибок при открытии модалки профиля
buttonOpenEditProfilePopup.addEventListener("click", () => {
  const { name, info } = userInfo.getUserInfo();
  profileFormPopup.setFormValues({ name, info })
  profileFormValidator.toggleButtonState();
  profileFormValidator.resetInputError();
  profileFormPopup.open();
});

//слушатель клика для отключения кнопки сабмита и сброс ошибок при открытии модалки аватара
buttonOpenEditAvatarPopup.addEventListener("click", () => {
  avatarFormPopup.open();
  avatarFormPopupValidator.toggleButtonState();
  avatarFormPopupValidator.resetInputError();
});
