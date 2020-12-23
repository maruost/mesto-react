import React from "react";
import close from "../images/close.svg";

function ImagePopup(props) {
  return (
    <div
      id="popup-image"
      className={props.isOpened ? "popup popup_is-opened" : "popup"}
    >
      <div className="popup__container">
        <img src={props.card.link} className="popup__card-image" alt="card" />
        <img
          src={close}
          alt=""
          className="popup__close"
          id="popup-image-close"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default ImagePopup;
