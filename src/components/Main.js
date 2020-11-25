import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import api from "../utils/API";
import Card from "./Card";

function Main(props) {
  let [cards, setCards] = React.useState([]);
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    api
      .getInitialCards("cards")
      .then((res) => setCards([...cards, ...res]))
      .catch((err) => console.log(err));
  });

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
            <button
              className="button user-info__edit-button"
              onClick={props.onEditProfile}
            >
              Edit
            </button>
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
        {cards.map((item) => (
          <Card card={item} onCardClick={props.onCardClick} />
        ))}
      </div>
    </main>
  );
}

export default Main;
