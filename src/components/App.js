import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import api from "../utils/API";
import { CurrentUserContext } from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import AlertPopup from "./AlertPopup";

function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(0);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(0);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(0);
  const [isAlertPopupOpen, setisAlertPopupOpen] = React.useState(0);
  const [isPicPopupOpen, setisPicPopupOpen] = React.useState(0);
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
    api
      .changeLikeCardStatus("cards/like", card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard("cards", card._id).then((deletedCard) => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
      closeAllPopup();
    });
  }
  function handleShowCards() {
    api
      .getInitialCards("cards")
      .then((res) => {
        const newCards = res.filter((c) => c.owner._id === currentUser._id);
        console.log(cards);
        console.log(newCards);
        setCards(newCards);
        console.log(cards);
      })
      .catch((err) => console.log(err));
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
    setisPicPopupOpen(true);
  }

  function handleDeleteClick(card) {
    setSelectedCard(card);
    setisAlertPopupOpen(true);
  }

  function closeAllPopup() {
    setisEditAvatarPopupOpen(false);
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisPicPopupOpen(false);
    // setSelectedCard(false);
    setisAlertPopupOpen(false);
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
          onPicClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteClick}
          onShowCards={handleShowCards}
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
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopup}
          isOpened={isPicPopupOpen}
        />
        <AddPlacePopup
          isOpened={isAddPlacePopupOpen}
          onClose={closeAllPopup}
          onAddPlace={handleAddPlaceSubmit}
        />
        <AlertPopup
          card={selectedCard}
          isOpened={isAlertPopupOpen}
          onClose={closeAllPopup}
          onCardDelete={handleCardDelete}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
