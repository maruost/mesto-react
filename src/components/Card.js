import React from "react";

function Card(props) {
  return(
    <div className="place-card" key={props.card_id}>
      <div
        className="place-card__image"
        style={{
          backgroundImage: `url(${props.card.link})`,
        }}
      >
        <button className="place-card__delete-icon"></button>
      </div>
      <div className="place-card__description">
        <h3 className="place-card__name">{props.card.name}</h3>
        <button className="place-card__like-icon"></button>
      </div>
    </div>
  );
}

export default Card;
