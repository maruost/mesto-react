import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleName(e) {
    setName(e.target.value);
  }
  function handleLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpened={props.isOpened}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        className="popup__input popup__input_type_name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        onChange={handleName}
      />
      <span className="popup__error" data-for="name"></span>
      <input
        type="url"
        name="link"
        className="popup__input popup__input_type_link-url"
        placeholder="Ссылка на картинку"
        required
        onChange={handleLink}
      />
      <span className="popup__error" data-for="link"></span>
      <button type className="button popup__button">
        +
      </button>{" "}
    </PopupWithForm>
  );
}

export default AddPlacePopup;
