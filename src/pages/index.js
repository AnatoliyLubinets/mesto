import './../pages/index.css';
import photoCards from "./../utils/data.js";
import { FormValidator } from "./../components/FormValidator";
import { Card } from "./../components/Сard.js";
import { PopupWithForm } from "./../components/PopupWithForm.js";
import { PopupWithImage } from "./../components/PopupWithImage.js";
import { UserInfo } from './../components/UserInfo.js';
import { Section } from './../components/Section.js';
import { Api } from './../components/api.js';
import { elementsTemplate, buttonOpenEditAvatarPopup,
  formEditProfile, formAddCard, buttonOpenAddCardPopup,
  buttonOpenEditProfilePopup, formEditAvatar, openConfirmationPopupButtons,
} from './../utils/constants.js';

const api = new Api()

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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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

const togglelikeCard = (_id, isDelete) => {
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
     (_id, isDelete) => togglelikeCard(_id, isDelete),
     (_id) => api.handleDeleteCard(_id),
     () => {confirmationPopup.open(cardElement)},
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
const handleConfirmFormSubmit = function(_id, cardElement) {
  evt.preventDefault();
  api.handleDeleteCard(_id).then((res) => {
    cardElement.deleteCard(res);
    confirmationPopup.close();
  })
  .catch((err) => {
    console.log(err)
  })
};

//"Экземпляр попапа подтверждения"
const confirmationPopup = new PopupWithForm('.confirmation-popup', handleConfirmFormSubmit);
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
