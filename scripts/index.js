import './data.js'
const imagePopupCloseButton = document.querySelector('.image-popup__close-button');
const elementsImage = document.querySelector('.elements__photo')
const deleteElement = document.querySelector('.elements__delete');
const like = document.querySelector('.elements__heart');
const imagePopup = document.querySelector('.image-popup');
const addPopup = document.querySelector('.add-popup');
const popup = document.querySelector('.popup');
const profile = document.querySelector('.profile');

const formOfSubmit = popup.querySelector('.popup__submit-form');
const closeButton = popup.querySelector('.popup__close-button');
let nameInput = popup.querySelector('.popup__input_description_name');
let aboutMeInput = popup.querySelector('.popup__input_description_about-me');

const addFormOfSubmit = addPopup.querySelector('.add-popup__submit-form');
const addCloseButton = addPopup.querySelector('.add-popup__close-button');
let addNameInput = addPopup.querySelector('.add-popup__input_description_name');
let addLink = addPopup.querySelector('.add-popup__input_description_link');

const addButton = profile.querySelector('.profile__add-button');
const editButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let aboutMe = profile.querySelector('.profile__about-me');


//Добавление карточки
const elementsTemplate = document.querySelector('#elements-template').content.querySelector('.elements__item');

//Открытие формы

const openImagePopup = function() {
  imagePopup.classList.add('image-popup_opened');
}

const openAddPopup = function() {
addPopup.classList.add('add-popup_opened');
}

const openPopup = function() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  aboutMeInput.value = aboutMe.textContent;
}

//Закрытие формы

const closeImagePopup = function() {
  imagePopup.classList.remove('image-popup_opened');
}

const closeAddPopup = function() {
  addPopup.classList.remove('add-popup_opened');
}

const closePopup = function() {
  popup.classList.remove('popup_opened');
}

//Отправка формы
const addSubmitForm = function(evt) {
  evt.preventDefault();
  closeAddPopup();
}

const submitForm = function(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  aboutMe.textContent = aboutMeInput.value;
  closePopup();
}

//Лайки карточек

const likeHeart = function(evt) {
  evt.target.classList.toggle('elements__heart_active');
}

//Удаление карточки

const deleteCard = function(evt) {
  evt.target.closest('.elements__item').remove();
}

//Слушатели событий
imagePopupCloseButton.addEventListener('click', closeImagePopup);
elementsImage.addEventListener('click', openImagePopup);

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formOfSubmit.addEventListener('submit', submitForm);

addFormOfSubmit.addEventListener('submit', addSubmitForm);
addButton.addEventListener('click', openAddPopup);
addCloseButton.addEventListener('click', closeAddPopup);

like.addEventListener('click', likeHeart);
deleteElement.addEventListener('click', deleteCard);

