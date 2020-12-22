import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import api from "../utils/API";
import Card from "./Card";

function Main(props) {
  let [cards, setCards] = React.useState([]);
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();

  React.useEffect(() => {
    api
      .getInitialCards("cards")
      .then((res) => setCards([...cards, ...res]))
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    console.log(!isLiked);
    api
      .changeLikeCardStatus("cards/like", card._id, !isLiked)
      .then((newCard) => {
        console.log(newCard);
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      });
  }

  function handleCardDelete(card) {
    const isMine = card.owner._id === currentUser._id;
    isMine
      ? api.deleteCard("cards", card._id).then((deletedCard) => {
          const newCards = cards.filter((c) => c._id !== deletedCard._id);
          setCards(newCards);
        })
      : console.log("Нет прав на выполнение действия");
  }

  return (
    <main className="main">
      <div className="profile root__section">
        <div className="user-info">
          <div
            className="user-info__photo"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            onClick={props.onEditAvatar}
            ref={avatarRef}
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
          <Card
            card={item}
            onCardClick={props.onCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        ))}
      </div>
    </main>
  );
}

export default Main;
