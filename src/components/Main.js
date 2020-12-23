import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import Card from "./Card";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <div className="profile root__section">
        <div className="user-info">
          <div
            className="user-info__photo"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            onClick={props.onEditAvatar}
          ></div>
          <div className="user-info__data">
            <h1 className="user-info__name">{currentUser.name}</h1>
            <p className="user-info__job">{currentUser.about}</p>
            <div className="user-info__buttons">
              <button
                className="button user-info__edit-button"
                onClick={props.onEditProfile}
              >
                Edit
              </button>
              <button
                className="button user-info__cards-button"
                onClick={props.onShowCards}
              >
                Show my cards
              </button>
            </div>
          </div>
          <button
            className="button user-info__button"
            onClick={props.onAddPlace}
          >
            +
          </button>
        </div>
      </div>
      <div className="places-list root__section">
        {props.cards.map((item) => (
          <Card
            card={item}
            onPicClick={props.onPicClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </div>
    </main>
  );
}

export default Main;
