//открываем попапы
let popupOpen = document.querySelector('.popup_opened')
function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
  }

let buttonEdit = document.querySelector('.profile__button_is_edit')
let popupEdit = document.querySelector('.popup_type_edit')
buttonEdit.addEventListener('click', function() {
    console.log('work')
    openPopup(popupEdit);
}); 

let buttonAdd = document.querySelector('.profile__button_is_add')
let popupAdd = document.querySelector('.popup_type_add')
buttonAdd.addEventListener('click', function() {
    console.log('work')
    openPopup(popupAdd);
}); 

 //закрываем попапы
function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

let buttonCloseEdit = document.querySelector('.popup__close-icon_is_edit')
buttonCloseEdit.addEventListener('click', function() {
    console.log('work')
    closePopup(popupEdit);
}); 

let buttonCloseAdd = document.querySelector('.popup__close-icon_is_add')
buttonCloseAdd.addEventListener('click', function() {
    console.log('work')
    closePopup(popupAdd);
}); 

//кнопка сохранить Edit и отправка данных
let saveButton = document.querySelector('.form__button-save')
function formClose() {
    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
}
saveButton.addEventListener('click', formClose)

const formElement = document.querySelector('.form')
const inputName = document.querySelector('.form__item_is_name')
const inputJob = document.querySelector('.form__item_is_job')
const profilName = document.querySelector('.profile__title')
const profilJob = document.querySelector('.profile__subtitle')

function formSubmitHandler (evt) {
    evt.preventDefault();
    console.log('work');
    profilName.textContent = inputName.value;
    profilJob.textContent = inputJob.value;
    formClose();
}
formElement.addEventListener('submit', formSubmitHandler);

//создание, добавление, удаление, лайк картинки
const cardList = document.querySelector('.elements')
const elementTemplate = document.querySelector('.element-template').textContent;

function getCardElement(data) {
const cardElement = elementTemplate.cloneNode(true);
cardElement.querySelector('.element__text').textContent = data.name;
cardElement.querySelector('.element__image').src = data.link;
cardElement.querySelector('.element__button-like').addEventListener('click', function(evt) {
    console.log(evt);
    evt.target.classList.toggle('.element__button-like_active');
})
cardElement.querySelector('.element__button-delete').addEventListener('click', function(evt) {
    console.log(evt);
    evt.target.classList.closest('.element');
})

return cardElement;
}

function renderCard(data, wrapElement) {
    let wrapElement = getCardElement(data);
    cardList.prepend(element);
}

initialCards.forEach(function(element) {
    renderCard(element);
})
