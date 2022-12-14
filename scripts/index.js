import photoCards from "./data.js";

const elementsTemplate = document.querySelector("#elements-template").content.querySelector(".elements__item");
const elementsList = document.querySelector("#elements-list");
const profile = document.querySelector(".profile");
const imagePopup = document.querySelector(".image-popup");
const addPopup = document.querySelector(".add-popup");
const profilePopup = document.querySelector(".profile-popup");
const imagePopupImg = imagePopup.querySelector(".image-popup__img");
const imagePopupTitle = imagePopup.querySelector(".image-popup__title");
const сloseButtons = document.querySelectorAll(".popup__close-button");
const formOfSubmit = document.querySelector(".popup__submit-form");
const nameInput = document.querySelector(".popup__input_description_name");
const aboutMeInput = document.querySelector(".popup__input_description_about-me");
const addFormOfSubmit = document.querySelector(".add-popup__submit-form");
const addNameInput = document.querySelector(".add-popup__input_description_name");
const addLink = document.querySelector(".add-popup__input_description_link");
const addButton = profile.querySelector(".profile__add-button");
const editButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const aboutMe = profile.querySelector(".profile__about-me");
const submitButton = addPopup.querySelector(".popup__button");

//Закрытие попапа на ESC

const closePopupByEsc = (evt) => {
  if(evt.key === 'Escape') {
    const popup = document.querySelector(".popup");
    closePopup(popup);
  }
}

//Закрытие попапа по оверлею
const closePopupClickOnOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    const popup = document.querySelector(".popup");
    closePopup(popup);
  }
}

//Открытие попапа

const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByEsc)
  popup.addEventListener('click', closePopupClickOnOverlay);
};

//Закрытие попапа

const closePopup = function () {
  const popup = document.querySelector(".popup.popup_opened");
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupByEsc)
  popup.removeEventListener('click', closePopupClickOnOverlay);
};


//Отправка формы

const handleAddSubmitForm = function (evt) {
  evt.preventDefault();
  elementsList.prepend(
    createElement({ name: addNameInput.value, link: addLink.value })
  );
  addNameInput.value = "";
  addLink.value = "";
  closePopup();
};

const handleProfileFormSubmit = function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  aboutMe.textContent = aboutMeInput.value;
  closePopup();
};

//Лайки карточек

const toggleLike = function (evt) {
  evt.target.classList.toggle("elements__heart_active");
};

//Удаление карточки

const deleteCard = function (evt) {
  evt.target.closest(".elements__item").remove();
};

//Слушатели событий

сloseButtons.forEach((item) => {
  item.addEventListener("click", closePopup);
});

addButton.addEventListener("click", () => {
  openPopup(addPopup)
  if (submitButton.disabled !== 'disabled', submitButton.classList !== 'popup__submit-button_disabled') {
    submitButton.disabled = 'disabled'
    submitButton.classList.add("popup__submit-button_disabled")
  }
});

editButton.addEventListener("click", () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  aboutMeInput.value = aboutMe.textContent;
});
formOfSubmit.addEventListener("submit", handleProfileFormSubmit);
addFormOfSubmit.addEventListener("submit", handleAddSubmitForm);

photoCards.forEach((item) => {
  elementsList.prepend(createElement(item));
});

//Добавление карточки

function createElement(item, evt) {
  const elm = elementsTemplate.cloneNode(true);
  elm.querySelector(".elements__name").textContent = item.name;
  const elmPhoto = elm.querySelector(".elements__photo");
  elmPhoto.src = item.link;
  elmPhoto.alt = "Фото" + " " + item.name;
  const elmDeleteButton = elm.querySelector(".elements__delete");
  const elmLikeButton = elm.querySelector(".elements__heart");
  elmDeleteButton.addEventListener("click", deleteCard);
  elmPhoto.addEventListener("click", (e) => {
    openPopup(imagePopup);
    imagePopupImg.src = item.link;
    imagePopupImg.alt = "Фото" + " " + item.name;
    imagePopupTitle.textContent = item.name;
  });
  elmLikeButton.addEventListener("click", toggleLike);

  return elm;
}
