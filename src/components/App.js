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

function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(0);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(0);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(0);
  const [selectedCard, setSelectedCard] = React.useState(0);
  const [currentUser, setCurrentUser] = React.useState("");

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

  React.useEffect(() => {
    api
      .getUserInfo("users/me")
      .then((res) => setCurrentUser(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
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
        <PopupWithForm
          name="add"
          title="Новое место"
          isOpened={isAddPlacePopupOpen}
          onClose={closeAllPopup}
        >
          <input
            type="text"
            name="name"
            className="popup__input popup__input_type_name"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="popup__error" data-for="name"></span>
          <input
            type="url"
            name="link"
            className="popup__input popup__input_type_link-url"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__error" data-for="link"></span>
          <button type className="button popup__button">
            +
          </button>{" "}
        </PopupWithForm>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
