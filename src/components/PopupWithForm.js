import React from "react";
import close from "../images/close.svg";

function PopupWithForm(props) {
  return (
    <div
      id={`popup-${props.name}`}
      className={props.isOpened ? "popup popup_is-opened" : "popup"}
    >
      <div className="popup__content">
        <img
          src={close}
          alt="закрыть"
          className="popup__close"
          id={`popup-${props.name}-close`}
          onClick={props.onClose}
        />
        <h3 className="popup__title">{props.title}</h3>
        <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
