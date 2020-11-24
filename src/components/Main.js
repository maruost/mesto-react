import React from "react";
import api from "../utils/API";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = React.useState("лионеля месси");
  const [userDescription, setUserDescription] = React.useState(
    "что-то на татарском"
  );
  const [userAvatar, setUserAvatar] = React.useState();
  let [cards, setCards] = React.useState([]);

  function handleUserName(data) {
    setUserName(data);
  }

  function handleUserDescription(data) {
    setUserDescription(data);
  }

  function handleUserAvatar(data) {
    setUserAvatar(data);
  }

  React.useEffect(() => {
    api
      .getInitialCards("cards")
      .then((res) => setCards([...cards, ...res]))
      .catch((err) => console.log(err));
  });

  React.useEffect(() => {
    api
      .getUserInfo("users/me")
      .then((res) => {
        handleUserName(res.name);
        handleUserDescription(res.about);
        handleUserAvatar(res.avatar);
      })
      .catch((err) => console.log(err));
  });

  return (
    <main className="main">
      <div className="profile root__section">
        <div className="user-info">
          <div
            className="user-info__photo"
            style={{ backgroundImage: `url(${userAvatar})` }}
            onClick={props.onEditAvatar}
          ></div>
          <div className="user-info__data">
            <h1 className="user-info__name">{userName}</h1>
            <p className="user-info__job">{userDescription}</p>
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
          <Card card={item} />
        ))}
      </div>
    </main>
  );
}

export default Main;
