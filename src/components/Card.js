import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardDeleteButtonClassName = `place-card__delete-icon ${
    isOwn ? "place-card__delete-icon_visible" : "place-card__delete-icon_hidden"
  }`;
  const cardLikeButtonClassName = `place-card__like-icon ${
    isLiked ? "place-card__like-icon_liked" : "place-card__like-icon_disliked"
  }`;

  function handleClick() {
    props.onPicClick(props.card);
  }
  function handleLike() {
    props.onCardLike(props.card);
  }
  function handleDelete() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="place-card" key={props.card_id}>
      <div className="place-card__image-wrapper">
        <button
          className={cardDeleteButtonClassName}
          onClick={handleDelete}
        ></button>
      </div>
      <div
        className="place-card__image"
        style={{
          backgroundImage: `url(${props.card.link})`,
        }}
        onClick={handleClick}
      ></div>

      <div className="place-card__description">
        <h3 className="place-card__name">{props.card.name}</h3>
        <div className="place-card__like-wrapper">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLike}
          ></button>
          <p className="place-card__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
