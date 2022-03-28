import '../pages/index.css'; 
import {options, validationSettings, formElement, container, handleLikes, handleImageClick, elementTemplate, } from './utils.js';

import Api from './Api.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js'

let currentUserId;

export const api = new Api(options);

  

export const userInfo = new UserInfo (
    {UserNameSelector: '.profile__title',
    UserActivitySelector: '.profile__subtitle',
    UserAvatarSelector: '.profile__image'
    }
);

export const imagePopup = new PopupWithImage('.popup_type_image', '.element__image_type_popup', '.element__text_type_popup'); 
imagePopup.setEventListeners();

export const newCardPopup = new PopupWithForm('.popup_type_add', handleFormSubmit);
newCardPopup.setEventListeners();

export const formValidator = new FormValidator(validationSettings, formElement); 


const createCard = (data) => {
  const card = new Card(data, elementTemplate, currentUserId, handleLikes, handleImageClick, handleDeleteCard).defineCard();
  return card;
}




export const defineSection = (cards) => {
  const section = new Section ({
  data: cards,
  renderer: (item) => {
      const realCard = createCard(item);
      
      section.addItem(realCard);
  },
  containerSelector: container});
/*   console.log(section.owner); */
  return section;
}

function handleFormSubmit(data) {
  let cardInfo = { name: data.title, link: data.activity}
  api
  .addNewCard(cardInfo)
  .then(card => {
    const createdCard = createCard(card);
    container.prepend(createdCard);
  })
  .then(()=> this.closePopup())
}

function handleDeleteCard(card) {
  api.deleteCardServer(card._cardId)
  .then(() => {
    card._deleteCard()
  })
}


  let section;
  
 api.getAppInfo()
  .then(([cards, user]) => {
    userInfo.setUserInfo(user.name, user.about, user.avatar);// принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.
    userInfo.getUserInfo(user);// возвращает объект с данными пользователя
    currentUserId = user._id;
    console.log(user);
    section = defineSection(cards);
    section.renderAll();
  })
  .catch(err => console.log(err));




