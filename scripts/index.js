//Обьявим переменные

const popup = document.querySelector('.popup');
const profile = document.querySelector('.profile');

const closeButton = popup.querySelector('.popup__close-button');
let nameInput = popup.querySelector('.popup__input_description_name');
let aboutMeInput = popup.querySelector('.popup__input_description_about-me');

const editButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let aboutMe = profile.querySelector('.profile__about-me');

//Открытие формы

const openPopup = function() {
  popup.classList.add('popup_opened');
if (nameInput.value, aboutMeInput.value === "") {
  nameInput.value = profileName.textContent;
  aboutMeInput.value = aboutMe.textContent;
  }
}

//Закрытие формы

const closePopup = function() {
  popup.classList.remove('popup_opened');
}

//Закрытие формы по клику не в форме

//const closeEditFormByClickOnOverlay = function(event) {
//  console.log(event.target, event.currentTarget);
//  if (event.taget === event.currentTarget) {
//    closeEditForm();
//  }
//}

//Перезапись имени и профессии, закрытие формы

const submitForm = function(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  aboutMe.textContent = aboutMeInput.value;
  closePopup();
}

//Слушатели событий

popup.addEventListener('submit', submitForm);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
//editForm.addEventListener('click', closeEditFormByClickOnOverlay);
