import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.description);
  }, [currentUser]);

  function handleName(e) {
    setName(e.target.value);
  }
  function handleDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpened={props.isOpened}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="user"
        className="popup__input popup__input_type_name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="30"
        onChange={handleName}
      />
      <span className="popup__error" data-for="user"></span>
      <input
        type="text"
        name="job"
        className="popup__input popup__input_type_job"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="30"
        onChange={handleDescription}
      />
      <span className="popup__error" data-for="job"></span>
      <button
        type
        className="button popup__button popup__button_font-size popup__button_active"
      >
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
