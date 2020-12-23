import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function AlertPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete(props.card);
  }

  return (
    <PopupWithForm
      name="alert"
      title="Вы уверены?"
      isOpened={props.isOpened}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <button
        type
        className="button popup__button popup__button_font-size popup__button_active"
      >
        Да
      </button>
    </PopupWithForm>
  );
}

export default AlertPopup;
