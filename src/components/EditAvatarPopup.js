import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpened={props.isOpened}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="url"
        name="link"
        className="popup__input popup__input_type_link-url"
        placeholder="Ссылка на аватар"
        required
      />
      <span className="popup__error" data-for="link"></span>
      <button
        type
        className="button popup__button popup__button_font-size popup__button_active"
      >
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
