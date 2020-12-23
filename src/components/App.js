import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/API";
import { CurrentUserContext } from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(0);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(0);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(0);
  const [selectedCard, setSelectedCard] = React.useState(0);
  const [currentUser, setCurrentUser] = React.useState("");
  let [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialCards("cards")
      .then((res) => setCards([...cards, ...res]))
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    api
      .getUserInfo("users/me")
      .then((res) => setCurrentUser(res))
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    console.log(!isLiked);
    api
      .changeLikeCardStatus("cards/like", card._id, !isLiked)
      .then((newCard) => {
        console.log(newCard);
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      });
  }

  function handleCardDelete(card) {
    const isMine = card.owner._id === currentUser._id;
    isMine
      ? api.deleteCard("cards", card._id).then((deletedCard) => {
          const newCards = cards.filter((c) => c._id !== deletedCard._id);
          setCards(newCards);
        })
      : console.log("Нет прав на выполнение действия");
  }

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setisEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopup() {
    setisEditAvatarPopupOpen(false);
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setSelectedCard(false);
  }

  function handleUpdateUser(data) {
    const { name, about } = data;
    api
      .editUserInfo("users/me", name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch((err) => console.log(err));
  }

  function handleAvatar(data) {
    const { avatar } = data;
    api
      .updateAvatar("users/me/avatar", avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    const { name, link } = data;
    api
      .addNewCard("cards", name, link)
      .then((res) => {
        setCards([...cards, res]);
        closeAllPopup();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <EditProfilePopup
          isOpened={isEditProfilePopupOpen}
          onClose={closeAllPopup}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpened={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
          onUpdateAvatar={handleAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopup} />
        <AddPlacePopup
          isOpened={isAddPlacePopupOpen}
          onClose={closeAllPopup}
          onAddPlace={handleAddPlaceSubmit}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
