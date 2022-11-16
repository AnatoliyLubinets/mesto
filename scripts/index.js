//Обьявим переменные

const popup = document.querySelector('.popup');
const profile = document.querySelector('.profile');

const formOfSubmit = popup.querySelector('.formOfSubmit')
const closeButton = popup.querySelector('.popup__close-button');
let nameInput = popup.querySelector('.popup__input_description_name');
let aboutMeInput = popup.querySelector('.popup__input_description_about-me');

const editButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let aboutMe = profile.querySelector('.profile__about-me');

//Открытие формы

const openPopup = function() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  aboutMeInput.value = aboutMe.textContent;
}

//Закрытие формы

const closePopup = function() {
  popup.classList.remove('popup_opened');
}

//Перезапись имени и профессии, закрытие формы

const submitForm = function(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  aboutMe.textContent = aboutMeInput.value;
  closePopup();
}

//Слушатели событий

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formOfSubmit.addEventListener('submit', submitForm);
//editForm.addEventListener('click', closeEditFormByClickOnOverlay);
